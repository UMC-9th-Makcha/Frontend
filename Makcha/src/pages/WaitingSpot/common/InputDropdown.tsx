type InputDropdownProps = {
  open: boolean;
  showNoResult: boolean;
  items: string[];
  onSelect: (item: string) => void;
};

export const InputDropdown = ({ open, showNoResult, items, onSelect }: InputDropdownProps) => {
  if (!open) return null;

  const MAX_RENDER = 10;
  const visibleItems = items.slice(0, MAX_RENDER);

  return (
    <ul className="absolute w-full bg-white dark:bg-makcha-navy-800 rounded-xl shadow-lg z-10
      text-small text-gray-500 font-light
      max-h-64 overflow-y-auto">
      {showNoResult && (
        <li className="px-4 py-2 opacity-70 cursor-default">검색 결과가 없어요</li>
      )}

      {visibleItems.map((item) => (
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
