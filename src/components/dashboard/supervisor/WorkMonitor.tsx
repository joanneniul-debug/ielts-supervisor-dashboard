import { MonitorCheck, AudioLines, MessageSquareText, BookOpenCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { classroomAiChecks, recordingChecks, feedbackTimeliness, gradingAudit } from '../../../data/mock';

export default function WorkMonitor() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* 课堂情况 AI 分析 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <MonitorCheck className="h-4 w-4 text-[#E8734A]" />
            课堂情况 AI 分析
            <span className="text-[11.5px] font-normal text-slate-400">本周抽检 4 节课</span>
          </h3>
          <div className="mt-3 space-y-2.5">
            {classroomAiChecks.map((c) => (
              <div key={c.id} className="rounded-lg border border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-slate-800">{c.teacher}</span>
                  <span className="text-[11px] text-slate-400">{c.lesson}</span>
                  <span className={`ml-auto text-[15px] font-bold ${c.score >= 85 ? 'text-emerald-600' : c.score >= 75 ? 'text-amber-600' : 'text-red-500'}`}>{c.score}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#0C3B2E]/5 px-2 py-0.5 text-[10.5px] text-[#0C3B2E]">{t}</span>
                  ))}
                  {c.issue && (
                    <span className="flex items-center gap-1 text-[11px] text-amber-600">
                      <AlertTriangle className="h-3 w-3" />{c.issue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 课堂录音抽查 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <AudioLines className="h-4 w-4 text-[#E8734A]" />
            课堂录音抽查
            <span className="text-[11.5px] font-normal text-slate-400">AI 转写后自动摘要</span>
          </h3>
          <div className="mt-3 space-y-2.5">
            {recordingChecks.map((r) => (
              <div key={r.id} className="rounded-lg border border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-slate-800">{r.teacher}</span>
                  <span className="text-[11px] text-slate-400">{r.lesson}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                    r.result === '正常' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                  }`}>{r.result}</span>
                </div>
                <p className="mt-1.5 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-slate-500">
                  <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-[#E8734A]" />{r.aiSummary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 授课反馈发布率与时效 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <MessageSquareText className="h-4 w-4 text-[#E8734A]" />
          授课反馈发布率与时效
          <span className="text-[11.5px] font-normal text-slate-400">目标：发布率 ≥95%，课后 24h 内提交</span>
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                <th className="pb-2.5 font-medium">教师</th>
                <th className="pb-2.5 font-medium">反馈发布率</th>
                <th className="pb-2.5 font-medium">平均提交时效</th>
                <th className="pb-2.5 font-medium">状态</th>
              </tr>
            </thead>
            <tbody>
              {feedbackTimeliness.map((f) => {
                const ok = f.publishRate >= 95 && f.avgHours <= 24;
                return (
                  <tr key={f.teacher} className="border-b border-slate-50 text-[12.5px] last:border-0">
                    <td className="py-2.5 font-medium text-slate-800">{f.teacher}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-slate-100">
                          <div className={`h-full rounded-full ${f.publishRate >= 95 ? 'bg-emerald-500' : f.publishRate >= 88 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${f.publishRate}%` }} />
                        </div>
                        <span className="text-slate-700">{f.publishRate}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-slate-600">{f.avgHours} 小时</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${ok ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                        {ok ? '达标' : '需改进'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 作业布置与批改 + AI 初批修正率 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <BookOpenCheck className="h-4 w-4 text-[#E8734A]" />
          作业布置与批改 · AI 初批 vs 教师复核
          <span className="text-[11.5px] font-normal text-slate-400">修正率 = 教师复评分相对 AI 预批改分差 ≥0.5 的占比，&gt;25% 标记批改异常</span>
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                <th className="pb-2.5 font-medium">教师</th>
                <th className="pb-2.5 font-medium">作业布置（本月）</th>
                <th className="pb-2.5 font-medium">批改完成率</th>
                <th className="pb-2.5 font-medium">AI 修正率</th>
                <th className="pb-2.5 font-medium">异常识别</th>
              </tr>
            </thead>
            <tbody>
              {gradingAudit.map((g) => (
                <tr key={g.teacher} className={`border-b border-slate-50 text-[12.5px] last:border-0 ${g.abnormal ? 'bg-red-50/40' : ''}`}>
                  <td className="py-2.5 font-medium text-slate-800">{g.teacher}</td>
                  <td className="py-2.5 text-slate-600">{g.assignCount} 次</td>
                  <td className="py-2.5 text-slate-600">{g.gradeRate}%</td>
                  <td className="py-2.5">
                    <span className={g.fixRate > 25 ? 'font-semibold text-red-600' : 'text-slate-700'}>{g.fixRate}%</span>
                  </td>
                  <td className="py-2.5">
                    {g.abnormal ? (
                      <span className="flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10.5px] font-medium text-red-600">
                        <AlertTriangle className="h-3 w-3" />批改异常 · 待复核
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">正常</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
