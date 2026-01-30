type InputDropdownProps = {
  open: boolean;
  showNoResult: boolean;
  items: string[];
  onSelect: (item: string) => void;
};

export const InputDropdown = ({ open, showNoResult, items, onSelect }: InputDropdownProps) => {
  if (!open) return null;

  return (
    <ul className="absolute w-full bg-white dark:bg-makcha-navy-800 rounded-xl shadow-lg overflow-hidden z-10 text-[14px] text-[#5F5F5F] font-light">
      {showNoResult && (
        <li className="px-4 py-2 opacity-70 cursor-default">검색 결과가 없어요</li>
      )}
      {items.map((item) => (
        <li
          key={item}
          onMouseDown={() => onSelect(item)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-makcha-navy-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
