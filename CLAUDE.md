# Maths 6e — PWA Architecture

## Projet
Application PWA **mobile-first** pour les eleves de 6e en REP.
Objectif : Automatiser les tables de multiplication et les operations via des jeux interactifs.

## Stack technique
- **React 19** (Vite 7) + **Tailwind CSS 4** (plugin Vite)
- **react-router-dom** (HashRouter) pour la navigation
- **canvas-confetti** pour les animations de reussite
- **Web Audio API** pour les sons (sans fichier audio externe)
- **PWA manuelle** (manifest.json + sw.js dans /public)

## Structure du projet
```
src/
├── main.jsx                  # Point d'entree + HashRouter
├── App.jsx                   # Routeur principal + gestion profil + badges + dark mode
├── index.css                 # Tailwind + dark mode + animations custom
├── hooks/
│   ├── usePlayer.js          # Profil local (prenom/classe/avatar/darkMode) via localStorage
│   ├── useSound.js           # Sons synthetises via Web Audio API + vibration haptique
│   ├── useHistory.js         # Historique des sessions + export JSON
│   └── useBadges.js          # Systeme de badges/trophees (15 badges)
├── components/
│   ├── Onboarding.jsx        # Ecran de bienvenue (prenom + choix avatar)
│   ├── Hub.jsx               # Hub principal avec 6 jeux + badges/historique/export
│   ├── Keypad.jsx            # Pave numerique tactile (obligatoire)
│   ├── ProgressBar.jsx       # Barre de progression + streak doree
│   ├── Stars.jsx             # Systeme d'etoiles (1/2/3) par score
│   ├── BadgeToast.jsx        # Toast notification nouveau badge
│   ├── BadgesScreen.jsx      # Ecran complet des badges
│   ├── HistoryChart.jsx      # Graphique en barres des sessions
│   └── PageTransition.jsx    # Animation slide-up entre ecrans
└── modules/
    ├── TableStrike/           # Tables de multiplication (4 niveaux REP)
    │   ├── TableStrike.jsx
    │   ├── LevelPicker.jsx
    │   └── engine.js          # + repetition espacee des tables faibles
    ├── Divisix/               # Division euclidienne (4 niveaux)
    │   ├── Divisix.jsx
    │   └── engine.js
    ├── ChronoTables/          # Mode contre-la-montre 60s
    │   └── ChronoTables.jsx
    ├── OperaMix/              # Mix +, -, x (10 questions)
    │   └── OperaMix.jsx
    ├── DailyChallenge/        # Defi du jour (seed par date)
    │   └── DailyChallenge.jsx
    └── Duel/                  # Duel local 2 joueurs
        └── Duel.jsx

public/
├── manifest.json             # Config PWA
├── sw.js                     # Service Worker (stale-while-revalidate)
├── _headers                  # Headers securite + cache (Netlify/Cloudflare)
├── favicon.svg               # Icone SVG
├── icon-192.png              # Icone PWA 192x192
└── icon-512.png              # Icone PWA 512x512
```

## Modules de jeu

### Table-Strike
- 4 niveaux REP : N1 (2,5,10), N2 (3,4), N3 (6,7,8,9), N4 (Mix+Inversions)
- Modes direct (`6 x 7 = ?`) et trou (`6 x ? = 42`) alernes 50/50
- Repetition espacee : les tables ratees reviennent plus souvent
- Mode sans erreur (gold card a 5 streak, diamant a 10 streak)
- Etoiles : 1 (>=5/10), 2 (>=8/10), 3 (10/10)

### Divisix
- Division euclidienne, meme structure que Table-Strike
- 4 niveaux : diviser par 2,5,10 / 3,4 / 6,7,8,9 / Mix total
- Modes direct et trou

### Chrono-Tables
- 60 secondes, toutes tables
- Compteur de bonnes reponses
- Record personnel sauvegarde

### Opera-Mix
- 10 questions melangeant +, - et x
- Score et etoiles

### Defi du jour
- 10 questions identiques pour tous (seed = date)
- Un seul essai par jour
- Compteur de defis completes

### Duel Local
- 2 joueurs sur le meme telephone, chacun son tour
- 5 questions partagees
- Affichage du gagnant + score

## Systeme de progression

### Etoiles (Stars)
- 1 etoile : score >= 50% du total
- 2 etoiles : score >= 80%
- 3 etoiles : score = 100%

### Badges (15 au total)
- Premiere partie, 10 parties, 50 parties
- Sans faute (10/10), Triple parfait (3x 10/10)
- Inarretable (streak 10), Legende (streak 20)
- Etoile N1/N2/N3/N4 (3 etoiles par niveau)
- Explorateur (4+ modules joues)
- Rapide (30+ en Chrono), Regulier (5 defis), Champion duel

### Historique
- 50 dernieres sessions sauvegardees
- Graphique en barres par session
- Statistiques : parties, moyenne, parfaits

### Export
- Telechargement JSON (profil + scores + historique + badges)
- Fichier nomme par date

## Features UX
- **Dark mode** : toggle dans le hub, persiste dans localStorage
- **Vibration haptique** : succes (30ms), erreur (50-30-50ms), confettis (pattern)
- **Temps moyen** : affiche par question en fin de partie (Table-Strike)
- **Transitions** : slide-up entre ecrans
- **Power-ups** : carte gold (5 streak), carte diamant (10 streak)

## Profil Joueur (usePlayer)
- Stocke dans localStorage (`maths6e_player`)
- Champs : prenom, classe, avatar (emoji), darkMode, createdAt
- Selection d'avatar au premier lancement (8 choix : renard, chat, chien, lapin, hibou, robot, alien, licorne)

## Conventions
- **Mobile-first** : tout est concu pour ecran tactile
- **Pas de dependance audio** : sons generes via Web Audio API
- **HashRouter** : compatibilite hebergement statique
- **localStorage** : aucun backend necessaire
- Animations CSS custom : pop-in, shake, gold-glow, slide-up

## Commandes
```bash
npm run dev      # Serveur de developpement
npm run build    # Build de production -> dist/
npm run preview  # Previsualisation du build
```

## Ajout d'un nouveau module de jeu
1. Creer `src/modules/NomDuJeu/` avec composant principal + engine
2. Ajouter la route dans `App.jsx`
3. Ajouter la carte dans le tableau `GAMES` de `Hub.jsx`
4. Ajouter le badge check dans `makeBadgeCheck` de `App.jsx`
