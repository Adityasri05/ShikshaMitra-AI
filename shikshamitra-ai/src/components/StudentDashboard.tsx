'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Sparkles, Calendar, Award, Zap, BookOpen, Clock, AlertTriangle, Play, HelpCircle, FileText, ArrowRight } from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (tab: string) => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const { studentName, classLevel, xp, streak, level, studyHours, selectedDialect, selectedSubjects } = useStore();

  // Radar chart data for subject performance
  const subjectRadarData = [
    { subject: 'गणित', score: 85, fullMark: 100 },
    { subject: 'विज्ञान', score: 72, fullMark: 100 },
    { subject: 'अंग्रेजी', score: 90, fullMark: 100 },
    { subject: 'सामाजिक वि.', score: 64, fullMark: 100 },
  ];

  // Bar chart data for daily study hours
  const weeklyStudyData = [
    { day: 'सोम', hours: 1.5 },
    { day: 'मंंगल', hours: 2.1 },
    { day: 'बुध', hours: 1.0 },
    { day: 'गुरु', hours: 3.2 },
    { day: 'शुक्र', hours: 2.5 },
    { day: 'शनि', hours: 4.0 },
    { day: 'रवि', hours: 1.8 },
  ];

  const quickActions = [
    { id: 'tutor', title: 'AI ट्यूटर डाउट सॉल्वर', desc: 'Ask doubts in Awadhi/Hindi', icon: Sparkles, color: 'from-orange-500 to-amber-500' },
    { id: 'voice', title: 'बोलकर सीखें (Voice)', desc: 'Interact with AI Voice', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { id: 'quiz', title: 'क्विज़ खेलें (Adaptive Quiz)', desc: 'Win XP and level up', icon: HelpCircle, color: 'from-green-500 to-emerald-500' },
    { id: 'pyq', title: 'बोर्ड PYQ इंटेलिजेंस', desc: 'Top important questions', icon: FileText, color: 'from-purple-500 to-indigo-500' },
    { id: 'planner', title: 'स्टडी प्लानर (Countdown)', desc: '20-Days emergency boards plan', icon: Calendar, color: 'from-pink-500 to-rose-500' },
  ];

  const dialectNames = {
    hindi: 'हिंदी (Pure Hindi)',
    hinglish: 'हिंग्लिश (Hinglish)',
    awadhi: 'अवधी (Awadhi)',
    bhojpuri: 'भोजपुरी (Bhojpuri)'
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Streak Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Welcome Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-[#1e293b]/70 to-[#0f172a]/70 border border-gray-800 relative overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="h-4 w-4" />
              <span>कक्षा {classLevel.replace('th', '')} यूपी बोर्ड तैयारी</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black">
              नमस्ते, {studentName}! 👋
            </h1>
            <p className="text-gray-400 text-sm">
              टारगेट: यूपी बोर्ड परीक्षा में <span className="text-orange-400 font-bold">95%+</span> स्कोर। बातचीत बोली: <span className="text-orange-400 font-semibold">{dialectNames[selectedDialect]}</span>.
            </p>
          </div>
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => onNavigate('tutor')}
              className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              पढ़ाई जारी रखें
            </button>
          </div>
        </motion.div>

        {/* Streak & XP Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-400">डेली प्रोग्रेस</span>
            <div className="h-6 px-2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold flex items-center">
              LEVEL {level}
            </div>
          </div>

          <div className="flex justify-between items-center my-4">
            {/* Streak */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 animate-pulse">
                <Zap className="h-6 w-6 fill-orange-500" />
              </div>
              <div>
                <span className="block text-2xl font-black">{streak} दिन</span>
                <span className="text-xs text-gray-500 font-bold">लगातार स्ट्राइक</span>
              </div>
            </div>
            {/* XP */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-2xl font-black">{xp}</span>
                <span className="text-xs text-gray-500 font-bold">कुल XP पॉइंट्स</span>
              </div>
            </div>
          </div>

          {/* Level Progress Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-gray-500 font-bold">
              <span>{xp} XP</span>
              <span>{level * 200} XP (अगला लेवल)</span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                style={{ width: `${(xp / (level * 200)) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Critical Warnings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-start gap-3"
      >
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-red-400">एआई चेतावनी: त्रिकोणमिति (Trigonometry) में कमजोरी!</h4>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
            आपके पिछले क्विज़ विश्लेषण से पता चला है कि त्रिकोणमिति सूत्रों में आपकी सटीकता केवल <span className="text-red-400 font-bold">32%</span> है। बोर्ड परीक्षा के दृष्टिकोण से यह अध्याय महत्वपूर्ण है।
          </p>
          <button
            onClick={() => onNavigate('tutor')}
            className="mt-2 text-xs font-black text-orange-400 flex items-center gap-1 hover:underline"
          >
            <span>अभी रिवीज़न करें (Explain formulas)</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </motion.div>

      {/* Recharts Analytics Visualization Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800"
        >
          <div className="mb-4">
            <h3 className="text-base font-bold">विषय महारत (Subject Mastery)</h3>
            <p className="text-xs text-gray-500">Board readiness score based on quizzes</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectRadarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4b5563' }} />
                <Radar name="Student" dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Study Hours analytics bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800"
        >
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold">साप्ताहिक पढ़ाई का समय</h3>
              <p className="text-xs text-gray-500">Study hours spent per day this week</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-850">
              <Clock className="h-3.5 w-3.5 text-orange-500" />
              <span>{studyHours}h (कुल)</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStudyData}>
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-black tracking-tight">तैयारी के मुख्य टूल्स (Main Actions)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="p-5 rounded-2xl bg-[#111827]/60 hover:bg-[#111827] border border-gray-800/80 hover:border-orange-500/25 transition-all text-left flex items-start gap-4 hover:scale-[1.02]"
              >
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white shrink-0`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-white">{action.title}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">{action.desc}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
