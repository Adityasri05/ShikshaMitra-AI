'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Sparkles, TrendingUp, Compass, Award, Flame, Star, CheckCircle } from 'lucide-react';

export default function AnalyticsDashboard() {
  const subjectMastery = [
    { name: 'Algebra (बीजगणित)', score: 85, color: 'bg-green-500' },
    { name: 'Trigonometry (त्रिकोणमिति)', score: 32, color: 'bg-red-500' },
    { name: 'Reflection of Light (प्रकाश परावर्तन)', score: 72, color: 'bg-blue-500' },
    { name: 'Metals & Non-Metals (धातु और अधातु)', score: 55, color: 'bg-yellow-500' },
    { name: 'Active/Passive Voice (वाच्य)', score: 90, color: 'bg-green-500' },
  ];

  const accuracyData = [
    { week: 'Week 1', accuracy: 55 },
    { week: 'Week 2', accuracy: 62 },
    { week: 'Week 3', accuracy: 58 },
    { week: 'Week 4', accuracy: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">औसत सटीकता (Avg Accuracy)</span>
            <span className="block text-3xl font-black text-white">78%</span>
            <span className="text-[10px] text-green-400 font-bold flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> +12% इस सप्ताह
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 text-2xl">
            📈
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">आत्मविश्वास स्तर (Confidence)</span>
            <span className="block text-3xl font-black text-white">मध्यम (Medium)</span>
            <span className="text-[10px] text-orange-400 font-bold">बोर्ड रेडीनेस: 65%</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-2xl">
            🔥
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">रिवीज़न प्राथमिकता</span>
            <span className="block text-3xl font-black text-white">अति-उच्च (Critical)</span>
            <span className="text-[10px] text-red-400 font-bold">1 कमजोर अध्याय</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 text-2xl">
            🚨
          </div>
        </motion.div>
      </div>

      {/* Chapters & Target Board prioritization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chapters breakdowns */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 space-y-4"
        >
          <div>
            <h3 className="text-base font-bold">अध्याय महारत विश्लेषण (Topic Mastery)</h3>
            <p className="text-xs text-gray-500">Mastery percentages derived from adaptive tests</p>
          </div>
          <div className="space-y-3.5">
            {subjectMastery.map((topic, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-300">{topic.name}</span>
                  <span className={topic.score < 50 ? 'text-red-400' : 'text-green-400'}>{topic.score}%</span>
                </div>
                <div className="h-2 w-full bg-gray-850 rounded-full overflow-hidden">
                  <div className={`h-full ${topic.color}`} style={{ width: `${topic.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-base font-bold">एआई स्मार्ट सिफ़ारिशें (AI Smart Insights)</h3>
            <p className="text-xs text-gray-500">Personalized recommendation for UP Board success</p>
          </div>

          <div className="space-y-4 my-4">
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0">
                1
              </div>
              <div>
                <span className="block text-xs font-bold text-red-400">त्रिकोणमिति रिवीज़न</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">
                  इस अध्याय का बोर्ड में 12 मार्क्स का वेटेज है। एआई ट्यूटर से आज 5 सरल सूत्र पूछें।
                </span>
              </div>
            </div>

            <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold shrink-0">
                2
              </div>
              <div>
                <span className="block text-xs font-bold text-orange-400">रसायन विज्ञान मॉडल पेपर</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">
                  धातु और अधातु पर 10 MCQs का मॉक टेस्ट दें। सटीकता को 55% से 75% तक लाएं।
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl text-xs hover:scale-105 transition-all">
            🎯 सिफ़ारिशों पर काम करें (Act Now)
          </button>
        </motion.div>
      </div>

      {/* Accuracy line chart over weeks */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-6 rounded-3xl bg-[#111827] border border-gray-800"
      >
        <div className="mb-4">
          <h3 className="text-base font-bold">साप्ताहिक सटीकता रुझान (Accuracy Trend)</h3>
          <p className="text-xs text-gray-500">Your average accuracy over the last 4 weeks</p>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={accuracyData}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '12px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAcc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
