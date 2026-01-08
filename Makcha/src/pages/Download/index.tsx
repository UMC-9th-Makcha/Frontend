import { usePWAInstall } from '../../hooks/usePWAInstall';
import { DownloadHero } from './components/DownloadHero';
import { DownloadButton } from './components/DownloadButton';

export default function DownloadPage() {
  const { canInstall, install } = usePWAInstall();

  return (
    <main className="p-6 text-center space-y-12 min-h-[80vh] flex flex-col justify-between pb-10 max-w-md mx-auto">
      <DownloadHero />
      <DownloadButton 
        onClick={install} 
        isInstallable={canInstall} 
      />
    </main>
  );
}