import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Mail, Lock, User, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserRole } from '@/types/gym';
import Logger from '@/utils/logger';

const roleConfig = {
  admin: {
    icon: Shield,
    label: 'Admin',
    description: 'Login, Add/Update/Delete Members, Bills, Packages, Notifications, Reports, Store & Diet',
    gradient: 'from-primary to-orange-400',
  },
  member: {
    icon: User,
    label: 'Member',
    description: 'Login, View Bill Receipts & Notifications',
    gradient: 'from-success to-emerald-400',
  },
  user: {
    icon: Users,
    label: 'User',
    description: 'Login, Browse Packages, Supplements & Trainers',
    gradient: 'from-blue-500 to-cyan-400',
  },
};

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    Logger.info('Login attempt', { email, role: selectedRole });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // In a real app we'd verify the role claims here too
      const dashboardPath = selectedRole === 'admin' ? '/admin' : selectedRole === 'member' ? '/member' : '/user';
      navigate(dashboardPath);
    } catch (err: any) {
      setError('Invalid credentials');
      Logger.error('Login error', { error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-4">
            <Dumbbell className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Power<span className="text-gradient">GYM</span>
          </h1>
          <p className="text-muted-foreground mt-2">Management System</p>
        </div>

        <Card className="shadow-card border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(Object.entries(roleConfig) as [UserRole, typeof roleConfig.admin][]).map(([role, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === role
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 bg-secondary/50'
                    }`}
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-foreground">{config.label}</p>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@powergym.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {(selectedRole === 'member' || selectedRole === 'user') && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don't have an account?{" "}
                <Link to={selectedRole === 'member' ? "/member/signup" : "/user/signup"} className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            )}

            <p className="text-xs text-muted-foreground text-center mt-4">
              Demo: Enter any email and password to login
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
