import { useState } from 'react';
import { ShoppingBag, Plus, Search, Package, IndianRupee } from 'lucide-react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockSupplements } from '@/lib/mockData';

const categoryColors: Record<string, string> = {
  Protein: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Performance: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Recovery: 'bg-green-500/20 text-green-400 border-green-500/30',
  Energy: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const SupplementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSupplements = mockSupplements.filter(
    (supplement) =>
      supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplement.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Supplement Store</h1>
              <p className="text-muted-foreground mt-1">Manage supplements inventory</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search supplements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Supplement
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSupplements.map((supplement) => (
            <Card
              key={supplement.id}
              className="shadow-card hover:scale-[1.02] transition-transform duration-200 overflow-hidden group"
            >
              <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                {supplement.image ? (
                  <img 
                    src={supplement.image} 
                    alt={supplement.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                   <Package className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1">{supplement.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {supplement.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={categoryColors[supplement.category] || 'bg-muted'}>
                    {supplement.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Stock: {supplement.stock}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-xl font-bold text-foreground">
                    <IndianRupee className="w-5 h-5" />
                    {supplement.price}
                  </div>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupplementsPage;
