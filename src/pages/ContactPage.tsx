import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  Building2,
  User
} from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import CookieBanner from '../components/CookieBanner';
import { useLanguage } from '../i18n/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface ContactPageProps {
  onNavigateHome: () => void;
}

export default function ContactPage({ onNavigateHome }: ContactPageProps) {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          subject: form.subject,
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        setStatus('error');
        setErrorMsg(t.contact.errorMessage);
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', company: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg(t.contact.errorMessage);
    }
  };

  const infoCards = [
    { icon: Mail, label: t.contact.email, value: 'contact@trustmanager.app', isLink: true },
    { icon: Phone, label: t.contact.phone, value: '+1 (514) 000-0000', isLink: false },
    { icon: MapPin, label: t.contact.office, value: t.contact.officeValue, isLink: false },
    { icon: Clock, label: t.contact.availability, value: t.contact.availabilityValue, isLink: false },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <nav className="bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t.contact.back}</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="/tm_v3_icon.png" alt="TrustManager" className="w-9 h-9 rounded-lg" />
              <span className="text-2xl font-bold text-white">
                Trust<span className="text-blue-400">Manager</span>
              </span>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 section-navy-blue grid-pattern overflow-hidden">
        <div className="orb w-72 h-72 bg-blue-500/15 -top-20 right-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/15 border border-blue-500/25 rounded-2xl mb-6">
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.contact.sidebarTitle}</h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  {t.contact.sidebarDescription}
                </p>
              </div>

              <div className="space-y-3">
                {infoCards.map((card, i) => (
                  <div key={i} className="flex items-start space-x-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <card.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-0.5">{card.label}</div>
                      <div className={card.isLink ? 'text-blue-600' : 'text-slate-500'}>{card.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{t.contact.trialTitle}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  {t.contact.trialDescription}
                </p>
                <button
                  onClick={onNavigateHome}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-400 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                >
                  {t.contact.trialCta}
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t.contact.successTitle}</h3>
                  <p className="text-slate-500 max-w-sm">
                    {t.contact.successMessage}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all font-medium"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t.contact.formTitle}</h3>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        {t.contact.fullName} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder={t.contact.namePlaceholder}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder={t.contact.emailPlaceholder}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                      {t.contact.companyLabel}
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={t.contact.companyPlaceholder}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      {t.contact.subjectLabel} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    >
                      <option value="">{t.contact.subjectPlaceholder}</option>
                      {t.contact.subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      {t.contact.messageLabel} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center space-x-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-[1.01] font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.contact.send}</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-slate-400">
                    {t.contact.consent}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="section-dark border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/tm_v3_icon.png" alt="TrustManager" className="w-7 h-7 rounded-md" />
            <span className="text-white font-bold">
              Trust<span className="text-blue-400">Manager</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">&copy; {t.footer.copyright}</p>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
