'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

interface PYQQuestion {
  id: string;
  year: string;
  topic: string;
  question: string;
  importance: 'critical' | 'very-high' | 'high';
  repeats: number;
  markingWeight: number;
  answerStrategy: string;
}

export default function PYQIntelligence() {
  const [activePYQ, setActivePYQ] = useState<string | null>(null);

  const pyqList: PYQQuestion[] = [
    {
      id: 'pyq1',
      year: '2024, 2022, 2020',
      topic: 'Trigonometry (त्रिकोणमिति)',
      question: 'सिद्ध कीजिए कि: (sec A + tan A)(1 - sin A) = cos A. [UP Board 2024 - Code 822(HA)]',
      importance: 'critical',
      repeats: 3,
      markingWeight: 6,
      answerStrategy: 'बाएं पक्ष (LHS) से शुरुआत करें। sec A को 1/cos A और tan A को sin A/cos A में परिवर्तित कर के हल करें। 6 अंक पक्के!'
    },
    {
      id: 'pyq2',
      year: '2023, 2021, 2019',
      topic: 'Science (विज्ञान)',
      question: 'मानव नेत्र के प्रमुख भागों का सचित्र वर्णन करें। [UP Board 2023]',
      importance: 'very-high',
      repeats: 3,
      markingWeight: 6,
      answerStrategy: 'स्वच्छ आरेख (diagram) अवश्य बनाएं। रेटिना, कॉर्निया, और पुतली के कार्यों का 3-3 वाक्यों में वर्णन करें।'
    },
    {
      id: 'pyq3',
      year: '2024, 2023',
      topic: 'Social Science (सामाजिक वि.)',
      question: '1857 की क्रांति के असफल होने के प्रमुख कारणों पर प्रकाश डालें। [UP Board 2024]',
      importance: 'high',
      repeats: 2,
      markingWeight: 4,
      answerStrategy: 'बिंदुवार (bullet points) उत्तर लिखें: संगठन का अभाव, नेतृत्व की कमी, और सीमित संसाधन। अधिक अंक मिलेंगे।'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1e293b]/50 to-[#0f172a]/50 border border-gray-800 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-orange-400" />
          <span>एआई पिछले वर्षों के प्रश्न विश्लेषण (PYQ Prediction)</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black">बोर्ड परीक्षा प्रश्न भविष्यवक्ता (Predictor)</h2>
        <p className="text-gray-400 text-xs leading-relaxed max-w-2xl">
          यूपी बोर्ड के पिछले 10 वर्षों के पेपरों के आधार पर सर्वाधिक पूछे जाने वाले प्रश्नों का विश्लेषण। महत्वपूर्ण संकेत और उत्तर लेखन रणनीति (Topper strategy) देखें।
        </p>
      </div>

      {/* PYQ list */}
      <div className="space-y-4">
        {pyqList.map((pyq) => (
          <motion.div
            key={pyq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border transition-all ${
              activePYQ === pyq.id
                ? 'border-orange-500 bg-orange-500/5'
                : 'border-gray-800 bg-[#111827]/70 hover:border-gray-700'
            }`}
          >
            {/* Header row */}
            <div
              onClick={() => setActivePYQ(activePYQ === pyq.id ? null : pyq.id)}
              className="p-5 flex items-center justify-between cursor-pointer"
            >
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                    pyq.importance === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse' :
                    pyq.importance === 'very-high' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {pyq.importance === 'critical' ? '🔥 Critical (100% Guaranteed)' : `🎯 Importance: ${pyq.importance}`}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold">
                    पूछा गया: <span className="text-gray-300 font-semibold">{pyq.year}</span> ({pyq.repeats} बार रिपीट)
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {pyq.question}
                </h4>
              </div>

              <div className="text-right shrink-0">
                <span className="block text-lg font-black text-orange-400">{pyq.markingWeight} अंक</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase">Weightage</span>
              </div>
            </div>

            {/* Answer Strategy Expandable block */}
            <AnimatePresence>
              {activePYQ === pyq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-805 bg-gray-950/40 p-5 rounded-b-2xl space-y-3 overflow-hidden text-xs leading-relaxed"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400">
                    <Sparkles className="h-4 w-4" />
                    <span>टॉपर उत्तर-लेखन रणनीति (Topper Answer Strategy)</span>
                  </div>
                  <p className="text-gray-300">
                    {pyq.answerStrategy}
                  </p>
                  <div className="p-3 rounded-xl border border-blue-500/10 bg-blue-500/5 text-[10px] text-blue-400 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>सलाह:</strong> इस तरह के सिद्ध करने वाले सवालों में, सभी सूत्रों (Formula steps) को दाईं ओर ब्रैकेट में लिखना न भूलें। इससे पूरे अंक मिलते हैं।
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
