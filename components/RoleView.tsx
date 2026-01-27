
import React, { useState } from 'react';
import { getRoleHelp } from '../services/geminiService';

interface RoleViewProps {
  text: string;
}

const ROLES = [
  { id: 'Level 1. 어휘 안내자', emoji: '📘', desc: 'Level 1. 어휘 안내자', detail: '핵심 단어와 어원, 쓰임새를 분석하여 공유합니다.' },
  { id: 'Level 2. 문법 코치', emoji: '🛠️', desc: 'Level 2. 문법 코치', detail: '복잡한 구문 독해와 문법적 구조를 설명합니다.' },
  { id: 'Level 3. 주제 토론가', emoji: '🎙️', desc: 'Level 3. 주제 토론가', detail: '주제와 요지를 파악하고 비판적 의견을 제시합니다.' },
  { id: 'Level 4. 논리 분석가', emoji: '📊', desc: 'Level 4. 논리 분석가', detail: '논리적 흐름과 근거의 타당성을 분석합니다.' },
  { id: 'Level 5. 심화 탐험가', emoji: '🚀', desc: 'Level 5. 심화 탐험가', detail: '배경 지식과 현실 세계의 문제를 연결합니다.' },
];

const RoleView: React.FC<RoleViewProps> = ({ text }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hint, setHint] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (roleId: string) => {
    setSelectedRole(roleId);
    setHint('');
    setLoading(true);
    try {
      const data = await getRoleHelp(roleId, text);
      setHint(data);
    } catch (err) {
      setHint('도움말을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-2xl shadow-sm">
        <p className="text-emerald-800 font-bold leading-relaxed">
          "여러분이 모둠 활동에서 맡은 역할을 선택해 보세요. EduCuratorJack이 해당 역할에만 집중하여 생각할 거리와 스크립트를 준비해 드립니다."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className={`p-6 rounded-3xl border-2 transition-all text-left group ${
              selectedRole === role.id 
                ? 'border-emerald-600 bg-emerald-50 shadow-lg scale-[1.02]' 
                : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{role.emoji}</div>
            <h5 className="font-bold text-slate-900 text-lg leading-tight mb-2">{role.desc}</h5>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{role.detail}</p>
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm animate-pulse">선택하신 레벨에 맞춘 학습 가이드를 생성 중입니다...</p>
        </div>
      )}

      {selectedRole && !loading && (
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-emerald-200 shadow-xl animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              {selectedRole}
            </span>
          </div>
          <div className="prose prose-emerald max-w-none whitespace-pre-wrap leading-relaxed text-slate-700 font-medium text-lg">
            {hint}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 italic text-slate-400 text-sm flex items-center gap-2">
            <span className="text-xl">💡</span>
            "EduCuratorJack의 레벨별 힌트를 바탕으로 자신만의 생각을 덧붙여 보세요! 여러분의 목소리가 토론을 더욱 풍성하게 만듭니다."
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleView;
