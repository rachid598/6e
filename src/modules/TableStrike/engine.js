// Tables par niveau (Progression REP)
export const LEVELS = [
  { id: 1, label: 'N1', title: 'Tables 2, 5, 10', tables: [2, 5, 10], color: 'from-emerald-400 to-teal-500' },
  { id: 2, label: 'N2', title: 'Tables 3, 4', tables: [3, 4], color: 'from-blue-400 to-indigo-500' },
  { id: 3, label: 'N3', title: 'Tables 6, 7, 8, 9', tables: [6, 7, 8, 9], color: 'from-orange-400 to-red-500' },
  { id: 4, label: 'N4', title: 'Mix total + Inversions', tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], color: 'from-purple-500 to-pink-500' },
]

export const QUESTIONS_PER_ROUND = 10

/**
 * Génère une question aléatoire
 * - mode "direct" : a × b = ?
 * - mode "trou"   : a × ? = résultat
 */
export function generateQuestion(tables) {
  const a = tables[Math.floor(Math.random() * tables.length)]
  const b = Math.floor(Math.random() * 9) + 2 // 2..10
  const result = a * b

  // 50/50 entre direct et trou
  const isDirect = Math.random() < 0.5

  if (isDirect) {
    return {
      mode: 'direct',
      display: `${a} × ${b} = ?`,
      a,
      b,
      answer: result,
    }
  }

  // Calcul à trous : on cherche b
  return {
    mode: 'trou',
    display: `${a} × ? = ${result}`,
    a,
    b,
    answer: b,
  }
}

/**
 * Génère un set de questions sans doublon consécutif
 */
export function generateRound(tables, count = QUESTIONS_PER_ROUND) {
  const questions = []
  let lastKey = ''
  for (let i = 0; i < count; i++) {
    let q
    let key
    let attempts = 0
    do {
      q = generateQuestion(tables)
      key = `${q.a}-${q.b}-${q.mode}`
      attempts++
    } while (key === lastKey && attempts < 20)
    lastKey = key
    questions.push(q)
  }
  return questions
}
