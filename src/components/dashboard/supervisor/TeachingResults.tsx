import { useState } from 'react';
import { Trophy, HeartHandshake, ArrowUpDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import KpiRow from '../KpiRow';
import { campusNps, teacherNps, campusScoreRates, teacherScoreRates } from '../../../data/mock';

export default function TeachingResults() {
  const [sortKey, setSortKey] = useState<'highRate' | 'improveRate'>('highRate');
  const sortedTeachers = [...teacherScoreRates].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div className="space-y-5">
      {/* 季度成绩关键指标 */}
      <div className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm">
        <KpiRow />
      </div>

      {/* NPS */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <HeartHandshake className="h-4 w-4 text-[#E8734A]" />
            NPS · 分校平均分
          </h3>
          <div className="mt-3 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campusNps} layout="vertical" margin={{ top: 0, right: 30, left: 12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="campus" width={86} tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v: number) => [v, 'NPS']} />
                <Bar dataKey="nps" fill="#0C3B2E" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <HeartHandshake className="h-4 w-4 text-[#E8734A]" />
            NPS · 教师平均分
          </h3>
          <div className="mt-3 space-y-2">
            {teacherNps.map((t) => (
              <div key={t.teacher} className="flex items-center gap-3">
                <span className="w-14 text-[12.5px] text-slate-700">{t.teacher}</span>
                <div className="h-2 flex-1 rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${t.nps >= 70 ? 'bg-emerald-500' : t.nps >= 60 ? 'bg-[#0C3B2E]' : 'bg-red-400'}`} style={{ width: `${t.nps}%` }} />
                </div>
                <span className="w-8 text-right text-[12.5px] font-semibold text-slate-800">{t.nps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 高分率 / 提分率 */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Trophy className="h-4 w-4 text-[#E8734A]" />
            分校高分率 / 提分率
            <span className="text-[11.5px] font-normal text-slate-400">来源：成绩报表</span>
          </h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                  <th className="pb-2 font-medium">校区</th>
                  <th className="pb-2 font-medium">高分率（7.0+）</th>
                  <th className="pb-2 font-medium">提分率（≥0.5）</th>
                </tr>
              </thead>
              <tbody>
                {campusScoreRates.map((c) => (
                  <tr key={c.campus} className="border-b border-slate-50 text-[12.5px] last:border-0">
                    <td className="py-2.5 text-slate-700">{c.campus}</td>
                    <td className="py-2.5 font-semibold text-slate-800">{c.highRate}%</td>
                    <td className="py-2.5 font-semibold text-slate-800">{c.improveRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <Trophy className="h-4 w-4 text-[#E8734A]" />
              教师个人高分率 / 提分率
            </h3>
            <div className="flex gap-2 text-[11.5px]">
              {(['highRate', 'improveRate'] as const).map((k) => (
                <button key={k} onClick={() => setSortKey(k)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 ${sortKey === k ? 'bg-[#0C3B2E] text-white' : 'border border-slate-200 text-slate-500'}`}>
                  {k === 'highRate' ? '按高分率' : '按提分率'}<ArrowUpDown className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                  <th className="pb-2 font-medium">教师</th>
                  <th className="pb-2 font-medium">高分率</th>
                  <th className="pb-2 font-medium">提分率</th>
                </tr>
              </thead>
              <tbody>
                {sortedTeachers.map((t, i) => (
                  <tr key={t.teacher} className="border-b border-slate-50 text-[12.5px] last:border-0">
                    <td className="py-2.5">
                      <span className={`mr-2 inline-flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${i < 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'}`}>{i + 1}</span>
                      <span className="text-slate-700">{t.teacher}</span>
                    </td>
                    <td className="py-2.5 font-semibold text-slate-800">{t.highRate}%</td>
                    <td className="py-2.5 font-semibold text-slate-800">{t.improveRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
