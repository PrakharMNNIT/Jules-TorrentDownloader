"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Zap, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-4 right-4 z-50 h-16 rounded-2xl glass-panel flex items-center justify-between px-6 shadow-lg border border-white/20 dark:border-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="bg-vk-primary/10 p-2 rounded-lg">
          <Zap className="text-vk-primary" size={20} />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg text-vk-text leading-none tracking-tight">Velocity Kanban</h1>
          <p className="font-mono text-[10px] text-vk-primary uppercase tracking-widest mt-0.5">Local-First Engine</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-vk-surface border border-vk-border">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wifi size={14} className="text-vk-success" />
              </motion.div>
              <span className="text-xs font-medium text-vk-text-muted">Online</span>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-7 bg-vk-surface border border-vk-border rounded-full p-1 transition-colors hover:border-vk-primary"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className="w-5 h-5 bg-vk-primary rounded-full flex items-center justify-center text-white shadow-sm"
              style={{ x: theme === "dark" ? 20 : 0 }}
            >
              {theme === "dark" ? <Moon size={10} /> : <Sun size={10} />}
            </motion.div>
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-vk-primary to-vk-accent shadow-md border-2 border-vk-bg" />
      </div>
    </motion.header>
  );
}
