
import { Bell, Search, User, ChevronDown, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  onShowNotifications?: () => void;
}

const Header = ({ title, onShowNotifications }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      {/* Empty div to remove logo from header */}
      <div></div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 w-72 h-8 bg-gray-50 border-gray-200 rounded-md text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative p-1" onClick={onShowNotifications}>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-2.5 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">1</span>
              </span>
            </div>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 ml-4 cursor-pointer hover:bg-gray-50 rounded-md p-1">
                <div className="w-7 h-7 bg-[#3A8DDE] rounded-full flex items-center justify-center">
                  <img src="/Smarten Assets/assets/WASAC 1.png" alt="WASAC" className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">WASAC</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/login')}>
                <User className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
