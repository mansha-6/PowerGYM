export type UserRole = 'admin' | 'member' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: Date;
  packageId: string;
  status: 'active' | 'inactive' | 'expired';
  avatar?: string;
}

export interface FeePackage {
  id: string;
  name: string;
  duration: number; // in months
  price: number;
  features: string[];
}

export interface Bill {
  id: string;
  memberId: string;
  memberName: string;
  packageId: string;
  packageName: string;
  amount: number;
  paidDate: Date;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'fee_reminder';
  createdAt: Date;
  read: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  calories: number;
  meals: {
    name: string;
    items: string[];
    time: string;
  }[];
}
