import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const sizeMap = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  full: "sm:max-w-[90vw]",
} as const;

export type ModalSize = keyof typeof sizeMap;

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Preset size — preferred over maxWidth */
  size?: ModalSize;
  /** Raw Tailwind class for custom width (legacy support). Ignored if `size` is provided. */
  maxWidth?: string;
}

const BaseModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  maxWidth,
}: BaseModalProps) => {
  // Size prop takes priority; fall back to maxWidth string; default to 3xl
  const widthClass = size
    ? sizeMap[size]
    : maxWidth ?? "sm:max-w-3xl";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-full ${widthClass} bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg transition-colors max-h-[90vh] overflow-y-auto`}
      >
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