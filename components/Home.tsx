
import React, { useState } from 'react';
import { AppMode } from '../types';

interface HomeProps {
  onStart: (text: string, modes: AppMode[]) => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  const [text, setText] = useState('');
  const [selectedModes, setSelectedModes] = useState<AppMode[]>([]);

  const toggleMode = (mode: AppMode) => {
    setSelectedModes(prev => {
      if (mode === AppMode.FULL) {
        return prev.includes(AppMode.FULL) ? [] : [AppMode.FULL];
      }
      const withoutFull = prev.filter(m => m !== AppMode.FULL);
      if (withoutFull.includes(mode)) {
        return withoutFull.filter(m => m !== mode);
      } else {
        return [...withoutFull, mode];
      }
    });
  };

  const handleExample = () => {
    setText("Artificial Intelligence (AI) is rapidly transforming the landscape of human education, raising important questions about its role in the classroom. While AI tools can provide personalized learning experiences by adapting to each student's pace and style, they are best viewed as supportive aids rather than replacements for human teachers. Education involves more than just the transfer of information; it encompasses social-emotional development, mentorship, and critical thinking. Human educators possess the unique ability to understand a student's feelings and provide the moral guidance necessary for growth. However, AI can significantly enhance efficiency by handling repetitive tasks, allowing teachers to focus on deeper interactions with their students. Ethical considerations, such as data privacy and the digital divide, must be addressed to ensure that AI benefits all learners equally. Ultimately, the most effective educational environment will likely involve a collaborative partnership between human wisdom and technological precision, aiming to empower the next generation for a complex future.");
  };

  const handleStart = () => {
    if (!text.trim()) {
      alert('학습할 지문을 먼저 입력해주세요!');
      return;
    }
    if (selectedModes.length === 0) {
      alert('적어도 하나의 학습 모드를 선택해주세요!');
      return;
    }
    onStart(text, selectedModes);
  };

  const modeConfigs = [
    { 
      id: AppMode.FULL, 
      label: '👑 5단계 완전 정복', 
      desc: '지문 분석, 토론 및 발표, 이해 점검 퀴즈를 한 번에 끝내기', 
      emoji: '🌟', 
      glowColor: 'rgba(245, 158, 11, 0.6)',
      activeClass: 'border-indigo-600 bg-indigo-50 ring-indigo-100',
      hoverClass: 'hover:border-indigo-300 hover:bg-indigo-50/30',
      textAccent: 'text-indigo-700',
      barColor: 'bg-indigo-600'
    },
    { 
      id: AppMode.ANALYSIS, 
      label: '🔍 지문 분석', 
      desc: '5단계 딥러닝 분석하기', 
      emoji: '📊', 
      glowColor: 'rgba(239, 68, 68, 0.6)',
      activeClass: 'border-red-600 bg-red-50 ring-red-100',
      hoverClass: 'hover:border-red-300 hover:bg-red-50/30',
      textAccent: 'text-red-700',
      barColor: 'bg-red-600'
    },
    { 
      id: AppMode.ROLE, 
      label: '🎙️ 토론 및 발표', 
      desc: '역할 및 활동 도움받기', 
      emoji: '🎙️', 
      glowColor: 'rgba(234, 179, 8, 0.8)',
      activeClass: 'border-yellow-500 bg-yellow-50 ring-yellow-100',
      hoverClass: 'hover:border-yellow-300 hover:bg-yellow-50/30',
      textAccent: 'text-yellow-700',
      barColor: 'bg-yellow-500'
    },
    { 
      id: AppMode.QUIZ, 
      label: '📝 이해 점검 퀴즈', 
      desc: '나만의 맞춤형 문제 풀기', 
      emoji: '❓', 
      glowColor: 'rgba(34, 197, 94, 0.6)',
      activeClass: 'border-green-600 bg-green-50 ring-green-100',
      hoverClass: 'hover:border-green-300 hover:bg-green-50/30',
      textAccent: 'text-green-700',
      barColor: 'bg-green-600'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-2 text-center">
      <div className="mb-8">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
          5단계 깊이 있는 영어 학습<br/>
          <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Deep Learning Curator</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          딥러닝 큐레이터 EduCuratorJack과 함께 깊이 있게 영어를 배우고 '비판적 사고'와 '창의적 소통' 역량을 길러보세요.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-8 relative">
        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="깊이 있게 학습하고 싶은 지문을 붙여넣으세요."
            className="w-full h-48 p-6 text-lg resize-none border-none focus:outline-none placeholder-slate-300 bg-transparent leading-relaxed"
          />
          <div className="absolute right-6 bottom-6">
            <button 
              onClick={handleExample}
              className="text-sm font-bold text-indigo-500 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <span>🎲</span> 예시 지문 넣기
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <h3 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">학습 모드 선택</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modeConfigs.map(mode => {
            const isSelected = selectedModes.includes(mode.id);
            return (
              <div 
                key={mode.id}
                onClick={() => toggleMode(mode.id)}
                className={`cursor-pointer p-5 rounded-3xl border-2 transition-all duration-300 text-left flex flex-col relative group overflow-hidden ${
                  isSelected 
                    ? `${mode.activeClass} shadow-xl ring-2 scale-[1.03]` 
                    : `border-slate-100 bg-white ${mode.hoverClass} hover:shadow-lg hover:-translate-y-1`
                }`}
              >
                {isSelected && (
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-slate-900/5 rounded-full blur-2xl" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div 
                    className={`text-4xl transition-all duration-500 ${
                      isSelected 
                        ? 'grayscale-0 scale-110 drop-shadow-[0_0_10px_var(--glow-color)]' 
                        : 'grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--glow-color)]'
                    }`}
                    style={{ '--glow-color': mode.glowColor } as React.CSSProperties}
                  >
                    {mode.emoji}
                  </div>
                </div>
                
                <h4 className={`font-bold transition-colors duration-300 mb-1 ${isSelected ? mode.textAccent : 'text-slate-900 group-hover:text-indigo-600'}`}>
                  {mode.label}
                </h4>
                <p className={`text-xs leading-snug transition-colors duration-300 ${isSelected ? 'opacity-80' : 'text-slate-500'}`}>
                  {mode.desc}
                </p>
                
                <div className={`absolute bottom-0 left-0 h-1.5 transition-all duration-500 ${isSelected ? `w-full ${mode.barColor}` : 'w-0 bg-slate-200 group-hover:w-1/3'}`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={handleStart}
          className="px-16 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          Deep Learning 시작하기
        </button>
      </div>

      <div className="max-w-2xl mx-auto pt-4 border-t border-slate-200">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Jack's 5 Levels for Deep Learning</h5>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm font-bold text-slate-600">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">📘 1. 어휘</span>
          <span className="text-slate-300 font-normal">➔</span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">🛠️ 2. 문법</span>
          <span className="text-slate-300 font-normal">➔</span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">🎙️ 3. 주제</span>
          <span className="text-slate-300 font-normal">➔</span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">📊 4. 논리</span>
          <span className="text-slate-300 font-normal">➔</span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">🚀 5. 심화</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
