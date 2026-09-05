import React from 'react';
import type { MealItem, MealType } from '../../types';
import { Plus } from 'lucide-react';
import { EatingGirlIllustration } from '../illustrations/EatingGirlIllustration';

interface FoodViewProps {
  meals: MealItem[];
  onOpenLogMeal: (type?: MealType) => void;
}

export const FoodView: React.FC<FoodViewProps> = ({
  meals,
  onOpenLogMeal
}) => {
  const mealSections: { type: MealType; title: string; emoji: string }[] = [
    { type: 'breakfast', title: 'Sunrise Breakfast', emoji: '🌅' },
    { type: 'lunch', title: 'Midday Lunch', emoji: '☀️' },
    { type: 'snack', title: 'Afternoon Snack', emoji: '🍎' },
    { type: 'dinner', title: 'Evening Dinner', emoji: '🌙' },
  ];

  const proteinCount = meals.filter(m => m.tags?.protein).length;
  const fiberCount = meals.filter(m => m.tags?.fiber).length;
  const vegCount = meals.filter(m => m.tags?.vegetables).length;
  const fruitCount = meals.filter(m => m.tags?.fruit).length;

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="bg-gradient-to-r from-sky-100/90 via-pink-50/80 to-sky-50/90 rounded-3xl p-6 sm:p-8 border border-sky-200/80 shadow-sky-glow flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-200/70 px-3 py-1 rounded-full border border-sky-300/60 shadow-xs">
              Food & Nourishment
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-2">Nourish Your Body 🥗</h2>
          <p className="text-sm font-semibold text-sky-800 mt-1">
            "Your food balance" — Enjoy fresh, vibrant meals without calorie stress.
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Focus on protein, fiber, greens, and nutrient-dense foods that fuel your energy.
          </p>

          <button
            onClick={() => onOpenLogMeal()}
            className="mt-4 px-6 py-3.5 bg-gradient-to-r from-sky-400 via-teal-400 to-pink-400 text-white font-extrabold text-xs rounded-2xl shadow-sky-glow hover:brightness-105 transition flex items-center gap-2 shrink-0 animate-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Log Meal / Dish</span>
          </button>
        </div>

        {/* Animated Girl Eating Illustration */}
        <div className="shrink-0 flex items-center justify-center relative z-10 transform hover:scale-105 transition duration-300">
          <EatingGirlIllustration size="md" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Today's Nourishment Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
            <span className="text-2xl">🥩</span>
            <div>
              <p className="text-xs font-extrabold text-rose-900">Protein</p>
              <p className="text-[11px] text-rose-700 font-medium">
                {proteinCount > 0 ? `Logged in ${proteinCount} meal(s)` : 'Not logged today'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <p className="text-xs font-extrabold text-amber-900">Fiber & Grains</p>
              <p className="text-[11px] text-amber-700 font-medium">
                {fiberCount > 0 ? `Logged in ${fiberCount} meal(s)` : 'Not logged today'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <span className="text-2xl">🥦</span>
            <div>
              <p className="text-xs font-extrabold text-emerald-900">Vegetables</p>
              <p className="text-[11px] text-emerald-700 font-medium">
                {vegCount > 0 ? `Logged in ${vegCount} meal(s)` : 'Not logged today'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
            <span className="text-2xl">🍎</span>
            <div>
              <p className="text-xs font-extrabold text-sky-900">Fresh Fruit</p>
              <p className="text-[11px] text-sky-700 font-medium">
                {fruitCount > 0 ? `Logged in ${fruitCount} meal(s)` : 'Not logged today'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {mealSections.map(sec => {
          const mealList = meals.filter(m => m.mealType === sec.type);
          return (
            <div key={sec.type} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{sec.emoji}</span>
                  <h3 className="font-extrabold text-slate-800 text-lg">{sec.title}</h3>
                </div>
                <button
                  onClick={() => onOpenLogMeal(sec.type)}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log {sec.title.split(' ')[1]}
                </button>
              </div>

              {mealList.length > 0 ? (
                <div className="space-y-3">
                  {mealList.map(meal => (
                    <div key={meal.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-base">{meal.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{meal.portion} • {meal.notes}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {meal.tags.protein && <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md font-bold">🥩 Protein</span>}
                        {meal.tags.fiber && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-bold">🌾 Fiber</span>}
                        {meal.tags.vegetables && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">🥦 Veggies</span>}
                        {meal.tags.fruit && <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md font-bold">🍎 Fruit</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-medium">No meal logged for {sec.title.toLowerCase()} yet.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
