import { useState } from 'react';
import { Trophy, ArrowUpDown } from 'lucide-react';
import { classGrades } from '../../data/mock';

function RateBar({ value, warnBelow }: { value: number; warnBelow?: number }) {
  const warn = warnBelow !== undefined && value < warnBelow;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${warn ? 'bg-red-500' : value >= 70 ? 'bg-emerald-500' : 'bg-[#0C3B2E]'}`}
          style={{ width: `${Math.max(value, 2)}%` }}
        />
      </div>
      <span className={`text-[12px] font-medium ${warn ? 'text-red-600' : 'text-slate-700'}`}>{value}%</span>
    </div>
  );
}

type SortKey = 'highRate' | 'improveRate' | 'hours' | 'avgScore';

export default function ClassGrades() {
  const [sortKey, setSortKey] = useState<SortKey>('avgScore');
  const sorted = [...classGrades].sort((a, b) => b[sortKey] - a[sortKey]);

  const sortBtn = (key: SortKey, label: string) => (
    <button onClick={() => setSortKey(key)} className={`flex items-center gap-1 font-medium ${sortKey === key ? 'text-[#0C3B2E]' : 'text-slate-400 hover:text-slate-600'}`}>
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Trophy className="h-4 w-4 text-[#E8734A]" />
            班级成绩管理
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">
            高分率 = 最近模考 7.0+ 学员占比 · 提分率 = 较入学提分 ≥0.5 学员占比 · 课量为近 30 天教师课时
          </p>
        </div>
        <span className="text-[12px] text-slate-400">{classGrades.length} 个班级 · 点击列头排序</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11.5px]">
              <th className="pb-2.5 font-medium text-slate-400">班级</th>
              <th className="pb-2.5 font-medium text-slate-400">授课教师</th>
              <th className="pb-2.5 font-medium text-slate-400">学生数</th>
              <th className="pb-2.5">{sortBtn('avgScore', '模考均分')}</th>
              <th className="pb-2.5">{sortBtn('highRate', '高分率')}</th>
              <th className="pb-2.5">{sortBtn('improveRate', '提分率')}</th>
              <th className="pb-2.5 text-right">{sortBtn('hours', '课量（近30天）')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/70">
                <td className="py-3 pr-3">
                  <div className="font-medium text-slate-800">{c.name}</div>
                  <div className="text-[11px] text-slate-400">{c.site}</div>
                </td>
                <td className="py-3 pr-3 text-slate-600">{c.teacher}</td>
                <td className="py-3 pr-3 text-slate-700">{c.students} 人</td>
                <td className="py-3 pr-3">
                  <span className={`font-semibold ${c.avgScore >= 6.5 ? 'text-emerald-600' : c.avgScore < 5.8 ? 'text-red-600' : 'text-slate-800'}`}>
                    {c.avgScore.toFixed(1)}
                  </span>
                </td>
                <td className="py-3 pr-3"><RateBar value={c.highRate} /></td>
                <td className="py-3 pr-3"><RateBar value={c.improveRate} warnBelow={50} /></td>
                <td className="py-3 text-right text-slate-700">{c.hours} 课时</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
