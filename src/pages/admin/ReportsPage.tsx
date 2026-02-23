
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Users, Receipt } from 'lucide-react';
import { mockMembers, mockBills } from '@/lib/mockData';

const ReportsPage = () => {

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    // Get headers from first object
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const val = row[header];
        // Handle dates and special characters
        if (val instanceof Date) return val.toISOString().split('T')[0];
        if (typeof val === 'string') return `"${val}"`;
        return val;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Exports</h1>
          <p className="text-muted-foreground mt-1">Export your data for analysis and record keeping.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Members Report */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Members Report</CardTitle>
                  <CardDescription>Export full member list with status and details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Total Records</span>
                  <span className="font-semibold text-foreground">{mockMembers.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-semibold text-foreground">{new Date().toLocaleDateString()}</span>
                </div>
                <Button 
                  className="w-full gap-2" 
                  onClick={() => exportToCSV(mockMembers, 'members_export')}
                >
                  <Download className="w-4 h-4" />
                  Export to CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bills Report */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-success" />
                </div>
                <div>
                  <CardTitle>Transactions Report</CardTitle>
                  <CardDescription>Export all billing and payment history</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Total Records</span>
                  <span className="font-semibold text-foreground">{mockBills.length}</span>
                </div>
                 <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-semibold text-foreground">
                    ₹{mockBills.reduce((acc, bill) => acc + bill.amount, 0)}
                  </span>
                </div>
                <Button 
                  className="w-full gap-2"
                  variant="outline"
                  onClick={() => exportToCSV(mockBills, 'bills_export')}
                >
                  <Download className="w-4 h-4" />
                   Export to CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section for Visual Reports */}
        <div className="mt-8">
           <h2 className="text-xl font-bold text-foreground mb-4">Advanced Analytics</h2>
           <Card className="border-dashed border-2 bg-muted/10">
             <CardContent className="flex flex-col items-center justify-center py-12 text-center">
               <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                 <FileText className="w-8 h-8 text-muted-foreground" />
               </div>
               <h3 className="text-lg font-semibold text-foreground">Visual Reports Coming Soon</h3>
               <p className="text-muted-foreground max-w-md mt-2">
                 We are working on charts, graphs, and revenue trends to help you visualize your gym's performance.
               </p>
             </CardContent>
           </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
