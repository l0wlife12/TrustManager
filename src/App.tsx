import { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import PricingSection from './components/PricingSection';
import LanguageToggle from './components/LanguageToggle';
import CookieBanner from './components/CookieBanner';
import LoadingScreen from './components/LoadingScreen';
import { useLanguage } from './i18n/LanguageContext';

type Page = 'home' | 'contact' | 'about' | 'login' | 'signin';

const featureIcons = [Users, Calendar, DollarSign, FileText, MapPin, Shield];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (page === 'contact') {
    return <ContactPage onNavigateHome={() => setPage('home')} />;
  }

  if (page === 'about') {
    return <AboutPage onNavigateHome={() => setPage('home')} />;
  }

  if (page === 'login') {
    return <LoginPage onNavigateHome={() => setPage('home')} />;
  }

  if (page === 'signin') {
    return <SignInPage onNavigateHome={() => setPage('home')} />;
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-800 overflow-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 mr-16">
              <img src="/tm_v3_icon.png" alt="TrustManager" className="w-9 h-9 rounded-lg" />
              <span className="text-2xl font-bold text-white">
                Trust<span className="text-blue-400">Manager</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {t.nav.features}
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {t.nav.benefits}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => setPage('contact')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {t.nav.contact}
              </button>
              <LanguageToggle />
              <div className="flex items-center gap-16 pl-2 border-l border-white/20">
                <a
                  href="https://repo-trust-manager-frontend.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium whitespace-nowrap"
                >
                  {t.nav.signIn}
                </a>
                <a
                  href="https://repo-trust-manager-frontend.vercel.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-lg shadow-blue-500/25 whitespace-nowrap"
                >
                  {t.nav.trial}
                </a>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-lg shadow-blue-500/25 whitespace-nowrap"
                >
                  {t.nav.downloadApp}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <LanguageToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border border-white/10 rounded-xl mb-4 py-4 space-y-1 shadow-lg animate-fade-in-up">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all font-medium"
              >
                {t.nav.features}
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all font-medium"
              >
                {t.nav.benefits}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all font-medium"
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => setPage('contact')}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all font-medium"
              >
                {t.nav.contact}
              </button>
              <div className="px-4 pt-2 space-y-2">
                <a
                  href="https://repo-trust-manager-frontend.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all font-medium"
                >
                  Se connecter
                </a>
                <a
                  href="https://repo-trust-manager-frontend.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold text-center text-base hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
                >
                  30 jours gratuit
                </a>
                <a
                  href="#"
                  className="block w-full bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold text-center text-sm"
                >
                  Download the app
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO - Dark navy with blue accents */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 section-navy-blue grid-pattern overflow-hidden">
        <div className="orb w-96 h-96 bg-blue-500/20 top-20 -left-48" />
        <div className="orb w-72 h-72 bg-blue-400/10 bottom-20 right-0" />
        <div className="orb w-64 h-64 bg-sky-500/10 top-1/2 left-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                {t.hero.badge}
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {t.hero.titleStart}
                <span className="text-blue-400">{t.hero.titleHighlight}</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center group transition-all duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
                >
                  {t.hero.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => scrollToSection('features')}
                  className="border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 hover:border-blue-400/40 transition-all duration-300 font-semibold text-lg"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-400">{t.hero.noCard}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-400">{t.hero.quickSetup}</span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-1 shadow-2xl shadow-blue-500/10 animate-float backdrop-blur-sm">
                <div className="bg-slate-900/80 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">{t.dashboard.title}</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-amber-400 rounded-full" />
                      <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                      <Users className="w-8 h-8 text-blue-400 mb-2" />
                      <div className="text-2xl font-bold text-white">24</div>
                      <div className="text-sm text-slate-400">{t.dashboard.employees}</div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-sm text-slate-400">{t.dashboard.attendance}</div>
                    </div>
                    <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
                      <Calendar className="w-8 h-8 text-sky-400 mb-2" />
                      <div className="text-2xl font-bold text-white">856h</div>
                      <div className="text-sm text-slate-400">{t.dashboard.thisMonth}</div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                      <DollarSign className="w-8 h-8 text-amber-400 mb-2" />
                      <div className="text-2xl font-bold text-white">15K</div>
                      <div className="text-sm text-slate-400">{t.dashboard.payroll}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orb w-48 h-48 bg-blue-500/15 -top-10 -right-10" />
              <div className="orb w-36 h-36 bg-sky-500/10 -bottom-10 -left-10" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR - Dark with blue glow */}
      <section className="relative py-16 border-y border-white/5 section-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5000+', label: t.stats.businesses },
              { value: '50K+', label: t.stats.managedEmployees },
              { value: '99.9%', label: t.stats.uptime },
              { value: '4.9/5', label: t.stats.satisfaction },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - White section for contrast */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white grid-pattern-light">
        <div className="orb w-72 h-72 bg-blue-500/8 top-40 -right-36" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <div
                  key={index}
                  className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/8 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-300">
                    <Icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center group transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 hover:scale-[1.02]"
            >
              {t.features.cta}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS - Dark navy section */}
      <section id="benefits" className="relative py-24 px-4 sm:px-6 lg:px-8 section-navy-blue overflow-hidden">
        <div className="orb w-80 h-80 bg-blue-500/15 top-20 -left-40" />
        <div className="orb w-60 h-60 bg-sky-400/10 bottom-10 right-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {t.benefits.title}
              </h2>
              <p className="text-lg text-slate-400">
                {t.benefits.description}
              </p>

              <div className="space-y-6">
                {t.benefits.items.map((benefit, index) => {
                  const icons = [Zap, TrendingUp, CheckCircle];
                  const Icon = icons[index] || Zap;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-400">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href="#"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center group transition-all duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
              >
                {t.benefits.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="space-y-4">
              {t.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 italic leading-relaxed">{testimonial.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING - Light section */}
      <PricingSection onSelectPlan={() => setPage('login')} />

      {/* CTA - Deep dark blue */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 section-navy overflow-hidden">
        <div className="orb w-96 h-96 bg-blue-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="orb w-64 h-64 bg-sky-400/10 top-0 right-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.cta.title}
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center group transition-all duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
            >
              {t.cta.primary}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 hover:border-blue-400/40 transition-all duration-300 font-semibold text-lg text-center"
            >
              {t.cta.secondary}
            </a>
          </div>
          <p className="text-slate-500 mt-6 text-sm">
            {t.cta.disclaimer}
          </p>
        </div>
      </section>

      {/* FOOTER - Dark navy */}
      <footer className="section-dark border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/tm_v3_icon.png" alt="TrustManager" className="w-9 h-9 rounded-lg" />
                <span className="text-2xl font-bold text-white">
                  Trust<span className="text-blue-400">Manager</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t.footer.product}</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {t.nav.features}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {t.nav.pricing}
                  </button>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.footer.demo}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.footer.documentation}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t.footer.company}</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setPage('about')}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {t.footer.about}
                  </button>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.footer.blog}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.footer.careers}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setPage('contact')}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {t.nav.contact}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    onClick={() => window.location.href = '/privacy'}
                    className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a 
                    onClick={() => window.location.href = '/terms'}
                    className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    {t.footer.security}
                  </a>
                </li>
                <li>
                  <a 
                    onClick={() => window.location.href = '/cookies'}
                    className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {t.footer.cookies}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              &copy; {t.footer.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}

export default App;
