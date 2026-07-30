import { useNavigate } from 'react-router';
import { GraduationCap, BookOpenCheck, HeartHandshake, LayoutDashboard, ArrowRight, Sparkles } from 'lucide-react';

const roles = [
  {
    path: '/student',
    icon: GraduationCap,
    color: '#0C3B2E',
    bg: 'bg-[#0C3B2E]',
    name: '学生端',
    desc: '课前预习 · 课后作业 · 错题二刷 · AI 专项推送 · 模考能力分析',
    tag: '手机端 / 小程序',
  },
  {
    path: '/teacher',
    icon: BookOpenCheck,
    color: '#E8734A',
    bg: 'bg-[#E8734A]',
    name: '教师端',
    desc: '我的班级 · 作业批改 · 课堂反馈一键提交 · AI 自动解析',
    tag: 'PC 工作台',
  },
  {
    path: '/advisor',
    icon: HeartHandshake,
    color: '#0e7490',
    bg: 'bg-[#0e7490]',
    name: '班主任端',
    desc: '跟进任务 · 出勤预警 · 家长沟通 · 续费管理',
    tag: 'PC 工作台',
  },
  {
    path: '/admin',
    icon: LayoutDashboard,
    color: '#4d7c0f',
    bg: 'bg-[#4d7c0f]',
    name: '管理端',
    desc: '教学主管看板 · 教服主管看板 · 风险监控 · 质量管理',
    tag: '教学主管 / 教服主管',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8734A]">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-slate-900">启德考培 · 雅思智能学习平台</h1>
            <p className="text-[13px] text-slate-500">课前课后练习学习 × AI 分析 × 教学教辅一体化（演示环境）</p>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-[#0C3B2E] px-3 py-1 text-[12px] text-white">
            <Sparkles className="h-3.5 w-3.5" /> AI 驱动
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {roles.map((r) => (
            <button
              key={r.path}
              onClick={() => navigate(r.path)}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${r.bg}`}>
                  <r.icon className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500">{r.tag}</span>
              </div>
              <h2 className="mt-4 text-[18px] font-semibold text-slate-900">{r.name}</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{r.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-[13px] font-medium" style={{ color: r.color }}>
                进入{r.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-[14px] font-semibold text-slate-900">平台数据闭环</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-slate-600">
            <span className="rounded-lg bg-[#0C3B2E]/5 px-3 py-1.5">学生练习作答</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="rounded-lg bg-[#0C3B2E]/5 px-3 py-1.5">AI 判卷 + 错题归因</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="rounded-lg bg-[#0C3B2E]/5 px-3 py-1.5">专项推送 + 错题二刷</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="rounded-lg bg-[#E8734A]/10 px-3 py-1.5">教师课堂反馈</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="rounded-lg bg-[#0e7490]/10 px-3 py-1.5">班主任跟进干预</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="rounded-lg bg-[#4d7c0f]/10 px-3 py-1.5">主管风险监控与质量管理</span>
          </div>
        </div>
      </div>
    </div>
  );
}
