import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const NotificationsPage = () => {
  const notificationStyles = {
    info: 'bg-blue-500/20 text-blue-400',
    warning: 'bg-warning/20 text-warning',
    success: 'bg-success/20 text-success',
    fee_reminder: 'bg-primary/20 text-primary',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">View system updates and alerts</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              All Notifications
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
                       {new Date().toLocaleDateString()}
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
    </DashboardLayout>
  );
};

export default NotificationsPage;
