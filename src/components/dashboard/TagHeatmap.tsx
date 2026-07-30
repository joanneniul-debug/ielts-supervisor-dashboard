import { Fragment, useMemo, useState } from 'react';
import { Flame } from 'lucide-react';
import { heatmapDims, heatmapWeeks, heatmapData } from '../../data/mock';

const ranges = ['本周', '本月', '本学期'] as const;
type Range = (typeof ranges)[number];

function sliceFor(range: Range) {
  if (range === '本周') return { start: 7, end: 8 };
  if (range === '本月') return { start: 4, end: 8 };
  return { start: 0, end: 8 };
}

const dimColors: Record<string, [number, number, number]> = {
  听力: [14, 116, 144],
  阅读: [2, 132, 199],
  写作: [12, 59, 46],
  口语: [232, 115, 74],
  学习行为: [100, 116, 139],
  风险预警: [220, 38, 38],
};

export default function TagHeatmap() {
  const [range, setRange] = useState<Range>('本月');
  const { start, end } = sliceFor(range);

  const { weeks, rows, max } = useMemo(() => {
    const weeks = heatmapWeeks.slice(start, end);
    const rows = heatmapDims.map((dim, i) => ({
      dim,
      values: heatmapData[i].slice(start, end),
    }));
    const max = Math.max(...rows.flatMap((r) => r.values));
    return { weeks, rows, max };
  }, [start, end]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <Flame className="h-4 w-4 text-[#0C3B2E]" />
            学员问题趋势热力图
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">AI 从课堂反馈中识别的问题频次 · 颜色越深问题越集中</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1 text-[12px] transition-colors ${
                range === r ? 'bg-white font-medium text-[#0C3B2E] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="grid" style={{ gridTemplateColumns: `64px repeat(${weeks.length}, 1fr)` }}>
          <div />
          {weeks.map((w) => (
            <div key={w} className="pb-2 text-center text-[11px] text-slate-400">{w}</div>
          ))}
          {rows.map((row) => {
            const [r, g, b] = dimColors[row.dim];
            return (
              <Fragment key={row.dim}>
                <div className="flex items-center text-[12px] font-medium text-slate-600">{row.dim}</div>
                {row.values.map((v, i) => {
                  const alpha = 0.08 + (v / max) * 0.85;
                  const hot = v > max * 0.8;
                  return (
                    <div key={`${row.dim}-${i}`} className="p-0.5">
                      <div
                        title={`${row.dim} · ${weeks[i]}：${v} 次`}
                        className={`flex h-9 items-center justify-center rounded-md text-[11px] transition-transform hover:scale-105 ${
                          hot ? 'font-semibold text-white' : 'text-slate-700'
                        }`}
                        style={{ backgroundColor: `rgba(${r},${g},${b},${alpha})`, color: alpha > 0.55 ? '#fff' : undefined }}
                      >
                        {v}
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-slate-400">
          <span>低</span>
          <div className="h-2 w-24 rounded-full" style={{ background: 'linear-gradient(to right, rgba(12,59,46,0.08), rgba(12,59,46,0.93))' }} />
          <span>高</span>
        </div>
      </div>
    </div>
  );
}
