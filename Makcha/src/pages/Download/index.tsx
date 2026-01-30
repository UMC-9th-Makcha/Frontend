import { usePWAInstall } from '../../hooks/usePWAInstall';
import { DownloadButton } from './components/DownloadButton';
import { DownloadHero } from './components/DownloadHero';

export default function DownloadPage() {
  const { canInstall, install } = usePWAInstall();

  return (
    <main className="h-full w-full overflow-y-auto no-scrollbar p-6 text-center flex flex-col max-w-md mx-auto">

      <div className="flex-1 flex flex-col justify-center space-y-12">
        <DownloadHero />
      </div>

      <div>
        <DownloadButton 
          onClick={install} 
          isInstallable={canInstall} 
        />
      </div>
    </main>
  );
}