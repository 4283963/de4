import { Scene } from '@/components/Scene';
import { InfoPanel } from '@/components/InfoPanel';
import { useTrafficData } from '@/hooks/useTrafficData';

export function Dashboard() {
  useTrafficData(30000);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#05070f]">
      <Scene />
      <InfoPanel />

      <div className="absolute top-6 right-6 z-10">
        <div className="backdrop-blur-xl bg-slate-900/70 rounded-2xl border border-cyan-500/20 px-5 py-3 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white font-medium">系统运行中</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10">
        <div className="backdrop-blur-xl bg-slate-900/70 rounded-2xl border border-cyan-500/20 px-4 py-3 shadow-2xl shadow-cyan-500/5">
          <p className="text-xs text-slate-400 mb-2">操作提示</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>🖱️ 拖拽旋转</span>
            <span>🔍 滚轮缩放</span>
            <span>👆 点击查看详情</span>
          </div>
        </div>
      </div>
    </div>
  );
}
