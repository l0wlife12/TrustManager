import {
  ArrowLeft,
  Shield,
  Eye,
  CheckCircle,
  Users,
  Lock,
  Activity,
  Database,
  Zap,
  Clock,
  MapPin,
  FileText,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import CookieBanner from '../components/CookieBanner';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutPageProps {
  onNavigateHome: () => void;
}

export default function AboutPage({ onNavigateHome }: AboutPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          <LanguageToggle />
        </div>
      </nav>

      {/* HERO - Ultra important */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium px-4 py-2 rounded-full backdrop-blur">
            <Zap className="w-3 h-3" />
            La gestion RH simplifiée
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            La gestion des employés, 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              simplifiée et centralisée
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            TrustManager permet aux entreprises de gérer les horaires, la présence, la localisation et les documents fiscaux en une seule plateforme intuitive et sécurisée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Commencer gratuitement
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700 flex items-center justify-center gap-2"
            >
              Voir la plateforme
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PROBLÈME → SOLUTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Pourquoi TrustManager?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problèmes */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                Les défis actuels
              </h3>
              <ul className="space-y-4">
                {[
                  'Outils multiples et fragmentés',
                  'Erreurs manuelles dans la paie',
                  'Manque de visibilité en temps réel',
                  'Gestion administrative complexe',
                  'Risques de non-conformité'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
                Solution TrustManager
              </h3>
              <ul className="space-y-4">
                {[
                  'Une plateforme tout-en-un',
                  'Automatisation de la paie',
                  'Suivi en temps réel',
                  'Administration simplifiée',
                  'Conformité garantie'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS CLÉS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Fonctionnalités principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'Pointage numérique',
                desc: 'Clock-in/clock-out simple et intuitif pour vos équipes',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: MapPin,
                title: 'Localisation en temps réel',
                desc: 'Suivi GPS des employés sur le terrain avec carte interactive',
                color: 'from-red-500 to-red-600'
              },
              {
                icon: FileText,
                title: 'Gestion des documents',
                desc: 'Automatisation des documents fiscaux et administratifs',
                color: 'from-amber-500 to-amber-600'
              },
              {
                icon: TrendingUp,
                title: 'Tableau de bord analytique',
                desc: 'Statistiques en temps réel pour prendre les bonnes décisions',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                icon: Users,
                title: 'Gestion des employés',
                desc: 'Profils, permissions, et permissions granulaires',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Activity,
                title: 'Audit trail complet',
                desc: 'Historique exhaustif de toutes les actions effectuées',
                color: 'from-cyan-500 to-cyan-600'
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SÉCURITÉ & CONFORMITÉ - SECTION CRITIQUE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-white">Sécurité & Conformité</h2>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-10 mb-8 backdrop-blur">
            <p className="text-lg text-white mb-6 leading-relaxed">
              <strong>La sécurité et la confidentialité des données sont au cœur de TrustManager.</strong>
            </p>
            <p className="text-slate-300 leading-relaxed">
              Votre organisation gère des données sensibles : horaires, localisations, informations fiscales. 
              Nous les protégeons comme si c'étaient les nôtres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Lock,
                title: 'Chiffrement end-to-end',
                items: ['Données chiffrées en transit', 'Données chiffrées au repos', 'Clés de sécurité protégées']
              },
              {
                icon: Users,
                title: 'Contrôle d\'accès granulaire',
                items: ['Permissions basées sur les rôles', 'Authentification multi-facteurs', 'Gestion des administrateurs']
              },
              {
                icon: Database,
                title: 'Infrastructure sécurisée',
                items: ['Serveurs certifiés ISO 27001', 'Sauvegardes automatiques', 'Redondance géographique']
              },
              {
                icon: Eye,
                title: 'Transparence & Conformité',
                items: ['Respect du RGPD (UE)', 'Conformité Loi 25 (Québec)', 'Audit trail complet']
              }
            ].map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <p className="text-slate-300">
              <strong className="text-yellow-300">📍 Localisation & Données fiscales:</strong> TrustManager respecte 
              toutes les réglementations concernant la localisation des employés et les données fiscales. 
              Transparence et consentement garantis.
            </p>
          </div>
        </div>
      </section>

      {/* POURQUOI TRUSTMANAGER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Avantages clés</h2>
          
          <div className="space-y-4">
            {[
              { emoji: '⚡', title: 'Interface simple et rapide', desc: 'Aucune courbe d\'apprentissage, productive immédiatement' },
              { emoji: '⏱️', title: 'Gain de temps administratif', desc: 'Automatisation = 10+ heures économisées par semaine' },
              { emoji: '✅', title: 'Réduction des erreurs', desc: 'Moins d\'erreurs manuelles = moins de problèmes de paie' },
              { emoji: '👁️', title: 'Vision globale en temps réel', desc: 'Tableaux de bord complets pour décider rapidement' },
              { emoji: '🔒', title: 'Sécurité professionnelle', desc: 'Niveau entreprise sans la complexité' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-slate-800/30 border border-slate-700 rounded-xl hover:border-slate-600 transition-all">
                <div className="text-4xl shrink-0">{item.emoji}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRÉATEUR / VISION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Derrière TrustManager</h2>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-10">
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Une passion pour la sécurité</h3>
                
                <div className="space-y-6">
                  <p className="text-slate-300 leading-relaxed">
                    TrustManager est né de 10+ années d'expérience en sécurité informatique et gestion RH. 
                    J'ai vu trop d'organisations luttes avec des outils fragmentés et peu sécurisés.
                  </p>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Notre mission</h4>
                    <p className="text-slate-400">
                      Simplifier la gestion RH pour les startups et PMEs sans sacrifier la sécurité. 
                      Prouver qu'on peut avoir la confiance sans la complexité.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Fondée sur</h4>
                    <ul className="space-y-2 text-slate-400">
                      <li>✓ 10+ ans en sécurité informatique</li>
                      <li>✓ Expérience RH de plusieurs organisations</li>
                      <li>✓ Passion pour l'UX simple</li>
                      <li>✓ Engagée à la transparence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA PRINCIPAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à simplifier votre gestion RH?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Rejoignez les entreprises qui font confiance à TrustManager
          </p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            Créer un compte gratuit
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 pb-8 border-b border-slate-700">
            <p className="text-slate-300 text-center">
              Contrairement à Agendrix, HouseCallPro ou vos logiciels de paie fragmentés, 
              <span className="text-blue-400 font-semibold"> TrustManager offre une solution unique et intégrée</span> pour gérer 
              vos ressources humaines. Une seule plateforme pour tout maîtriser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Commencer</h3>
              <button
                onClick={onNavigateHome}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Essayer gratuitement →
              </button>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">En savoir plus</h3>
              <button
                onClick={onNavigateHome}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Voir la plateforme →
              </button>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Accueil</h3>
              <button
                onClick={onNavigateHome}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Retour au site →
              </button>
            </div>
          </div>
        </div>
      </section>

      <CookieBanner />
    </div>
  );
}
