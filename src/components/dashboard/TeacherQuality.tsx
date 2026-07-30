import { ClipboardCheck } from 'lucide-react';
import { teachers } from '../../data/mock';

function Bar({ value, warnBelow }: { value: number; warnBelow: number }) {
  const warn = value < warnBelow;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${warn ? 'bg-red-500' : value < warnBelow + 10 ? 'bg-amber-400' : 'bg-[#0C3B2E]'}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`w-10 text-right text-[12px] font-medium ${warn ? 'text-red-600' : 'text-slate-700'}`}>{value}%</span>
    </div>
  );
}

export default function TeacherQuality({ city, site }: { city: string; site: string }) {
  const list = teachers.filter(
    (t) => (city === '全部城市' || t.city === city) && (site === '全部校区' || t.site === site)
  );
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <ClipboardCheck className="h-4 w-4 text-[#0C3B2E]" />
            教师反馈质量监控
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">反馈有效解析率 ≥85% 达标 · 教师修正率越低说明 AI 分析越准</p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
              <th className="pb-2 font-medium">教师</th>
              <th className="pb-2 font-medium">反馈有效解析率</th>
              <th className="pb-2 font-medium">教师修正率</th>
              <th className="pb-2 font-medium">反馈提交及时率</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.id} className="border-b border-slate-50 last:border-0">
                <td className="py-2.5 pr-4">
                  <div className="text-[13px] font-medium text-slate-800">{t.name}</div>
                  <div className="text-[11px] text-slate-400">{t.city}·{t.site}</div>
                </td>
                <td className="py-2.5 pr-4"><Bar value={t.aiCoverage} warnBelow={85} /></td>
                <td className="py-2.5 pr-4">
                  <span className={`text-[12.5px] font-medium ${t.correctionRate > 15 ? 'text-amber-600' : 'text-slate-700'}`}>
                    {t.correctionRate}%
                  </span>
                </td>
                <td className="py-2.5"><Bar value={t.timelyRate} warnBelow={85} /></td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={4} className="py-6 text-center text-[12px] text-slate-400">该校区暂无教师数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
