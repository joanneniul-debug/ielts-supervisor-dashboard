import { studentProfiles } from '../../data/mock';

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 text-[11px] text-slate-500">{label}</span>
      <div className="h-1.5 flex-1 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#0C3B2E]" style={{ width: `${(value / 9) * 100}%` }} />
      </div>
      <span className="w-7 text-right text-[11.5px] font-semibold text-slate-800">{value.toFixed(1)}</span>
    </div>
  );
}

// 学生完整档案（展开视图）
export default function StudentProfile({ name }: { name: string }) {
  const p = studentProfiles[name];
  if (!p) {
    return <p className="mt-2 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-400">暂无详细档案数据</p>;
  }

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-slate-200 bg-white p-4">
      {/* 基本信息 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500">
        <span>学号 <span className="font-medium text-slate-700">{p.studentId}</span></span>
        <span>入班 <span className="font-medium text-slate-700">{p.enrollDate}</span></span>
        <span>阶段 <span className="font-medium text-slate-700">{p.stage}</span></span>
        <span>目标 <span className="font-semibold text-[#E8734A]">{p.targetScore.toFixed(1)} 分</span></span>
        <span>出勤率 <span className={`font-semibold ${p.attendance < 80 ? 'text-red-600' : 'text-emerald-600'}`}>{p.attendance}%</span></span>
      </div>

      {/* 最新模考成绩 */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[12px] font-medium text-slate-700">最新模考成绩</span>
          <span className="text-[12px] text-slate-500">
            总分 <span className="text-[15px] font-bold text-[#0C3B2E]">{p.current.total.toFixed(1)}</span>
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-x-5">
          <ScoreBar label="听力" value={p.current.L} />
          <ScoreBar label="阅读" value={p.current.R} />
          <ScoreBar label="写作" value={p.current.W} />
          <ScoreBar label="口语" value={p.current.S} />
        </div>
      </div>

      {/* 薄弱环节 */}
      <div>
        <span className="text-[12px] font-medium text-slate-700">薄弱环节</span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {p.weakPoints.map((w) => (
            <span key={w} className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">{w}</span>
          ))}
        </div>
      </div>

      {/* 教师反馈记录 */}
      <div>
        <span className="text-[12px] font-medium text-slate-700">教师反馈记录</span>
        <div className="mt-1.5 space-y-2 border-l-2 border-slate-100 pl-3">
          {p.feedbacks.map((f) => (
            <div key={f.date}>
              <div className="text-[11px] text-slate-400">{f.date} · {f.teacher}老师</div>
              <p className="mt-0.5 text-[12px] leading-relaxed text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 跟进记录 */}
      {p.followUps.length > 0 && (
        <div>
          <span className="text-[12px] font-medium text-slate-700">跟进记录</span>
          <div className="mt-1.5 space-y-2">
            {p.followUps.map((f) => (
              <div key={f.date} className="rounded-lg bg-emerald-50/60 p-2.5">
                <div className="text-[11px] text-emerald-700">{f.date} · {f.by}</div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
