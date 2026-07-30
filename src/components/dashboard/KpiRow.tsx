import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { gradeQuarters, gradeKpisByQuarter } from '../../data/mock';

export default function KpiRow() {
  const [quarter, setQuarter] = useState<string>(gradeQuarters[gradeQuarters.length - 1]);
  const kpis = gradeKpisByQuarter[quarter];

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-[14px] font-semibold text-slate-900">成绩关键指标</h2>
        <span className="text-[11.5px] text-slate-400">按季度统计</span>
        <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
          {gradeQuarters.map((q) => (
            <button
              key={q}
              onClick={() => setQuarter(q)}
              className={`rounded-md px-3 py-1 text-[12px] transition-colors ${
                quarter === q ? 'bg-[#0C3B2E] font-medium text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-slate-500">{k.label}</span>
              {k.label === '风险学员' && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[24px] font-bold leading-none text-slate-900">{k.value}</span>
              <span className="text-[12px] text-slate-400">{k.unit}</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">{k.delta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
