'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, Dialect, ClassLevel } from '@/store/useStore';
import { ArrowRight, BookOpen, MessageSquare, Shield, User } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { setOnboardingData } = useStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('10th');
  const [dialect, setDialect] = useState<Dialect>('hinglish');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'Science']);

  const subjectsList = [
    { id: 'Mathematics', label: 'गणित (Mathematics)' },
    { id: 'Science', label: 'विज्ञान (Science)' },
    { id: 'English', label: 'अंग्रेजी (English)' },
    { id: 'Social Science', label: 'सामाजिक विज्ञान (Social Science)' },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setOnboardingData(name || 'अमन कुमार', selectedClass, dialect, selectedSubjects);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleSubject = (subId: string) => {
    if (selectedSubjects.includes(subId)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subId));
    } else {
      setSelectedSubjects([...selectedSubjects, subId]);
    }
  };

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-4 bg-[#090d16] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl" />

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <span className="text-xs text-orange-500 font-semibold tracking-wider uppercase">
            Step {step} of 4
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-orange-500' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="relative z-10 min-h-[280px]">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  आपका नाम क्या है?
                </h2>
                <p className="text-sm text-gray-400">
                  What is your name? Let&apos;s personalize your learning path.
                </p>
              </div>

              <div className="relative mt-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <User className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  placeholder="जैसे: अमन कुमार"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1f2937]/50 border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  आप किस कक्षा में हैं?
                </h2>
                <p className="text-sm text-gray-400">Select your class / standard.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {(['9th', '10th', '11th', '12th'] as ClassLevel[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedClass(c)}
                    className={`py-4 px-6 rounded-2xl border text-base font-semibold flex items-center justify-between transition-all ${
                      selectedClass === c
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold shadow-lg shadow-orange-500/10'
                        : 'border-gray-800 bg-[#1f2937]/30 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <span>कक्षा {c.replace('th', '')}</span>
                    <span className="text-xs text-gray-500">Class {c}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  बातचीत की भाषा चुनें
                </h2>
                <p className="text-sm text-gray-400">
                  Choose the dialect you want your AI tutor to talk to you in.
                </p>
              </div>

              <div className="space-y-2.5 mt-4">
                {[
                  { id: 'hindi', title: 'शुद्ध हिंदी (Hindi)', subtitle: 'कठिन हिंदी शब्दों और व्याकरण सहित' },
                  { id: 'hinglish', title: 'हिंग्लिश (Hinglish)', subtitle: 'Hindi text combined with English words' },
                  { id: 'awadhi', title: 'अवधी बोली (Awadhi)', subtitle: 'लखनाउवी और ग्रामीण अवध की मिठास' },
                  { id: 'bhojpuri', title: 'भोजपुरी बोली (Bhojpuri)', subtitle: 'पूर्वांचल की सुरीली बातचीत' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDialect(d.id as Dialect)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      dialect === d.id
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold shadow-lg shadow-orange-500/10'
                        : 'border-gray-800 bg-[#1f2937]/30 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <div
                      className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                        dialect === d.id ? 'border-orange-500 bg-orange-500' : 'border-gray-600'
                      }`}
                    >
                      {dialect === d.id && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{d.title}</div>
                      <div className="text-xs text-gray-500 font-normal">{d.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  विषय चुनें (Subjects)
                </h2>
                <p className="text-sm text-gray-400">
                  Select the subjects you want to prepare for UP Boards.
                </p>
              </div>

              <div className="space-y-2.5 mt-4">
                {subjectsList.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedSubjects.includes(sub.id)
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold'
                        : 'border-gray-800 bg-[#1f2937]/30 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className={`h-5 w-5 ${selectedSubjects.includes(sub.id) ? 'text-orange-500' : 'text-gray-500'}`} />
                      <span className="text-sm font-semibold">{sub.label}</span>
                    </div>
                    <div
                      className={`h-5 w-5 rounded border flex items-center justify-center ${
                        selectedSubjects.includes(sub.id) ? 'border-orange-500 bg-orange-500' : 'border-gray-700'
                      }`}
                    >
                      {selectedSubjects.includes(sub.id) && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8 pt-4 border-t border-gray-800/80 relative z-10">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3.5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-2xl transition-all"
            >
              पीछे जाएँ (Back)
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step === 1 && !name.trim()}
            className={`flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all ${
              step === 1 && !name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
            }`}
          >
            <span>{step === 4 ? 'शुरू करें!' : 'आगे बढ़ें'}</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
