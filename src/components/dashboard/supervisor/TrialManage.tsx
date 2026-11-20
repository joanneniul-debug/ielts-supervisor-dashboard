import { useState } from 'react';
import { Sparkles, Tag } from 'lucide-react';
import { trialAiChecks, trialFailReasons, trialFailList } from '../../../data/mock';
import TrialLessons from '../TrialLessons';

export default function TrialManage() {
  // 手动标记失败原因（本地状态）
  const [reasons, setReasons] = useState<Record<string, string>>({});

  return (
    <div className="space-y-5">
      {/* 试听率 / 成功率 / 月度趋势 / 教师榜（复用既有模块） */}
      <TrialLessons />

      {/* 试听课堂 AI 分析 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <Sparkles className="h-4 w-4 text-[#E8734A]" />
          试听课堂 AI 分析
          <span className="text-[11.5px] font-normal text-slate-400">AI 转写试听课录音，评估需求挖掘与互动质量</span>
        </h3>
        <div className="mt-3 space-y-2.5">
          {trialAiChecks.map((t) => (
            <div key={t.id} className="flex items-center gap-4 rounded-lg border border-slate-100 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-slate-800">{t.teacher}</span>
                  <span className="text-[11px] text-slate-400">{t.student} · {t.date}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${t.result === '关单' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>{t.result}</span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{t.summary}</p>
              </div>
              <div className="text-right">
                <div className={`text-[18px] font-bold ${t.score >= 85 ? 'text-emerald-600' : t.score >= 70 ? 'text-amber-600' : 'text-red-500'}`}>{t.score}</div>
                <div className="text-[10.5px] text-slate-400">AI 评分</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 失败原因手动标记 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <Tag className="h-4 w-4 text-[#E8734A]" />
          试听失败原因标记
          <span className="text-[11.5px] font-normal text-slate-400">课程顾问/主管手动标记，用于转化复盘</span>
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                <th className="pb-2.5 font-medium">学员</th>
                <th className="pb-2.5 font-medium">试听教师</th>
                <th className="pb-2.5 font-medium">试听日期</th>
                <th className="pb-2.5 font-medium">试听项目</th>
                <th className="pb-2.5 font-medium">失败原因</th>
              </tr>
            </thead>
            <tbody>
              {trialFailList.map((f) => (
                <tr key={f.id} className="border-b border-slate-50 text-[12.5px] last:border-0">
                  <td className="py-2.5 font-medium text-slate-800">{f.student}</td>
                  <td className="py-2.5 text-slate-600">{f.teacher}</td>
                  <td className="py-2.5 text-slate-600">{f.date}</td>
                  <td className="py-2.5 text-slate-600">{f.project}</td>
                  <td className="py-2.5">
                    <select
                      value={reasons[f.id] ?? f.reason}
                      onChange={(e) => setReasons({ ...reasons, [f.id]: e.target.value })}
                      className={`rounded-lg border px-2.5 py-1.5 text-[12px] outline-none ${
                        (reasons[f.id] ?? f.reason)
                          ? 'border-[#0C3B2E]/30 bg-[#0C3B2E]/5 text-[#0C3B2E]'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <option value="">待标记…</option>
                      {trialFailReasons.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-slate-400">
          已标记 {Object.values(reasons).filter(Boolean).length} / {trialFailList.length} 条 · 标记后进入月度试听复盘报表
        </p>
      </div>
    </div>
  );
}
