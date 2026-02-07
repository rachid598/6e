import { useState, useCallback } from 'react'

const STORAGE_KEY = 'maths6e_player'

export function usePlayer() {
  const [player, setPlayer] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const savePlayer = useCallback((data) => {
    const profile = {
      prenom: data.prenom.trim(),
      classe: data.classe.trim(),
      avatar: data.avatar,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    setPlayer(profile)
  }, [])

  const resetPlayer = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setPlayer(null)
  }, [])

  return { player, savePlayer, resetPlayer }
}
