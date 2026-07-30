import { useState } from 'react';
import { Users2, X, FileEdit, MessageSquareText, Award } from 'lucide-react';
import { teachers, assignmentDetails, feedbackRecords, studentOutcomes, type Teacher } from '../../data/mock';

function rateColor(v: number) {
  if (v < 80) return 'text-red-600 font-semibold';
  if (v < 90) return 'text-amber-600 font-medium';
  return 'text-slate-800';
}

function TeacherDrawer({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
  const assignments = assignmentDetails[teacher.id] ?? [];
  const feedbacks = feedbackRecords[teacher.id] ?? [];
  const outcomes = studentOutcomes[teacher.id] ?? [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/30" />
      <div
        className="relative h-full w-full max-w-[460px] overflow-y-auto bg-slate-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h3 className="text-[16px] font-semibold text-slate-900">{teacher.name}</h3>
            <p className="text-[12px] text-slate-500">{teacher.city}·{teacher.site} · {teacher.classes.join('、')}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-slate-100">
            <X className="h-4.5 w-4.5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-900">
              <FileEdit className="h-4 w-4 text-[#0C3B2E]" /> 作业布置与批改明细
            </h4>
            <div className="mt-3 space-y-3">
              {assignments.length === 0 && <p className="text-[12px] text-slate-400">暂无数据</p>}
              {assignments.map((a) => (
                <div key={a.title} className="border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <p className="text-[12.5px] font-medium leading-snug text-slate-800">{a.title}</p>
                  <p className="mt-1 text-[11.5px] text-slate-500">
                    {a.className}　提交 <span className="text-slate-700">{a.submitted}</span>　批改{' '}
                    <span className={a.graded.startsWith('0') ? 'font-semibold text-red-600' : 'text-slate-700'}>{a.graded}</span>
                    {a.avg && <>　均分 <span className="text-slate-700">{a.avg}</span></>}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-900">
              <MessageSquareText className="h-4 w-4 text-[#0C3B2E]" /> 授课反馈记录
            </h4>
            <div className="mt-3 space-y-2.5">
              {feedbacks.length === 0 && <p className="text-[12px] text-slate-400">暂无数据</p>}
              {feedbacks.map((f) => (
                <div key={f.title} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
                  <div>
                    <p className="text-[12.5px] font-medium text-slate-800">{f.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{f.className} · {f.date}</p>
                  </div>
                  <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${
                    f.status === '已发布' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-900">
              <Award className="h-4 w-4 text-[#0C3B2E]" /> 所带学生出分（最新模考）
            </h4>
            <div className="mt-3 space-y-2">
              {outcomes.length === 0 && <p className="text-[12px] text-slate-400">暂无数据</p>}
              {outcomes.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-slate-700">{s.name}</span>
                  <span className="text-slate-500">
                    {s.change.replace(String(s.to.toFixed(1)), '')}
                    <span className="font-semibold text-[#0C3B2E]">{s.to.toFixed(1)}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function TeacherTable({ city, site }: { city: string; site: string }) {
  const [selected, setSelected] = useState<Teacher | null>(null);
  const list = teachers.filter(
    (t) => (city === '全部城市' || t.city === city) && (site === '全部校区' || t.site === site)
  );
  const scopeLabel = site !== '全部校区' ? site : city !== '全部城市' ? `${city}（全部校区）` : '';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Users2 className="h-4 w-4 text-[#0C3B2E]" />
            教师教学表现
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">课量、作业批改、授课反馈与所带学生出分 · 点击行查看明细</p>
        </div>
        <span className="text-[12px] text-slate-400">{list.length} 位教师{scopeLabel ? ` · ${scopeLabel}` : ''}</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[880px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
              <th className="pb-2.5 font-medium">老师</th>
              <th className="pb-2.5 font-medium">在带班级</th>
              <th className="pb-2.5 font-medium">学生数</th>
              <th className="pb-2.5 font-medium">课量（近30天）</th>
              <th className="pb-2.5 font-medium">布置作业</th>
              <th className="pb-2.5 font-medium">批改完成率</th>
              <th className="pb-2.5 font-medium">批改时效</th>
              <th className="pb-2.5 font-medium">授课反馈</th>
              <th className="pb-2.5 text-right font-medium">学生平均提分</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => {
              const fbPct = Math.round((t.feedbackDone / t.feedbackTotal) * 100);
              return (
                <tr
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="cursor-pointer border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/70"
                >
                  <td className="py-3 pr-3">
                    <div className="font-medium text-slate-800">{t.name}</div>
                    <div className="text-[11px] text-slate-400">{t.city}·{t.site}</div>
                  </td>
                  <td className="py-3 pr-3 text-slate-600">{t.classes.join('、')}</td>
                  <td className="py-3 pr-3 text-slate-700">{t.students} 人</td>
                  <td className="py-3 pr-3 text-slate-700">{t.hours} 课时</td>
                  <td className="py-3 pr-3 text-slate-700">{t.assignments} 次</td>
                  <td className={`py-3 pr-3 ${rateColor(t.gradeRate)}`}>{t.gradeRate}%</td>
                  <td className={`py-3 pr-3 ${t.gradeTime > 24 ? 'text-red-600 font-semibold' : 'text-slate-700'}`}>{t.gradeTime}h</td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${fbPct < 80 ? 'bg-red-500' : 'bg-[#0C3B2E]'}`}
                          style={{ width: `${fbPct}%` }}
                        />
                      </div>
                      <span className="text-slate-600">{t.feedbackDone}/{t.feedbackTotal}</span>
                    </div>
                  </td>
                  <td className={`py-3 text-right font-semibold ${t.avgImprove >= 0.6 ? 'text-emerald-600' : 'text-slate-700'}`}>
                    +{t.avgImprove.toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && <TeacherDrawer teacher={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
