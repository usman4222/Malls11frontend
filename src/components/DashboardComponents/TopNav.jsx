import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../SiteComponents/ui/avatar"

export function TopNav() {
  const user = useSelector((state) => state.user || null);
  const firstName = user?.currentUser?.username || "G"; 
  const initial = firstName.charAt(0).toUpperCase();


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:px-6">

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm">{firstName || "Guest"}</span>
        <Avatar className="h-8 w-8 border bg-gray-300">
          <AvatarFallback>{initial || "G"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
