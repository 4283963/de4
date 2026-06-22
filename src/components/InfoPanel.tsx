import { RefreshCw, Users, MapPin, Clock, Activity } from 'lucide-react';
import { useExhibitionStore } from '@/stores/useStore';
import { formatTime } from '@/utils/heatmap';
import { useTrafficData } from '@/hooks/useTrafficData';

export function InfoPanel() {
  const { traffic, totalCount, updatedAt, isLoading, selectedBoothId, getTrafficByBoothId, booths } =
    useExhibitionStore();
  const { refreshTraffic } = useTrafficData(30000);

  const selectedBooth = booths.find((b) => b.id === selectedBoothId);
  const selectedTraffic = selectedBoothId ? getTrafficByBoothId(selectedBoothId) : null;

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'high':
        return { text: '高客流', color: 'text-rose-400', bg: 'bg-rose-500/20' };
      case 'medium':
        return { text: '中客流', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
      default:
        return { text: '低客流', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    }
  };

  return (
    <div className="absolute left-6 top-6 bottom-6 w-80 flex flex-col gap-4 z-10">
      <div className="backdrop-blur-xl bg-slate-900/70 rounded-2xl border border-cyan-500/20 p-5 shadow-2xl shadow-cyan-500/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">展厅数字孪生</h1>
            <p className="text-xs text-cyan-400/70 mt-0.5">EXHIBITION DIGITAL TWIN</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>总客流</span>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">{totalCount}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>展位数量</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400 tabular-nums">{traffic.length}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>更新时间: {updatedAt ? formatTime(updatedAt) : '--:--:--'}</span>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-slate-900/70 rounded-2xl border border-cyan-500/20 p-5 shadow-2xl shadow-cyan-500/5 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">客流热力图例</h2>
          <button
            onClick={() => refreshTraffic()}
            disabled={isLoading}
            className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500" />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mb-5">
          <span>低</span>
          <span>中</span>
          <span>高</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>展位客流排行</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {[...traffic]
            .sort((a, b) => b.count - a.count)
            .map((item, index) => {
              const levelInfo = getLevelLabel(item.level);
              const isSelected = selectedBoothId === item.booth_id;
              return (
                <div
                  key={item.booth_id}
                  className={`p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border border-cyan-500/40'
                      : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 w-4">
                        {index + 1}
                      </span>
                      <span className="text-sm text-white font-medium">{item.name}</span>
                    </div>
                    <span className="text-lg font-bold text-white tabular-nums">
                      {item.count}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${levelInfo.bg} ${levelInfo.color}`}>
                      {levelInfo.text}
                    </span>
                    <div className="w-20 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.level === 'high'
                            ? 'bg-rose-500'
                            : item.level === 'medium'
                              ? 'bg-yellow-400'
                              : 'bg-emerald-500'
                        }`}
                        style={{
                          width: `${(item.count / Math.max(...traffic.map((t) => t.count))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {selectedBooth && selectedTraffic && (
        <div className="backdrop-blur-xl bg-slate-900/90 rounded-2xl border-2 border-cyan-500/40 p-5 shadow-2xl shadow-cyan-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400 font-medium">选中展位</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{selectedBooth.name}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-400 mb-1">当前客流</p>
              <p className="text-2xl font-bold text-white tabular-nums">{selectedTraffic.count}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">客流等级</p>
              <p
                className={`text-lg font-bold ${
                  selectedTraffic.level === 'high'
                    ? 'text-rose-400'
                    : selectedTraffic.level === 'medium'
                      ? 'text-yellow-400'
                      : 'text-emerald-400'
                }`}
              >
                {selectedTraffic.level === 'high' ? '高' : selectedTraffic.level === 'medium' ? '中' : '低'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
