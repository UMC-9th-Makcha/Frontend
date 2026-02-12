type FooterButtonProps = {
  onClick: () => void;
  content: string;
};

export const FooterButton = ({ onClick, content }: FooterButtonProps) => {
  return (
    <button
      className="w-full h-12 rounded-full bg-makcha-navy-400 text-white text-title border hover:bg-makcha-navy-600 transition 
      dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600"
      onClick={onClick}>
      {content}
    </button>
  )
}
