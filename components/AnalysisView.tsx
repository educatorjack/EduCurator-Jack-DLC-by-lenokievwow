
import React, { useEffect, useState } from 'react';
import { getAnalysis } from '../services/geminiService';
import { AnalysisData, LevelData } from '../types';

interface AnalysisViewProps {
  text: string;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ text }) => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const result = await getAnalysis(text);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [text]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">EduCuratorJack이 지문을 꼼꼼하게 읽고 있습니다...</p>
      </div>
    );
  }

  if (!data) return <div className="text-center py-10">데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="space-y-10 pb-12">
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-8 rounded-r-3xl shadow-sm">
        <p className="text-indigo-900 font-semibold leading-relaxed text-lg">
          {data.introduction}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {Object.entries(data.levels).map(([key, level]) => {
          // Explicitly cast 'level' to LevelData to resolve TypeScript errors where 'level' is inferred as 'unknown'
          const levelData = level as LevelData;
          return (
            <div key={key} className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-50 pb-4">
                <span className="text-4xl" role="img" aria-label="emoji">{levelData.emoji}</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{levelData.title}</h3>
              </div>
              <div className="prose prose-indigo max-w-none prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700 whitespace-pre-wrap text-lg">
                {levelData.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisView;
