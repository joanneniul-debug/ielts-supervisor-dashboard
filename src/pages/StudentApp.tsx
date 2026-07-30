import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Home, BookX, TrendingUp, CalendarDays, ChevronRight, Clock,
  CheckCircle2, AlertCircle, Sparkles, X, RotateCcw, ArrowRight,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import { studentTasks, wrongQuestions, mockExams, radarData, studentSchedule, studentInfo, type StudyTask } from '../data/platform';

const subjectColor: Record<string, string> = {
  听力: 'bg-cyan-100 text-cyan-700',
  阅读: 'bg-sky-100 text-sky-700',
  写作: 'bg-emerald-100 text-emerald-700',
  口语: 'bg-orange-100 text-orange-700',
  词汇: 'bg-purple-100 text-purple-700',
};

const statusStyle: Record<string, string> = {
  待完成: 'bg-slate-100 text-slate-600',
  进行中: 'bg-blue-100 text-blue-700',
  已完成: 'bg-emerald-100 text-emerald-700',
  已逾期: 'bg-red-100 text-red-600',
};

const wqStatusStyle: Record<string, string> = {
  待二刷: 'bg-red-100 text-red-600',
  已二刷: 'bg-blue-100 text-blue-700',
  已分析: 'bg-amber-100 text-amber-700',
  已掌握: 'bg-emerald-100 text-emerald-700',
};

