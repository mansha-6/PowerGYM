import { Package, Check, IndianRupee } from 'lucide-react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPackages } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const packageStyles = [
  { gradient: 'from-slate-600 to-slate-800', badge: 'bg-slate-500' },
  { gradient: 'from-blue-600 to-blue-800', badge: 'bg-blue-500' },
  { gradient: 'from-primary to-orange-600', badge: 'bg-primary' },
  { gradient: 'from-amber-500 to-yellow-600', badge: 'bg-amber-500' },
];

const PackagesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fee Packages</h1>
            <p className="text-muted-foreground mt-1">Manage membership packages and pricing</p>
          </div>
          <Button variant="hero">
            <Package className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPackages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={cn(
                'relative overflow-hidden border-0 shadow-card hover:scale-[1.02] transition-transform duration-200',
                index === 2 && 'ring-2 ring-primary'
              )}
            >
              {index === 2 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                </div>
              )}
              
              <div className={cn('h-2 bg-gradient-to-r', packageStyles[index].gradient)} />
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription>
                  {pkg.duration} month{pkg.duration > 1 ? 's' : ''} membership
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-6 h-6 text-foreground" />
                  <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                </div>

                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className={cn('w-5 h-5 rounded-full flex items-center justify-center', packageStyles[index].badge)}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={index === 2 ? 'hero' : 'outline'}
                  className="w-full"
                >
                  Edit Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PackagesPage;
