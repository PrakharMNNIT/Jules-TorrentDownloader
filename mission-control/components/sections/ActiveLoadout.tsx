"use client";

import { useStore, type LoadoutItem } from "@/lib/store";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export function ActiveLoadout() {
  const { loadout, adminMode } = useStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
          <LucideIcons.Box className="text-primary w-6 h-6" />
          ACTIVE LOADOUT
        </h2>
        {adminMode && (
          <button className="size-8 rounded bg-[#282e39] hover:bg-primary/20 text-slate-400 hover:text-primary flex items-center justify-center transition-colors">
            <LucideIcons.Edit className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 relative">
        {adminMode && (
           <div className="absolute -top-2 -right-2 z-10">
              <LucideIcons.Edit2 className="text-primary/20 w-10 h-10 -rotate-12 pointer-events-none" />
           </div>
        )}

        {loadout.map((item) => (
          <StackItem key={item.id} item={item} isEditing={adminMode} />
        ))}

        {adminMode && (
             <div className="edit-border rounded-xl flex flex-col items-center justify-center gap-2 p-4 min-h-[140px] hover:bg-primary/5 cursor-pointer group border border-dashed border-primary/30 bg-primary/5">
                <div className="size-10 rounded-full bg-surface-dark border border-dashed border-slate-600 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                    <LucideIcons.Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-primary">ADD TECH</span>
            </div>
        )}
      </div>
    </div>
  );
}

function StackItem({ item, isEditing }: { item: LoadoutItem; isEditing: boolean }) {
  // Dynamic Icon Lookup safely
  const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;

  return (
    <div className={cn(
        "bg-surface-dark border border-[#282e39] transition-colors p-4 rounded-xl flex flex-col items-center gap-3 group relative",
        isEditing ? "hover:border-primary/50 cursor-pointer" : "hover:border-primary/50"
    )}>
      {isEditing && (
        <button className="absolute top-1 right-1 p-1 rounded-full hover:bg-red-500/20 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <LucideIcons.X className="w-4 h-4" />
        </button>
      )}

      <div className={cn(
          "size-12 rounded-full bg-[#282e39] flex items-center justify-center transition-colors border border-transparent",
          isEditing && "group-hover:bg-primary/10 group-hover:border-dashed group-hover:border-primary/30"
      )}>
        <IconComponent className="text-primary w-8 h-8" />
      </div>

      <div className="text-center w-full">
        <p className={cn(
            "text-white font-bold text-sm",
            isEditing && "cursor-text hover:underline decoration-dashed decoration-slate-600"
        )}>
            {item.title}
        </p>
        <p className={cn(
            "text-xs text-slate-500",
            isEditing && "cursor-text hover:text-slate-300"
        )}>
            {item.subtitle}
        </p>
      </div>
    </div>
  );
}
