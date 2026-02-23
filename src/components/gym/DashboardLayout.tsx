import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  LayoutDashboard,
  Users,
  Receipt,
  Package,
  Bell,
  FileText,
  ShoppingBag,
  Utensils,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  path: string;
  roles: ('admin' | 'member' | 'user')[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', roles: ['admin'] },
  { icon: Users, label: 'Members', path: '/admin/members', roles: ['admin'] },
  { icon: Receipt, label: 'Bills', path: '/admin/bills', roles: ['admin'] },
  { icon: Package, label: 'Packages', path: '/admin/packages', roles: ['admin'] },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications', roles: ['admin'] },
  { icon: FileText, label: 'Reports', path: '/admin/reports', roles: ['admin'] },
  { icon: ShoppingBag, label: 'Supplements', path: '/admin/supplements', roles: ['admin'] },
  { icon: Utensils, label: 'Diet Plans', path: '/admin/diet', roles: ['admin'] },
  // Member routes
  { icon: LayoutDashboard, label: 'Dashboard', path: '/member', roles: ['member'] },
  { icon: Receipt, label: 'My Bills', path: '/member/bills', roles: ['member'] },
  { icon: Bell, label: 'Notifications', path: '/member/notifications', roles: ['member'] },
  // User routes
  { icon: LayoutDashboard, label: 'Dashboard', path: '/user', roles: ['user'] },
  { icon: Users, label: 'Browse', path: '/user/browse', roles: ['user'] },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logger.info('User initiating logout', { userId: user?.uid });
    logout();
    navigate('/');
  };

  const userRole = isAdmin ? 'admin' : 'member';

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole as any)
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">
                Power<span className="text-primary">GYM</span>
              </h1>
              <p className="text-xs text-muted-foreground capitalize">{userRole} Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-primary-foreground font-semibold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-sidebar-foreground truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full mt-2 justify-start text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Link to={isAdmin ? "/admin/notifications" : "/member/notifications"}>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
