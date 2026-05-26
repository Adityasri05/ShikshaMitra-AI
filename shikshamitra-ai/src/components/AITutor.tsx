'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Dialect, ChatMessage } from '@/store/useStore';
import { api, WS_BASE_URL } from '@/utils/api';
import { Send, Mic, Image, Sparkles, Volume2, CornerDownRight, RotateCcw, AlertCircle, FileText, CheckCircle, RefreshCw } from 'lucide-react';

export default function AITutor() {
  const { chatHistory, selectedDialect, addChatMessage, addXp, studentId } = useStore();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentNarratingId, setCurrentNarratingId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket real-time agent link
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sId = studentId || 1;
    const wsUrl = `${WS_BASE_URL}/${sId}`;
    console.log('Connecting to WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' || data.type === 'welcome') {
          addChatMessage({
            sender: 'ai',
            text: data.message_text
          });
          setIsTyping(false);
        } else if (data.type === 'typing') {
          setIsTyping(data.is_typing);
        }
      } catch (err) {
        console.error('Failed to parse WS data:', err);
      }
    };

    ws.onerror = (err) => {
      console.warn('WebSocket connection error. Falling back to REST mode.', err);
    };

    ws.onclose = () => {
      console.log('WebSocket closed.');
      wsRef.current = null;
    };

    return () => {
      ws.close();
    };
  }, [studentId, addChatMessage]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Vernacular response intelligence based on selected dialect
  const getAIResponse = (userQuery: string, dialect: Dialect): string => {
    const q = userQuery.toLowerCase();

    const responses = {
      hindi: {
        trig: `त्रिकोणमिति (Trigonometry) गणित की वह शाखा है जो त्रिभुजों की भुजाओं और कोणों के बीच संबंधों का अध्ययन करती है। 
इसके मुख्य अनुपात हैं:
1. **sin θ** = लम्ब / कर्ण (Perpendicular / Hypotenuse)
2. **cos θ** = आधार / कर्ण (Base / Hypotenuse)
3. **tan θ** = लम्ब / आधार (Perpendicular / Base)

याद रखने की ट्रिक: **लाल/कक्का (LAL/KKA)**!`,
        photosynthesis: `प्रकाश संश्लेषण (Photosynthesis) वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश की उपस्थिति में जल (H₂O) और कार्बन डाइऑक्साइड (CO₂) को ग्लूकोज (भोजन) और ऑक्सीजन (O₂) में बदलते हैं।
समीकरण:
**6CO₂ + 6H₂O + धूप → C₆H₁₂O₆ + 6O₂**`,
        default: `बहुत अच्छा प्रश्न है! आपकी बोर्ड परीक्षा (UP Board) के लिए यह काफी महत्वपूर्ण है। 
आइए इसे विस्तार से समझते हैं... 
(यह विषय आपके पाठ्यक्रम के अध्याय 5 में है। क्या आप इस पर आधारित एक परीक्षा प्रश्न हल करना चाहेंगे?)`
      },
      hinglish: {
        trig: `Trigonometry yaani trikonmiti! Ye math ki wo branch hai jo triangle ki sides aur angles ke beech ke relation ko study karti hai.
Iske main ratios hain:
1. **sin θ** = L/K (Lambh / Karn)
2. **cos θ** = A/K (Aadhar / Karn)
3. **tan θ** = L/A (Lambh / Aadhar)

Bhaiya, isko yaad rakhne ka best formula hai **LAL/KKA**!`,
        photosynthesis: `Photosynthesis wo process hai jisse green plants sunlight ki presence me paani (H₂O) aur Carbon Dioxide (CO₂) ka use karke glucose aur oxygen banate hain.
Equation hai:
**6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂**
Pehle carbon dioxide aur paani milte hain, fir glucose (food) aur oxygen release hoti hai!`,
        default: `Wow! Ye toh bahut badhiya question pucha aapne. UP Board exams ke point of view se ye bahut important hai.
Chaliye isko ekdum easy way me samajhte hain...
Kya aap is topic par ek practice question solve karna chahenge?`
      },
      awadhi: {
        trig: `अरे भैया! त्रिकोणमिति क मतलब होत है तीन कोणन क नाप। इ गणित क अइसन हिस्सा है जहाँ हम सब त्रिभुज क कोण अउर ओकर देवालन (भुजाओं) क सम्बंध पढ़ित है।
इके खास सूत्र लिख लेंव:
1. **sin θ** = लम्ब / कर्ण
2. **cos θ** = आधार / कर्ण
3. **tan θ** = लम्ब / आधार

भैया, याद रक्खे क देसी नुस्खा: **लाल/कक्का**!`,
        photosynthesis: `पौधन क भोजन बनावै क विधि क हम सब प्रकाश संश्लेषण कहित हन। जब धूप चमचमात है, तब हरी पत्तियां पानी अउर हवा क कार्बन डाइऑक्साइड मिलाय क ग्लूकोज (मीठा भोजन) बनावत हिन अउर हम सब का सांस लेवै खातिर ऑक्सीजन देवत हिन।
समीकरण लिख लेंव:
**6CO₂ (हवा) + 6H₂O (पानी) + धूप → C₆H₁₂O₆ (भोजन) + 6O₂ (ऑक्सीजन)**`,
        default: `वाह भैया! का गजब क बात पूछेव है। ई सवाल तोहार बोर्ड परीक्षा मा बार-बार पूझा जात है।
आवा, एका एकदम देसी भाखा मा अउर आसान करके समझित हन...
का एका अउर हलका (simplify) करी जाय?`
      },
      bhojpuri: {
        trig: `त्रिकोणमिति के मतलब होला तीन गो कोण के नाप-जोख। गणित के अइसन हिस्सा हवे जेहमे हमनी के त्रिभुज के कोण आ ओकर भुजा के संबंध के बारे में पढ़ल जाला।
एकर मुख्य अनुपात बा:
1. **sin θ** = लम्ब / कर्ण
2. **cos θ** = आधार / कर्ण
3. **tan θ** = लम्ब / आधार

काहे कि याद रखे खातिर सबसे बढ़िया ट्रिक बा: **लाल/कक्का (LAL/KKA)**!`,
        photosynthesis: `पेड़-पौधा के भोजन बनावे के क्रिया के प्रकाश संश्लेषण कहल जाला। जब धूप उगेला, त पत्ता पानी आ हवा के कार्बन डाइऑक्साइड के मिला के आपन भोजन (ग्लूकोज) बनावेला आ ऑक्सीजन छोड़ेला।
समीकरण:
**6CO₂ + 6H₂O + धूप → C₆H₁₂O₆ + 6O₂**`,
        default: `अरे बाबू! रउआ त बहुते नीक सवाल पुछनी ह। ई सवाल यूपी बोर्ड परीक्षा में बार-बार आवेला।
आईं, एकरा के बहुते आसान भाखा में समझल जाओ...
का रउआ एकरा पर कवनो सवाल हल कइल चाहत बानी?`
      }
    };

    const activeSet = responses[dialect] || responses['hinglish'];
    if (q.includes('trig') || q.includes('त्रिकोण') || q.includes('कोण')) {
      return activeSet.trig;
    } else if (q.includes('photo') || q.includes('संश्लेषण') || q.includes('plants') || q.includes('समीकरण')) {
      return activeSet.photosynthesis;
    }
    return activeSet.default;
  };

  const handleSend = async (text: string, imageFile?: File, imageSrc?: string) => {
    if (!text.trim() && !imageFile && !imageSrc) return;

    // Send user message
    addChatMessage({
      sender: 'user',
      text: text || '📸 [अटैचमेंट फोटो]',
      imageUrl: imageSrc
    });

    setInputText('');
    setIsTyping(true);

    try {
      if (imageFile) {
        // Send actual photo to backend OCR endpoint
        const response = await api.uploadNotebook(studentId || 1, imageFile);
        addChatMessage({
          sender: 'ai',
          text: response.message_text
        });
        setIsTyping(false);
        addXp(15);
      } else if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        // Send real-time query over live WebSocket
        wsRef.current.send(JSON.stringify({
          message_text: text,
          dialect: selectedDialect
        }));
        addXp(10);
      } else {
        // Fallback REST call
        const response = await api.askTutor(studentId || 1, text);
        addChatMessage({
          sender: 'ai',
          text: response.message_text
        });
        setIsTyping(false);
        addXp(10);
      }
    } catch (err) {
      console.error('Error in handleSend:', err);
      setIsTyping(false);
    }
  };

  // Quick Action triggers
  const handleQuickAction = (actionType: string) => {
    let queryText = '';
    if (actionType === 'simplify') {
      queryText = 'सर, इसे और सरल शब्दों में समझाएं (Simplify more)';
    } else if (actionType === 'question') {
      queryText = 'इस टॉपिक पर एक परीक्षा प्रश्न बनाइए (Generate practice question)';
    } else if (actionType === 'pyq') {
      queryText = 'इस टॉपिक से जुड़े पिछले वर्षों के प्रश्न (PYQs) दिखाएं';
    } else if (actionType === 'translate') {
      queryText = 'इसे शुद्ध हिंदी में अनुवाद करें (Translate to pure Hindi)';
    }

    handleSend(queryText);
  };

  // Speech-to-Text: Web Speech API
  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition. Please try Google Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedDialect === 'hindi' ? 'hi-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInputText(speechToText);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Text-to-Speech narration
  const handleSpeechOutput = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support Text-to-Speech.');
      return;
    }

    if (currentNarratingId === msgId) {
      window.speechSynthesis.cancel();
      setCurrentNarratingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown characters before speaking
    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Choose appropriate locale
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setCurrentNarratingId(null);
    };

    setCurrentNarratingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Notebook photo upload simulation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        handleSend('कृपया मेरी नोटबुक के इस प्रश्न को हल करें 📝', file, imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold border border-orange-500/20">
            🤖
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>शिक्षा मित्र AI (Personal Tutor)</span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </h3>
            <span className="text-[10px] text-gray-400">
              Active Dialect: <span className="text-orange-400 capitalize">{selectedDialect}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold">
            +10 XP/Doubt
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <AnimatePresence initial={false}>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {/* Message box */}
              <div
                className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-orange-600 text-white font-semibold rounded-tr-none'
                    : 'bg-[#1f2937]/50 border-gray-800 text-gray-200 rounded-tl-none'
                }`}
              >
                {msg.imageUrl && (
                  <div className="mb-2 max-h-48 rounded-lg overflow-hidden border border-gray-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={msg.imageUrl} alt="Uploaded Notebook" className="object-cover w-full" />
                  </div>
                )}
                <div className="whitespace-pre-line text-sm md:text-base">{msg.text}</div>
              </div>

              {/* Message metadata */}
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[10px] text-gray-500 font-bold">{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleSpeechOutput(msg.text, msg.id)}
                    className={`text-gray-400 hover:text-orange-400 p-0.5 rounded transition-all ${
                      currentNarratingId === msg.id ? 'text-orange-500 animate-bounce' : ''
                    }`}
                    title="सुनें (Listen)"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400 pl-2">
            <div className="h-8 w-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-xs">
              🤖
            </div>
            <div className="flex gap-1 py-3 px-4 bg-[#1f2937]/35 border border-gray-800 rounded-2xl rounded-tl-none">
              <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Doubt-Boosters */}
      <div className="px-4 py-2 border-t border-gray-800/80 bg-gray-900/10 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => handleQuickAction('simplify')}
          className="px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-900/60 text-xs font-bold text-gray-300 hover:border-orange-500/35 hover:text-orange-400 transition-all"
        >
          🔄 सरल समझाएं (Simplify)
        </button>
        <button
          onClick={() => handleQuickAction('question')}
          className="px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-900/60 text-xs font-bold text-gray-300 hover:border-orange-500/35 hover:text-orange-400 transition-all"
        >
          ❓ प्रश्न बनाएं (Practice)
        </button>
        <button
          onClick={() => handleQuickAction('pyq')}
          className="px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-900/60 text-xs font-bold text-gray-300 hover:border-orange-500/35 hover:text-orange-400 transition-all"
        >
          📝 PYQ दिखाएं (Board Q)
        </button>
        <button
          onClick={() => handleQuickAction('translate')}
          className="px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-900/60 text-xs font-bold text-gray-300 hover:border-orange-500/35 hover:text-orange-400 transition-all"
        >
          🇮🇳 शुद्ध हिंदी अनुवाद
        </button>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/40">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          {/* Notebook image attachment */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="h-12 w-12 rounded-xl border border-gray-850 hover:border-gray-700 bg-gray-900/60 flex items-center justify-center text-gray-450 hover:text-orange-500 transition-all shrink-0"
            title="Notebook Upload"
          >
            <Image className="h-5 w-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Text Input */}
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              placeholder="जैसे: प्रकाश संश्लेषण क्या है?..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
              className="w-full bg-gray-900/80 border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 outline-none transition-all"
            />
            {/* Speech recognition mic */}
            <button
              onClick={handleSpeechInput}
              className={`absolute right-3 p-1.5 rounded-lg transition-all ${
                isRecording ? 'bg-red-500 text-white animate-ping' : 'text-gray-400 hover:text-orange-500'
              }`}
              title="बोलकर पूछें (Voice doubt)"
            >
              <Mic className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Send button */}
          <button
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim()}
            className={`h-12 w-12 rounded-xl bg-orange-500 text-white flex items-center justify-center transition-all shrink-0 ${
              !inputText.trim() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-orange-600 hover:scale-105'
            }`}
          >
            <Send className="h-4.5 w-4.5 fill-white text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
