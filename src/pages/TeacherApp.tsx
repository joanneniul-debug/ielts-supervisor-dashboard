import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  PenLine, FolderOpen, MessageSquareText, BookOpenCheck, BarChart3,
  Plus, Upload, X, Clock, Eye, Star, Sparkles, Send, FileText, MonitorPlay, Video, AudioLines,
  CheckCircle2, LayoutDashboard, Users, CalendarDays, AlertTriangle, TrendingUp,
  Library, Wand2, History,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer,
  LineChart, Line,
} from 'recharts';
import {
  assignments as initAssignments, questionBanks, materials as initMaterials, pendingLessons,
  feedbackStudents, gradingQueue as initQueue, quickComments, classAnalytics, teacherHome,
  imaKnowledgeBases, prepSkills, scoreBandAdvice, lastLessonGrading,
  aiPreGradeWriting, aiPreGradeSpeaking,
  type Assignment, type Material, type GradingItem,
} from '../data/platform';

const subjectColor: Record<string, string> = {
  听力: 'bg-cyan-100 text-cyan-700',
  阅读: 'bg-sky-100 text-sky-700',
  写作: 'bg-emerald-100 text-emerald-700',
  口语: 'bg-orange-100 text-orange-700',
};

const materialIcon: Record<string, typeof FileText> = {
  PPT课件: MonitorPlay, 视频: Video, 音频: AudioLines, PDF文档: FileText,
};

type ModuleKey = 'home' | 'assignment' | 'material' | 'feedback' | 'grading' | 'analytics';

const modules = [
  { key: 'home' as ModuleKey, icon: LayoutDashboard, label: '工作台' },
  { key: 'assignment' as ModuleKey, icon: PenLine, label: '作业管理' },
  { key: 'material' as ModuleKey, icon: FolderOpen, label: '资料管理' },
  { key: 'feedback' as ModuleKey, icon: MessageSquareText, label: '授课反馈' },
  { key: 'grading' as ModuleKey, icon: BookOpenCheck, label: '批改中心' },
  { key: 'analytics' as ModuleKey, icon: BarChart3, label: '班级学情' },
];

function ProgressBar({ label, value, total, accent }: { label: string; value: number; total: number; accent?: boolean }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 text-[11px] text-slate-400">{label}</span>
      <div className="h-1.5 w-28 rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${accent ? 'bg-[#E8734A]' : 'bg-[#0C3B2E]'}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11.5px] text-slate-500">{value}/{total}</span>
    </div>
  );
}

