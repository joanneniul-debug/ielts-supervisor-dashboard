import { useMemo, useState } from 'react';
import { UserRound, Search } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { studentRiskRows } from '../../../data/mock';
import RiskRadar from '../RiskRadar';

const riskStyle: Record<string, string> = {
  高: 'bg-red-100 text-red-600',
  中: 'bg-amber-50 text-amber-600',
  低: 'bg-emerald-50 text-emerald-600',
};
const riskTabs = ['全部', '高风险', '中风险', '低风险'] as const;

function Sparkline({ data }: { data: number[] }) {
  const points = data.map((v, i) => ({ i, v }));
  const rising = data[data.length - 1] >= data[0];
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="v" stroke={rising ? '#10b981' : '#ef4444'} strokeWidth={2} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function StudentData() {
  const [risk, setRisk] = useState<(typeof riskTabs)[number]>('全部');
  const [site, setSite] = useState('全部校区');
  const [kw, setKw] = useState('');

  const sites = useMemo(() => ['全部校区', ...Array.from(new Set(studentRiskRows.map((s) => s.site)))], []);
  const filtered = studentRiskRows.filter((s) => {
    if (risk !== '全部' && s.risk !== risk[0]) return false;
    if (site !== '全部校区' && s.site !== site) return false;
    if (kw && !s.name.includes(kw) && !s.className.includes(kw)) return false;
    return true;
  });

  const counts = { 高: 0, 中: 0, 低: 0 } as Record<string, number>;
  studentRiskRows.forEach((s) => { counts[s.risk] += 1; });

  return (
    <div className="space-y-5">
      <RiskRadar />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <UserRound className="h-4 w-4 text-[#E8734A]" />
            学员数据（按风险等级）
          </h3>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
              {riskTabs.map((r) => (
                <button key={r} onClick={() => setRisk(r)}
                  className={`rounded-md px-3 py-1 text-[12px] transition-colors ${risk === r ? 'bg-[#0C3B2E] font-medium text-white' : 'text-slate-500 hover:text-slate-800'}`}>
                  {r}{r !== '全部' && <span className="ml-1 opacity-70">{counts[r[0]]}</span>}
                </button>
              ))}
            </div>
            <select value={site} onChange={(e) => setSite(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] text-slate-700 outline-none">
              {sites.map((s) => <option key={s}>{s}</option>)}
            </select>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-slate-300" />
              <input value={kw} onChange={(e) => setKw(e.target.value)} placeholder="搜索学员/班级"
                className="w-28 bg-transparent text-[12px] outline-none" />
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                <th className="pb-2.5 font-medium">学员</th>
                <th className="pb-2.5 font-medium">风险等级</th>
                <th className="pb-2.5 font-medium">出勤率</th>
                <th className="pb-2.5 font-medium">作业完成率</th>
                <th className="pb-2.5 font-medium">完成质量</th>
                <th className="pb-2.5 font-medium">模考成绩变化</th>
                <th className="pb-2.5 font-medium">最新模考</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.name} className="border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/60">
                  <td className="py-3">
                    <div className="font-medium text-slate-800">{s.name}</div>
                    <div className="text-[10.5px] text-slate-400">{s.className} · {s.site}</div>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${riskStyle[s.risk]}`}>{s.risk}风险</span>
                  </td>
                  <td className="py-3 text-slate-700">{s.attendance}%</td>
                  <td className="py-3 text-slate-700">{s.homeworkRate}%</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${s.quality >= 80 ? 'bg-emerald-500' : s.quality >= 65 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${s.quality}%` }} />
                      </div>
                      <span className="text-slate-700">{s.quality}</span>
                    </div>
                  </td>
                  <td className="py-3"><Sparkline data={s.mockTrend} /></td>
                  <td className="py-3 font-semibold text-slate-800">{s.lastMock.toFixed(1)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="py-8 text-center text-[12.5px] text-slate-400">无匹配学员</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
