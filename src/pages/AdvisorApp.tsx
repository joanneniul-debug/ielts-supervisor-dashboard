import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ClipboardList, MessageSquareHeart, Repeat2, PhoneCall, MessagesSquare,
  Users as UsersIcon, CheckCircle2, ChevronDown, ChevronUp,
} from 'lucide-react';
import { followUpTasks, parentComms, renewals } from '../data/platform';
import StudentProfile from '../components/dashboard/StudentProfile';

const levelStyle: Record<string, string> = {
  高: 'bg-red-100 text-red-600',
  中: 'bg-amber-100 text-amber-600',
  低: 'bg-emerald-100 text-emerald-600',
};

export default function AdvisorApp() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'tasks' | 'comms' | 'renewal'>('tasks');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const pending = followUpTasks.filter((t) => t.status === '待跟进' && !done.includes(t.id));
  const finished = followUpTasks.filter((t) => t.status === '已跟进' || done.includes(t.id));

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-5 py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0e7490] text-[13px] font-bold text-white">王</div>
          <div>
            <div className="text-[14.5px] font-semibold text-slate-900">王倩，下午好</div>
            <div className="text-[11.5px] text-slate-400">班主任 · 北京·国贸校区 · 在读学员 68 人</div>
          </div>
          <div className="ml-auto flex rounded-lg bg-slate-100 p-0.5">
            {[
              { key: 'tasks', icon: ClipboardList, label: `跟进任务 (${pending.length})` },
              { key: 'comms', icon: MessageSquareHeart, label: '家长沟通' },
              { key: 'renewal', icon: Repeat2, label: '续费管理' },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[12.5px] ${tab === t.key ? 'bg-white font-medium text-[#0e7490] shadow-sm' : 'text-slate-500'}`}>
                <t.icon className="h-3.5 w-3.5" />{t.label}
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/')} className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11.5px] text-slate-500">切换端口</button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-5 py-5">
        {tab === 'tasks' && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: '今日待跟进', value: String(pending.length), warn: true },
                { label: '本周已跟进', value: '18', warn: false },
                { label: '缺课预警学员', value: '4', warn: true },
                { label: '在读学员', value: '68', warn: false },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-[12px] text-slate-500">{k.label}</div>
                  <div className={`mt-1.5 text-[26px] font-bold leading-none ${k.warn ? 'text-[#0e7490]' : 'text-slate-900'}`}>{k.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-slate-900">待跟进</h3>
              {pending.map((t) => {
                const isOpen = expanded === t.id;
                return (
                  <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-slate-900">{t.student}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${levelStyle[t.level]}`}>{t.level}优先级</span>
                      <span className="text-[11.5px] text-slate-400">{t.className}</span>
                      <span className="ml-auto text-[11.5px] font-medium text-[#0e7490]">{t.due}</span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{t.reason}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setDone([...done, t.id])} className="flex items-center gap-1 rounded-lg bg-[#0e7490] px-3 py-1.5 text-[12px] text-white">
                        <PhoneCall className="h-3 w-3" /> 完成跟进
                      </button>
                      <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600">
                        <MessagesSquare className="h-3 w-3" /> 联系家长
                      </button>
                      <button onClick={() => setExpanded(isOpen ? null : t.id)} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600">
                        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />} 学员档案
                      </button>
                    </div>
                    {isOpen && <StudentProfile name={t.student} />}
                  </div>
                );
              })}
              {pending.length === 0 && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center text-[13px] text-emerald-700">
                  🎉 今日跟进任务全部完成
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-slate-900">已跟进</h3>
              {finished.map((t) => (
                <div key={t.id} className="rounded-xl border border-slate-100 bg-white/70 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-[13.5px] font-medium text-slate-700">{t.student}</span>
                    <span className="text-[11.5px] text-slate-400">{t.className}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-slate-500">
                    {t.lastNote ?? '已完成跟进（演示：点击"完成跟进"后归档）'}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'comms' && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-[15px] font-semibold text-slate-900">家长沟通记录</h3>
            <p className="mt-1 text-[12px] text-slate-500">本周共 24 次沟通 · 电话 8 / 微信 12 / 面谈 4</p>
            <div className="mt-4 space-y-0 border-l-2 border-slate-100 pl-5">
              {parentComms.map((c) => (
                <div key={c.date + c.student} className="relative pb-5 last:pb-0">
                  <div className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#0e7490]" />
                  <div className="flex items-center gap-2 text-[11.5px] text-slate-400">
                    {c.date}
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10.5px] text-slate-500">{c.type}</span>
                    <span>{c.by}</span>
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-slate-800">{c.student}家长</div>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'renewal' && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-[15px] font-semibold text-slate-900">续费管理</h3>
            <p className="mt-1 text-[12px] text-slate-500">剩余课时 ≤6 节的学员 · 按续费意向排序</p>
            <table className="mt-4 w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
                  <th className="pb-2 font-medium">学员</th>
                  <th className="pb-2 font-medium">班级</th>
                  <th className="pb-2 font-medium">剩余课时</th>
                  <th className="pb-2 font-medium">续费意向</th>
                  <th className="pb-2 font-medium">备注</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {renewals.map((r) => (
                  <tr key={r.student} className="border-b border-slate-50 text-[12.5px] last:border-0">
                    <td className="py-3 font-medium text-slate-800">{r.student}</td>
                    <td className="py-3 text-slate-600">{r.className}</td>
                    <td className={`py-3 ${r.remaining <= 4 ? 'font-semibold text-red-600' : 'text-slate-600'}`}>{r.remaining} 节</td>
                    <td className="py-3">
                      <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${r.intent === '高' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{r.intent}</span>
                    </td>
                    <td className="py-3 text-slate-500">{r.note}</td>
                    <td className="py-3 text-right">
                      <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11.5px] text-slate-600 hover:bg-slate-50">
                        <UsersIcon className="h-3 w-3" /> 发起续费沟通
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
