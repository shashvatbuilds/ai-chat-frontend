import { useEffect, useRef, useState } from "react"
import Sidebar from "../components/Sidebar"

function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const [conversations, setConversations] = useState([])
  const [conversationId, setConversationId] = useState(null)

  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages, loading])

  async function fetchConversations() {
    const token = localStorage.getItem("token")

    const response = await fetch(
      "http://127.0.0.1:8000/conversations",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setConversations(data)

    if (data.length > 0) {
      setConversationId(data[0].id)
      fetchMessages(data[0].id)
    }
  }

  async function createConversation() {
    const token = localStorage.getItem("token")

    const response = await fetch(
      "http://127.0.0.1:8000/conversations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "New Chat"
        })
      }
    )

    const data = await response.json()

    setConversations((prev) => [data, ...prev])
    setConversationId(data.id)
    setMessages([])
  }

  async function updateConversationTitle(title) {
    const token = localStorage.getItem("token")

    const response = await fetch(
      `http://127.0.0.1:8000/conversations/${conversationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title
        })
      }
    )

    const updatedConversation = await response.json()

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === updatedConversation.id
          ? updatedConversation
          : conversation
      )
    )
  }

  async function deleteConversation(id) {
    const token = localStorage.getItem("token")

    await fetch(
      `http://127.0.0.1:8000/conversations/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const updatedConversations = conversations.filter(
      (conversation) => conversation.id !== id
    )

    setConversations(updatedConversations)

    if (conversationId === id) {
      if (updatedConversations.length > 0) {
        setConversationId(updatedConversations[0].id)
        fetchMessages(updatedConversations[0].id)
      } else {
        setConversationId(null)
        setMessages([])
      }
    }
  }

  async function fetchMessages(id) {
    const token = localStorage.getItem("token")

    const response = await fetch(
      `http://127.0.0.1:8000/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()
    setMessages(data)
  }

  function selectConversation(id) {
    setConversationId(id)
    fetchMessages(id)
  }

  async function sendMessage() {
    if (!message.trim() || !conversationId || loading) return

    const currentMessage = message
    setMessage("")
    setLoading(true)

    const currentConversation = conversations.find(
      (conversation) => conversation.id === conversationId
    )

    if (
      currentConversation &&
      currentConversation.title === "New Chat" &&
      messages.length === 0
    ) {
      const newTitle = currentMessage.slice(0, 35)
      await updateConversationTitle(newTitle)
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentMessage
      }
    ])

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(
        "http://127.0.0.1:8000/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            conversation_id: conversationId,
            message: currentMessage
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.detail || "Something went wrong")
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.ai_response
        }
      ])
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-zinc-950 text-white flex">
      <Sidebar
        conversations={conversations}
        activeConversationId={conversationId}
        onSelectConversation={selectConversation}
        onNewChat={createConversation}
        onDeleteConversation={deleteConversation}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl font-bold text-white mb-3">
                Eternal Chat
              </h1>

              <p className="text-zinc-500 text-lg">
                Your intelligent conversation companion
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  msg.role === "user"
                    ? "bg-white text-black p-4 rounded-2xl max-w-[70%]"
                    : "bg-zinc-800 p-4 rounded-2xl max-w-[70%]"
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 p-4 rounded-2xl max-w-[70%]">
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="p-5 border-t border-zinc-800 flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
            className="flex-1 p-4 rounded-xl bg-zinc-900 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-white text-black px-6 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat