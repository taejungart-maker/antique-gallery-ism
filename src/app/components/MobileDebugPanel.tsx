import { useState, useEffect } from 'react';

export function MobileDebugPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // 모바일에서만 표시 (화면 너비 < 768px)
    if (window.innerWidth < 768) {
      setIsVisible(true);
      
      // 디버그 정보 수집
      const debugInfo = [
        `📱 Screen: ${window.innerWidth}x${window.innerHeight}`,
        `🌐 User Agent: ${navigator.userAgent.substring(0, 50)}...`,
        `🔄 Version: 2.0.4 CACHE KILLER`,
        `📅 Time: ${new Date().toLocaleTimeString()}`,
        `🎨 Logo Height: ${document.querySelector('img[alt*="logo"]')?.clientHeight || 'N/A'}px`,
        `💾 SessionStorage: ${sessionStorage.length} items`,
        `🗄️ LocalStorage: ${localStorage.length} items`,
      ];
      
      setLogs(debugInfo);
      
      // 15초 후 자동 숨김 (더 길게)
      setTimeout(() => setIsVisible(false), 15000);
    }
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-[9999] bg-red-500 text-white px-3 py-1 rounded text-xs font-bold shadow-lg"
      >
        🐛 DEBUG
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-black/90 text-white p-4 text-xs font-mono max-h-[40vh] overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-yellow-400">🔍 Mobile Debug Panel v2.0.4</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-red-600 px-2 py-1 rounded"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="border-b border-gray-700 pb-1">
            {log}
          </div>
        ))}
        <div className="mt-3 pt-2 border-t border-yellow-500">
          <button
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-green-600 px-3 py-2 rounded w-full font-bold"
          >
            🔄 FORCE RELOAD (Clear All Cache)
          </button>
        </div>
      </div>
    </div>
  );
}