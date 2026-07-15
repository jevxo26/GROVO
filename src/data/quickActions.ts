import {Wallet,HandCoins, FolderKanban, FileText, Heart, CreditCard, ReceiptText, Award, HeartPulse,CornerUpRight } from 'lucide-react';

export const actionItems = [
  { title: "Donation History", desc: "View all corporate donations", icon: HandCoins, bg: "bg-[#e5e9d9]", text: "text-[#6d7946]" },
  { title: "CSR Projects", desc: "Track project progress", icon: FolderKanban, bg: "bg-[#d8ece7]", text: "text-[#006d5b]" },
  { title: "CSR Reports", desc: "Download impact reports", icon: FileText, bg: "bg-[#f2e4db]", text: "text-[#b46d49]" },
  { title: "New Donation", desc: "Make a corporate donation", icon: Heart, bg: "bg-[#e5e9d9]", text: "text-[#6d7946]" },
];

export const actions = [
  { title: "Membership Card", desc: "View your digital membership card", icon: CreditCard, bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
  { title: "Donation Receipts", desc: "Download your tax receipts", icon: ReceiptText, bg: "bg-orange-100 dark:bg-orange-900", text: "text-orange-700 dark:text-orange-300" },
  { title: "Certificates", desc: "View your achievements", icon: Award, bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300" },
  { title: "My Impact", desc: "See lives you've changed", icon: HeartPulse, bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
];

export const donoractions = [
  { title: "My Wallet", desc: "Track transactions and points", icon: Wallet, bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
  { title: "My Impact", desc: "See lives you have changed", icon: HeartPulse, bg: "bg-orange-100 dark:bg-orange-900", text: "text-orange-700 dark:text-orange-300" },
  { title: "Certificates", desc: "Download tax receipts", icon: Award, bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300" },
  { title: "Refer & Earn", desc: "Invite friends, earn rewards", icon: CornerUpRight, bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
];