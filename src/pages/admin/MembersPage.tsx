import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/gym/DashboardLayout';
import { MemberTable } from '@/components/gym/MemberTable';
import { AddMemberDialog } from '@/components/gym/AddMemberDialog';
import Logger from '@/utils/logger'; // Use correct Logger
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Member } from '@/types/gym';

const logger = Logger; // Alias for compatibility with existing code if strictly needed, or just replace usages

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Real-time subscription to members collection
  useEffect(() => {
    const q = collection(db, 'members');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const membersData: Member[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        membersData.push({ 
          id: doc.id, 
          ...data,
          // Convert database timestamps to Date objects if needed
          joinDate: data.joinDate?.toDate ? data.joinDate.toDate() : new Date(data.joinDate),
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
        } as unknown as Member);
      });
      setMembers(membersData);
      setLoading(false);
    }, (error) => {
      logger.error("Error fetching members", error);
      toast.error("Failed to load members");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddMember = async (memberData: any) => {
    try {
      await addDoc(collection(db, 'members'), {
        ...memberData,
        joinDate: new Date(),
        status: 'active',
        createdAt: serverTimestamp()
      });
      toast.success(`Member "${memberData.name}" added successfully!`);
    } catch (error: any) {
      logger.error('Error adding member', error);
      toast.error("Failed to add member: " + error.message);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        await deleteDoc(doc(db, "members", memberId));
        toast.success("Member deleted successfully");
        logger.info("Member deleted", { memberId });
      } catch (error: any) {
        logger.error("Error deleting member", error);
        toast.error("Failed to delete member");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground mt-1">Manage your gym members</p>
        </div>

        <MemberTable 
          members={members} 
          loading={loading}
          onAddMember={() => setIsAddDialogOpen(true)} 
          onDeleteMember={handleDeleteMember}
        />

        <AddMemberDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddMember}
        />
      </div>
    </DashboardLayout>
  );
};

export default MembersPage;