// ================= 作业管理 =================
function AssignmentModule() {
  const [list, setList] = useState<Assignment[]>(initAssignments);
  const [showModal, setShowModal] = useState(false);
  const [bank, setBank] = useState(questionBanks[0]);
  const [published, setPublished] = useState(false);

  const publish = () => {
    setList([{ id: `a${Date.now()}`, subject: '写作', source: `雅托邦 · ${bank}`, title: '大作文：教育类话题（雅托邦·9分真题库 卷8）', className: '雅思强化A班', deadline: '2026-07-30 20:00', submitted: 0, total: 12, graded: 0, gradedTotal: 0 }, ...list]);
    setShowModal(false);
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-slate-900">作业管理</h2>
          <p className="mt-1 text-[12.5px] text-slate-500">从雅托邦题库选题组卷，布置给班级学生</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 rounded-lg bg-[#0C3B2E] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#0a3328]">
          <Plus className="h-4 w-4" /> 布置作业
        </button>
      </div>

      {published && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[12.5px] text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> 作业已发布，已微信通知班级学生
        </div>
      )}

      <div className="mt-4 space-y-3">
        {list.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${subjectColor[a.subject]}`}>{a.subject}</span>
              <span className="text-[11px] text-slate-400">{a.source}</span>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1 text-[11.5px] text-slate-400"><Clock className="h-3 w-3" /> 截止 {a.deadline}</div>
                <div className="mt-0.5 text-[11.5px] text-slate-400">{a.className}</div>
              </div>
            </div>
            <h3 className="mt-2 text-[15px] font-semibold text-slate-900">{a.title}</h3>
            <div className="mt-3 flex items-center gap-6">
              <ProgressBar label="提交进度" value={a.submitted} total={a.total} />
              <ProgressBar label="批改进度" value={a.graded} total={a.gradedTotal} accent />
              <span className="ml-auto text-[12.5px] text-slate-500">
                {a.avg ? <>平均分 <span className="font-semibold text-slate-800">{a.avg}</span></> : <span className="text-slate-300">暂无评分</span>}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-[480px] rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-slate-900">布置新作业</h3>
              <button onClick={() => setShowModal(false)} className="rounded-full p-1 hover:bg-slate-100"><X className="h-4 w-4 text-slate-500" /></button>
            </div>
            <label className="mt-4 block">
              <span className="text-[12px] text-slate-500">作业标题</span>
              <input defaultValue="大作文：教育类话题（9分真题库 卷8）" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-[#0C3B2E]" />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[12px] text-slate-500">科目</span>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none">
                  {['写作', '听力', '阅读', '口语'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[12px] text-slate-500">目标班级</span>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none">
                  {['雅思强化A班', '雅思冲刺C班', '雅思基础B班'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-3">
              <span className="text-[12px] text-slate-500">题库来源（雅托邦）</span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {questionBanks.map((b) => (
                  <button key={b} onClick={() => setBank(b)}
                    className={`rounded-lg px-3 py-1.5 text-[12px] ${bank === b ? 'bg-[#0C3B2E] text-white' : 'border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <label className="mt-3 block">
              <span className="text-[12px] text-slate-500">截止时间</span>
              <input defaultValue="2026-07-30 20:00" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-[#0C3B2E]" />
            </label>
            <button onClick={publish} className="mt-5 w-full rounded-lg bg-[#0C3B2E] py-2.5 text-[13.5px] font-medium text-white hover:bg-[#0a3328]">
              发布作业并通知学生
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= 资料管理 =================
function MaterialModule() {
  const [filter, setFilter] = useState('全部');
  const [showModal, setShowModal] = useState(false);
  const [list] = useState<Material[]>(initMaterials);
  const filtered = list.filter((m) => filter === '全部' || m.stage === filter);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-slate-900">资料管理</h2>
          <p className="mt-1 text-[12.5px] text-slate-500">上传 PPT 课件、视频、音频等资料，作为课前预习或课后巩固任务发布给学生</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 rounded-lg bg-[#0C3B2E] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#0a3328]">
          <Upload className="h-4 w-4" /> 上传并发布
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {imaKnowledgeBases.map((kb) => (
          <div key={kb.campus} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0C3B2E]/5">
                <Library className="h-4 w-4 text-[#0C3B2E]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-slate-800">{kb.name}</div>
                <div className="text-[10.5px] text-slate-400">{kb.campus}</div>
              </div>
              <span className="rounded-full bg-[#E8734A]/10 px-2 py-0.5 text-[10px] font-medium text-[#E8734A]">ima</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {kb.highlights.map((h) => (
                <span key={h} className="rounded-full bg-slate-50 px-2 py-0.5 text-[10.5px] text-slate-500 ring-1 ring-slate-100">{h}</span>
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>{kb.docs} 篇资料 · 更新于 {kb.updated}</span>
              <button className="font-medium text-[#0C3B2E] hover:underline">进入知识库</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        {['全部', '课前预习', '课后巩固'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-lg px-3.5 py-1.5 text-[12.5px] ${filter === f ? 'bg-[#0C3B2E] text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11.5px] text-slate-400">
              <th className="px-4 py-3 font-medium">资料</th>
              <th className="py-3 font-medium">类型</th>
              <th className="py-3 font-medium">阶段</th>
              <th className="py-3 font-medium">班级</th>
              <th className="py-3 font-medium">发布日期</th>
              <th className="px-4 py-3 text-right font-medium">学生已读</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              const Icon = materialIcon[m.type];
              return (
                <tr key={m.id} className="border-b border-slate-50 text-[12.5px] last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C3B2E]/5">
                        <Icon className="h-4 w-4 text-[#0C3B2E]" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{m.title}</div>
                        <div className="text-[11px] text-slate-400">{m.file}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-600">{m.type}</td>
                  <td className="py-3.5">
                    <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium ${m.stage === '课前预习' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>{m.stage}</span>
                  </td>
                  <td className="py-3.5 text-slate-600">{m.className}</td>
                  <td className="py-3.5 text-slate-600">{m.date}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="flex items-center justify-end gap-1 text-slate-600"><Eye className="h-3.5 w-3.5 text-slate-300" />{m.read}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-[480px] rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-slate-900">上传并发布资料</h3>
              <button onClick={() => setShowModal(false)} className="rounded-full p-1 hover:bg-slate-100"><X className="h-4 w-4 text-slate-500" /></button>
            </div>
            <div className="mt-4">
              <span className="text-[12px] text-slate-500">选择文件（支持 PPT / PDF / 视频 / 音频）</span>
              <div className="mt-1.5 flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-[#E8734A]/40 text-[12.5px] text-slate-400">
                点击或拖拽文件到此处上传（单个不超过 50MB）
              </div>
            </div>
            <label className="mt-3 block">
              <span className="text-[12px] text-slate-500">资料标题</span>
              <input placeholder="如：小作文图表题句型精讲" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-[#0C3B2E]" />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[12px] text-slate-500">使用阶段</span>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none">
                  <option>课前预习</option><option>课后巩固</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[12px] text-slate-500">目标班级</span>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none">
                  {['雅思强化A班', '雅思冲刺C班', '雅思基础B班'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-5 w-full rounded-lg bg-[#0C3B2E] py-2.5 text-[13.5px] font-medium text-white">
              发布资料并通知学生
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= 授课反馈 =================
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} onClick={() => onChange(i)}>
          <Star className={`h-4 w-4 ${i <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
        </button>
      ))}
    </div>
  );
}

function FeedbackModule() {
  const [lesson, setLesson] = useState(pendingLessons[1]);
  const [student, setStudent] = useState(feedbackStudents[0].name);
  const [ratings, setRatings] = useState({ performance: 4, mastery: 4, cooperation: 5 });
  const [note, setNote] = useState('课堂参与度不错，地图题路径跟踪有进步，from/behind 方位词偶尔混淆，作业错题已订正。');
  const [optimized, setOptimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = feedbackStudents.find((s) => s.name === student);

  const optimize = () => {
    setNote('本节课整体表现良好：课堂参与度高，地图题路径跟踪能力较上节课有明显进步；需要注意 from/behind 等方位词仍存在混淆，建议课后完成方位词听写专项（已推送至学生端「自主练习」）。上次作业错题已全部订正，值得肯定。');
    setOptimized(true);
  };

  return (
    <div>
      <div>
        <h2 className="text-[20px] font-bold text-slate-900">授课反馈</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">按课次填写授课内容与课堂反馈，反馈仅学生本人和家长可见</p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* 待办课次 */}
        <div className="space-y-2.5">
          {pendingLessons.map((l) => (
            <button key={l.id} onClick={() => { setLesson(l); setSubmitted(false); setOptimized(false); }}
              className={`w-full rounded-xl border p-3.5 text-left transition-colors ${lesson.id === l.id ? 'border-[#0C3B2E] bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-slate-900">{l.className}</span>
                <span className="text-[10.5px] text-slate-400">{l.classCode}</span>
                <span className={`ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium ${
                  l.status === '进行中' ? 'bg-blue-100 text-blue-600' : l.status === '待开始' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-600'
                }`}>{l.status}</span>
              </div>
              <p className="mt-1 text-[12px] text-slate-600">{l.course} · {l.topic}</p>
              <div className="mt-2 flex items-center gap-2 text-[10.5px]">
                <span className="text-slate-400">{l.time}</span>
                <span className={`ml-auto rounded px-1.5 py-0.5 ${
                  l.feedback === '已提交' ? 'bg-emerald-50 text-emerald-600' : l.feedback === '草稿中' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
                }`}>反馈{l.feedback}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 反馈编辑 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          {submitted ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <h3 className="mt-3 text-[15px] font-semibold text-slate-900">反馈已提交并通知家长</h3>
              <p className="mt-1 max-w-[360px] text-[12.5px] leading-relaxed text-slate-500">
                已生成微信分享卡片发送给 {student} 的家长；AI 已将「地图方位词反应」写入该生档案，并同步教学主管看板。
              </p>
              <button onClick={() => setSubmitted(false)} className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-[12.5px] text-slate-600">继续填写其他学生</button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-[14.5px] font-semibold text-slate-900">{lesson.className} · {lesson.topic}</h3>
                <span className="text-[11px] text-slate-400">{lesson.time}</span>
              </div>

              {/* AI 提示：上节课作业批改情况 */}
              <div className="mt-3 rounded-lg border border-[#E8734A]/25 bg-[#E8734A]/[0.04] p-3.5">
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#E8734A]">
                  <History className="h-3.5 w-3.5" />
                  AI 提示 · 上节课作业批改情况
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white py-2 ring-1 ring-slate-100">
                    <div className="text-[15px] font-bold text-slate-900">{lastLessonGrading.submitted}/{lastLessonGrading.total}</div>
                    <div className="text-[10.5px] text-slate-400">提交</div>
                  </div>
                  <div className="rounded-lg bg-white py-2 ring-1 ring-slate-100">
                    <div className="text-[15px] font-bold text-slate-900">{lastLessonGrading.avgScore}</div>
                    <div className="text-[10.5px] text-slate-400">平均得分</div>
                  </div>
                  <div className="rounded-lg bg-white py-2 ring-1 ring-slate-100">
                    <div className="text-[15px] font-bold text-red-500">{lastLessonGrading.notSubmitted.length} 人未交</div>
                    <div className="text-[10.5px] text-slate-400">{lastLessonGrading.notSubmitted.join('、')}</div>
                  </div>
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-slate-600">
                  <span className="font-medium text-slate-700">集中错因：</span>{lastLessonGrading.commonWrong}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-slate-600">
                  <Sparkles className="mr-1 inline h-3 w-3 text-[#E8734A]" />
                  {lastLessonGrading.aiTip}
                </p>
                <p className="mt-1 text-[10.5px] text-slate-400">作业：{lastLessonGrading.assignment}</p>
              </div>

              <div className="mt-3">
                <span className="text-[12px] text-slate-500">选择学生</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {feedbackStudents.map((s) => (
                    <button key={s.name} onClick={() => { setStudent(s.name); setOptimized(false); }}
                      className={`rounded-lg px-3 py-1.5 text-[12px] ${student === s.name ? 'bg-[#0C3B2E] text-white' : 'border border-slate-200 text-slate-600'}`}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {([['课堂表现', 'performance'], ['知识掌握', 'mastery'], ['配合度', 'cooperation']] as const).map(([label, key]) => (
                  <div key={key} className="rounded-lg border border-slate-100 p-3 text-center">
                    <div className="text-[11.5px] text-slate-500">{label}</div>
                    <div className="mt-1.5 flex justify-center">
                      <StarRating value={ratings[key]} onChange={(v) => setRatings({ ...ratings, [key]: v })} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500">本堂课反馈</span>
                  <button onClick={optimize} className="flex items-center gap-1 rounded-lg bg-[#E8734A]/10 px-2.5 py-1 text-[11.5px] font-medium text-[#E8734A] hover:bg-[#E8734A]/20">
                    <Sparkles className="h-3.5 w-3.5" /> AI 一键优化
                  </button>
                </div>
                <textarea value={note} onChange={(e) => setNote(e.target.value)}
                  className="mt-1.5 h-28 w-full rounded-lg border border-slate-200 p-3 text-[12.5px] leading-relaxed outline-none focus:border-[#0C3B2E]" />
                {optimized && (
                  <div className="mt-2 rounded-lg bg-[#0C3B2E]/5 p-3">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#0C3B2E]">
                      <Sparkles className="h-3.5 w-3.5" /> AI 识别要点（写入学生档案）
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {['地图方位词反应', '课堂参与度', '错题订正习惯'].map((p) => (
                        <span key={p} className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-600 ring-1 ring-slate-200">{p}</span>
                      ))}
                    </div>
                  </div>
                )}
                {current && <p className="mt-2 text-[11px] text-slate-400">历史反馈参考：{current.note}</p>}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[12px] text-slate-500">上次作业完成情况</span>
                  <input defaultValue="作业完成质量良好，错题已订正" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[12.5px] outline-none focus:border-[#0C3B2E]" />
                </label>
                <label className="block">
                  <span className="text-[12px] text-slate-500">下节课程要点</span>
                  <input defaultValue="写作 Task2 议论文结构与论证" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[12.5px] outline-none focus:border-[#0C3B2E]" />
                </label>
              </div>

              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-400">
                本反馈仅该学生本人和其家长可见，其他学生无法查看。
              </p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-[12.5px] text-slate-600">保存草稿</button>
                <button onClick={() => setSubmitted(true)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0C3B2E] py-2 text-[13px] font-medium text-white">
                  <Send className="h-3.5 w-3.5" /> 提交并微信通知家长
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= 批改中心 =================
function GradingModule() {
  const [queue, setQueue] = useState<GradingItem[]>(initQueue);
  const [active, setActive] = useState<GradingItem>(initQueue[0]);
  const [done, setDone] = useState(0);

  const submitReview = () => {
    const rest = queue.filter((q) => q.id !== active.id);
    setQueue(rest);
    setDone(done + 1);
    if (rest.length > 0) setActive(rest[0]);
  };

  return (
    <div>
      <div>
        <h2 className="text-[20px] font-bold text-slate-900">批改中心</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          待批改 {queue.length} 份{done > 0 && `（本次已批 ${done} 份）`} · 客观题已由雅托邦自动判分，老师重点复评写作与口语
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* 队列 */}
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:col-span-2">
          <div className="px-2 pb-2 text-[12px] font-medium text-slate-500">待批改队列</div>
          <div className="max-h-[520px] space-y-1 overflow-y-auto">
            {queue.map((q) => (
              <button key={q.id} onClick={() => setActive(q)}
                className={`w-full rounded-lg p-3 text-left ${active.id === q.id ? 'bg-[#0C3B2E]/5 ring-1 ring-[#0C3B2E]/20' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-slate-900">{q.student}</span>
                  <span className={`ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium ${subjectColor[q.subject]}`}>{q.subject}</span>
                </div>
                <p className="mt-0.5 truncate text-[11.5px] text-slate-500">{q.assignment}</p>
                <p className="mt-0.5 text-[10.5px] text-slate-400">提交于 {q.submitTime}</p>
              </button>
            ))}
            {queue.length === 0 && (
              <div className="p-6 text-center text-[12.5px] text-emerald-600">🎉 队列已清空，全部批改完成</div>
            )}
          </div>
        </div>

        {/* 批改详情 */}
        {queue.length > 0 && (
          <div className="space-y-4 lg:col-span-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-slate-900">{active.student} · {active.subject}</h3>
                <span className="flex items-center gap-1 text-[11.5px] text-slate-400"><FileText className="h-3.5 w-3.5" /> 学生作答原文</span>
              </div>
              <p className="mt-1 text-[11.5px] text-slate-400">{active.assignment}</p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3.5 text-[13px] leading-relaxed text-slate-700">{active.content}</div>
              {/* AI 预批改（口语/写作维度分，供老师参考） */}
              {(() => {
                const pre = active.subject === '写作' ? aiPreGradeWriting : active.subject === '口语' ? aiPreGradeSpeaking : null;
                return (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/60 p-3.5">
                    <div className="flex items-center gap-2 text-[12.5px] font-semibold text-amber-800">
                      <Sparkles className="h-4 w-4" /> AI 预批改 {active.aiScore} 分
                      <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">仅供老师参考 · 以复评为准</span>
                    </div>
                    <p className="mt-1 text-[12px] text-amber-700">{active.aiDetail}</p>
                    {pre && (
                      <>
                        <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {pre.dims.map((d) => (
                            <div key={d.label} className="flex items-center gap-2">
                              <span className="w-24 text-[11px] text-slate-500">{d.label}</span>
                              <div className="h-1.5 flex-1 rounded-full bg-white">
                                <div className={`h-full rounded-full ${d.score >= 6.5 ? 'bg-emerald-500' : d.score >= 6 ? 'bg-amber-400' : 'bg-red-400'}`}
                                  style={{ width: `${(d.score / 9) * 100}%` }} />
                              </div>
                              <span className="w-7 text-right text-[11.5px] font-semibold text-slate-700">{d.score.toFixed(1)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2.5 space-y-1.5">
                          {pre.annotations.map((a) => (
                            <div key={a.quote} className="rounded-lg bg-white/80 px-3 py-2 text-[11.5px] ring-1 ring-amber-100">
                              <span className="font-medium text-amber-800">“{a.quote}”</span>
                              <span className="ml-1.5 text-slate-500">{a.note}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-600">{active.aiAdvice}</p>
                  </div>
                );
              })()}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-[13px] font-semibold text-slate-900">老师复评</h4>
              <div className="mt-3 flex items-center gap-2">
                <input placeholder="分数（如 6.5）" defaultValue={active.aiScore}
                  className="w-32 rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-[#0C3B2E]" />
                <div className="flex flex-wrap gap-1.5">
                  {quickComments.map((c) => (
                    <button key={c} className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] text-slate-500 hover:border-[#0C3B2E] hover:text-[#0C3B2E]">{c}</button>
                  ))}
                </div>
              </div>
              <textarea placeholder="评语…" className="mt-3 h-20 w-full rounded-lg border border-slate-200 p-3 text-[12.5px] outline-none focus:border-[#0C3B2E]" />
              <button onClick={submitReview} className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#0C3B2E] px-5 py-2 text-[13px] font-medium text-white">
                <Send className="h-3.5 w-3.5" /> 发回学生并通知
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= 班级学情 =================
function AnalyticsModule() {
  const [classKey, setClassKey] = useState<'c1' | 'c2'>('c1');
  const data = classAnalytics[classKey];
  const studentNames = Object.keys(data.trends);
  const [student, setStudent] = useState(studentNames[0]);
  const trend = data.trends[student as keyof typeof data.trends];
  const trendData = useMemo(
    () => trend.scores.map((s, i) => ({ name: `第${i + 1}次`, 成绩: s })),
    [trend]
  );

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-slate-900">班级学情</h2>
          <p className="mt-1 text-[12.5px] text-slate-500">作业提交率、分数分布与学生个人趋势</p>
        </div>
        <select value={classKey} onChange={(e) => { const k = e.target.value as 'c1' | 'c2'; setClassKey(k); setStudent(Object.keys(classAnalytics[k].trends)[0]); }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12.5px] outline-none">
          <option value="c1">雅思强化A班</option>
          <option value="c2">雅思冲刺C班</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: '在读学生', value: `${data.students} 人` },
          { label: '作业平均提交率', value: `${data.submitRate}%` },
          { label: '平均准确率', value: `${data.accuracy}%` },
          { label: '课程进度', value: data.progress },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[11.5px] text-slate-400">{k.label}</div>
            <div className="mt-1.5 text-[22px] font-bold text-slate-900">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-[13.5px] font-semibold text-slate-900">最近作业分数段分布</h3>
          <div className="mt-2 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dist}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <RTooltip />
                <Bar dataKey="count" name="人数" fill="#0C3B2E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-[13.5px] font-semibold text-slate-900">学生个人详情</h3>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {studentNames.map((n) => (
              <button key={n} onClick={() => setStudent(n)}
                className={`rounded-full px-3 py-1 text-[12px] ${student === n ? 'bg-[#0C3B2E] text-white' : 'border border-slate-200 text-slate-600'}`}>
                {n}
              </button>
            ))}
          </div>
          <div className="mt-2 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[4, 9]} tick={{ fontSize: 10 }} />
                <RTooltip />
                <Line type="monotone" dataKey="成绩" stroke="#0C3B2E" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[12px]">
            <span className="text-slate-400">薄弱题型：</span>
            {trend.weak.map((w) => (
              <span key={w} className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">{w}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= 工作台首页 =================
function HomeModule() {
  const h = teacherHome;
  const statIcons = [Users, Users, CalendarDays, BookOpenCheck];
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  return (
    <div className="space-y-5">
      {/* 问候条 */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-[18px] font-bold text-slate-900">下午好，{h.greeting.name}老师</h2>
        <p className="mt-1 text-[13px] text-slate-500">{h.greeting.summary}</p>
      </div>

      {/* 统计卡 */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {h.stats.map((s, i) => {
          const Icon = statIcons[i];
          return (
            <div key={s.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0C3B2E]/5">
                <Icon className="h-5 w-5 text-[#0C3B2E]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500">{s.label}</div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[22px] font-bold text-slate-900">{s.value}</span>
                  <span className="text-[12px] text-slate-400">{s.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* 左列：今日课程 + 我的班级 */}
        <div className="space-y-5 xl:col-span-2">
          {/* 今日课程 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <CalendarDays className="h-4 w-4 text-[#E8734A]" />
              今日课程
            </h3>
            <div className="mt-3 space-y-2.5">
              {h.todayClasses.map((c) => (
                <div key={c.title} className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3">
                  <span className="w-28 shrink-0 text-[13px] font-semibold text-[#0C3B2E]">{c.time}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-medium text-slate-800">{c.title}</div>
                    <div className="mt-0.5 text-[11.5px] text-slate-400">{c.klass}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${subjectColor[c.subject] ?? 'bg-slate-100 text-slate-600'}`}>
                    {c.subject}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 我的班级 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <Users className="h-4 w-4 text-[#E8734A]" />
              我的班级
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              {h.myClasses.map((c) => (
                <div key={c.name} className="rounded-lg border border-slate-100 p-4">
                  <div className="text-[13.5px] font-semibold text-slate-800">{c.name}</div>
                  <div className="mt-1 text-[11.5px] text-slate-400">{c.schedule} · {c.students}人</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-[12px] text-slate-500">
                      均分 <span className="text-[16px] font-bold text-[#0C3B2E]">{c.avg.toFixed(1)}</span>
                    </div>
                    <ProgressBar label="进度" value={c.progress} total={c.total} accent />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 提分成绩 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <TrendingUp className="h-4 w-4 text-[#E8734A]" />
              我的提分成绩
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {h.scoreRates.map((r) => (
                <div key={r.label} className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-3">
                  <div className="text-[11.5px] text-slate-500">{r.label}</div>
                  <div className="mt-1 text-[18px] font-bold text-[#0C3B2E]">{r.value}</div>
                  <div className="mt-0.5 text-[10.5px] text-slate-400">{r.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右列：AI 备课 + 需要关注 + 提分榜 + 待填反馈 */}
        <div className="space-y-5">
          {/* AI 备课助手 · 已安装 Skills */}
          <div className="rounded-xl border border-[#E8734A]/25 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <Wand2 className="h-4 w-4 text-[#E8734A]" />
              AI 备课助手
              <span className="rounded-full bg-[#E8734A]/10 px-2 py-0.5 text-[10px] font-medium text-[#E8734A]">Skills</span>
            </h3>
            <div className="mt-3 space-y-2">
              {prepSkills.map((s) => (
                <button key={s.name} onClick={() => setActiveSkill(activeSkill === s.name ? null : s.name)}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
                    activeSkill === s.name ? 'border-[#0C3B2E] bg-[#0C3B2E]/5' : 'border-slate-100 hover:border-slate-200'
                  }`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#0C3B2E]" />
                    <span className="text-[13px] font-medium text-slate-800">{s.name}</span>
                    <span className="ml-auto rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">已安装</span>
                  </div>
                  <div className="mt-0.5 pl-5 text-[11px] text-slate-400">{s.desc}</div>
                </button>
              ))}
            </div>
            {activeSkill === '分数段对应建议' && (
              <div className="mt-3 rounded-lg border border-[#0C3B2E]/15 bg-[#0C3B2E]/[0.03] p-3.5">
                <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#0C3B2E]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {scoreBandAdvice.className} · 分数段差异化建议
                </div>
                <div className="mt-2 space-y-2.5">
                  {scoreBandAdvice.bands.map((b) => (
                    <div key={b.band} className="rounded-lg bg-white p-3 ring-1 ring-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#0C3B2E] px-1.5 py-0.5 text-[10.5px] font-medium text-white">{b.band}</span>
                        <span className="text-[11px] text-slate-400">{b.students} 人</span>
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">{b.focus}</p>
                      <p className="mt-1 text-[11px] text-slate-400">作业建议：{b.homework}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-2.5 w-full rounded-lg bg-[#0C3B2E] py-2 text-[12px] font-medium text-white">
                  按建议生成分层作业
                </button>
              </div>
            )}
            {activeSkill && activeSkill !== '分数段对应建议' && (
              <div className="mt-3 rounded-lg bg-slate-50 px-3.5 py-3 text-[11.5px] text-slate-500">
                <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[#E8734A]" />
                「{activeSkill}」将结合班级模考与错题数据生成方案，演示环境暂未接入真实数据。
              </div>
            )}
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              需要关注
              <span className="rounded-full bg-red-100 px-1.5 text-[11px] font-medium text-red-600">{h.attention.length}</span>
            </h3>
            <div className="mt-3 space-y-2.5">
              {h.attention.map((s) => (
                <div key={s.name} className="rounded-lg bg-red-50/60 px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-[11px] font-semibold text-red-600">
                      {s.name[0]}
                    </span>
                    <span className="text-[13px] font-medium text-slate-800">{s.name}</span>
                    <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10.5px] font-medium text-red-600">{s.level}</span>
                  </div>
                  <div className="mt-1.5 text-[12px] text-slate-500">{s.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              提分榜 TOP3
            </h3>
            <div className="mt-3 space-y-2">
              {h.topImprovers.map((t, i) => (
                <div key={t.name} className="flex items-center gap-3 rounded-lg border border-slate-50 px-3 py-2.5">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>{i + 1}</span>
                  <span className="flex-1 text-[13px] font-medium text-slate-800">{t.name}</span>
                  <span className="text-[12px] text-slate-400">{t.from} → <span className="font-semibold text-slate-700">{t.to.toFixed(1)}</span></span>
                  <span className="text-[12.5px] font-bold text-emerald-600">{t.delta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <MessageSquareText className="h-4 w-4 text-[#E8734A]" />
              待填反馈
            </h3>
            <div className="mt-3 space-y-2">
              {h.pendingFeedback.map((f) => (
                <div key={f.title} className="rounded-lg border border-slate-100 px-3.5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-slate-800">{f.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                      f.overdue ? 'bg-red-100 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>{f.status}</span>
                  </div>
                  <div className="mt-1 text-[11.5px] text-slate-400">{f.time} · {f.students}名学员</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= 主框架 =================
export default function TeacherApp() {
  const navigate = useNavigate();
  const [mod, setMod] = useState<ModuleKey>('home');

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      {/* 左侧导航 */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[200px] flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C3B2E] text-[13px] font-bold text-white">启</div>
          <div>
            <div className="text-[13.5px] font-semibold text-slate-900">启德教学平台</div>
            <div className="text-[10.5px] text-slate-400">老师工作台</div>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-2.5">
          {modules.map((m) => (
            <button key={m.key} onClick={() => setMod(m.key)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                mod === m.key ? 'bg-[#0C3B2E] font-medium text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}>
              <m.icon className="h-4 w-4" />
              {m.label}
              {m.key === 'grading' && (
                <span className={`ml-auto rounded-full px-1.5 text-[10px] ${mod === m.key ? 'bg-white/20' : 'bg-red-100 text-red-600'}`}>6</span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-2.5 pb-2">
          <button onClick={() => navigate('/')} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[11.5px] text-slate-500 hover:bg-slate-50">
            返回四端首页
          </button>
        </div>
        <div className="border-t border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8734A] text-[12px] font-semibold text-white">张</div>
            <div>
              <div className="text-[12.5px] font-medium text-slate-800">张萌 老师</div>
              <div className="text-[10.5px] text-slate-400">北京·国贸校区</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-[200px] p-6">
        {mod === 'home' && <HomeModule />}
        {mod === 'assignment' && <AssignmentModule />}
        {mod === 'material' && <MaterialModule />}
        {mod === 'feedback' && <FeedbackModule />}
        {mod === 'grading' && <GradingModule />}
        {mod === 'analytics' && <AnalyticsModule />}
      </main>
    </div>
  );
}
