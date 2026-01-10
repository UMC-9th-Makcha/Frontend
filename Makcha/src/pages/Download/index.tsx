import { usePWAInstall } from '../../hooks/usePWAInstall';
import { DownloadButton } from './DownloadButton';
import { DownloadHero } from './DownloadHero';


export default function DownloadPage() {
  const { canInstall, install } = usePWAInstall();

  return (
    <main className="p-6 text-center space-y-12 min-h-dvh flex flex-col justify-between pb-10 max-w-md mx-auto">
      <DownloadHero />
      <DownloadButton 
        onClick={install} 
        isInstallable={canInstall} 
      />
    </main>
  );
}