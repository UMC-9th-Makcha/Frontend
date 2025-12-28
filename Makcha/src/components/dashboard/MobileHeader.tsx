import { Menu } from 'lucide-react';

const MobileHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 md:hidden">
      <div className="bg-gray-200 px-3 py-1 rounded text-sm font-bold text-gray-700">로고</div>
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-makcha-navy-800">서막차님</span>
        <button onClick={onMenuClick} className="text-makcha-navy-900">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;