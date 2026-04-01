import React, { useState } from 'react';
import { BookOpen, Calendar, CheckSquare, FileText, Menu, X, Sparkles } from 'lucide-react';
import MeetingGuide from './components/MeetingGuide';
import MeetingPlanner from './components/MeetingPlanner';
import QualityEvaluation from './components/QualityEvaluation';
import ContentHandbook from './components/ContentHandbook';
import AutoDraft from './components/AutoDraft';

function App() {
  const [activeTab, setActiveTab] = useState('guide');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'guide', name: 'Hướng dẫn Sinh hoạt', icon: BookOpen },
    { id: 'planner', name: 'Lên kế hoạch', icon: Calendar },
    { id: 'autodraft', name: 'Trợ lý AI Dự thảo', icon: Sparkles },
    { id: 'evaluation', name: 'Đánh giá Chất lượng', icon: CheckSquare },
    { id: 'handbook', name: 'Sổ tay Nội dung', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-red-800 text-white flex flex-col shadow-lg z-10 md:min-h-screen">
        <div className="p-4 flex items-center justify-between md:justify-center border-b border-red-700">
          <h1 className="text-xl font-bold text-center flex items-center gap-2">
            Trợ lý Chi bộ
          </h1>
          <button className="md:hidden p-1 hover:bg-red-700 rounded" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`flex-1 p-4 space-y-2 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-red-900 text-yellow-400 font-medium shadow-inner' : 'hover:bg-red-700 text-red-50'
                }`}
              >
                <Icon size={20} />
                {tab.name}
              </button>
            );
          })}
        </nav>
        <div className="hidden md:block p-4 text-xs text-red-300 text-center border-t border-red-700">
          Căn cứ Hướng dẫn 42-HD/BTCTW
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen flex flex-col">
        <div className="max-w-5xl mx-auto pb-12 flex-1 w-full">
          {activeTab === 'guide' && <MeetingGuide />}
          {activeTab === 'planner' && <MeetingPlanner />}
          {activeTab === 'autodraft' && <AutoDraft />}
          {activeTab === 'evaluation' && <QualityEvaluation />}
          {activeTab === 'handbook' && <ContentHandbook />}
        </div>
        <footer className="text-center pt-6 pb-2 text-slate-500 text-sm mt-auto border-t border-slate-200 max-w-5xl mx-auto w-full">
          Đỗ Huy Hoàng - HĐND phường Tân Tiến, tỉnh Bắc Ninh
        </footer>
      </main>
    </div>
  );
}

export default App;