// 作答 → 判卷 → AI 分析 → 专项推送 流程弹窗
function HomeworkFlow({ task, onClose }: { task: StudyTask; onClose: () => void }) {
  const [step, setStep] = useState(0); // 0作答 1判卷 2AI分析 3推送
  const steps = ['初次作答', '一刷判卷', '错题分析', 'AI 建议'];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 sm:items-center" onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-2xl bg-white p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-slate-900">{task.subject} · {task.title}</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100"><X className="h-4 w-4 text-slate-500" /></button>
        </div>

        {/* 步骤条 */}
        <div className="mt-4 flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                  i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-[#0C3B2E] text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`mt-1 text-[10px] ${i === step ? 'font-medium text-[#0C3B2E]' : 'text-slate-400'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`mx-1 mb-4 h-0.5 flex-1 ${i < step ? 'bg-emerald-400' : 'bg-slate-100'}`} />}
            </div>
          ))}
        </div>

        <div className="mt-4 min-h-[180px] rounded-xl bg-slate-50 p-4">
          {step === 0 && (
            <div>
              <p className="text-[12px] text-slate-500">{task.detail}</p>
              <div className="mt-3 space-y-2.5">
                {['The painting was donated to the ______ in 1892.', 'Unlike traditional portraits, the work is notably ______.'].map((q, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-[12.5px] text-slate-700">Q{i + 4}. {q}</p>
                    <div className="mt-2 rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-[12px] text-slate-400">点击填写答案…</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="flex h-[180px] flex-col items-center justify-center">
              <RotateCcw className="h-8 w-8 animate-spin text-[#0C3B2E]" style={{ animationDuration: '2s' }} />
              <p className="mt-3 text-[13px] font-medium text-slate-700">AI 判卷中…</p>
              <p className="mt-1 text-[12px] text-slate-400">正在比对定位句与同义替换…</p>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-red-50 px-2.5 py-1 text-[13px] font-semibold text-red-600">错 2 题 / 共 8 题</span>
                <span className="text-[12px] text-slate-400">正确率 75%</span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg border border-red-100 bg-white p-3">
                  <p className="text-[12.5px] font-medium text-slate-800">Q4 · 定位句找错段落</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">应填入名词短语，与 gallery 相关；建议先用专有名词 1892 定位，再向后找同义替换。</p>
                </div>
                <div className="rounded-lg border border-red-100 bg-white p-3">
                  <p className="text-[12.5px] font-medium text-slate-800">Q7 · 词性预判失误</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">应填入形容词修饰名词；先预判词性再回原文定位可减少 50% 错误。</p>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-slate-800">
                <Sparkles className="h-4 w-4 text-[#E8734A]" /> AI 学习建议
              </div>
              <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[12.5px] leading-relaxed text-slate-600">
                <li>你的填空题错误集中在「词性预判」，建议先完成专项练习再二刷错题</li>
                <li>已为你推送「填空题定位与预判策略」专项练习（10 题）至「自主练习」</li>
                <li>周三判断题课程前，建议先复习错题本中 2 道 NOT GIVEN 错题</li>
              </ul>
              <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-[12px] text-emerald-700">
                ✓ 已推送专项练习 · 错题已加入错题本待二刷
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          {step === 0 && (
            <button onClick={() => setStep(1)} className="flex-1 rounded-lg bg-[#0C3B2E] py-2.5 text-[13px] font-medium text-white">提交答案</button>
          )}
          {step === 1 && (
            <button onClick={() => setStep(2)} className="flex-1 rounded-lg bg-[#0C3B2E] py-2.5 text-[13px] font-medium text-white">查看判卷结果</button>
          )}
          {step === 2 && (
            <div className="flex w-full gap-2">
              <button onClick={() => setStep(3)} className="flex-1 rounded-lg border border-slate-200 py-2.5 text-[13px] text-slate-600">错题二刷</button>
              <button onClick={() => setStep(3)} className="flex-1 rounded-lg bg-[#0C3B2E] py-2.5 text-[13px] font-medium text-white">获取 AI 分析</button>
            </div>
          )}
          {step === 3 && (
            <button onClick={onClose} className="flex-1 rounded-lg bg-[#0C3B2E] py-2.5 text-[13px] font-medium text-white">完成，去练专项</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudentApp() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'home' | 'wrong' | 'score' | 'schedule'>('home');
  const [activeTask, setActiveTask] = useState<StudyTask | null>(null);
  const [wqSubject, setWqSubject] = useState('全部');
  const [taskFilter, setTaskFilter] = useState('全部');

  const filteredTasks = studentTasks.filter((t) => taskFilter === '全部' || t.kind === taskFilter);
  const filteredWq = wrongQuestions.filter((q) => wqSubject === '全部' || q.subject === wqSubject);
  const trendData = mockExams.map((m) => ({ name: m.name, 总分: m.total, 听力: m.L, 阅读: m.R, 写作: m.W, 口语: m.S }));

  return (
    <div className="min-h-screen bg-[#F4F6F5] pb-20">
      {/* 顶栏 */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#0C3B2E] px-4 py-3 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <div className="text-[15px] font-semibold">{studentInfo.name}，下午好</div>
            <div className="text-[11px] text-white/60">{studentInfo.className} · 目标 {studentInfo.targetScore.toFixed(1)} 分</div>
          </div>
          <button onClick={() => navigate('/')} className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] text-white/80">切换端口</button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-4">
        {tab === 'home' && (
          <div className="space-y-4">
            {/* 分数概览 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                <div className="text-[11px] text-slate-400">入学成绩</div>
                <div className="mt-1 text-[20px] font-bold text-slate-700">{studentInfo.enrollScore.toFixed(1)}</div>
              </div>
              <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                <div className="text-[11px] text-slate-400">最近模考</div>
                <div className="mt-1 text-[20px] font-bold text-[#0C3B2E]">{mockExams[mockExams.length - 1].total.toFixed(1)}</div>
              </div>
              <div className="rounded-xl bg-white p-3 text-center shadow-sm ring-1 ring-[#E8734A]/30">
                <div className="text-[11px] text-slate-400">目标分数</div>
                <div className="mt-1 text-[20px] font-bold text-[#E8734A]">{studentInfo.targetScore.toFixed(1)}</div>
              </div>
            </div>

            {/* 任务筛选 */}
            <div className="flex gap-2">
              {['全部', '课前预习', '课后作业', '自主练习'].map((f) => (
                <button key={f} onClick={() => setTaskFilter(f)}
                  className={`rounded-full px-3 py-1 text-[12px] ${taskFilter === f ? 'bg-[#0C3B2E] text-white' : 'bg-white text-slate-500'}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* 任务列表 */}
            <div className="space-y-2.5">
              {filteredTasks.map((t) => (
                <button key={t.id} onClick={() => t.status !== '已完成' && setActiveTask(t)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${subjectColor[t.subject]}`}>{t.subject}</span>
                    <span className="text-[11px] text-slate-400">{t.kind}</span>
                    <span className={`ml-auto rounded px-1.5 py-0.5 text-[10.5px] font-medium ${statusStyle[t.status]}`}>{t.status}</span>
                  </div>
                  <div className="mt-2 text-[14px] font-medium text-slate-900">{t.title}</div>
                  <p className="mt-0.5 text-[12px] text-slate-500">{t.detail}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${t.status === '已逾期' ? 'bg-red-400' : 'bg-[#0C3B2E]'}`} style={{ width: `${t.progress}%` }} />
                    </div>
                    <span className="text-[11px] text-slate-400">{t.progress}%</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className={`flex items-center gap-1 ${t.status === '已逾期' ? 'text-red-500' : 'text-slate-400'}`}>
                      {t.status === '已逾期' ? <AlertCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      截止 {t.deadline}
                    </span>
                    {t.status !== '已完成' && (
                      <span className="flex items-center gap-0.5 font-medium text-[#0C3B2E]">
                        {t.progress > 0 ? '继续' : '开始'}<ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {t.status === '已完成' && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" />已判卷</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'wrong' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-slate-900">错题本</h2>
              <span className="text-[12px] text-slate-400">共 {filteredWq.length} 条 · 待二刷 {wrongQuestions.filter((q) => q.status === '待二刷').length} 条</span>
            </div>
            <div className="flex gap-2">
              {['全部', '听力', '阅读', '写作', '口语'].map((s) => (
                <button key={s} onClick={() => setWqSubject(s)}
                  className={`rounded-full px-3 py-1 text-[12px] ${wqSubject === s ? 'bg-[#0C3B2E] text-white' : 'bg-white text-slate-500'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {filteredWq.map((q) => (
                <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${subjectColor[q.subject]}`}>{q.subject}</span>
                    <span className="text-[12.5px] font-medium text-slate-800">{q.source}</span>
                    <span className="text-[11px] text-slate-400">{q.type}</span>
                    <span className={`ml-auto rounded px-1.5 py-0.5 text-[10.5px] font-medium ${wqStatusStyle[q.status]}`}>{q.status}</span>
                  </div>
                  <p className="mt-2 text-[12px] text-slate-500"><span className="text-slate-400">错因：</span>{q.wrongReason}</p>
                  <div className="mt-2 rounded-lg bg-[#0C3B2E]/5 p-2.5 text-[12px] leading-relaxed text-slate-600">
                    <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[#E8734A]" />{q.aiNote}
                  </div>
                  {q.status === '待二刷' && (
                    <button className="mt-2.5 flex items-center gap-1 rounded-lg bg-[#0C3B2E] px-3 py-1.5 text-[11.5px] text-white">
                      开始二刷<ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'score' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-[14px] font-semibold text-slate-900">历次模考成绩趋势</h3>
              <p className="mt-0.5 text-[11.5px] text-slate-400">共 {mockExams.length} 次模考</p>
              <div className="mt-3 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis domain={[4, 8]} tick={{ fontSize: 10 }} />
                    <RTooltip />
                    <Line type="monotone" dataKey="总分" stroke="#0C3B2E" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="听力" stroke="#0e7490" strokeWidth={1} dot={false} strokeDasharray="4 3" />
                    <Line type="monotone" dataKey="阅读" stroke="#0284c7" strokeWidth={1} dot={false} strokeDasharray="4 3" />
                    <Line type="monotone" dataKey="写作" stroke="#65a30d" strokeWidth={1} dot={false} strokeDasharray="4 3" />
                    <Line type="monotone" dataKey="口语" stroke="#E8734A" strokeWidth={1} dot={false} strokeDasharray="4 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {radarData.map((g) => (
                <div key={g.group} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h4 className="text-[13px] font-semibold text-slate-800">{g.group}能力评估</h4>
                  <div className="mt-1 h-[170px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={g.dims.map((d, i) => ({ dim: d, score: g.scores[i] }))}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="dim" tick={{ fontSize: 9.5, fill: '#64748b' }} />
                        <Radar dataKey="score" stroke="#0C3B2E" fill="#0C3B2E" fillOpacity={0.25} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#E8734A]/20 bg-[#E8734A]/5 p-4">
              <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-[#E8734A]" /> AI 备考建议
              </div>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[12.5px] leading-relaxed text-slate-600">
                <li><b>听课重点：</b>明天写作课的「论点展开与论据支持」是你当前最弱项（55 分），务必预习</li>
                <li><b>刷题重点：</b>阅读同义替换（58 分）——优先二刷错题本中 2 道填空题，再做推送的专项练习</li>
                <li><b>错题复盘：</b>本周还有 3 条错题待二刷，建议今天完成听力选择题 1 道</li>
                <li><b>提分预测：</b>按当前趋势，8 月中旬模考有望达到 6.5，距目标 7.0 主要差距在写作</li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div className="space-y-3">
            <h2 className="text-[16px] font-semibold text-slate-900">近期课表</h2>
            {studentSchedule.map((c) => (
              <div key={c.course} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-[#0C3B2E] px-2 py-1 text-[11px] font-medium text-white">{c.day}</span>
                  <span className="text-[11px] text-slate-400">{c.date} · {c.time}</span>
                  <span className="ml-auto rounded bg-blue-50 px-1.5 py-0.5 text-[10.5px] text-blue-600">{c.status}</span>
                </div>
                <div className="mt-2 text-[14px] font-medium text-slate-900">{c.course}</div>
                <p className="mt-0.5 text-[12px] text-slate-500">授课教师：{c.teacher}</p>
                <div className="mt-2">
                  <span className="text-[11.5px] text-slate-400">听课重点建议：</span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {c.focus.map((f) => (
                      <span key={f} className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 底部导航 */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl">
          {[
            { key: 'home', icon: Home, label: '学习任务' },
            { key: 'wrong', icon: BookX, label: '错题本' },
            { key: 'score', icon: TrendingUp, label: '成绩分析' },
            { key: 'schedule', icon: CalendarDays, label: '课表' },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 ${tab === t.key ? 'text-[#0C3B2E]' : 'text-slate-400'}`}>
              <t.icon className="h-5 w-5" />
              <span className="text-[10.5px]">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {activeTask && <HomeworkFlow task={activeTask} onClose={() => setActiveTask(null)} />}
    </div>
  );
}
