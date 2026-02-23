import { Users, Receipt, IndianRupee, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { StatsCard } from '@/components/gym/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMembers, mockBills } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const activeMembers = mockMembers.filter((m) => m.status === 'active').length;
  const totalRevenue = mockBills.reduce((acc, bill) => acc + bill.amount, 0);
  const pendingPayments = mockBills.filter((b) => b.status === 'pending').length;
  const overduePayments = mockBills.filter((b) => b.status === 'overdue').length;

  const recentBills = mockBills.slice(0, 5);

  const statusStyles = {
    paid: 'bg-success/20 text-success',
    pending: 'bg-warning/20 text-warning',
    overdue: 'bg-destructive/20 text-destructive',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your gym overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Members"
            value={mockMembers.length}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatsCard
            title="Active Members"
            value={activeMembers}
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="Total Revenue"
            value={`₹${(totalRevenue / 1000).toFixed(1)}k`}
            icon={IndianRupee}
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="Pending Bills"
            value={pendingPayments + overduePayments}
            icon={Clock}
            variant="warning"
          />
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/members?action=add'}>
            <Users className="w-5 h-5" />
            <span className="text-xs">Add Member</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/bills?action=create'}>
            <Receipt className="w-5 h-5" />
            <span className="text-xs">Create Bill</span>
          </Button>
           <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/packages'}>
            <IndianRupee className="w-5 h-5" />
            <span className="text-xs">Packages</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/notifications'}>
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs">Notify</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/reports'}>
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/supplements'}>
            <Clock className="w-5 h-5" />
            <span className="text-xs">Store</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary/50 hover:text-primary" onClick={() => window.location.href = '/admin/diet'}>
            <Clock className="w-5 h-5" />
            <span className="text-xs">Diet</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bills */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              <Receipt className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-primary-foreground font-semibold">
                      {bill.memberName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{bill.memberName}</p>
                      <p className="text-sm text-muted-foreground">{bill.packageName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{bill.amount}</p>
                    <Badge className={cn('text-xs', statusStyles[bill.status])}>
                      {bill.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Alerts */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Alerts & Reminders</CardTitle>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </CardHeader>
            <CardContent className="space-y-4">
              {overduePayments > 0 && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Overdue Payments</p>
                    <p className="text-sm text-muted-foreground">
                      {overduePayments} member{overduePayments > 1 ? 's have' : ' has'} overdue fees
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pending Renewals</p>
                  <p className="text-sm text-muted-foreground">
                    {pendingPayments} membership{pendingPayments > 1 ? 's are' : ' is'} pending renewal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Growth on Track</p>
                  <p className="text-sm text-muted-foreground">
                    Member growth is up 12% this month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
