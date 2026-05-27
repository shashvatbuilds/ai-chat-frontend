import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e) {

    e.preventDefault()

    try {

      const formData = new URLSearchParams()

      formData.append("username", email)
      formData.append("password", password)

      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          body: formData
        }
      )

      const data = await response.json()

      console.log(data)

      if (response.ok) {

        localStorage.setItem(
          "token",
          data.access_token
        )

        alert("Login Successful")

        navigate("/chat")

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
        onSubmit={handleLogin}
        className="bg-zinc-900 p-10 rounded-2xl w-[400px] space-y-5"
      >

        <h1 className="text-white text-3xl font-bold text-center">
          Login
        </h1>

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
          Login
        </button>

      </form>

    </div>

  )
}

export default Login