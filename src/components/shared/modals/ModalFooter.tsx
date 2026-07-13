"use client";

import React from "react";

type FooterVariant = "primary" | "danger";

interface ModalFooterProps {
  onCancel: () => void;
  /** Optional reset handler called before cancel (e.g. form reset) */
  onReset?: () => void;
  submitLabel: string;
  cancelLabel?: string;
  variant?: FooterVariant;
  /** Whether the primary button is type="submit" (default: true) */
  isSubmit?: boolean;
  /** Click handler when isSubmit is false */
  onSubmit?: () => void;
}

const primaryStyles: Record<FooterVariant, string> = {
  primary:
    "bg-[#00a389] hover:bg-[#008f77] text-white",
  danger:
    "bg-[#a67c52] hover:bg-[#8e6b45] text-white",
};

const ModalFooter = ({
  onCancel,
  onReset,
  submitLabel,
  cancelLabel = "Cancel",
  variant = "primary",
  isSubmit = true,
  onSubmit,
}: ModalFooterProps) => {
  const handleCancel = () => {
    onReset?.();
    onCancel();
  };

  return (
    <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-zinc-800">
      <button
        type="button"
        onClick={handleCancel}
        className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors"
      >
        {cancelLabel}
      </button>
      <button
        type={isSubmit ? "submit" : "button"}
        onClick={isSubmit ? undefined : onSubmit}
        className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm ${primaryStyles[variant]}`}
      >
        {submitLabel}
      </button>
    </div>
  );
};

export default ModalFooter;
