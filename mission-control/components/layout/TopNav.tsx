"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Rocket, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function TopNav() {
  const { adminMode, setAdminMode, userStats } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleAdminToggle = () => {
    const newMode = !adminMode;
    setAdminMode(newMode);
    if (newMode) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Mission Log", href: "/log" },
    { name: "Intel", href: "/analytics" },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] bg-[#111318]/90 backdrop-blur-md px-6 py-3 lg:px-10">
      {/* Brand */}
      <div className="flex items-center gap-4 text-white">
        <Link href="/" className="flex items-center gap-4 group">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Rocket className="w-6 h-6" />
            </div>
            <div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] uppercase group-hover:text-primary transition-colors">Operation Ironclad</h2>
            <p className="text-xs text-slate-400 font-mono tracking-widest">MISSION CONTROL // V.1.0.5</p>
            </div>
        </Link>
      </div>

      {/* Right Actions */}
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">

        {/* Navigation */}
        <nav className="flex items-center gap-1 bg-[#1b212d] p-1 rounded-lg border border-[#282e39]">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "text-sm font-medium leading-normal px-4 py-2 rounded transition-colors",
                            isActive
                                ? "bg-primary/20 text-primary"
                                : "text-[#9ca6ba] hover:text-white hover:bg-[#282e39]"
                        )}
                    >
                        {item.name}
                    </Link>
                )
            })}
        </nav>

        <div className="h-8 w-px bg-[#282e39]" />

        {/* Admin Toggle */}
        <div className="flex items-center gap-3">
          <span className={cn(
              "text-xs font-mono uppercase tracking-wider transition-colors",
              adminMode ? "text-primary font-bold" : "text-[#9ca6ba]"
          )}>
            Admin Mode
          </span>
          <button
            onClick={handleAdminToggle}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#111318]",
                adminMode
                    ? "bg-primary/20 border-primary/50"
                    : "bg-[#282e39] border-transparent"
            )}
          >
            <span className="sr-only">Toggle Admin Mode</span>
            <span
                className={cn(
                    "inline-block h-4 w-4 transform rounded-full transition-transform",
                    adminMode
                        ? "translate-x-6 bg-primary shadow-lg shadow-primary/50"
                        : "translate-x-1 bg-slate-400"
                )}
            />
          </button>
        </div>

        {/* Avatar */}
        <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-[#282e39] relative cursor-pointer hover:ring-primary transition-all"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDK3Fl6rpku752bP9qg0Pgukjno6vdKo0L3BKUzSurvqq4xvHuWaILElpiFCTPd8NBNEi2zv8QYePASWwm9-do6QYMKkPkU54P_ECruFtzO1djHyzmZd8dO0P4LKPqPv3XilJP6jf6Pqel0YXLiS6BkdBh8MiEjFOq7ZWcn4e2ZKyjhNcP1LIogvA4jJHDk6J5zZY6G5VBB5jbbODCYxpRQ7SdFr81ttPhoNGOHgqzO3l8nc14u5C3CHXTOqC1MpelKeABWnL6bmIM")' }}
        >
          <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-[#111318]" />
        </div>
      </div>
    </header>
  );
}
