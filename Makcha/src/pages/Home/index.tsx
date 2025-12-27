import DashboardMain from "../../components/dashboard/DashboardMain";

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      <header className="py-4">
        <h1 className="text-2xl font-bold">안녕하세요 👋</h1>
      </header>
      <DashboardMain />
    </div>
  );
}