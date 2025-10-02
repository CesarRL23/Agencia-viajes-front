import { MessagesHeader } from "@/components/messages/messages-header"
import { ChatInterface } from "@/components/messages/chat-interface"
import { ChatSidebar } from "@/components/messages/chat-sidebar"

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
      <MessagesHeader />
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar />
        <ChatInterface />
      </div>
    </div>
  )
}
