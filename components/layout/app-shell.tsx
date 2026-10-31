'use client';

import React from 'react';
import { DemoBanner } from './demo-banner';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-slate-900">
      {/* Persistent Demo Fictional Data Bar */}
      <DemoBanner />

      <div className="flex-1 flex">
        {/* Dark Navy Sidebar */}
        <AppSidebar />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
