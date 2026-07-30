import { AlertTriangle } from 'lucide-react';
import { gradeKpis } from '../../data/mock';

export default function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {gradeKpis.map((k) => (
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
  );
}
