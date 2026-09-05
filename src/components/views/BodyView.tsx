import React, { useState } from 'react';
import type { BodyMeasurement } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { StretchingGirlIllustration } from '../illustrations/StretchingGirlIllustration';

interface BodyViewProps {
  measurements: BodyMeasurement[];
}

export const BodyView: React.FC<BodyViewProps> = ({ measurements }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '1m' | '3m' | '6m'>('3m');

  const chartData = measurements.map(m => ({
    date: m.date.slice(5),
    weightKg: m.weightKg,
    strengthScore: m.strengthScore || 75,
    waistCm: m.waistCm
  }));

  const latestWeight = measurements.length > 0 ? `${measurements[measurements.length - 1].weightKg} kg` : '--';
  const latestWaist = measurements.length > 0 && measurements[measurements.length - 1].waistCm ? `${measurements[measurements.length - 1].waistCm} cm` : '--';

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="bg-gradient-to-r from-pink-100/90 via-sky-50/80 to-pink-50/90 rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-pink-glow flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-200/70 px-3 py-1 rounded-full border border-pink-300/60 shadow-xs">
              Body & Health
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-2">Weight & Body Measurements ⚖️</h2>
          <p className="text-sm font-semibold text-pink-700 mt-1">
            "Weight is not your definition of success. Celebrate strength, stamina, and consistency!"
          </p>
        </div>

        {/* Animated Girl Stretching Illustration */}
        <div className="shrink-0 flex items-center justify-center relative z-10 transform hover:scale-105 transition duration-300">
          <StretchingGirlIllustration size="md" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Weight</p>
          <p className="text-2xl font-extrabold text-pink-600 mt-1">{latestWeight}</p>
          <p className="text-[11px] text-slate-500 font-medium">{measurements.length} record(s)</p>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Waist Measurement</p>
          <p className="text-2xl font-extrabold text-sky-600 mt-1">{latestWaist}</p>
          <p className="text-[11px] text-slate-500 font-medium">Progress tracking</p>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Strength Indicator</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{measurements.length > 0 ? '75/100' : '--'}</p>
          <p className="text-[11px] text-slate-500 font-medium">Body composition</p>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Logs Count</p>
          <p className="text-2xl font-extrabold text-purple-600 mt-1">{measurements.length}</p>
          <p className="text-[11px] text-slate-500 font-medium">Total entries</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 text-lg">Body Trends Overview</h3>
          <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
            {(['7d', '1m', '3m', '6m'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  timeRange === range
                    ? 'bg-white text-pink-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {measurements.length > 0 ? (
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}
                />
                <Line type="monotone" dataKey="strengthScore" name="Strength Score" stroke="#c084fc" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="weightKg" name="Weight (kg)" stroke="#f472b6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="p-8 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
            <p className="text-sm font-extrabold text-slate-700">No body measurements recorded yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Log your weight and measurements in the Move & Progress tab to view your progress trend chart!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
