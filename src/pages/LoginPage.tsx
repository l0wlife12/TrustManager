import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Phone, User, CreditCard } from 'lucide-react';
import { signupUser } from '../lib/authService';

interface LoginPageProps {
  onNavigateHome: () => void;
}

const PLANS = [
  { id: 'starter', name: 'Starter', color: 'bg-slate-200' },
  { id: 'pro', name: 'Pro', color: 'bg-blue-100' },
  { id: 'business', name: 'Business', color: 'bg-emerald-100' },
  { id: 'enterprise', name: 'Enterprise', color: 'bg-amber-100' },
];

const EMPLOYEE_COUNTS = [
  { id: '1-5', label: '1-5 employés' },
  { id: '6-10', label: '6-10 employés' },
  { id: '11-25', label: '11-25 employés' },
  { id: '26-50', label: '26-50 employés' },
  { id: '51-100', label: '51-100 employés' },
  { id: '100+', label: '100+ employés' },
];

export default function LoginPage({ onNavigateHome }: LoginPageProps) {
  // Auth states
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup step states
  const [signupStep, setSignupStep] = useState(1); // 1 = personal info, 2 = plan selection, 3 = payment
  
  // Step 1: Personal info
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Step 2: Plan selection
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState('1-5');
  
  // Step 3: Payment information
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Canada');
  
  // UI states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Étape 1: Validation des informations personnelles
    if (signupStep === 1) {
      if (!companyName.trim()) {
        setError('Veuillez saisir le nom de votre entreprise');
        return;
      }
      if (!fullName.trim()) {
        setError('Veuillez saisir votre nom complet');
        return;
      }
      if (!phoneNumber.trim()) {
        setError('Veuillez saisir votre numéro de téléphone');
        return;
      }
      if (!email.trim()) {
        setError('Veuillez saisir votre adresse email');
        return;
      }
      if (!password.trim() || password.length < 8) {
        setError('Veuillez saisir un mot de passe d\'au moins 8 caractères');
        return;
      }
      
      // Passer à l'étape 2
      setSignupStep(2);
      return;
    }
    
    // Étape 2: Validation de la sélection du plan
    if (signupStep === 2) {
      // Pas de validation requise ici, passer à l'étape 3
      setSignupStep(3);
      return;
    }
    
    // Étape 3: Validation des informations de paiement et création du compte
    if (signupStep === 3) {
      if (!cardHolder.trim()) {
        setError('Veuillez saisir le nom du titulaire de la carte');
        return;
      }
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 13) {
        setError('Veuillez saisir un numéro de carte valide');
        return;
      }
      if (!expiryDate.trim()) {
        setError('Veuillez saisir la date d\'expiration (MM/YY)');
        return;
      }
      if (!cvv.trim() || cvv.length < 3) {
        setError('Veuillez saisir un CVV valide');
        return;
      }
      if (!billingAddress.trim()) {
        setError('Veuillez saisir votre adresse de facturation');
        return;
      }
      if (!city.trim()) {
        setError('Veuillez saisir votre ville');
        return;
      }
      if (!postalCode.trim()) {
        setError('Veuillez saisir votre code postal');
        return;
      }
      
      setLoading(true);

      const result = await signupUser(
        email,
        password,
        companyName,
        fullName,
        phoneNumber,
        selectedPlan,
        selectedEmployeeCount
      );
      
      if (result.success) {
        setSuccess('Compte créé! Essai gratuit 14 jours activé. Vérifiez votre email pour confirmer votre inscription.');
        setTimeout(() => {
          setSignupStep(1);
          setEmail('');
          setPassword('');
          setCompanyName('');
          setFullName('');
          setPhoneNumber('');
          setSelectedPlan('pro');
          setSelectedEmployeeCount('1-5');
          setCardHolder('');
          setCardNumber('');
          setExpiryDate('');
          setCvv('');
          setBillingAddress('');
          setCity('');
          setPostalCode('');
          setCountry('Canada');
        }, 2000);
      } else {
        setError(result.error || 'Erreur d\'inscription');
      }
      
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 flex items-center justify-center px-4 py-12">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Signup Card */}
      <div className="relative w-full" style={{ maxWidth: '600px' }}>
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

          {/* Signup Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Inscription</h2>
            <p className="text-slate-400 text-sm">
              Commence ton essai gratuit de 30 jours. Aucune carte bancaire requise.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Signup Form - Three Steps */}
          <form onSubmit={handleSignup} className="space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                    signupStep >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    1
                  </div>
                  <span className={`text-sm font-medium ${signupStep >= 1 ? 'text-blue-400' : 'text-slate-400'}`}>
                    Infos
                  </span>
                </div>
                <div className="h-px flex-1 mx-2 bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                    signupStep >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    2
                  </div>
                  <span className={`text-sm font-medium ${signupStep >= 2 ? 'text-blue-400' : 'text-slate-400'}`}>
                    Plan
                  </span>
                </div>
                <div className="h-px flex-1 mx-2 bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                    signupStep === 3 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    3
                  </div>
                  <span className={`text-sm font-medium ${signupStep === 3 ? 'text-blue-400' : 'text-slate-400'}`}>
                    Paiement
                  </span>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {signupStep === 1 && (
                <>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nom de votre entreprise"
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="votre nom complet"
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Numéro de téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

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
                        placeholder="Min. 8 caractères"
                        required
                        minLength={8}
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

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 mt-6"
                  >
                    Continuer vers l'abonnement
                  </button>
                </>
              )}

              {/* Step 2: Plan Selection */}
              {signupStep === 2 && (
                <>
                  <button
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l'étape 1
                  </button>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">
                      Nombre d'employés
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {EMPLOYEE_COUNTS.map((count) => (
                        <button
                          key={count.id}
                          type="button"
                          onClick={() => setSelectedEmployeeCount(count.id)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedEmployeeCount === count.id
                              ? 'bg-blue-500 text-white border border-blue-400'
                              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          {count.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <label className="block text-slate-300 text-sm font-medium mb-3">
                      Choisir un plan
                    </label>
                    <div className="space-y-3">
                      {PLANS.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`w-full p-4 rounded-lg font-medium transition-all border-2 text-left flex items-center justify-between ${
                            selectedPlan === plan.id
                              ? 'border-blue-500 bg-blue-500/20'
                              : 'border-slate-700 bg-slate-800 hover:border-blue-400'
                          }`}
                        >
                          <div>
                            <div className={selectedPlan === plan.id ? 'text-blue-300' : 'text-slate-300'}>
                              {plan.name}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            selectedPlan === plan.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-slate-600'
                          }`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700 bg-slate-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-300">Plan sélectionné:</span>
                      <span className="text-blue-400 font-semibold">
                        {PLANS.find(p => p.id === selectedPlan)?.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Essai gratuit 14 jours inclus. Après, facturation mensuelle.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 mt-6"
                  >
                    Continuer vers le paiement
                  </button>
                </>
              )}

              {/* Step 3: Payment Information */}
              {signupStep === 3 && (
                <>
                  <button
                    type="button"
                    onClick={() => setSignupStep(2)}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l'étape 2
                  </button>

                  <div className="flex items-center gap-2 mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <p className="text-sm text-slate-300">
                      Vos informations de paiement seront chiffrées et sécurisées.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Nom du titulaire
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Jean Dupont"
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Numéro de carte
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\s/g, '');
                          if (/^\d*$/.test(val) && val.length <= 16) {
                            val = val.replace(/(\d{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Expiration (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + '/' + val.substring(2, 4);
                          }
                          if (val.length <= 5) {
                            setExpiryDate(val);
                          }
                        }}
                        placeholder="12/25"
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 4) {
                            setCvv(val);
                          }
                        }}
                        placeholder="123"
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <h3 className="text-slate-300 font-medium mb-3">Adresse de facturation</h3>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder="123 Rue Principal"
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Montréal"
                          required
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="H1A 1A1"
                          required
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Pays
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        <option>Canada</option>
                        <option>États-Unis</option>
                        <option>France</option>
                        <option>Belgique</option>
                        <option>Suisse</option>
                        <option>Luxembourg</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700 bg-slate-800/50 p-4 rounded-lg">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 text-sm">Plan:</span>
                        <span className="text-blue-400 font-semibold">
                          {PLANS.find(p => p.id === selectedPlan)?.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Essai gratuit:</span>
                        <span className="text-green-400 font-semibold">14 jours</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 border-t border-slate-700 pt-3">
                      ✓ Accès complet au plan pendant 14 jours
                      <br />✓ Aucune carte bancaire requise pour l'essai
                      <br />✓ Résiliation facile à tout moment
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 mt-6"
                  >
                    {loading ? 'Activation en cours...' : 'Activer mon essai gratuit'}
                  </button>
                </>
              )}
            </form>

          {/* Footer */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Terms • Privacy • Security
          </p>
        </div>
      </div>
    </div>
  );
}
