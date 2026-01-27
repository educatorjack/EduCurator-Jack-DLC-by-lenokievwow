
import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../types';
import { getQuiz } from '../services/geminiService';

interface QuizViewProps {
  text: string;
}

const QuizView: React.FC<QuizViewProps> = ({ text }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const data = await getQuiz(text);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [text]);

  const handleAnswerChange = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">여러분의 이해를 확인하기 위한 퀴즈를 출제 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {questions.map((q, idx) => {
        // 선택지가 존재하고 1개 이상일 때만 객관식으로 판단
        const isMultipleChoice = q.options && q.options.length > 0;

        return (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-start gap-3">
              <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5">{idx + 1}</span>
              {q.question}
            </h4>

            {isMultipleChoice ? (
              <div className="space-y-3">
                {q.options?.map((opt, oIdx) => (
                  <label key={oIdx} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    answers[idx] === opt ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={opt}
                      disabled={submitted}
                      checked={answers[idx] === opt}
                      onChange={() => handleAnswerChange(idx, opt)}
                      className="w-4 h-4 text-amber-600"
                    />
                    <span className="text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  disabled={submitted}
                  value={answers[idx] || ''}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
                  placeholder="지문의 내용을 바탕으로 자신의 생각을 정리해 보세요."
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all resize-none text-slate-800 leading-relaxed"
                />
              </div>
            )}

            {submitted && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    isMultipleChoice ? (answers[idx]?.toLowerCase().trim() === q.answer.toLowerCase().trim() ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700') : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {isMultipleChoice ? (answers[idx]?.toLowerCase().trim() === q.answer.toLowerCase().trim() ? 'Correct' : 'Check Explanation') : '서술형 피드백'}
                  </span>
                  <span className="text-sm font-bold text-slate-900">정답 예시: {q.answer}</span>
                </div>
                <div className="text-slate-600 leading-relaxed text-lg">
                  <span className="font-black text-indigo-600 block mb-1">💡 EduCuratorJack의 설명:</span>
                  <p className="whitespace-pre-wrap">{q.explanation}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full py-5 bg-amber-600 text-white rounded-2xl font-black text-xl hover:bg-amber-700 shadow-2xl shadow-amber-200 transition-all active:scale-95 transform hover:-translate-y-1"
        >
          제출하고 정답 확인하기
        </button>
      )}
    </div>
  );
};

export default QuizView;
