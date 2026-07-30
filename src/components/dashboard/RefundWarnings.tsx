import { useState } from 'react';
import { AlertOctagon, PhoneCall, ChevronDown, ChevronUp } from 'lucide-react';
import { refundWarnings } from '../../data/mock';
import StudentProfile from './StudentProfile';

const levelStyle: Record<string, { badge: string; border: string }> = {
  高: { badge: 'bg-red-100 text-red-700', border: 'border-l-red-500' },
  中: { badge: 'bg-amber-100 text-amber-700', border: 'border-l-amber-400' },
  低: { badge: 'bg-emerald-100 text-emerald-700', border: 'border-l-emerald-400' },
};

export default function RefundWarnings() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <AlertOctagon className="h-4 w-4 text-red-600" />
            退费预警名单
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">AI 从课堂反馈中识别的退费信号 · 按风险等级排序</p>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-medium text-red-600">
          高风险 3 人需立即跟进
        </span>
      </div>

      <div className="mt-4 max-h-[480px] space-y-3 overflow-y-auto pr-1">
        {refundWarnings.map((s) => {
          const isOpen = expanded === s.name;
          return (
            <div key={s.name} className={`rounded-lg border border-slate-100 border-l-4 bg-slate-50/50 p-3.5 ${levelStyle[s.level].border}`}>
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-semibold text-slate-900">{s.name}</span>
                <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${levelStyle[s.level].badge}`}>{s.level}风险</span>
                <span className="ml-auto text-[11px] text-slate-400">
                  {s.city}·{s.site} · {s.className} · 教师 {s.teacher}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.reasons.map((t) => (
                  <span key={t} className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] text-red-600">{t}</span>
                ))}
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                <span className="text-slate-400">最近反馈（{s.days} 天前）：</span>
                {s.summary}
              </p>
              <div className="mt-2.5 flex gap-2">
                <button className="flex items-center gap-1 rounded-md bg-[#0C3B2E] px-2.5 py-1 text-[11px] text-white hover:bg-[#0a3328]">
                  <PhoneCall className="h-3 w-3" /> 安排跟进
                </button>
                <button
                  onClick={() => setExpanded(isOpen ? null : s.name)}
                  className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:bg-slate-50"
                >
                  {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {isOpen ? '收起档案' : '查看完整档案'}
                </button>
              </div>
              {isOpen && <StudentProfile name={s.name} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
