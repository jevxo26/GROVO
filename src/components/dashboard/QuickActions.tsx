import React from "react";
import { LucideIcon } from "lucide-react";

interface ActionItem {
  title: string;
  desc: string;
  icon: LucideIcon;
  bg?: string;
  text?: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions: ActionItem[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {actions.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 cursor-pointer group"
        >
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 bg-primary/10 text-primary group-hover:scale-110 transition-transform ${item.bg || ""}`}>
            <item.icon className={`w-6 h-6 ${item.text || "text-primary"}`} />
          </div>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
