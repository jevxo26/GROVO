"use client";

import React from "react";
import BaseModal from "./baseModal";

type ConfirmVariant = "danger" | "warning" | "default";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
}

const variantStyles: Record<ConfirmVariant, string> = {
  danger:
    "bg-[#a67c52] hover:bg-[#8e6b45] text-white",
  warning:
    "bg-amber-600 hover:bg-amber-700 text-white",
  default:
    "bg-[#00a389] hover:bg-[#008f77] text-white",
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-6">
        <div>
          <p className="text-base text-gray-700 dark:text-gray-200">
            {message}
          </p>
          {description && (
            <p className="text-sm text-[#a67c52] dark:text-[#c4a484] mt-1">
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm ${variantStyles[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
