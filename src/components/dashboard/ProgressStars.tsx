import { useState } from 'react';
import { Sparkles, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { progressStars } from '../../data/mock';
import StudentProfile from './StudentProfile';

function Trajectory({ data }: { data: number[] }) {
  const w = 96;
  const h = 32;
  const min = Math.min(...data) - 0.25;
  const max = Math.max(...data) + 0.25;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - 8) + 4;
    const y = h - 4 - ((v - min) / (max - min)) * (h - 8);
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={pts.join(' ')} fill="none" stroke="#0C3B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => {
        const [x, y] = p.split(',').map(Number);
        return <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 3.5 : 2} fill={i === pts.length - 1 ? '#E8734A' : '#0C3B2E'} />;
      })}
    </svg>
  );
}

export default function ProgressStars() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Sparkles className="h-4 w-4 text-[#E8734A]" />
            进步之星榜单
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">近期进步表现最突出的学员 · 模考总分轨迹</p>
        </div>
      </div>

      <div className="mt-4 max-h-[480px] space-y-2.5 overflow-y-auto pr-1">
        {progressStars.map((s, i) => {
          const isOpen = expanded === s.name;
          return (
            <div key={s.name} className="rounded-lg border border-slate-100 p-3 hover:bg-slate-50/60">
              <button onClick={() => setExpanded(isOpen ? null : s.name)} className="flex w-full items-center gap-3 text-left">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                  i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-slate-200 text-slate-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-slate-900">{s.name}</span>
                    <span className="flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-medium text-emerald-700">
                      <TrendingUp className="h-3 w-3" />
                      {s.trajectory[0].toFixed(1)} → {s.trajectory[s.trajectory.length - 1].toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11.5px] text-slate-500">{s.highlight}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{s.city}·{s.site} · {s.className} · 教师 {s.teacher} · 进步表现 ×{s.progressCount}</p>
                </div>
                <Trajectory data={s.trajectory} />
                {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
              </button>
              {isOpen && <StudentProfile name={s.name} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
