import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e) {

    e.preventDefault()

    try {

      const response = await fetch(
        "https://ai-chat-backend-zsqv.onrender.com/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

        alert("Registration Successful")

        navigate("/login")

      } else {

        alert(data.detail)

      }

    } catch (error) {

      console.log(error)

      alert("Something went wrong")

    }

  }

  return (

    <div className="h-screen bg-zinc-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-10 rounded-2xl w-full max-w-[400px] space-y-5"
      >

        <div className="text-center">

          <h1 className="text-white text-4xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-zinc-400">
            Start chatting with Eternal Chat
          </p>

        </div>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-white text-black p-3 rounded-lg font-bold cursor-pointer hover:bg-zinc-200 transition"
        >
          Register
        </button>

        <p className="text-zinc-400 text-center">

          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-white cursor-pointer font-bold hover:underline"
          >
            Login
          </span>

        </p>

      </form>

    </div>

  )
}

export default Register