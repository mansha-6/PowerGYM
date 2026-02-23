import { useState } from 'react';
import { Eye, Download, Search, Plus, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bill } from '@/types/gym';
import { mockBills } from '@/lib/mockData';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

import { BillDetailsDialog } from './BillDetailsDialog';

interface BillsTableProps {
  bills: Bill[];
  loading?: boolean;
  showActions?: boolean;
  memberId?: string;
  onCreateBill?: () => void;
}

const statusStyles = {
  paid: 'bg-success/20 text-success border-success/30',
  pending: 'bg-warning/20 text-warning border-warning/30',
  overdue: 'bg-destructive/20 text-destructive border-destructive/30',
};

export const BillsTable = ({ bills, loading, showActions = true, memberId, onCreateBill }: BillsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const filteredBills = bills.filter(
    (bill) =>
      (!memberId || bill.memberId === memberId) &&
      (bill.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDownload = (bill: Bill) => {
    logger.info('Downloading bill receipt', { billId: bill.id, memberId: bill.memberId });
    // In production, this would generate a PDF
    alert(`Downloading receipt for Bill #${bill.id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Receipt className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold">
            {memberId ? 'My Bills' : 'Bill Receipts'}
          </CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          {showActions && (
            <Button onClick={onCreateBill} variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Create Bill
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Bill ID</TableHead>
                <TableHead className="font-semibold">Member</TableHead>
                <TableHead className="font-semibold">Package</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Paid Date</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id} className="group">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    #{bill.id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell className="font-medium">{bill.memberName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">
                      {bill.packageName}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {formatCurrency(bill.amount)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {bill.paidDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {bill.dueDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('capitalize', statusStyles[bill.status])}>
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedBill(bill)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(bill)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {loading ? "Loading receipts..." : "No bills found"}
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <BillDetailsDialog 
        bill={selectedBill} 
        open={!!selectedBill} 
        onOpenChange={(open) => !open && setSelectedBill(null)} 
      />
    </Card>
  );
};
