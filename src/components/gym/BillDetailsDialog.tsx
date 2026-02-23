import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Download, Receipt, User } from "lucide-react";
import { Bill } from "@/types/gym";

interface BillDetailsDialogProps {
  bill: Bill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BillDetailsDialog({ bill, open, onOpenChange }: BillDetailsDialogProps) {
  if (!bill) return null;

  const statusStyles = {
    paid: 'bg-success/20 text-success border-success/30',
    pending: 'bg-warning/20 text-warning border-warning/30',
    overdue: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Bill Details
          </DialogTitle>
          <DialogDescription>
            Receipt #{bill.id.slice(-6).toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className={statusStyles[bill.status] + " text-lg px-4 py-1 capitalize"}>
              {bill.status}
            </Badge>
          </div>

          <div className="space-y-4 border rounded-xl p-4 bg-muted/30">
            {/* Amount */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Total Amount</span>
              <span className="text-2xl font-bold">₹{bill.amount}</span>
            </div>
            
            <Separator />

            {/* Member Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" /> Member
                </span>
                <span className="font-medium">{bill.memberName}</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-muted-foreground flex items-center gap-1 justify-end">
                  <CreditCard className="w-3 h-3" /> Package
                </span>
                <span className="font-medium">{bill.packageName}</span>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Paid Date
                </span>
                <span className="font-medium">
                  {bill.paidDate instanceof Date ? bill.paidDate.toLocaleDateString() : new Date(bill.paidDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-muted-foreground flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3" /> Due Date
                </span>
                <span className="font-medium">
                  {bill.dueDate instanceof Date ? bill.dueDate.toLocaleDateString() : new Date(bill.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => alert("Downloading PDF...")}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
