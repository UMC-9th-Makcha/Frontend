import LoginPanel from "./components/MainPanel";
import MainBg from "./components/MainBg";

export default function Main() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row justify-between bg-white transition-colors duration-200 ease-in-out dark:bg-makcha-navy-900">
      <LoginPanel />
      <MainBg />
    </div>
  );
}