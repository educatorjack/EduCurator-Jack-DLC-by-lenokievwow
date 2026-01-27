
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onHome }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={onHome} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              E
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">EduCuratorJack</h1>
              <p className="text-xs text-slate-500 font-medium">Deep Learning Curator</p>
            </div>
          </div>
          
          {/* Level indicator removed per user request */}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-0.5">Copyright ⓒ 2025 EduCuratorJack (김재남). All rights reserved.</p>
          <p className="text-xs opacity-75">무단 배포 및 상업적 이용 금지</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
