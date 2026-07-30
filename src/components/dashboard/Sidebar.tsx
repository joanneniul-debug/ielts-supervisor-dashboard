import { useNavigate } from 'react-router';
import { GraduationCap, LayoutDashboard, Users, BookOpenCheck, FolderOpen, Settings, Building2, HeartHandshake, ArrowLeftRight } from 'lucide-react';

const subNav = [
  { icon: Users, label: '学员看板' },
  { icon: BookOpenCheck, label: '教师反馈管理' },
  { icon: FolderOpen, label: '学员档案库' },
  { icon: Settings, label: '系统设置' },
];

export default function Sidebar({
  adminTab,
  onAdminSwitch,
}: {
  adminTab?: 'teaching' | 'service';
  onAdminSwitch?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col bg-[#0C3B2E] text-white">
      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8734A]">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-[15px] font-semibold leading-tight">启德考培</div>
          <div className="text-[11px] text-white/60">教学管理平台 · 主管端</div>
        </div>
      </div>

      <div className="px-3">
        <div className="rounded-lg bg-white/10 px-3 py-2 text-[12px] text-white/80 flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" />
          一期试点 · 全国 8 城 12 校区
        </div>
      </div>

      <nav className="mt-5 flex-1 space-y-1 px-3">
        <div className="px-2 pb-2 text-[11px] tracking-wider text-white/40">主管菜单</div>
        <button
          onClick={adminTab === 'service' ? onAdminSwitch : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors ${
            adminTab === 'teaching' || adminTab === undefined
              ? 'bg-[#D9F2E3] font-medium text-[#0C3B2E]'
              : 'text-white/75 hover:bg-white/10 hover:text-white'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          教学主管看板
        </button>
        <button
          onClick={adminTab === 'teaching' ? onAdminSwitch : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors ${
            adminTab === 'service'
              ? 'bg-[#D9F2E3] font-medium text-[#0C3B2E]'
              : 'text-white/75 hover:bg-white/10 hover:text-white'
          }`}
        >
          <HeartHandshake className="h-4 w-4" />
          教服主管看板
        </button>

        <div className="px-2 pt-4 pb-2 text-[11px] tracking-wider text-white/40">通用</div>
        {subNav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-2">
        <button
          onClick={() => navigate('/')}
          className="flex w-full items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-[12px] text-white/70 hover:bg-white/10"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          返回四端首页
        </button>
      </div>

      <div className="border-t border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D9F2E3] text-[12px] font-semibold text-[#0C3B2E]">万</div>
          <div>
            <div className="text-[13px]">万佳宁 Sophie</div>
            <div className="text-[11px] text-white/50">教学管理部 · 主管</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
