import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-6">
          Eternal Chat
        </h1>

        <p className="text-zinc-400 text-xl mb-10">
          Your intelligent AI conversation companion. Chat, learn, and explore ideas with persistent AI memory.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black px-8 py-3 rounded-xl font-bold"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-zinc-800 text-white px-8 py-3 rounded-xl font-bold border border-zinc-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home