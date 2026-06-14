import { useState } from 'react';
import {
  Check,
  X,
  ArrowRight,
  Star,
  Zap,
  Building2,
  Crown,
  Users,
  Shield,
  LayoutGrid,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type BillingPeriod = 'monthly' | 'annual';

const planPrices = [
  { monthly: 29, annual: 24, annualTotal: 288 },
  { monthly: 79, annual: 66, annualTotal: 792 },
  { monthly: 199, annual: 166, annualTotal: 1992 },
  { monthly: 399, annual: 333, annualTotal: 3996 },
];

const planIconMap = {
  star: Star,
  zap: Zap,
  building: Building2,
  crown: Crown,
};

const planIconColors = [
  { bg: 'bg-slate-200', border: 'border-slate-400', stroke: 'text-slate-600', heading: 'text-slate-900' },
  { bg: 'bg-blue-100', border: 'border-blue-400', stroke: 'text-blue-600', heading: 'text-blue-900' },
  { bg: 'bg-emerald-100', border: 'border-emerald-400', stroke: 'text-emerald-600', heading: 'text-emerald-900' },
  { bg: 'bg-amber-100', border: 'border-amber-400', stroke: 'text-amber-600', heading: 'text-amber-900' },
];

const planButtonColors = [
  { bg: 'bg-slate-700', hover: 'hover:bg-slate-800', shadow: 'shadow-slate-600/20' },
  { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', shadow: 'shadow-blue-500/20' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', shadow: 'shadow-emerald-500/20' },
  { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', shadow: 'shadow-amber-500/20' },
];

const specIconMap = {
  users: Users,
  shield: Shield,
  grid: LayoutGrid,
};

function PricingCard({
  plan,
  prices,
  billingPeriod,
  highlight,
  colorIndex,
  t,
  onSelectPlan,
}: {
  plan: {
    name: string;
    description: string;
    employeeLimit: string;
    cta: string;
    ctaLink: string;
    iconType: 'star' | 'zap' | 'building' | 'crown';
    specs: { icon: 'users' | 'shield' | 'grid'; text: string }[];
    features: { text: string }[];
    excluded: string[];
  };
  prices: { monthly: number; annual: number; annualTotal: number };
  billingPeriod: BillingPeriod;
  highlight: boolean;
  colorIndex: number;
  t: ReturnType<typeof useLanguage>['t']['pricing'];
  onSelectPlan?: () => void;
}) {
  const PlanIcon = planIconMap[plan.iconType];
  const colors = planIconColors[colorIndex];
  const buttonColors = planButtonColors[colorIndex];
  const specIconColor = colorIndex === 0 ? 'text-slate-400' : colors.stroke;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        highlight
          ? `border-blue-400/60 ${colors.bg} shadow-xl shadow-blue-500/10`
          : `${colors.border} ${colors.bg} hover:shadow-lg`
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-4">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {t.mostPopular}
          </span>
        </div>
      )}

      <div className={`flex items-center gap-3 mb-4 ${highlight ? 'mt-2' : ''}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg} border ${colors.border}`}>
          <PlanIcon className={`w-5 h-5 ${colors.stroke}`} />
        </div>
        <div>
          <h3 className={`font-bold ${colors.heading} text-lg leading-tight`}>{plan.name}</h3>
          <p className="text-slate-500 text-xs">{plan.description}</p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-black text-slate-900">
            {billingPeriod === 'monthly' ? prices.monthly : prices.annual}$
          </span>
          <span className="text-slate-500 text-sm mb-1">{t.perMonth}</span>
        </div>
        {billingPeriod === 'monthly' ? (
          <p className="text-xs text-slate-400 mt-0.5">
            {t.annualNote.replace('{annual}', String(prices.annual))}
          </p>
        ) : (
          <p className="text-xs text-slate-500 mt-0.5">
            {t.annualBilled.replace('{total}', String(prices.annualTotal))}
          </p>
        )}
      </div>

      {highlight ? (
        <div className="mb-4 py-2 px-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <p className="text-emerald-700 text-xs font-medium">{t.trialBadge}</p>
        </div>
      ) : (
        <div className="mb-4 mt-1">
          <span className="text-[11px] text-transparent select-none">-</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5 mb-4 text-xs">
        {plan.specs.map((spec, i) => {
          const SpecIcon = specIconMap[spec.icon];
          return (
            <div key={i} className="flex items-center gap-2 text-slate-600">
              <SpecIcon className={`w-3.5 h-3.5 ${specIconColor}`} />
              {spec.text}
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 mb-4" />

      <ul className="flex flex-col gap-2 mb-6 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colorIndex === 0 ? 'text-slate-400' : colors.stroke}`} strokeWidth={2.5} />
            <span className="text-slate-700">{feature.text}</span>
          </li>
        ))}
        {plan.excluded.map((text, i) => (
          <li key={`ex-${i}`} className="flex items-start gap-2 text-sm">
            <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-300" strokeWidth={2.5} />
            <span className="text-slate-400 line-through">{text}</span>
          </li>
        ))}
      </ul>

      <a
        href="https://repo-trust-manager-frontend.vercel.app/register"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3 rounded-xl font-semibold text-sm text-center flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${
          highlight
            ? `${buttonColors.bg} text-white ${buttonColors.hover} shadow-sm hover:shadow-md hover:${buttonColors.shadow}`
            : `${buttonColors.bg} text-white ${buttonColors.hover} shadow-sm hover:shadow-md hover:${buttonColors.shadow}`
        }`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-300 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold text-slate-900 text-sm pr-4">{question}</span>
        <ChevronRight
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}
      >
        <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function PricingSection({ onSelectPlan }: { onSelectPlan?: () => void }) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const { t } = useLanguage();

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 section-light-blue">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6 bg-blue-50">
            <Star className="w-3 h-3" />
            {t.pricing.badge}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {t.pricing.title}
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto mb-8">
            {t.pricing.subtitle}
          </p>

          <div className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.pricing.annual}
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {t.pricing.saveUpTo}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {t.pricing.plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              prices={planPrices[index]}
              billingPeriod={billingPeriod}
              highlight={index === 1}
              colorIndex={index}
              t={t.pricing}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            {t.pricing.faq.title}
          </h3>
          <div className="space-y-3">
            {t.pricing.faq.items.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
