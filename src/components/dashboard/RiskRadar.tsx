import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Radar, ChevronRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { riskCategories, type RiskCategory } from '../../data/mock';
import StudentProfile from './StudentProfile';

const levelStyle: Record<string, string> = {
  高: 'bg-red-100 text-red-700',
  中: 'bg-amber-100 text-amber-700',
  低: 'bg-emerald-100 text-emerald-700',
};

export default function RiskRadar() {
  const [selected, setSelected] = useState<RiskCategory | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const total = riskCategories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Radar className="h-4 w-4 text-[#0C3B2E]" />
            全校风险雷达
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">各风险原因的学生分布 · 点击色块下钻学生名单</p>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-medium text-red-600">
          风险学员 {total} 人
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-4 lg:flex-row">
        <div className="relative h-[220px] w-full lg:w-[240px] lg:shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskCategories}
                dataKey="count"
                nameKey="reason"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
                onClick={(d) => { setSelected(d?.payload ?? d); setExpanded(null); }}
                className="cursor-pointer outline-none"
              >
                {riskCategories.map((c) => (
                  <Cell
                    key={c.reason}
                    fill={c.color}
                    opacity={selected && selected.reason !== c.reason ? 0.35 : 1}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v: number | string, name: number | string) => [`${v} 人`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[24px] font-bold text-slate-900">{total}</span>
            <span className="text-[11px] text-slate-500">风险人次</span>
          </div>
        </div>

        {!selected ? (
          <div className="flex-1 space-y-1.5 self-center">
            {riskCategories.map((c) => (
              <button
                key={c.reason}
                onClick={() => { setSelected(c); setExpanded(null); }}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-50"
              >
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                <span className="flex-1 text-[13px] text-slate-700">{c.reason}</span>
                <span className="text-[13px] font-semibold text-slate-900">{c.count} 人</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: selected.color }} />
                <span className="text-[13.5px] font-semibold text-slate-900">{selected.reason}</span>
                <span className="text-[12px] text-slate-500">{selected.count} 人</span>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full p-1 hover:bg-slate-200">
                <X className="h-3.5 w-3.5 text-slate-500" />
              </button>
            </div>
            <div className="max-h-[220px] space-y-2 overflow-y-auto pr-1">
              {selected.students.map((s) => {
                const isOpen = expanded === s.name;
                return (
                  <div key={s.name} className="rounded-lg border border-slate-100 bg-white p-3">
                    <button
                      onClick={() => setExpanded(isOpen ? null : s.name)}
                      className="flex w-full items-center gap-2 text-left"
                    >
                      <span className="text-[13px] font-medium text-slate-900">{s.name}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${levelStyle[s.level]}`}>{s.level}风险</span>
                      <span className="ml-auto text-[11px] text-slate-400">{s.city}·{s.site} · {s.className}</span>
                      {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                    </button>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{s.summary}</p>
                    {isOpen && <StudentProfile name={s.name} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
