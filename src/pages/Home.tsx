import { useState } from 'react';
import { Bell, Search, RefreshCw } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import KpiRow from '../components/dashboard/KpiRow';
import TeacherTable from '../components/dashboard/TeacherTable';
import RiskRadar from '../components/dashboard/RiskRadar';
import RefundWarnings from '../components/dashboard/RefundWarnings';
import ProgressStars from '../components/dashboard/ProgressStars';
import ClassGrades from '../components/dashboard/ClassGrades';
import TrialLessons from '../components/dashboard/TrialLessons';
import { cities, citySites } from '../data/mock';

const timeRanges = ['近 7 天', '近 30 天', '本学期'] as const;

export default function Home({
  adminTab,
  onAdminSwitch,
}: {
  adminTab?: 'teaching' | 'service';
  onAdminSwitch?: () => void;
}) {
  const [timeRange, setTimeRange] = useState<(typeof timeRanges)[number]>('近 30 天');
  const [city, setCity] = useState('全部城市');
  const [site, setSite] = useState('全部校区');
  const scopeText = site !== '全部校区' ? site : city;

  return (
    <div className="min-h-screen bg-[#F4F6F5]">
      <Sidebar adminTab={adminTab} onAdminSwitch={onAdminSwitch} />

      <div className="pl-[220px]">
        {/* 顶栏 */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
          <span className="text-[14px] font-medium text-slate-700">教学主管看板</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] text-slate-400">
              <Search className="h-3.5 w-3.5" />
              搜索学员姓名、学号、教师…
            </div>
            <button className="relative rounded-full p-2 hover:bg-slate-100">
              <Bell className="h-4 w-4 text-slate-500" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        <main className="space-y-5 p-6">
          {/* 标题与筛选 */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[24px] font-bold text-slate-900">教学主管看板</h1>
              <p className="mt-1 text-[13px] text-slate-500">
                老师课量、学生数、作业与批改、授课反馈完成率、所带学生出分情况 · AI 智能反馈风险监控
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-slate-400">
                <RefreshCw className="h-3 w-3" />
                数据更新于 2026-07-27 09:30 · 已对接雅托邦与教务系统（演示环境）
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={city}
                onChange={(e) => { setCity(e.target.value); setSite('全部校区'); }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] text-slate-700 shadow-sm outline-none focus:border-[#0C3B2E]"
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                disabled={city === '全部城市'}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] text-slate-700 shadow-sm outline-none focus:border-[#0C3B2E] disabled:bg-slate-50 disabled:text-slate-300"
              >
                {(city === '全部城市' ? ['全部校区'] : ['全部校区', ...citySites[city]]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
                {timeRanges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`rounded-md px-3.5 py-1.5 text-[12.5px] transition-colors ${
                      timeRange === r ? 'bg-[#0C3B2E] font-medium text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <KpiRow />

          <ClassGrades />

          <TrialLessons />

          {/* AI 智能反馈分析区 */}
          <div className="flex items-center gap-3 pt-2">
            <div className="rounded-md bg-[#0C3B2E] px-2 py-1 text-[11px] font-medium text-white">AI</div>
            <h2 className="text-[16px] font-semibold text-slate-900">智能反馈分析</h2>
            <span className="text-[12px] text-slate-400">基于教师课堂评语的智能解析与风险监控</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <RiskRadar />
            <RefundWarnings />
          </div>

          <ProgressStars />

          {/* 教师教学表现 */}
          <div className="flex items-center gap-3 pt-2">
            <h2 className="text-[16px] font-semibold text-slate-900">教师教学管理</h2>
            <span className="text-[12px] text-slate-400">统计范围：{timeRange} · {scopeText}</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <TeacherTable city={city} site={site} />
        </main>
      </div>
    </div>
  );
}
