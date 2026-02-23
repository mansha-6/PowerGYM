import { useState, useEffect } from 'react';
import { Receipt, Bell, Calendar, CreditCard } from 'lucide-react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { StatsCard } from '@/components/gym/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockNotifications, mockPackages } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, onSnapshot, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { Member, Bill } from '@/types/gym';
import Logger from '@/utils/logger';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const notificationStyles = {
    info: 'bg-blue-500/20 text-blue-400',
    warning: 'bg-warning/20 text-warning',
    success: 'bg-success/20 text-success',
    fee_reminder: 'bg-primary/20 text-primary',
  };

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        // Find member by email
        const q = query(collection(db, 'members'), where('email', '==', user.email));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const memberData = { id: doc.id, ...doc.data() } as unknown as Member;
          setMember(memberData);

          // Listen for bills for this member
          const billsQuery = query(
            collection(db, 'bills'), 
            where('memberId', '==', doc.id),
            orderBy('dueDate', 'desc'),
            limit(10)
          );
          
          onSnapshot(billsQuery, (billsSnap) => {
             const data: Bill[] = [];
             billsSnap.forEach(b => {
               const bData = b.data();
               data.push({
                 id: b.id,
                 ...bData,
                 paidDate: bData.paidDate?.toDate ? bData.paidDate.toDate() : new Date(bData.paidDate),
                 dueDate: bData.dueDate?.toDate ? bData.dueDate.toDate() : new Date(bData.dueDate),
               } as Bill);
             });
             setBills(data);
          });
        } else {
           // Self-healing: Create member profile if it doesn't exist
           Logger.info("Member profile missing, creating one...", { email: user.email });
           const newMember = {
             name: user.displayName || user.email?.split('@')[0] || 'Member',
             email: user.email,
             phone: "",
             address: "",
             joinDate: new Date(), // Local date will be converted by Firestore
             packageId: "pkg-1",
             status: "active",
             createdAt: serverTimestamp(),
           };
           
           // @ts-ignore
           const ref = await addDoc(collection(db, "members"), {
              ...newMember,
              joinDate: serverTimestamp()
           });
           
           setMember({ id: ref.id, ...newMember } as any);
           setBills([]); // No bills yet
        }
      } catch (error) {
        Logger.error('Error fetching member data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();

    // Safety timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Ensure we have some data if it times out
      if (bills.length === 0) {
        import('@/lib/mockData').then(({ mockBills }) => setBills(mockBills));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const currentPackageName = member?.packageId 
    ? mockPackages.find(p => p.id === member.packageId)?.name 
    : 'None';

  const recentBills = bills.slice(0, 3);
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {member?.name?.split(' ')[0] || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's your membership overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Current Package"
            value={currentPackageName || 'N/A'}
            icon={CreditCard}
            variant="primary"
          />
          <StatsCard
            title="Status"
            value={member?.status || 'Active'}
            icon={Calendar}
            variant={member?.status === 'active' ? 'success' : 'destructive'}
          />
          <StatsCard
            title="Total Bills"
            value={bills.length}
            icon={Receipt}
          />
          <StatsCard
            title="Notifications"
            value={unreadNotifications}
            icon={Bell}
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bills */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Recent Bills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
                >
                  <div>
                    <p className="font-medium text-foreground">{bill.packageName} Package</p>
                    <p className="text-sm text-muted-foreground">
                      Paid on {bill.paidDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">₹{bill.amount}</p>
                    <Badge className={bill.status === 'paid' ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                      {bill.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {recentBills.length === 0 && <p className="text-muted-foreground text-center">No recent bills</p>}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-warning" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 rounded-xl border',
                    notification.read ? 'bg-muted/20 border-border' : 'bg-muted/40 border-primary/20'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    <Badge className={notificationStyles[notification.type]}>
                      {notification.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
