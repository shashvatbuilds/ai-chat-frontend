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
        "http://127.0.0.1:8000/auth/register",
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

      console.log(data)

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

    <div className="h-screen bg-zinc-950 flex items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-10 rounded-2xl w-[400px] space-y-5"
      >

        <h1 className="text-white text-3xl font-bold text-center">
          Register
        </h1>

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
          className="w-full bg-white text-black p-3 rounded-lg font-bold cursor-pointer"
        >
          Register
        </button>

      </form>

    </div>

  )
}

export default Register