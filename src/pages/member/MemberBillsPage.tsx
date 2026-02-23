import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { BillsTable } from '@/components/gym/BillsTable';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Bill } from '@/types/gym';
import Logger from '@/utils/logger';

const MemberBillsPage = () => {
  const { user } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchBills = async () => {
      if (!user?.email) {
        import('@/lib/mockData').then(({ mockBills }) => {
          if (isActive) {
            setBills(mockBills);
            setLoading(false);
          }
        });
        return;
      }

      // Fallback timer promise
      const timeoutPromise = new Promise<{ timeout: true }>((resolve) => {
        setTimeout(() => resolve({ timeout: true }), 1500);
      });

      try {
        const fetchPromise = (async () => {
            const mQuery = query(collection(db, 'members'), where('email', '==', user.email));
            const mSnap = await getDocs(mQuery);
            
            if (!mSnap.empty) {
              const memberId = mSnap.docs[0].id;
              const q = query(collection(db, 'bills'), where('memberId', '==', memberId), orderBy('dueDate', 'desc'), limit(50));
              const snapshot = await getDocs(q);
              return snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                  id: doc.id,
                  ...data,
                  paidDate: data.paidDate?.toDate ? data.paidDate.toDate() : new Date(data.paidDate),
                  dueDate: data.dueDate?.toDate ? data.dueDate.toDate() : new Date(data.dueDate),
                };
              }) as Bill[];
            }
            return null;
        })();

        // Race between fetch and timeout
        const result = await Promise.race([fetchPromise, timeoutPromise]);

        if (!isActive) return;

        if ((result as any).timeout) {
           Logger.warn('Fetching bills timed out, using mocks');
           const { mockBills } = await import('@/lib/mockData');
           setBills(mockBills);
        } else if (result) {
            const billsData = result as Bill[];
            if (billsData.length === 0) {
                const { mockBills } = await import('@/lib/mockData');
                setBills(mockBills);
            } else {
                setBills(billsData);
            }
        } else {
            // No member found
            const { mockBills } = await import('@/lib/mockData');
            setBills(mockBills);
        }

      } catch (error) {
        Logger.error('Error fetching member bills', error);
        if (isActive) {
            const { mockBills } = await import('@/lib/mockData');
            setBills(mockBills);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchBills();
    return () => { isActive = false; };
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Bill Receipts</h1>
          <p className="text-muted-foreground mt-1">View and download your payment receipts</p>
        </div>

        <BillsTable bills={bills} loading={loading} showActions={false} />
      </div>
    </DashboardLayout>
  );
};

export default MemberBillsPage;
