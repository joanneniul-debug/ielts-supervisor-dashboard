import { useState } from 'react';
import { CheckSquare, Square, ClipboardCheck, Check, X } from 'lucide-react';
import { supervisorPersonalTodos, supervisorApprovals } from '../../../data/mock';
import RefundWarnings from '../RefundWarnings';

const approvalColor: Record<string, string> = {
  调课申请: 'bg-blue-50 text-blue-600',
  请假申请: 'bg-amber-50 text-amber-600',
  试听加排: 'bg-violet-50 text-violet-600',
  高分奖励: 'bg-emerald-50 text-emerald-600',
};

export default function TodoPanel() {
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [handled, setHandled] = useState<Record<string, '通过' | '驳回'>>({});

  const toggleTodo = (id: string) =>
    setDoneIds((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* 个人待办 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <CheckSquare className="h-4 w-4 text-[#E8734A]" />
            个人待办
            <span className="rounded-full bg-slate-100 px-2 text-[11px] font-medium text-slate-500">
              {supervisorPersonalTodos.length - doneIds.length} 未完成
            </span>
          </h3>
          <div className="mt-3 space-y-1.5">
            {supervisorPersonalTodos.map((t) => {
              const done = doneIds.includes(t.id);
              return (
                <button key={t.id} onClick={() => toggleTodo(t.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors ${
                    done ? 'border-slate-100 bg-slate-50/60' : 'border-slate-100 hover:border-slate-200'
                  }`}>
                  {done
                    ? <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500" />
                    : <Square className="h-4 w-4 shrink-0 text-slate-300" />}
                  <div className="min-w-0 flex-1">
                    <div className={`text-[13px] ${done ? 'text-slate-400 line-through' : 'font-medium text-slate-800'}`}>{t.title}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">截止：{t.due}</div>
                  </div>
                  <span className="rounded-full bg-[#0C3B2E]/5 px-2 py-0.5 text-[10.5px] font-medium text-[#0C3B2E]">{t.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 审批待办 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <ClipboardCheck className="h-4 w-4 text-[#E8734A]" />
            审批待办
            <span className="rounded-full bg-red-100 px-2 text-[11px] font-medium text-red-600">
              {supervisorApprovals.length - Object.keys(handled).length} 待审批
            </span>
          </h3>
          <div className="mt-3 space-y-2.5">
            {supervisorApprovals.map((a) => {
              const result = handled[a.id];
              return (
                <div key={a.id} className={`rounded-lg border px-4 py-3 ${result ? 'border-slate-100 bg-slate-50/60' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${approvalColor[a.type]}`}>{a.type}</span>
                    <span className="text-[12.5px] font-medium text-slate-800">{a.applicant}</span>
                    <span className="ml-auto text-[11px] text-slate-400">{a.time}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{a.content}</p>
                  {result ? (
                    <div className={`mt-2 text-[12px] font-medium ${result === '通过' ? 'text-emerald-600' : 'text-red-500'}`}>
                      已{result}
                    </div>
                  ) : (
                    <div className="mt-2.5 flex gap-2">
                      <button onClick={() => setHandled({ ...handled, [a.id]: '通过' })}
                        className="flex items-center gap-1 rounded-lg bg-[#0C3B2E] px-3 py-1.5 text-[11.5px] font-medium text-white">
                        <Check className="h-3 w-3" /> 通过
                      </button>
                      <button onClick={() => setHandled({ ...handled, [a.id]: '驳回' })}
                        className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[11.5px] text-slate-600 hover:bg-slate-50">
                        <X className="h-3 w-3" /> 驳回
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 退费风险随待办提醒 */}
      <RefundWarnings />
    </div>
  );
}
