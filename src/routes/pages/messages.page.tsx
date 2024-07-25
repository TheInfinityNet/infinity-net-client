import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PenIcon, PhoneIcon, SendIcon, VideoIcon } from "lucide-react";

const contacts = [
  {
    name: "Sofia Davis",
    message: "hey what&apos;s going on?",
    time: "2h",
    avatar: "OM",
  },
  {
    name: "Alex Johnson",
    message: "Just finished a great book! 📚",
    time: "45m",
    avatar: "AJ",
  },
  {
    name: "Maria Gonzalez",
    message: "Excited for the weekend!",
    time: "1h",
    avatar: "MG",
  },
  {
    name: "Kevin Brown",
    message: "Who&apos;s up for a movie night?",
    time: "3h",
    avatar: "KB",
  },
  {
    name: "Lily White",
    message: "Morning coffee is the best! ☕",
    time: "30m",
    avatar: "LW",
  },
];

const messages = [
  {
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 🙏",
    type: "sent",
  },
  {
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "received",
  },
  {
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    type: "sent",
  },
  {
    content: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    type: "received",
  },
];
export function MessagesPage() {
  return (
    <div className="grid grid-cols-[300px_1fr] w-full rounded-lg overflow-hidden border h-screen">
      <aside className="bg-muted/20 p-3 border-r">
        <header className="flex items-center justify-between space-x-4">
          <h2 className="font-medium text-sm">Messenger</h2>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <PenIcon className="h-4 w-4" />
            <span className="sr-only">New message</span>
          </Button>
        </header>
        <div className="py-4">
          <Input placeholder="Search" className="h-8" />
        </div>
        <ul className="grid gap-2">
          {contacts.map((contact, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted"
              >
                <Avatar className="border w-10 h-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{contact.avatar}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">
                    {contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contact.message} &middot; {contact.time}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex flex-col">
        <header className="p-3 flex border-b items-center">
          <div className="flex items-center gap-2">
            <Avatar className="border w-10 h-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-xs text-muted-foreground">Active 2h ago</p>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Call</span>
              <PhoneIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Video call</span>
              <VideoIcon className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm h-fit ${
                  message.type === "sent"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </main>
        <footer className="border-t">
          <form className="flex w-full items-center space-x-2 p-3">
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" size="icon">
              <span className="sr-only">Send</span>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </footer>
      </section>
    </div>
  );
}
