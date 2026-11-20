import { FlaskConical, Lightbulb } from 'lucide-react';
import { topWrongQuestions, weakKnowledge, researchSuggestion } from '../../../data/mock';

const subjectColor: Record<string, string> = {
  听力: 'bg-cyan-100 text-cyan-700',
  阅读: 'bg-sky-100 text-sky-700',
  写作: 'bg-emerald-100 text-emerald-700',
  口语: 'bg-orange-100 text-orange-700',
};

export default function ResearchSupport() {
  return (
    <div className="space-y-5">
      {/* 教研会建议 */}
      <div className="rounded-xl border border-[#E8734A]/25 bg-[#E8734A]/[0.04] p-5">
        <div className="flex items-start gap-2.5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#E8734A]" />
          <div>
            <div className="text-[14px] font-semibold text-slate-900">AI 教研会建议</div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{researchSuggestion}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* 高频错题 TOP 榜 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <FlaskConical className="h-4 w-4 text-[#E8734A]" />
            本校高频错题 TOP10
            <span className="text-[11.5px] font-normal text-slate-400">近 30 天全校区作业+模考</span>
          </h3>
          <div className="mt-3 space-y-1.5">
            {topWrongQuestions.map((q) => (
              <div key={q.rank} className="flex items-center gap-3 rounded-lg border border-slate-50 px-3 py-2.5">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  q.rank <= 3 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                }`}>{q.rank}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12.5px] font-medium text-slate-800">{q.q}</div>
                  <div className="mt-0.5 text-[10.5px] text-slate-400">涉及 {q.classes} 个班级</div>
                </div>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${subjectColor[q.subject]}`}>{q.subject}</span>
                <span className="w-12 text-right text-[13px] font-bold text-red-500">{q.errorRate}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 薄弱知识点统计 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <FlaskConical className="h-4 w-4 text-[#E8734A]" />
            薄弱知识点统计
            <span className="text-[11.5px] font-normal text-slate-400">按错误率排序</span>
          </h3>
          <div className="mt-4 space-y-3.5">
            {weakKnowledge.map((k) => (
              <div key={k.point}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-700">{k.point}</span>
                  <span className="text-slate-500">
                    错误率 <span className="font-semibold text-red-500">{k.errorRate}%</span>
                    <span className={`ml-2 text-[11px] ${k.mom.startsWith('+') ? 'text-red-400' : k.mom.startsWith('-') ? 'text-emerald-500' : 'text-slate-400'}`}>
                      环比 {k.mom}
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0C3B2E] to-[#E8734A]" style={{ width: `${k.errorRate}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-400">
            数据口径：近 30 天作业、模考、错题本三处合并去重；可用于教研会选题与新教师培训重点。
          </p>
        </div>
      </div>
    </div>
  );
}
