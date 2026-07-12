"use client";

import React from "react";
import BaseModal from "./baseModal";

interface DeleteBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteBranchModal = ({ isOpen, onClose, onDelete }: DeleteBranchModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Delete Branch" maxWidth="max-w-md">
      <div className="space-y-6">
        <div>
          <p className="text-base text-gray-700 dark:text-gray-200">
            Are you sure you want to delete this branch?
          </p>
          <p className="text-sm text-[#a67c52] dark:text-[#c4a484] mt-1">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="px-6 py-2.5 bg-[#a67c52] hover:bg-[#8e6b45] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            Delete Forever
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteBranchModal;