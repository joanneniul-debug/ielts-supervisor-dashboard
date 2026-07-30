import { Presentation, Clock3, TrendingUp, TrendingDown } from 'lucide-react';
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts';
import { trialKpis, trialMonthly, trialTeacherTop, trialTeacherBottom, trialCampuses } from '../../data/mock';

function MiniKpi({ label, value, unit, sub }: { label: string; value: string; unit?: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3">
      <div className="text-[12px] text-slate-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[22px] font-bold text-slate-900">{value}</span>
        {unit && <span className="text-[12px] text-slate-400">{unit}</span>}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-400">{sub}</div>}
    </div>
  );
}

function TeacherRow({ t, good }: { t: { name: string; trials: number; success: number; rate: number }; good: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
      <span className="text-[12.5px] font-medium text-slate-700">{t.name}</span>
      <div className="flex items-center gap-3">
        <span className="text-[11.5px] text-slate-400">试听 {t.trials} · 成功 {t.success}</span>
        <span className={`w-14 text-right text-[12.5px] font-semibold ${good ? 'text-emerald-600' : 'text-red-500'}`}>
          {t.rate}%
        </span>
      </div>
    </div>
  );
}

export default function TrialLessons() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Presentation className="h-4 w-4 text-[#E8734A]" />
            试听课转化
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">
            成功率 =（关单 + 逾期签单）÷ 试听总数 · 数据来源：试听课数据统计报表（截至 2026-07-26）
          </p>
        </div>
        <span className="rounded-full bg-[#0C3B2E]/5 px-3 py-1 text-[11.5px] font-medium text-[#0C3B2E]">
          {trialKpis.month}
        </span>
      </div>

      {/* 本月核心指标 */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <MiniKpi label="试听课数" value={String(trialKpis.trials)} unit="节" sub="本月累计" />
        <MiniKpi label="关单数" value={String(trialKpis.deals)} unit="单" sub="试听当月签约" />
        <MiniKpi label="关单率" value={`${trialKpis.dealRate}%`} sub="较 6 月 +10.8pt" />
        <MiniKpi label="成功率" value={`${trialKpis.successRate}%`} sub="含逾期签单 · 较 6 月 +7.1pt" />
        <MiniKpi label="平均转化用时" value={String(trialKpis.avgConvertDays)} unit="天" sub="中位数 1 天" />
        <MiniKpi label="3 天内签约" value={`${trialKpis.within3Days}%`} sub="7 天内 92.3%" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* 月度趋势 */}
        <div className="xl:col-span-2">
          <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700">
            <TrendingUp className="h-3.5 w-3.5 text-[#0C3B2E]" />
            月度试听量与转化率（2026 年 1-7 月）
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trialMonthly} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[40, 75]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                  formatter={(v: number, name: string) => (name === '试听课数' ? [`${v} 节`, name] : [`${v}%`, name])}
                />
                <Legend wrapperStyle={{ fontSize: 11.5 }} />
                <Bar yAxisId="left" dataKey="trials" name="试听课数" fill="#0C3B2E" radius={[4, 4, 0, 0]} barSize={22} />
                <Line yAxisId="right" type="monotone" dataKey="successRate" name="成功率" stroke="#E8734A" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="dealRate" name="关单率" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" dot={{ r: 2.5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* 校区分布 */}
          <div className="mt-4">
            <div className="mb-2 text-[12.5px] font-medium text-slate-700">校区试听量分布（1-7 月累计 TOP6）</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
              {trialCampuses.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-600">{c.name}</span>
                  <span className="text-[12px] text-slate-400">
                    {c.trials} 节 · <span className="font-medium text-slate-700">{c.successRate}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 教师转化榜 */}
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            转化红榜（1-7 月 · 试听 ≥5 次）
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-1.5">
            {trialTeacherTop.map((t) => <TeacherRow key={t.name} t={t} good />)}
          </div>
          <div className="mb-2 mt-4 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700">
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            待提升（成功率末位）
          </div>
          <div className="rounded-lg border border-red-100 bg-red-50/40 px-3 py-1.5">
            {trialTeacherBottom.map((t) => <TeacherRow key={t.name} t={t} good={false} />)}
          </div>
          <div className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
            <Clock3 className="mt-0.5 h-3 w-3 shrink-0" />
            建议：红榜教师优先排试听课；末位教师安排试听技巧带教，连续两月低于 20% 暂停排课。
          </div>
        </div>
      </div>
    </div>
  );
}
