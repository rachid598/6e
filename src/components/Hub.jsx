import { useNavigate } from 'react-router-dom'

const GAMES = [
  {
    id: 'table-strike',
    title: 'Table-Strike',
    description: 'Maîtrise tes tables de multiplication !',
    emoji: '\u26A1',
    color: 'from-indigo-500 to-purple-500',
    path: '/table-strike',
    active: true,
  },
  {
    id: 'coming-soon-1',
    title: 'Bientôt...',
    description: 'Nouveau module en préparation',
    emoji: '\uD83D\uDD12',
    color: 'from-gray-300 to-gray-400',
    path: null,
    active: false,
  },
]

export default function Hub({ player, onReset }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{player.avatar?.emoji || '\uD83C\uDFB2'}</span>
            <div>
              <p className="font-bold text-primary-dark leading-tight">
                {player.prenom}
              </p>
              <p className="text-xs text-gray-400">{player.classe}</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-danger px-2 py-1 rounded"
          >
            Changer
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-extrabold text-primary-dark mb-1">
            {'\uD83C\uDFAF'} Mes Jeux
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Choisis un module et entraîne-toi !
          </p>

          <div className="space-y-4">
            {GAMES.map((game, i) => (
              <button
                key={game.id}
                onClick={() => game.active && navigate(game.path)}
                disabled={!game.active}
                className={`animate-slide-up w-full text-left p-5 rounded-2xl shadow-md
                  bg-gradient-to-r ${game.color} text-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.98] transition-transform`}
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{game.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold">{game.title}</h2>
                    <p className="text-sm opacity-80">{game.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-300 py-3">
        Maths 6e &mdash; PWA v1.0
      </footer>
    </div>
  )
}
