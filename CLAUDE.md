# Maths 6e — PWA Architecture

## Projet
Application PWA **mobile-first** pour les élèves de 6e en REP.
Objectif : Automatiser les tables de multiplication via des jeux interactifs.

## Stack technique
- **React 19** (Vite 7) + **Tailwind CSS 4** (plugin Vite)
- **react-router-dom** (HashRouter) pour la navigation
- **canvas-confetti** pour les animations de réussite
- **Web Audio API** pour les sons (sans fichier audio externe)
- **PWA manuelle** (manifest.json + sw.js dans /public)

## Structure du projet
```
src/
├── main.jsx              # Point d'entrée + HashRouter
├── App.jsx               # Routeur principal + gestion profil
├── index.css             # Tailwind + animations custom
├── hooks/
│   ├── usePlayer.js      # Profil local (prénom/classe/avatar) via localStorage
│   └── useSound.js       # Sons synthétisés via Web Audio API
├── components/
│   ├── Onboarding.jsx    # Écran de bienvenue (prénom + choix avatar)
│   ├── Hub.jsx           # Hub principal avec liste des jeux
│   ├── Keypad.jsx        # Pavé numérique tactile (obligatoire)
│   └── ProgressBar.jsx   # Barre de progression + streak dorée
└── modules/
    └── TableStrike/
        ├── TableStrike.jsx  # Composant principal du jeu
        ├── LevelPicker.jsx  # Sélecteur de niveaux
        └── engine.js        # Génération des questions + config niveaux

public/
├── manifest.json         # Config PWA
├── sw.js                 # Service Worker (cache-first)
├── _headers              # Headers sécurité + cache (Netlify/Cloudflare)
├── favicon.svg           # Icône SVG
├── icon-192.png          # Icône PWA 192x192
└── icon-512.png          # Icône PWA 512x512
```

## Module Table-Strike

### Niveaux (Progression REP)
| Niveau | Tables      | Couleur             |
|--------|-------------|---------------------|
| N1     | 2, 5, 10   | Emerald → Teal      |
| N2     | 3, 4        | Blue → Indigo       |
| N3     | 6, 7, 8, 9 | Orange → Red        |
| N4     | Mix + Inv.  | Purple → Pink       |

### Modes de questionnement
- **Résultat direct** : `6 × 7 = ?` (réponse = 42)
- **Calcul à trous** : `6 × ? = 42` (réponse = 7)
- Alternance aléatoire 50/50 entre les deux modes

### Gameplay
- 10 questions par round
- Pavé numérique tactile (max 3 chiffres)
- Feedback immédiat : vert = correct, rouge + shake = erreur
- Barre de progression avec compteur de streak
- **Mode "Sans erreur"** : carte dorée après 5 bonnes réponses d'affilée
- Confettis + son de victoire à 10/10
- Meilleurs scores sauvegardés par niveau dans localStorage

## Profil Joueur (usePlayer)
- Stocké dans localStorage (`maths6e_player`)
- Champs : prénom, classe, avatar (emoji animal/robot)
- Sélection d'avatar au premier lancement (8 choix)

## Conventions
- **Mobile-first** : tout est conçu pour écran tactile
- **Pas de dépendance audio** : sons générés via Web Audio API
- **HashRouter** : compatibilité hébergement statique
- **localStorage** : aucun backend nécessaire
- Animations CSS custom : pop-in, shake, gold-glow, slide-up

## Commandes
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production → dist/
npm run preview  # Prévisualisation du build
```

## Ajout d'un nouveau module de jeu
1. Créer `src/modules/NomDuJeu/` avec composant principal + engine
2. Ajouter la route dans `App.jsx`
3. Ajouter la carte dans le tableau `GAMES` de `Hub.jsx`
