import { Member, FeePackage, Bill, Notification, Supplement, DietPlan } from '@/types/gym';

export const mockPackages: FeePackage[] = [
  {
    id: 'pkg-1',
    name: 'Basic',
    duration: 1,
    price: 999,
    features: ['Gym Access', 'Locker Room', 'Water Station'],
  },
  {
    id: 'pkg-2',
    name: 'Standard',
    duration: 3,
    price: 2499,
    features: ['All Basic Features', 'Group Classes', 'Personal Trainer (2 sessions)'],
  },
  {
    id: 'pkg-3',
    name: 'Premium',
    duration: 6,
    price: 4499,
    features: ['All Standard Features', 'Sauna Access', 'Diet Consultation', 'Unlimited PT Sessions'],
  },
  {
    id: 'pkg-4',
    name: 'Elite',
    duration: 12,
    price: 7999,
    features: ['All Premium Features', 'Supplement Discounts', 'Priority Booking', 'Guest Passes (4/month)'],
  },
];

export const mockMembers: Member[] = [
  {
    id: 'mem-1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City',
    joinDate: new Date('2024-01-15'),
    packageId: 'pkg-3',
    status: 'active',
  },
  {
    id: 'mem-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 234 567 891',
    address: '456 Oak Ave, Town',
    joinDate: new Date('2024-02-20'),
    packageId: 'pkg-2',
    status: 'active',
  },
  {
    id: 'mem-3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    phone: '+1 234 567 892',
    address: '789 Pine Rd, Village',
    joinDate: new Date('2023-12-01'),
    packageId: 'pkg-4',
    status: 'active',
  },
  {
    id: 'mem-4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '+1 234 567 893',
    address: '321 Elm St, District',
    joinDate: new Date('2024-03-10'),
    packageId: 'pkg-1',
    status: 'expired',
  },
];

export const mockBills: Bill[] = [
  {
    id: 'bill-1',
    memberId: 'mem-1',
    memberName: 'John Smith',
    packageId: 'pkg-3',
    packageName: 'Premium',
    amount: 4499,
    paidDate: new Date('2024-01-15'),
    dueDate: new Date('2024-07-15'),
    status: 'paid',
  },
  {
    id: 'bill-2',
    memberId: 'mem-2',
    memberName: 'Sarah Johnson',
    packageId: 'pkg-2',
    packageName: 'Standard',
    amount: 2499,
    paidDate: new Date('2024-02-20'),
    dueDate: new Date('2024-05-20'),
    status: 'paid',
  },
  {
    id: 'bill-3',
    memberId: 'mem-3',
    memberName: 'Mike Wilson',
    packageId: 'pkg-4',
    packageName: 'Elite',
    amount: 7999,
    paidDate: new Date('2023-12-01'),
    dueDate: new Date('2024-12-01'),
    status: 'pending',
  },
  {
    id: 'bill-4',
    memberId: 'mem-4',
    memberName: 'Emily Brown',
    packageId: 'pkg-1',
    packageName: 'Basic',
    amount: 999,
    paidDate: new Date('2024-03-10'),
    dueDate: new Date('2024-04-10'),
    status: 'overdue',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Fee Reminder',
    message: 'Your membership fee is due in 5 days.',
    type: 'fee_reminder',
    createdAt: new Date(),
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Gym Closure',
    message: 'The gym will be closed on December 25th for Christmas.',
    type: 'info',
    createdAt: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: 'notif-3',
    title: 'New Class Added',
    message: 'We\'ve added a new Yoga class every Saturday at 9 AM.',
    type: 'success',
    createdAt: new Date(Date.now() - 172800000),
    read: false,
  },
];

export const mockSupplements: Supplement[] = [
  {
    id: 'sup-1',
    name: 'Whey Protein Isolate',
    description: 'High-quality protein powder for muscle recovery',
    price: 2499,
    category: 'Protein',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'sup-2',
    name: 'Creatine Monohydrate',
    description: 'Pure creatine for strength and power',
    price: 999,
    category: 'Performance',
    stock: 78,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'sup-3',
    name: 'BCAA Powder',
    description: 'Branched-chain amino acids for endurance',
    price: 1499,
    category: 'Recovery',
    stock: 32,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'sup-4',
    name: 'Pre-Workout Formula',
    description: 'Energy boost for intense workouts',
    price: 1999,
    category: 'Energy',
    stock: 56,
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=400',
  },
];

export const mockDietPlans: DietPlan[] = [
  {
    id: 'diet-1',
    name: 'Muscle Building',
    description: 'High protein diet for muscle growth',
    calories: 3000,
    meals: [
      { name: 'Breakfast', items: ['6 Egg Whites', 'Oatmeal', 'Banana'], time: '7:00 AM' },
      { name: 'Lunch', items: ['Grilled Chicken', 'Brown Rice', 'Vegetables'], time: '12:00 PM' },
      { name: 'Snack', items: ['Protein Shake', 'Almonds'], time: '4:00 PM' },
      { name: 'Dinner', items: ['Salmon', 'Sweet Potato', 'Broccoli'], time: '7:00 PM' },
    ],
  },
  {
    id: 'diet-2',
    name: 'Fat Loss',
    description: 'Calorie deficit diet for weight loss',
    calories: 1800,
    meals: [
      { name: 'Breakfast', items: ['Greek Yogurt', 'Berries', 'Green Tea'], time: '8:00 AM' },
      { name: 'Lunch', items: ['Grilled Fish', 'Salad', 'Quinoa'], time: '1:00 PM' },
      { name: 'Dinner', items: ['Lean Turkey', 'Vegetables', 'Avocado'], time: '6:00 PM' },
    ],
  },
];
