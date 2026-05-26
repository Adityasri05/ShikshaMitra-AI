'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Award, Clock, Heart, Users, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ParentDashboard() {
  const { studentName, streak, studyHours } = useStore();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20"
      >
        <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
          अभिभावक डैशबोर्ड (Parent Portal)
        </h2>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed">
          अपने बच्चे की प्रगति और बोर्ड परीक्षा की तैयारी पर सरल भाषा में नज़र रखें।
        </p>
      </motion.div>

      {/* Simplified parent metric grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-xl">
            🔥
          </div>
          <div>
            <span className="block text-[10px] text-gray-500 font-bold uppercase">रोजाना पढ़ाई स्ट्राइक</span>
            <span className="block text-lg font-black text-white">{streak} दिन लगातार</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl">
            ⏱️
          </div>
          <div>
            <span className="block text-[10px] text-gray-500 font-bold uppercase">कुल पढ़ाई के घंटे</span>
            <span className="block text-lg font-black text-white">{studyHours} घंटे</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 text-xl">
            📅
          </div>
          <div>
            <span className="block text-[10px] text-gray-500 font-bold uppercase">उपस्थिति (Attendance)</span>
            <span className="block text-lg font-black text-white">98% (अति-उत्तम)</span>
          </div>
        </div>
      </div>

      {/* Simple advice blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Child performance summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 space-y-4"
        >
          <div>
            <h3 className="text-base font-bold">बच्चे की प्रगति (Performance Report)</h3>
            <p className="text-xs text-gray-500">Simple summary of your child&apos;s strength and weakness</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-green-400">मजबूत विषय (Strengths)</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">
                  {studentName} अंग्रेजी और बीजगणित के सवालों को बहुत जल्दी हल कर रहे हैं।
                </span>
              </div>
            </div>

            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-red-400">ध्यान देने योग्य विषय (Needs Focus)</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">
                  त्रिकोणमिति सूत्रों को समझने में कठिनाई हो रही है। एआई ट्यूटर अतिरिक्त अभ्यास करवा रहा है।
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI advice for parent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-base font-bold">माता-पिता के लिए एआई सुझाव (AI Advice)</h3>
            <p className="text-xs text-gray-500">How you can support your child at home</p>
          </div>

          <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl text-xs text-orange-200/90 leading-relaxed my-4 space-y-2">
            <p>
              🌟 <strong>प्रोत्साहन दें:</strong> अमन बहुत अच्छी मेहनत कर रहे हैं! रोज़ पढ़ाई की स्ट्राइक बनाए रखने के लिए उनकी पीठ थपथपाएं।
            </p>
            <p>
              🥛 <strong>स्वास्थ्य का ध्यान:</strong> बोर्ड परीक्षा नज़दीक है, सुनिश्चित करें कि वे रात को पर्याप्त नींद लें और हल्का खाना खाएं।
            </p>
          </div>

          <button className="w-full py-3 bg-green-500 text-white font-bold rounded-xl text-xs hover:scale-105 transition-all flex items-center justify-center gap-2">
            💬 WhatsApp पर प्रगति रिपोर्ट प्राप्त करें
          </button>
        </motion.div>
      </div>
    </div>
  );
}
