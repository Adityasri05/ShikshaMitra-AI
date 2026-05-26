'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Sparkles, MessageSquare, Play, ShieldAlert, Award, PhoneCall, Radio, FileText, Zap } from 'lucide-react';

interface LandingPageProps {
  onStartLearning: () => void;
  onTryVoiceTutor: () => void;
}

export default function LandingPage({ onStartLearning, onTryVoiceTutor }: LandingPageProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <header className="border-b border-gray-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#090d16]/90 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20">
              श
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block">शिक्षामित्र AI</span>
              <span className="text-[10px] text-gray-400 block -mt-1 font-semibold">ShikshaMitra AI</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onStartLearning}
              className="py-2 px-4 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/50 text-sm font-semibold transition-all hover:scale-105"
            >
              लॉगिन (Login)
            </button>
            <button
              onClick={onStartLearning}
              className="py-2 px-4 rounded-xl bg-orange-500 text-sm font-bold shadow-lg shadow-orange-500/10 hover:bg-orange-600 transition-all hover:scale-105"
            >
              शुरू करें
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-24 md:pt-24 md:pb-32 grid-bg">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-500/10 to-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs md:text-sm font-semibold tracking-wide"
          >
            <Sparkles className="h-4 w-4 text-orange-400 animate-spin" />
            <span>यूपी बोर्ड (UP Board) विशेष AI कोचिंग</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400"
          >
            AI Coaching for Every <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500">
              UP Board Student
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            यूपी के छात्रों के लिए अपनी मातृभाषा <span className="text-orange-400 font-semibold">हिंदी, अवधी और हिंग्लिश</span> में पढ़ाने वाला अनोखा एआई ट्यूटर।
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all"
            >
              <Zap className="h-5 w-5 fill-white text-white" />
              <span>पढ़ाई शुरू करें</span>
            </button>
            <button
              onClick={onTryVoiceTutor}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-gray-800 hover:border-gray-700 bg-[#111827]/70 text-gray-200 hover:text-white font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.03] hover:bg-[#111827] transition-all"
            >
              <Radio className="h-5 w-5 text-orange-400 animate-pulse" />
              <span>बोलकर सीखें (Voice Tutor)</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Floating Features Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            विशेषताएं जो आपको टॉपर बनाएंगी
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            हजरतगंज (Lucknow) की कोचिंग बेल्ट जैसी पढ़ाई अब आपके मोबाइल पर, 100 गुना सस्ती और व्यक्तिगत।
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-3xl bg-[#111827]/60 border border-gray-800/80 hover:border-orange-500/30 transition-all hover:scale-105 hover:bg-[#111827] group"
          >
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">एआई डाउट-सॉल्वर (AI Tutor)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              फोटो खींचकर भेजें या अपनी आवाज़ में अवधी/भोजपुरी में पूछें। एआई आपको सबसे सरल तरीके से समझाएगा।
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-3xl bg-[#111827]/60 border border-gray-800/80 hover:border-orange-500/30 transition-all hover:scale-105 hover:bg-[#111827] group"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Radio className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">बोलचाल ट्यूटर (Voice Interaction)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              लो-एंड मोबाइल में भी बिना इंटरनेट रुकावट के बातचीत करके सीखें। आपकी स्थानीय बोली (Awadhi, Bhojpuri) में संवाद।
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-3xl bg-[#111827]/60 border border-gray-800/80 hover:border-orange-500/30 transition-all hover:scale-105 hover:bg-[#111827] group"
          >
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:bg-green-500 group-hover:text-white transition-all">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">पिछले वर्षों के प्रश्न (PYQs)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              यूपी बोर्ड के 10 वर्षों के हल किए हुए प्रश्न पत्र। एआई भविष्यवाणी करेगा कि इस साल कौन सा प्रश्न आएगा!
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Gamification / Showcase */}
      <section className="bg-[#111827]/30 border-y border-gray-800/80 py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-semibold">
              <Award className="h-4 w-4" />
              <span>मनोरंजक गेम जैसा अनुभव</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              पढ़ाई बनेगी खेल, बिना किसी बोरियत के
            </h2>
            <p className="text-gray-400 leading-relaxed">
              जैसे-जैसे आप सवाल हल करेंगे, आपको <span className="text-orange-500 font-bold">XP अंक</span> मिलेंगे, आपकी <span className="text-orange-500 font-bold">Streak</span> बढ़ेगी और आप बैच जीतेंगे।
            </p>
            <div className="flex gap-6 border-t border-gray-800/80 pt-6">
              <div>
                <span className="block text-3xl font-black text-orange-500">7-Day</span>
                <span className="text-xs text-gray-500 font-bold">Daily Streak</span>
              </div>
              <div className="border-l border-gray-800/80 pl-6">
                <span className="block text-3xl font-black text-amber-400">1,200+</span>
                <span className="text-xs text-gray-500 font-bold">UP Board PYQs solved</span>
              </div>
            </div>
          </div>

          {/* Simulated App Screenshot */}
          <div className="relative w-full max-w-sm rounded-[2.5rem] border-[6px] border-gray-800 bg-[#090d16] p-4 shadow-2xl overflow-hidden aspect-[9/16] flex flex-col justify-between">
            {/* Camera bar */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-28 bg-gray-800 rounded-full" />
            
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4 px-2">
              <span>9:41 AM</span>
              <div className="flex items-center gap-1">
                <span>📶 LTE</span>
                <span>🔋 98%</span>
              </div>
            </div>

            {/* Simulated Chat */}
            <div className="flex-1 flex flex-col justify-end gap-3 my-6 px-1 overflow-y-auto">
              <div className="p-3 bg-gray-900 border border-gray-800 rounded-2xl text-xs max-w-[85%] text-gray-300 self-start">
                सर, प्रकाश संश्लेषण (Photosynthesis) का समीकरण क्या होता है? 🤔
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl text-xs max-w-[85%] text-orange-300 self-end">
                भैया! बहुत आसान है। <br />
                <code className="text-[10px] text-white block my-1">6CO₂ + 6H₂O + धूप → C₆H₁₂O₆ + 6O₂</code>
                यानी पौधे कार्बन डाइऑक्साइड और पानी को धूप की मदद से खाने (ग्लूकोज) में बदल देते हैं! ☘️
              </div>
            </div>

            {/* Simulated Action row */}
            <div className="flex gap-2 mb-2">
              <div className="flex-1 py-2 bg-gray-800 text-center rounded-xl text-[10px] font-bold text-gray-300">
                🔄 सरल समझाएं
              </div>
              <div className="flex-1 py-2 bg-orange-500 text-center rounded-xl text-[10px] font-extrabold text-white">
                💡 बोर्ड प्रश्न दिखाएं
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Emergency Planner Callout */}
      <footer className="border-t border-gray-800/80 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">बोर्ड परीक्षा में केवल कुछ ही दिन बचे हैं?</h2>
          <p className="text-gray-400">
            चिंता मत करें! हमारे <span className="text-orange-500 font-semibold">20-Days Crash Course Planner</span> से अपनी बोर्ड परीक्षा की शत-प्रतिशत तैयारी करें।
          </p>
          <button
            onClick={onStartLearning}
            className="px-8 py-4 bg-white text-black font-extrabold rounded-2xl hover:scale-105 transition-all shadow-lg hover:bg-gray-100"
          >
            फ्री में रजिस्टर करें
          </button>
          <p className="text-xs text-gray-600 pt-6">
            © 2026 शिक्षामित्र AI (ShikshaMitra AI). Built for the UP Board cohort. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
