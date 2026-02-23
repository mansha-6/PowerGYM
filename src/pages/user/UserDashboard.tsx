import { useState } from 'react';
import { Search, Package, Dumbbell, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPackages, mockSupplements } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackages = mockPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredSupplements = mockSupplements.filter(sup =>
    sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sup.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to PowerGYM! 💪
          </h1>
          <p className="text-muted-foreground mt-1">
            Explore our packages and supplements
          </p>
        </div>

        {/* Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search packages, supplements, or trainers..."
                  className="pl-12 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="hero" size="lg">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredPackages.length}</p>
                <p className="text-sm text-muted-foreground">Packages Found</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-gradient-to-br from-success/10 to-transparent border-success/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/20">
                <Dumbbell className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredSupplements.length}</p>
                <p className="text-sm text-muted-foreground">Supplements Found</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">10+</p>
                <p className="text-sm text-muted-foreground">Expert Trainers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Packages */}
        <div className="space-y-6">
          {filteredPackages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Fitness Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPackages.map((pkg, index) => (
                  <Card
                    key={pkg.id}
                    className="shadow-card hover:scale-[1.02] transition-transform duration-200"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription>
                        {pkg.duration} month{pkg.duration > 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-2xl font-bold text-foreground">₹{pkg.price}</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.features.slice(0, 2).map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {pkg.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{pkg.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Supplements Section */}
          {filteredSupplements.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Supplements & Gear</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredSupplements.map((sup) => (
                  <Card
                    key={sup.id}
                    className="shadow-card hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
                  >
                    <div className="h-40 bg-muted relative">
                      {sup.image ? (
                        <img 
                          src={sup.image} 
                          alt={sup.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/50">
                          <Package className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                         <Badge variant={sup.stock > 0 ? "secondary" : "destructive"} className="backdrop-blur-md bg-white/50 dark:bg-black/50">
                          {sup.stock > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2 pt-4">
                        <CardTitle className="text-lg line-clamp-1">{sup.name}</CardTitle>
                        <CardDescription>{sup.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                        {sup.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-foreground">₹{sup.price}</p>
                        <Button size="sm" variant="ghost">Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {filteredPackages.length === 0 && filteredSupplements.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No results found for "{searchQuery}"</p>
              <p className="text-sm">Try searching for "Protein", "Yoga", or "Gold"</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
