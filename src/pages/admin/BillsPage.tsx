import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { BillsTable } from '@/components/gym/BillsTable';
import { CreateBillDialog } from '@/components/gym/CreateBillDialog';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { Bill } from '@/types/gym';
import Logger from '@/utils/logger';

const BillsPage = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [iscreateOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    let unsubscribed = false;
    let fallbackTimer: NodeJS.Timeout;

    const q = query(collection(db, 'bills'), orderBy('dueDate', 'desc'), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (unsubscribed) return;
      clearTimeout(fallbackTimer);
      
      const billsData: Bill[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        billsData.push({
          id: doc.id,
          ...data,
          paidDate: data.paidDate?.toDate ? data.paidDate.toDate() : new Date(data.paidDate),
          dueDate: data.dueDate?.toDate ? data.dueDate.toDate() : new Date(data.dueDate),
        } as Bill);
      });
      setBills(billsData);
      setLoading(false);
    }, (error) => {
       Logger.error('Error fetching bills', error);
       if (!unsubscribed) setLoading(false);
    });

    // Aggressive fallback: If Firestore takes > 1.5s, just load mocks/empty
    fallbackTimer = setTimeout(async () => {
      if (loading && !unsubscribed) {
        Logger.warn('Firestore slow/timeout, using fallback data');
        const { mockBills } = await import('@/lib/mockData');
        setBills(mockBills);
        setLoading(false);
      }
    }, 1500);

    return () => {
      unsubscribed = true;
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  const handleCreateBill = async (billData: any) => {
    try {
      await addDoc(collection(db, 'bills'), {
        ...billData,
        createdAt: serverTimestamp()
      });
      toast.success('Bill created successfully');
    } catch (error) {
       Logger.error('Error creating bill', error);
       toast.error('Failed to create bill');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bill Receipts</h1>
          <p className="text-muted-foreground mt-1">Manage and track all payment receipts</p>
        </div>

        <BillsTable 
          bills={bills} 
          loading={loading}
          onCreateBill={() => setCreateOpen(true)} 
        />
        
        <CreateBillDialog 
          open={iscreateOpen} 
          onOpenChange={setCreateOpen} 
          onSubmit={handleCreateBill}
        />
      </div>
    </DashboardLayout>
  );
};

export default BillsPage;
