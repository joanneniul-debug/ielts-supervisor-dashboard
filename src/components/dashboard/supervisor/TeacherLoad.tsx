import { useState } from 'react';
import { Gauge, ArrowUpDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { teacherLoads, teacherLoadSummary } from '../../../data/mock';

type SortKey = 'monthHours' | 'yearAvg' | 'classCount' | 'students';

function loadBadge(t: { monthHours: number; yearAvg: number; type: string }) {
  if (t.type === '全职' && t.monthHours >= 110) return { label: '负荷偏高', cls: 'bg-amber-50 text-amber-600' };
  if (t.type === '全职' && t.monthHours < 80) return { label: '负荷偏低', cls: 'bg-red-50 text-red-500' };
  return { label: '正常', cls: 'bg-emerald-50 text-emerald-600' };
}

export default function TeacherLoad() {
  const [sortKey, setSortKey] = useState<SortKey>('monthHours');
  const sorted = [...teacherLoads].sort((a, b) => b[sortKey] - a[sortKey]);
  const s = teacherLoadSummary;
  const ftPct = Math.round((s.fullTime / (s.fullTime + s.partTime)) * 100);

  const sortBtn = (key: SortKey, label: string) => (
    <button onClick={() => setSortKey(key)} className={`flex items-center gap-1 font-medium ${sortKey === key ? 'text-[#0C3B2E]' : 'text-slate-400 hover:text-slate-600'}`}>
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="space-y-5">
      {/* 汇总卡 */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[12px] text-slate-500">团队本月排课量</div>
          <div className="mt-1 text-[24px] font-bold text-slate-900">{s.totalMonthHours}<span className="ml-1 text-[12px] font-normal text-slate-400">课时</span></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[12px] text-slate-500">平均排课量</div>
          <div className="mt-1 text-[24px] font-bold text-slate-900">{s.avgMonthHours}<span className="ml-1 text-[12px] font-normal text-slate-400">课时/人</span></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[12px] text-slate-500">人均带班量</div>
          <div className="mt-1 text-[24px] font-bold text-slate-900">{s.avgClassCount}<span className="ml-1 text-[12px] font-normal text-slate-400">个班</span></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[12px] text-slate-500">全兼职占比</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="bg-[#0C3B2E]" style={{ width: `${ftPct}%` }} />
              <div className="bg-[#E8734A]" style={{ width: `${100 - ftPct}%` }} />
            </div>
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
            <span>全职 {s.fullTime} 人 · {ftPct}%</span>
            <span>兼职 {s.partTime} 人 · {100 - ftPct}%</span>
          </div>
        </div>
      </div>

      {/* 课量分布图 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <Gauge className="h-4 w-4 text-[#E8734A]" />
          本月排课量分布
          <span className="text-[11.5px] font-normal text-slate-400">点击表格列头可切换排序维度</span>
        </h3>
        <div className="mt-3 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sorted} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v: number) => [`${v} 课时`, '本月课量']} />
              <Bar dataKey="monthHours" radius={[4, 4, 0, 0]} barSize={26}>
                {sorted.map((t) => (
                  <Cell key={t.name} fill={t.type === '兼职' ? '#E8734A' : t.monthHours >= 110 ? '#d97706' : '#0C3B2E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#0C3B2E]" />全职</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-600" />全职·负荷偏高</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#E8734A]" />兼职</span>
        </div>
      </div>

      {/* 明细表 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11.5px]">
                <th className="pb-2.5 font-medium text-slate-400">教师</th>
                <th className="pb-2.5 font-medium text-slate-400">类型</th>
                <th className="pb-2.5 font-medium text-slate-400">校区</th>
                <th className="pb-2.5">{sortBtn('monthHours', '本月课量')}</th>
                <th className="pb-2.5">{sortBtn('yearAvg', '全年月均课量')}</th>
                <th className="pb-2.5">{sortBtn('classCount', '带班量')}</th>
                <th className="pb-2.5">{sortBtn('students', '在带学员')}</th>
                <th className="pb-2.5 font-medium text-slate-400">负荷状态</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => {
                const badge = loadBadge(t);
                return (
                  <tr key={t.name} className="border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/60">
                    <td className="py-3 font-medium text-slate-800">{t.name}</td>
                    <td className="py-3">
                      <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${t.type === '全职' ? 'bg-[#0C3B2E]/5 text-[#0C3B2E]' : 'bg-[#E8734A]/10 text-[#E8734A]'}`}>{t.type}</span>
                    </td>
                    <td className="py-3 text-slate-600">{t.site}</td>
                    <td className="py-3 font-semibold text-slate-800">{t.monthHours} <span className="text-[10.5px] font-normal text-slate-400">课时</span></td>
                    <td className="py-3 text-slate-600">{t.yearAvg} 课时</td>
                    <td className="py-3 text-slate-600">{t.classCount} 个班</td>
                    <td className="py-3 text-slate-600">{t.students} 人</td>
                    <td className="py-3"><span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${badge.cls}`}>{badge.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
