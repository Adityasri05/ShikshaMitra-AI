'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Calendar, Clock, Star, Flame, CheckSquare, Plus, Bell, Trash2 } from 'lucide-react';

export default function StudyPlanner() {
  const { tasks, toggleTaskCompletion, addTask } = useStore();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('Mathematics');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('high');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask(taskTitle, taskSubject, taskPriority);
    setTaskTitle('');
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 20-Days Countdown Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-red-650/40 to-orange-500/20 border border-red-500/25 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-red-500/10 blur-2xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-wider">
            <Flame className="h-3.5 w-3.5 animate-pulse" />
            <span>इमरजेंसी बोर्ड परीक्षा प्लानर (Emergency Planner)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black">
            यूपी बोर्ड परीक्षा 20 दिन में शुरू! (Boards in 20 Days)
          </h2>
          <p className="text-gray-400 text-xs leading-relaxed max-w-lg">
            हमारे विशेष क्रैश कोर्स टाइमलाइन का पालन करें। रोज़ाना 4 घंटे पढ़ाई + 1 एआई डाउट क्लियरिंग सत्र।
          </p>
        </div>

        {/* Countdown */}
        <div className="flex gap-2 relative z-10 shrink-0">
          <div className="p-3 bg-gray-900/90 border border-gray-800 rounded-2xl text-center min-w-[70px]">
            <span className="block text-2xl font-black text-red-500">20</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Days</span>
          </div>
          <div className="p-3 bg-gray-900/90 border border-gray-800 rounded-2xl text-center min-w-[70px]">
            <span className="block text-2xl font-black text-orange-500">08</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Hrs</span>
          </div>
          <div className="p-3 bg-gray-900/90 border border-gray-800 rounded-2xl text-center min-w-[70px]">
            <span className="block text-2xl font-black text-amber-500">45</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Mins</span>
          </div>
        </div>
      </motion.div>

      {/* Main planner grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task lists & metrics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-6 rounded-3xl bg-[#111827] border border-gray-800 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold">दैनिक अध्ययन कार्य (Daily Tasks)</h3>
              <p className="text-xs text-gray-500">Your custom learning tasks created by AI Tutor</p>
            </div>
            {/* Completion percentage */}
            <div className="text-right shrink-0">
              <span className="block text-xl font-black text-orange-500">{completionPercentage}%</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">पूरा हुआ (Done)</span>
            </div>
          </div>

          {/* Simple task items */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTaskCompletion(task.id)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  task.completed
                    ? 'border-gray-900 bg-gray-900/25 text-gray-500 line-through opacity-70'
                    : 'border-gray-800 bg-[#1f2937]/25 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded border flex items-center justify-center ${
                    task.completed ? 'border-orange-500 bg-orange-500' : 'border-gray-700'
                  }`}>
                    {task.completed && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold">{task.title}</span>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase mt-0.5">{task.subject}</span>
                  </div>
                </div>

                {/* Priority matrix indicator */}
                {!task.completed && (
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    task.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    task.priority === 'medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {task.priority}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add studies tasks form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-[#111827] border border-gray-800 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-base font-bold">नया कार्य जोड़ें (Add Task)</h3>
            <p className="text-xs text-gray-500">Plan a topic or a revision session</p>
          </div>

          <form onSubmit={handleAddTask} className="space-y-4 my-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 font-bold uppercase">विषय (Task Details)</label>
              <input
                type="text"
                placeholder="जैसे: सूत्र रिवीज़न..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full bg-[#1f2937]/50 border border-gray-800 focus:border-orange-500 rounded-xl py-3 px-4 text-xs placeholder-gray-550 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 font-bold uppercase">विषय वर्गीकरण (Subject)</label>
              <select
                value={taskSubject}
                onChange={(e) => setTaskSubject(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500 rounded-xl py-3 px-3 text-xs outline-none"
              >
                <option value="Mathematics">गणित (Mathematics)</option>
                <option value="Science">विज्ञान (Science)</option>
                <option value="English">अंग्रेजी (English)</option>
                <option value="Social Science">सामाजिक विज्ञान (Social Science)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 font-bold uppercase">प्राथमिकता (Priority)</label>
              <div className="grid grid-cols-3 gap-2">
                {(['high', 'medium', 'low'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTaskPriority(p)}
                    className={`py-2 text-[10px] font-bold rounded-xl border capitalize transition-all ${
                      taskPriority === p
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold'
                        : 'border-gray-800 bg-gray-905 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 text-white font-bold rounded-xl text-xs hover:scale-105 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              कार्य जोड़ें (Add)
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
