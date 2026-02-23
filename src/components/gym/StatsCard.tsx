import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20',
  success: 'bg-gradient-to-br from-success/20 to-success/5 border-success/20',
  warning: 'bg-gradient-to-br from-warning/20 to-warning/5 border-warning/20',
  destructive: 'bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/20',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/20 text-primary',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  destructive: 'bg-destructive/20 text-destructive',
};

export const StatsCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) => {
  return (
    <Card className={cn('border shadow-card transition-all duration-200 hover:scale-[1.02]', variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                'text-sm font-medium flex items-center gap-1',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                <span className="text-muted-foreground">vs last month</span>
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconStyles[variant])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
