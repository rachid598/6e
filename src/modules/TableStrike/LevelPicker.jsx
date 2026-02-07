import { LEVELS } from './engine'

export default function LevelPicker({ onSelect, bestScores }) {
  return (
    <div className="space-y-3">
      {LEVELS.map((level) => {
        const score = bestScores[level.id]
        return (
          <button
            key={level.id}
            onClick={() => onSelect(level)}
            className={`animate-slide-up w-full text-left p-4 rounded-2xl shadow-md
              bg-gradient-to-r ${level.color} text-white
              active:scale-[0.97] transition-transform`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono opacity-80">{level.label}</span>
                <h3 className="font-bold text-lg leading-tight">{level.title}</h3>
              </div>
              {score !== undefined && (
                <span className="bg-white/25 px-3 py-1 rounded-full text-sm font-bold">
                  {score}/{10}
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
