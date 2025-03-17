# Pokémon Memory Match Game

A Pokémon-themed memory game built with **Next.js, React, and TypeScript**.

## ⚙️ Getting Started

### Prerequisites
Ensure you have the following installed before setting up the project:

- **Node.js:** >=18.17.0 (Recommended: Latest LTS)
- **npm:** Comes with Node.js

### Installation
Clone the repository and install dependencies:
```
git clone git@github.com:perpepajn25/poke-memory-game.git
cd poke-memory-game
npm install
```

### Running the App
To start the development server, run:
```
npm run dev
```
The app will be available at `http://localhost:3000`.


## 🚀 Tech Stack
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

## 🎮 How to Play
1. Flip two cards to find matching Pokémon.
2. Match all pairs to win the game.
3. Try to complete it in the fewest moves possible!
4. Reset the game

## 🛠 Future Improvements
- Make card jsx DRY (loading card state and the unflipped card state are duplicated)
- Move card display/rendering logic into a new components folder

## 🔮 Possible Features
1. Add drop down selector for game difficulty (increase board size/pairs)
2. Add option to time the game
3. Add leader board page for all completed games (attempts, time)
4. Extend cards to include more information on each Pokémon
