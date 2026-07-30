import { HeartHandshake, PhoneCall, RefreshCw, CalendarCheck, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import { advisorPerf, serviceKpis, followUpTasks } from '../data/platform';

const kpiIcon = [HeartHandshake, CalendarCheck, RefreshCw, PhoneCall, AlertTriangle];

export default function ServiceAdmin({ onAdminSwitch }: { onAdminSwitch: () => void }) {
  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <Sidebar adminTab="service" onAdminSwitch={onAdminSwitch} />

      <div className="pl-[220px]">
        <header className="sticky top-0 z-20 flex h-14 items-center border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
          <span className="text-[14px] font-medium text-slate-700">教服主管看板</span>
        </header>

        <main className="space-y-5 p-6">
          <div>
            <h1 className="text-[24px] font-bold text-slate-900">教服主管看板</h1>
            <p className="mt-1 text-[13px] text-slate-500">
              班主任团队服务质量：学员跟进、出勤、家长沟通、续费与退费预警处理
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-slate-400">
              <RefreshCw className="h-3 w-3" />
              数据更新于 2026-07-27 09:30 · 已对接雅托邦与教务系统（演示环境）
            </p>
          </div>

          {/* 服务 KPI */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {serviceKpis.map((k, i) => {
              const Icon = kpiIcon[i];
              return (
                <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-slate-500">{k.label}</span>
                    <Icon className="h-3.5 w-3.5 text-[#0C3B2E]/50" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[26px] font-bold leading-none text-slate-900">{k.value}</span>
                    <span className="text-[12px] text-slate-400">{k.unit}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">{k.delta}</div>
                </div>
              );
            })}
          </div>

          {/* 班主任团队表现 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <HeartHandshake className="h-4 w-4 text-[#0C3B2E]" />
              班主任团队表现
            </h3>
            <p className="mt-1 text-[12px] text-slate-500">跟进完成率低的标红提醒 · 续费率低于 65% 需重点关注</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[820px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                    <th className="pb-2.5 font-medium">班主任</th>
                    <th className="pb-2.5 font-medium">在读学员</th>
                    <th className="pb-2.5 font-medium">今日跟进</th>
                    <th className="pb-2.5 font-medium">本周家长沟通</th>
                    <th className="pb-2.5 font-medium">续费率</th>
                    <th className="pb-2.5 font-medium">在处理退费预警</th>
                    <th className="pb-2.5 text-right font-medium">家长满意度</th>
                  </tr>
                </thead>
                <tbody>
                  {advisorPerf.map((a) => {
                    const [done, total] = a.todayFollowUps.split('/').map(Number);
                    const followOk = done / total >= 0.8;
                    return (
                      <tr key={a.name} className="border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/70">
                        <td className="py-3 pr-3">
                          <div className="font-medium text-slate-800">{a.name}</div>
                          <div className="text-[11px] text-slate-400">{a.site}</div>
                        </td>
                        <td className="py-3 pr-3 text-slate-700">{a.students} 人</td>
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-14 rounded-full bg-slate-100">
                              <div className={`h-full rounded-full ${followOk ? 'bg-[#0C3B2E]' : 'bg-red-500'}`} style={{ width: `${(done / total) * 100}%` }} />
                            </div>
                            <span className={followOk ? 'text-slate-600' : 'font-semibold text-red-600'}>{a.todayFollowUps}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-slate-700">{a.parentComms} 次</td>
                        <td className={`py-3 pr-3 ${a.renewalRate < 65 ? 'font-semibold text-red-600' : 'text-slate-700'}`}>{a.renewalRate}%</td>
                        <td className="py-3 pr-3">
                          {a.refundRisk > 0 ? (
                            <span className="rounded bg-red-50 px-1.5 py-0.5 text-[11px] font-medium text-red-600">{a.refundRisk} 人</span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className={`py-3 text-right font-medium ${a.satisfaction < 90 ? 'text-amber-600' : 'text-slate-700'}`}>{a.satisfaction}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 逾期未跟进提醒 */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
            <h3 className="flex items-center gap-2 text-[14px] font-semibold text-slate-900">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              今日待跟进任务（全校区）
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {followUpTasks.filter((t) => t.status === '待跟进').map((t) => (
                <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-slate-900">{t.student}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${t.level === '高' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>{t.level}优先级</span>
                    <span className="ml-auto text-[11px] text-slate-400">{t.due}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{t.reason}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{t.className}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
