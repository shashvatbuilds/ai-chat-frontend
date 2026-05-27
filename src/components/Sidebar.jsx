function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation
}) {

  function handleLogout() {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="w-[300px] bg-zinc-950 border-r border-zinc-800 p-4 flex flex-col">

      <h1 className="text-2xl font-bold text-white mb-5">
        Eternal Chat
      </h1>

      <button
        onClick={onNewChat}
        className="w-full bg-white text-black p-3 rounded-xl font-bold mb-5 hover:bg-zinc-200"
      >
        + New Chat
      </button>

      <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={
              activeConversationId === conversation.id
                ? "bg-white text-black p-3 rounded-xl flex justify-between items-center"
                : "bg-zinc-900 hover:bg-zinc-800 p-3 rounded-xl text-white flex justify-between items-center"
            }
          >
            <span
              onClick={() => onSelectConversation(conversation.id)}
              className="cursor-pointer flex-1 truncate"
            >
              {conversation.title}
            </span>

            <button
              onClick={() => onDeleteConversation(conversation.id)}
              className="ml-2 text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl font-bold mt-5"
      >
        Logout
      </button>

    </div>
  )
}

export default Sidebar