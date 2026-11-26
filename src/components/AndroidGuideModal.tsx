import React, { useState, useEffect } from 'react';
import { Smartphone, X, Download, Copy, Check, QrCode, ExternalLink, Sparkles, Archive } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';
import QRCode from 'qrcode';

interface AndroidGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  t?: Translations;
}

export const AndroidGuideModal: React.FC<AndroidGuideModalProps> = ({
  isOpen,
  onClose,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  const { isInstallable, install, isInstalled } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-numo2mk2v2wyi75paofmvq-578306653956.europe-west2.run.app';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(appUrl, {
        width: 220,
        margin: 1.5,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation failed', err));
    }
  }, [isOpen, appUrl]);

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    setZipError(null);
    try {
      const response = await fetch('/gelato-bilanciamento-github-apk.zip', { cache: 'no-store' });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || contentType.includes('text/html')) {
        throw new Error('Archive response invalid');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gelato-bilanciamento-github-apk.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('ZIP download failed:', err);
      setZipError('Direct link fallback ready');
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full max-h-[88vh] flex flex-col overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.androidGuideTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.androidGuideDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300 custom-scrollbar">
          {/* GitHub APK ZIP Download Section (Top & Prominent) */}
          <div className="border border-indigo-200 dark:border-indigo-800/80 rounded-xl p-4 space-y-3 bg-indigo-50/70 dark:bg-indigo-950/40">
            <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200 text-sm">
              <Archive className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>{t.downloadGitHubZipBtn}</span>
            </div>
            <p className="text-xs text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed">
              {t.downloadGitHubZipDesc}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloadingZip ? '...' : 'gelato-bilanciamento-github-apk.zip'}
                </span>
              </button>
              <a
                href="/gelato-bilanciamento-github-apk.zip"
                download="gelato-bilanciamento-github-apk.zip"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ZIP</span>
              </a>
            </div>
            {zipError && (
              <div className="text-[11px] text-amber-700 dark:text-amber-300">
                {zipError}
              </div>
            )}
          </div>

          {/* Main Direct Link & QR Code Box */}
          <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-xl p-5 shadow-sm border border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {t.androidDirectLink}
            </div>

            {/* Clickable URL & Copy Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-800/90 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-700 mb-4">
              <a
                href={appUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 font-mono text-xs text-emerald-300 hover:text-emerald-200 truncate select-all underline underline-offset-2 flex items-center gap-1.5"
              >
                <span>{appUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              </a>

              <button
                onClick={handleCopyUrl}
                className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center justify-center gap-1.5 shrink-0 font-sans shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                <span className="font-semibold">{copied ? t.copied : t.copyLink}</span>
              </button>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="bg-white p-2 rounded-lg shrink-0 shadow-sm">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code"
                    className="w-32 h-32 block rounded"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-slate-400">
                    <QrCode className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="space-y-1.5 text-left">
                <div className="font-semibold text-white text-sm">
                  {t.androidScanQr}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {t.androidScanQrDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Install Button if browser supports it right here */}
          {isInstallable && !isInstalled && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-emerald-950 dark:text-emerald-300 text-sm">
                  {t.androidInstallDirectBtn}
                </div>
              </div>
              <button
                onClick={install}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm whitespace-nowrap transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                {t.androidInstallDirectBtn}
              </button>
            </div>
          )}

          {/* Step-by-Step Instructions */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2.5 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-amber-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              {t.androidInstructionsTitle}
            </div>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>{t.androidStep1}</li>
              <li>{t.androidStep2}</li>
              <li>{t.androidStep3}</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            {t.pwaOfflineBadge}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
