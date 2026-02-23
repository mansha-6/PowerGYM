import { Utensils, Plus, Clock, Flame } from 'lucide-react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDietPlans } from '@/lib/mockData';

const DietPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/20">
              <Utensils className="w-6 h-6 text-success" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Diet Plans</h1>
              <p className="text-muted-foreground mt-1">Nutrition plans for members</p>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockDietPlans.map((plan) => (
            <Card key={plan.id} className="shadow-card overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-success/10 to-transparent border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Flame className="w-5 h-5" />
                    <span className="font-bold">{plan.calories} cal</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {plan.meals.map((meal, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{meal.time}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{meal.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {meal.items.map((item, itemIndex) => (
                            <Badge key={itemIndex} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1">
                    Edit Plan
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    Assign to Member
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

export default DietPage;
