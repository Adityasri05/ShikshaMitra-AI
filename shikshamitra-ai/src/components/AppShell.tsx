'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import {
  Sparkles,
  Zap,
  Calendar,
  HelpCircle,
  FileText,
  Users,
  Wifi,
  WifiOff,
  User,
  Heart,
  ChevronRight,
  Sun,
  Moon,
  Volume2,
  BookOpen,
  ArrowLeft,
  Settings,
  MessageSquare
} from 'lucide-react';

import StudentDashboard from './StudentDashboard';
import AITutor from './AITutor';
import AnalyticsDashboard from './AnalyticsDashboard';
import VoiceTutor from './VoiceTutor';
import AdaptiveQuiz from './AdaptiveQuiz';
import StudyPlanner from './StudyPlanner';
import PYQIntelligence from './PYQIntelligence';
import ParentDashboard from './ParentDashboard';
import TeacherDashboard from './TeacherDashboard';

interface AppShellProps {
  onLogout: () => void;
}

export default function AppShell({ onLogout }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const { xp, streak, level, offlineMode, toggleOfflineMode, studentName } = useStore();

  const navigationItems = [
    { id: 'dashboard', label: 'डैशबोर्ड (Home)', icon: Sparkles },
    { id: 'tutor', label: 'एआई ट्यूटर (AI Chat)', icon: MessageSquare },
    { id: 'analytics', label: 'विश्लेषण (Analytics)', icon: FileText },
    { id: 'voice', label: 'बोलकर सीखें (Voice)', icon: Zap },
    { id: 'quiz', label: 'क्विज़ (Quiz)', icon: HelpCircle },
    { id: 'planner', label: 'प्लानर (Planner)', icon: Calendar },
    { id: 'pyq', label: 'PYQ पेपर (PYQs)', icon: BookOpen },
    { id: 'parent', label: 'अभिभावक (Parent)', icon: Heart },
    { id: 'teacher', label: 'शिक्षक (Teacher)', icon: Users },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard onNavigate={handleTabChange} />;
      case 'tutor':
        return <AITutor />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'voice':
        return <VoiceTutor />;
      case 'quiz':
        return <AdaptiveQuiz />;
      case 'planner':
        return <StudyPlanner />;
      case 'pyq':
        return <PYQIntelligence />;
      case 'parent':
        return <ParentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      default:
        return <StudentDashboard onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#090d16] text-white flex flex-col ${largeFont ? 'text-lg' : 'text-sm'}`}>
      
      {/* Offline low-bandwidth indicator overlay */}
      {offlineMode && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 text-center text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5 z-50">
          <WifiOff className="h-4 w-4 animate-pulse" />
          <span>लो-बैंडविड्थ ऑफलाइन मोड सक्रिय: पाठ डाउनलोड किए गए हैं और बाद में सिंक होंगे।</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-gray-800/80 bg-gray-900/40 sticky top-0 z-40 backdrop-blur-md px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            {activeTab !== 'dashboard' && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="p-1 rounded bg-gray-800 hover:bg-gray-700 transition-all mr-1 md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-black text-white text-lg">
              श
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-white block">शिक्षामित्र AI</span>
              <span className="text-[9px] text-gray-500 block -mt-1 font-semibold">ShikshaMitra AI</span>
            </div>
          </div>

          {/* Gamification, Offline Toggle & Profiles */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-1 rounded-xl text-xs font-bold">
              <Zap className="h-3.5 w-3.5 fill-orange-500" />
              <span>{streak}d</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-xl text-xs font-bold">
              <span>{xp} XP</span>
            </div>

            {/* Offline toggle */}
            <button
              onClick={toggleOfflineMode}
              className={`p-2 rounded-xl border transition-all ${
                offlineMode
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:text-white'
              }`}
              title="Simulate Offline UX"
            >
              {offlineMode ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
            </button>

            {/* Settings trigger */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white transition-all"
            >
              <Settings className="h-4 w-4" />
            </button>

            {/* Profile Avatar */}
            <div
              onClick={onLogout}
              className="h-8.5 w-8.5 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-bold text-xs cursor-pointer hover:scale-105 transition-all text-white border border-gray-800"
              title="Click to logout"
            >
              अ
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="w-64 border-r border-gray-800/80 bg-gray-900/20 p-6 space-y-6 shrink-0 hidden md:block">
          <div className="space-y-1.5">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">मुख्य मेनू</span>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 text-left text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white font-extrabold shadow-lg shadow-orange-500/10 hover:scale-[1.01]'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Shell */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Settings Modal (Drawer) */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-sm bg-[#111827] border-l border-gray-800 p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <h3 className="text-base font-bold">एक्सेसिबिलिटी विकल्प (Settings)</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Font Size Configuration */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">टेक्स्ट साइज़ (Text Size)</label>
                    <button
                      onClick={() => setLargeFont(!largeFont)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all text-xs font-bold ${
                        largeFont
                          ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                          : 'border-gray-800 bg-[#1f2937]/35 text-gray-300'
                      }`}
                    >
                      <span>{largeFont ? '🔍 बड़ा टेक्स्ट सक्रिय (Large Text)' : '🔍 सामान्य टेक्स्ट (Normal Text)'}</span>
                      <span className="text-[10px] text-gray-500">Toggle size</span>
                    </button>
                  </div>

                  {/* Dialect details */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">विद्यार्थी प्रोफाइल</span>
                    <div className="p-3 bg-gray-900 border border-gray-850 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-550">नाम:</span>
                        <span className="text-white font-bold">{studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-550">लेवल:</span>
                        <span className="text-orange-400 font-bold">Level {level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full py-3.5 border border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-400 font-bold rounded-2xl text-xs transition-all"
              >
                लॉगआउट करें (Logout)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar (Very Premium styling) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#090d16]/95 border-t border-gray-800/80 backdrop-blur-md px-2 py-1 flex justify-around items-center md:hidden">
        {navigationItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2.5 flex flex-col items-center gap-1.5 transition-all ${
                isActive ? 'text-orange-500 scale-110 font-bold' : 'text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[8px] tracking-tight">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
