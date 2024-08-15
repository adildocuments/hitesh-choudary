import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUserRound, Menu } from "lucide-react";
import { myStore } from "@/utils/config";
import { Link, useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await myStore.removeItem("auth");
      navigate("/login");
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <header className="bg-gray-800 text-white h-16 flex items-center px-4 border-b border-gray-700">
      <Menu className="cursor-pointer" />
      <div className="ml-auto flex items-center space-x-4 ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUserRound className="cursor-pointer text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border border-gray-700 text-white cursor-pointer">
            <DropdownMenuLabel className="px-4 py-2 text-lg">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-gray-600" />
            <Link to="profile">
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-700">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="px-4 py-2 hover:bg-gray-700"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Appbar;
