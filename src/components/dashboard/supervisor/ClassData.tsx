import { School } from 'lucide-react';
import { classDataRows } from '../../../data/mock';
import ProgressStars from '../ProgressStars';

const distColors = ['#ef4444', '#f59e0b', '#0C3B2E', '#10b981'];
const distLabels = ['<5.5', '5.5–6.0', '6.5–7.0', '7.0+'];

function ScoreDist({ dist }: { dist: [number, number, number, number] }) {
  const total = dist.reduce((a, b) => a + b, 0);
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-2.5 w-28 overflow-hidden rounded-full bg-slate-100">
        {dist.map((n, i) => (
          <div key={i} style={{ width: `${(n / total) * 100}%`, background: distColors[i] }} />
        ))}
      </div>
      <span className="text-[10.5px] text-slate-400">{dist.join(' / ')}</span>
    </div>
  );
}

function RateCell({ value, warnBelow }: { value: number; warnBelow: number }) {
  const warn = value < warnBelow;
  return <span className={`font-medium ${warn ? 'text-red-600' : 'text-slate-700'}`}>{value}%</span>;
}

export default function ClassData() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <School className="h-4 w-4 text-[#E8734A]" />
          班级数据总览
          <span className="text-[11.5px] font-normal text-slate-400">出勤 / 作业完成率低于 80% 标红 · 模考分布色阶：{distLabels.join(' · ')}</span>
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                <th className="pb-2.5 font-medium">班级</th>
                <th className="pb-2.5 font-medium">教师</th>
                <th className="pb-2.5 font-medium">出勤率</th>
                <th className="pb-2.5 font-medium">作业完成率</th>
                <th className="pb-2.5 font-medium">作业正确率</th>
                <th className="pb-2.5 font-medium">模考均分</th>
                <th className="pb-2.5 font-medium">模考成绩分布</th>
                <th className="pb-2.5 font-medium">高频错题 TOP2</th>
              </tr>
            </thead>
            <tbody>
              {classDataRows.map((c) => (
                <tr key={c.name} className="border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/60">
                  <td className="py-3">
                    <div className="font-medium text-slate-800">{c.name}</div>
                    <div className="text-[10.5px] text-slate-400">{c.site}</div>
                  </td>
                  <td className="py-3 text-slate-600">{c.teacher}</td>
                  <td className="py-3"><RateCell value={c.attendance} warnBelow={85} /></td>
                  <td className="py-3"><RateCell value={c.homeworkRate} warnBelow={80} /></td>
                  <td className="py-3"><RateCell value={c.accuracy} warnBelow={70} /></td>
                  <td className="py-3 font-semibold text-slate-800">{c.mockAvg.toFixed(1)}</td>
                  <td className="py-3"><ScoreDist dist={c.dist} /></td>
                  <td className="py-3">
                    <div className="flex flex-col gap-1">
                      {c.topWrong.map((w) => (
                        <span key={w} className="w-fit rounded-full bg-red-50 px-2 py-0.5 text-[10.5px] text-red-600">{w}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 班级进步之星沿用 */}
      <ProgressStars />
    </div>
  );
}
