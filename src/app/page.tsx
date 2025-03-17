import Link from "next/link";

export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-600">
      <div className="bg-red-600 p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-4">Welcome to Pokémon Memory Match!</h1>
        <p className="text-white font-bold text-center max-w-2xl px-4">Test your memory with the Pokémon Memory Match game! Flip the cards, find matching Pokémon pairs, and challenge yourself to win as few attempts as possible</p>
        <Link href="/game" className="flex justify-center">
          <button className="mt-4 px-6 py-3 font-bold bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-800">
            Play Game
          </button>
        </Link>
      </div>
    </div>
    );
}
