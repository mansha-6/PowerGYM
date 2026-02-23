
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Member, FeePackage } from '@/types/gym';
import { mockPackages } from '@/lib/mockData'; // Using mock packages for now
import Logger from '@/utils/logger';

interface CreateBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (billData: any) => void;
}

export const CreateBillDialog = ({ open, onOpenChange, onSubmit }: CreateBillDialogProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [formData, setFormData] = useState({
    memberId: '',
    packageId: '',
    amount: '',
    dueDate: '',
    status: 'pending'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch members for dropdown
    const fetchMembers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'members'));
        const membersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Member));
        setMembers(membersData);
      } catch (error) {
        Logger.error('Failed to fetch members for bill dialog', error);
      }
    };
    if (open) fetchMembers();
  }, [open]);

  // Auto-fill amount when package selected
  const handlePackageChange = (pkgId: string) => {
    const pkg = mockPackages.find(p => p.id === pkgId);
    setFormData(prev => ({
      ...prev,
      packageId: pkgId,
      amount: pkg ? pkg.price.toString() : prev.amount
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Find member name and package name for denormalization
    const member = members.find(m => m.id === formData.memberId);
    const pkg = mockPackages.find(p => p.id === formData.packageId);

    try {
      await onSubmit({
        ...formData,
        memberName: member?.name || 'Unknown',
        packageName: pkg?.name || 'Custom',
        amount: Number(formData.amount),
        dueDate: new Date(formData.dueDate),
        paidDate: new Date(), // Assuming paid now if status is paid, or null logic could be added
        status: formData.status
      });
      onOpenChange(false);
      setFormData({ memberId: '', packageId: '', amount: '', dueDate: '', status: 'pending' });
    } catch (error) {
      Logger.error('Failed to create bill', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Bill</DialogTitle>
          <DialogDescription>Generate a fee receipt for a member.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Member</Label>
            <Select 
              value={formData.memberId} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, memberId: val }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Member" />
              </SelectTrigger>
              <SelectContent>
                {members.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Package</Label>
            <Select 
              value={formData.packageId} 
              onValueChange={handlePackageChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Package" />
              </SelectTrigger>
              <SelectContent>
                {mockPackages.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name} - ₹{p.price}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Amount (₹)</Label>
            <Input 
              type="number" 
              value={formData.amount} 
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input 
              type="date" 
              value={formData.dueDate} 
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
             <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Bill'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
