import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Afficher le banneau à chaque visite
    setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('trustmanager-cookies-consent', 'accepted');
    localStorage.setItem('trustmanager-cookies-date', new Date().toISOString());
    setShowBanner(false);
    // Initialize analytics if you have any
    initializeAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem('trustmanager-cookies-consent', 'rejected');
    localStorage.setItem('trustmanager-cookies-date', new Date().toISOString());
    setShowBanner(false);
  };

  const initializeAnalytics = () => {
    // Add your analytics script here if needed
    console.log('Analytics initialized');
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-3 animated-slide-up">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">🍪 Nous respectons votre confidentialité</h3>
                  <p className="text-slate-300 mb-2 text-sm">
                    TrustManager utilise des cookies pour améliorer votre expérience et analyser l'utilisation du site.
                  </p>

                  {showDetails && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">📊 Cookies analytiques</h4>
                        <p className="text-slate-400 text-sm">
                          Nous utilisons des outils d'analyse pour comprendre comment vous utilisez notre site et améliorer nos services.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">🔧 Cookies fonctionnels</h4>
                        <p className="text-slate-400 text-sm">
                          Ces cookies permettent le fonctionnement correct du site (sélection de langue, préférences).
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">📍 Stockage local</h4>
                        <p className="text-slate-400 text-sm">
                          Nous stockons votre préférence de consentement pour respecter vos choix.
                        </p>
                      </div>
                      <div className="pt-2">
                        <a
                          href="/cookies"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors block mb-2"
                        >
                          Lire notre politique complète de cookies →
                        </a>
                        <a
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          En savoir plus sur notre politique de confidentialité →
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-3 transition-colors"
                  >
                    {showDetails ? '▼ Masquer les détails' : '▶ Voir les détails'}
                  </button>
                </div>

                <button
                  onClick={handleReject}
                  className="text-slate-400 hover:text-white transition-colors shrink-0 mt-1"
                  aria-label="Fermer la banneau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleReject}
                  className="flex-1 px-3 py-2 rounded text-sm bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-slate-700 hover:border-slate-600"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-3 py-2 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Accepter
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-2 text-center">
                En acceptant, vous consentez à l'utilisation des cookies conformément à notre politique de confidentialité.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS pour l'animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animated-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
