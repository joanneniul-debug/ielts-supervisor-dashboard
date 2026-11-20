import { useState } from 'react';
import { Bell, Search, RefreshCw } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import TodoPanel from '../components/dashboard/supervisor/TodoPanel';
import TeacherLoad from '../components/dashboard/supervisor/TeacherLoad';
import WorkMonitor from '../components/dashboard/supervisor/WorkMonitor';
import TeachingResults from '../components/dashboard/supervisor/TeachingResults';
import ClassData from '../components/dashboard/supervisor/ClassData';
import StudentData from '../components/dashboard/supervisor/StudentData';
import TrialManage from '../components/dashboard/supervisor/TrialManage';
import ResearchSupport from '../components/dashboard/supervisor/ResearchSupport';
import { cities, citySites } from '../data/mock';

const timeRanges = ['近 7 天', '近 30 天', '本季度'] as const;

const tabs = [
  { key: 'todo', label: '待办' },
  { key: 'load', label: '教师负荷' },
  { key: 'monitor', label: '工作监控' },
  { key: 'results', label: '教学结果' },
  { key: 'class', label: '班级数据' },
  { key: 'student', label: '学员数据' },
  { key: 'trial', label: '试听管理' },
  { key: 'research', label: '教研支持' },
] as const;
type TabKey = (typeof tabs)[number]['key'];

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
  const [tab, setTab] = useState<TabKey>('todo');

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
                待办审批 · 教师负荷与工作监控 · 教学结果 · 班级/学员数据 · 试听管理 · 教研支持
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-slate-400">
                <RefreshCw className="h-3 w-3" />
                数据更新于 2026-11-20 09:30 · 已对接雅托邦与教务系统（演示环境）
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

          {/* 功能页签 */}
          <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-lg px-4 py-2 text-[13px] transition-colors ${
                  tab === t.key ? 'bg-[#0C3B2E] font-medium text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 页签内容 */}
          {tab === 'todo' && <TodoPanel />}
          {tab === 'load' && <TeacherLoad />}
          {tab === 'monitor' && <WorkMonitor />}
          {tab === 'results' && <TeachingResults />}
          {tab === 'class' && <ClassData />}
          {tab === 'student' && <StudentData />}
          {tab === 'trial' && <TrialManage />}
          {tab === 'research' && <ResearchSupport />}

          <p className="pt-1 text-center text-[11px] text-slate-300">
            当前筛选：{city} / {site} / {timeRange}（演示环境，筛选器已预留全模块联动）
          </p>
        </main>
      </div>
    </div>
  );
}
