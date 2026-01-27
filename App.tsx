
import React, { useState } from 'react';
import { AppMode } from './types';
import Home from './components/Home';
import Layout from './components/Layout';
import AnalysisView from './components/AnalysisView';
import QuizView from './components/QuizView';
import RoleView from './components/RoleView';

const App: React.FC = () => {
  const [currentText, setCurrentText] = useState<string>('');
  const [modes, setModes] = useState<AppMode[]>([]);

  const handleStart = (text: string, selectedModes: AppMode[]) => {
    setCurrentText(text);
    setModes(selectedModes);
  };

  const handleReset = () => {
    setModes([]);
  };

  const isFullMode = modes.includes(AppMode.FULL);
  const showAnalysis = isFullMode || modes.includes(AppMode.ANALYSIS);
  const showRole = isFullMode || modes.includes(AppMode.ROLE);
  const showQuiz = isFullMode || modes.includes(AppMode.QUIZ);

  return (
    <Layout onHome={handleReset}>
      {modes.length === 0 ? (
        <Home onStart={handleStart} />
      ) : (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <button 
            onClick={handleReset}
            className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            다른 텍스트 입력하기
          </button>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">대상 지문</h3>
            <p className="text-lg text-slate-800 italic leading-relaxed">"{currentText}"</p>
          </div>

          <div className="space-y-16">
            {showAnalysis && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">1</span>
                  <h2 className="text-2xl font-bold text-slate-900">심층 분석 (Analysis)</h2>
                </div>
                <AnalysisView text={currentText} />
              </section>
            )}

            {showRole && (
              <section className={`animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 ${showAnalysis ? 'border-t border-slate-200 pt-16' : ''}`}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">{showAnalysis ? '2' : '1'}</span>
                  <h2 className="text-2xl font-bold text-slate-900">토론 가이드 (Role Guide)</h2>
                </div>
                <RoleView text={currentText} />
              </section>
            )}

            {showQuiz && (
              <section className={`animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 ${(showAnalysis || showRole) ? 'border-t border-slate-200 pt-16' : ''}`}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold">{(showAnalysis && showRole) ? '3' : (showAnalysis || showRole) ? '2' : '1'}</span>
                  <h2 className="text-2xl font-bold text-slate-900">이해 점검 퀴즈 (Quiz)</h2>
                </div>
                <QuizView text={currentText} />
              </section>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
