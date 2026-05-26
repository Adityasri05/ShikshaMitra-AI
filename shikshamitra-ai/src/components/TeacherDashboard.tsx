'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, CheckCircle, AlertTriangle, Sparkles, Filter, Plus } from 'lucide-react';

interface StudentInfo {
  name: string;
  class: string;
  accuracy: number;
  weakTopic: string;
  status: 'good' | 'critical' | 'average';
}

export default function TeacherDashboard() {
  const [filterClass, setFilterClass] = useState('All');
  const [homeworkGenerated, setHomeworkGenerated] = useState<string | null>(null);

  const studentsList: StudentInfo[] = [
    { name: 'अमन कुमार (Aman)', class: '10th', accuracy: 78, weakTopic: 'त्रिकोणमिति (Trigonometry)', status: 'average' },
    { name: 'प्रिया शर्मा (Priya)', class: '10th', accuracy: 92, weakTopic: 'कोई नहीं (None)', status: 'good' },
    { name: 'रोहित सिंह (Rohit)', class: '12th', accuracy: 44, weakTopic: 'रसायन विज्ञान समीकरण', status: 'critical' },
    { name: 'नेहा गुप्ता (Neha)', class: '10th', accuracy: 68, weakTopic: 'सामाजिक विज्ञान', status: 'average' },
  ];

  const handleGenerateHomework = () => {
    setHomeworkGenerated('Generating...');
    setTimeout(() => {
      setHomeworkGenerated(
        '📚 एआई गृहकार्य (AI Assignment): त्रिकोणमिति सर्वसमिकाओ (Identities) पर आधारित 5 कठिन PYQ प्रश्नपत्र। उत्तर प्रारूप के साथ तैयार।'
      );
    }, 1000);
  };

  const filteredStudents = filterClass === 'All' ? studentsList : studentsList.filter((s) => s.class === filterClass);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
            शिक्षक डैशबोर्ड (Teacher Portal)
          </h2>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
            अपनी कक्षा के छात्रों की प्रोग्रेस, कमजोरी और बोर्ड परीक्षा की तैयारियों का व्यापक विश्लेषण करें।
          </p>
        </div>

        <button
          onClick={handleGenerateHomework}
          className="py-3 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-center"
        >
          <Sparkles className="h-4 w-4" />
          एआई गृहकार्य जनरेटर
        </button>
      </motion.div>

      {/* Homework preview drawer */}
      <AnimatePresence>
        {homeworkGenerated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-2xl border border-orange-500/30 bg-orange-500/5 text-xs text-orange-200/90 leading-relaxed overflow-hidden flex items-start gap-3"
          >
            <Sparkles className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <strong>{homeworkGenerated}</strong>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-orange-500 text-white font-bold rounded-lg text-[10px]">
                  छात्रों को भेजें
                </button>
                <button
                  onClick={() => setHomeworkGenerated(null)}
                  className="px-3 py-1 bg-gray-900 border border-gray-805 rounded-lg text-[10px] text-gray-300"
                >
                  रद्द करें
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Students list */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-6 rounded-3xl bg-[#111827] border border-gray-800 space-y-6"
        >
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold">छात्र सूची (Student Directory)</h3>
              <p className="text-xs text-gray-500">Track and filter your cohort students</p>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-gray-900/60 p-1 rounded-xl border border-gray-805">
              {['All', '10th', '12th'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                    filterClass === cls
                      ? 'bg-orange-500 text-white shadow'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {cls === 'All' ? 'सभी' : `कक्षा ${cls.replace('th', '')}`}
                </button>
              ))}
            </div>
          </div>

          {/* Simple directory items */}
          <div className="space-y-3.5">
            {filteredStudents.map((stud, i) => (
              <div key={i} className="p-4 rounded-2xl border border-gray-805 bg-gray-905 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gray-900 border border-gray-850 flex items-center justify-center text-base">
                    👤
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">{stud.name}</span>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase mt-0.5">कमजोर अध्याय: {stud.weakTopic}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`block text-sm font-black ${
                      stud.accuracy < 50 ? 'text-red-400' : stud.accuracy < 80 ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {stud.accuracy}%
                    </span>
                    <span className="block text-[9px] text-gray-500 font-bold uppercase">Accuracy</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    stud.status === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    stud.status === 'average' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {stud.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insight metrics for teacher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-base font-bold">क्लास कमजोरी हीटमैप</h3>
            <p className="text-xs text-gray-500">Subject weaknesses across the classroom</p>
          </div>

          <div className="space-y-4 my-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-300">त्रिकोणमिति (Trigonometry)</span>
                <span className="text-red-400">75% कमजोर (High Warning)</span>
              </div>
              <div className="h-1.5 w-full bg-gray-850 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-300">प्रकाश अपवर्तन (Reflection)</span>
                <span className="text-orange-400">40% कमजोर (Medium Warning)</span>
              </div>
              <div className="h-1.5 w-full bg-gray-850 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '40%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-300">ग्रामर व वाक्य प्रयोग</span>
                <span className="text-green-400">12% कमजोर (Safe)</span>
              </div>
              <div className="h-1.5 w-full bg-gray-850 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '12%' }} />
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-indigo-500 text-white font-bold rounded-xl text-xs hover:scale-105 transition-all">
            📊 प्रोग्रेस रिपोर्ट पीडीएफ (PDF) डाउनलोड करें
          </button>
        </motion.div>
      </div>
    </div>
  );
}
