import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface SignInPageProps {
  onNavigateHome: () => void;
}

export default function SignInPage({ onNavigateHome }: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    // Redirect to Google Sign-In (in production, this would be handled by OAuth)
    window.location.href = 'https://repo-trust-manager-frontend.vercel.app/dashboard';
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Veuillez saisir votre adresse email');
      return;
    }

    if (!password.trim()) {
      setError('Veuillez saisir votre mot de passe');
      return;
    }

    setLoading(true);
    // Simulate sign-in process
    setTimeout(() => {
      // On successful login, redirect to dashboard
      window.location.href = 'https://repo-trust-manager-frontend.vercel.app/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 flex items-center justify-center px-4 py-12">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sign-In Card */}
      <div className="relative w-full" style={{ maxWidth: '500px' }}>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src="/tm_v3_icon.png" alt="TrustManager" className="w-12 h-12 rounded-lg mb-3" />
            <h1 className="text-2xl font-bold text-white">
              Trust<span className="text-blue-400">Manager</span>
            </h1>
          </div>

          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Connexion</h2>
            <p className="text-slate-400 text-sm">
              Connectez-vous à votre compte TrustManager
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Sign-in Form */}
          <form onSubmit={handleSignIn} className="space-y-4 mb-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-slate-400 text-sm cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 mt-6"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-slate-400">ou continuer avec</span>
            </div>
          </div>

          {/* Social Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-2.5 rounded-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <a
              href="#"
              className="block text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Mot de passe oublié?
            </a>
            <p className="text-slate-400 text-sm">
              Pas encore inscrit?{' '}
              <a href="https://repo-trust-manager-frontend.vercel.app/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                S'inscrire
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Terms • Privacy • Security
          </p>
        </div>
      </div>
    </div>
  );
}
