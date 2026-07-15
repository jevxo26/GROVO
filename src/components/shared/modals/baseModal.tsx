import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string; // এখানে আমরা ডাইনামিক উইডথ পাস করতে পারব
}

const BaseModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "sm:max-w-3xl", // ডিফল্ট উইডথ বাড়িয়ে 3xl করা হলো
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Shadcn এর উইডথ ওভাররাইড করার জন্য sm: এবং ! (important) ক্লাস ব্যবহার করা হয়েছে */}
      <DialogContent className={`w-full ${maxWidth} !max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg transition-colors`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3d2b22] dark:text-zinc-100">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-gray-500 dark:text-zinc-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;