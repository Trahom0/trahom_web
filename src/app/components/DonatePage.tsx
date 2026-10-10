import { Heart, Shield, CheckCircle, Lock, DollarSign, Users, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { formatTemplate } from '../../content/utils';
import { PageLayout } from './PageLayout';
import { PrimaryButton } from './PrimaryButton';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface DonatePageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function DonatePage({ onNavigate, language, onLanguageChange }: DonatePageProps) {
  const donateContent = content.donate;
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState(donateContent.form.cause.items[0].id);
  const [campaign, setCampaign] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status === 'success' || status === 'cancel') {
      setCheckoutStatus(status);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const amount = getCurrentAmount();
    if (amount <= 0) {
      setSubmitError(donateContent.form.errors.invalidAmount);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const selectedCauseData = causes.find((cause) => cause.id === selectedCause);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          frequency: donationType,
          cause: selectedCause,
          causeLabel: selectedCauseData?.name,
          campaign,
          donor: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || donateContent.form.errors.startCheckout);
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error(donateContent.form.errors.missingCheckoutUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : donateContent.form.errors.default;
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const causeMeta: Record<string, { icon: typeof Heart; color: string }> = {
    'orphan-sponsorship': { icon: Heart, color: 'bg-[#4A90E2]' },
    water: { icon: Droplets, color: 'bg-[#F5A623]' },
    'winter-campaign': { icon: Shield, color: 'bg-[#e1a226]' },
    'food-security': { icon: Users, color: 'bg-[#A8D5E2]' }
  };
  const causes = donateContent.form.cause.items.map((cause) => ({
    ...cause,
    ...causeMeta[cause.id]
  }));
  const causeIds = causes.map((cause) => cause.id);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const cause = params.get('cause');
    if (cause && causeIds.includes(cause)) {
      setSelectedCause(cause);
    }
    const amountParam = params.get('amount');
    if (amountParam) {
      const amountNumber = Number(amountParam);
      if (Number.isFinite(amountNumber) && amountNumber > 0) {
        if (donationAmounts.includes(amountNumber)) {
          setSelectedAmount(amountNumber);
          setCustomAmount('');
        } else {
          setSelectedAmount('custom');
          setCustomAmount(String(amountNumber));
        }
      }
    }
    const campaignParam = params.get('campaign');
    if (campaignParam) {
      setCampaign(campaignParam);
    }
  }, []);

  const impactExamples = donateContent.impact.examples;

  const getCurrentAmount = () => {
    if (selectedAmount === 'custom') {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  const getCurrentImpact = () => {
    const amount = getCurrentAmount();
    for (let i = impactExamples.length - 1; i >= 0; i--) {
      if (amount >= impactExamples[i].amount) {
        return impactExamples[i].impact;
      }
    }
    return donateContent.impact.fallback;
  };
  const summaryTypeLabel =
    donationType === 'monthly' ? donateContent.summary.typeLabels.monthly : donateContent.summary.typeLabels.oneTime;

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="donate"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
        {checkoutStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#A8D5E2]/20 text-[#4A90E2] px-6 py-4 rounded-xl text-center"
          >
            <p className="font-medium mb-1">{donateContent.status.success.title}</p>
            <p className="text-sm">{donateContent.status.success.description}</p>
          </motion.div>
        )}
        {checkoutStatus === 'cancel' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#F5A623]/20 text-[#b97407] px-6 py-4 rounded-xl text-center"
          >
            <p className="font-medium mb-1">{donateContent.status.cancel.title}</p>
            <p className="text-sm">{donateContent.status.cancel.description}</p>
          </motion.div>
        )}

        {/* Hero Section */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-[#e1a226]" />
              <span className="text-sm font-medium text-[#e1a226]">{donateContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {donateContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {donateContent.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Donation Form & Summary */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 sm:mb-24">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type Toggle */}
              <div className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="text-2xl tracking-tight mb-6">{donateContent.form.donationType.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      donationType === 'one-time'
                        ? 'border-[#e1a226] bg-[#e1a226]/5'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <DollarSign className={`w-6 h-6 mx-auto mb-2 ${
                      donationType === 'one-time' ? 'text-[#e1a226]' : 'text-foreground/40'
                    }`} />
                    <p className="font-medium">{donateContent.form.donationType.options.oneTime.label}</p>
                    <p className="text-sm text-foreground/60 mt-1">{donateContent.form.donationType.options.oneTime.description}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      donationType === 'monthly'
                        ? 'border-[#e1a226] bg-[#e1a226]/5'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <Heart className={`w-6 h-6 mx-auto mb-2 ${
                      donationType === 'monthly' ? 'text-[#e1a226]' : 'text-foreground/40'
                    }`} />
                    <p className="font-medium">{donateContent.form.donationType.options.monthly.label}</p>
                    <p className="text-sm text-foreground/60 mt-1">{donateContent.form.donationType.options.monthly.description}</p>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="text-2xl tracking-tight mb-6">{donateContent.form.amount.title}</h2>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAmount === amount
                          ? 'border-[#e1a226] bg-[#e1a226]/5 text-[#e1a226]'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      <p className="text-2xl font-medium">${amount}</p>
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={donateContent.form.amount.customPlaceholder}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('custom');
                    }}
                    className={`w-full ps-10 pe-4 py-3 bg-[#f9fbff] border-2 rounded-xl focus:outline-none transition-all ${
                      selectedAmount === 'custom'
                        ? 'border-[#e1a226] ring-2 ring-[#e1a226]/20'
                        : 'border-black/10 focus:border-[#e1a226]'
                    }`}
                  />
                  <DollarSign className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 pointer-events-none" />
                </div>
              </div>

              {/* Cause Selection */}
              <div className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="text-2xl tracking-tight mb-6">{donateContent.form.cause.title}</h2>
                <div className="space-y-3">
                  {causes.map((cause) => {
                    const Icon = cause.icon;
                    return (
                      <button
                        key={cause.id}
                        type="button"
                        onClick={() => setSelectedCause(cause.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-start ${
                          selectedCause === cause.id
                            ? 'border-[#e1a226] bg-[#e1a226]/5'
                            : 'border-black/10 hover:border-black/20'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${cause.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-1">{cause.name}</p>
                            <p className="text-sm text-foreground/60">{cause.description}</p>
                          </div>
                          {selectedCause === cause.id && (
                            <CheckCircle className="w-6 h-6 text-[#e1a226] flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="text-2xl tracking-tight mb-6">{donateContent.form.info.title}</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        {donateContent.form.info.fields.firstName.label}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                        placeholder={donateContent.form.info.fields.firstName.placeholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        {donateContent.form.info.fields.lastName.label}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                        placeholder={donateContent.form.info.fields.lastName.placeholder}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {donateContent.form.info.fields.email.label}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                        placeholder={donateContent.form.info.fields.email.placeholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {donateContent.form.info.fields.phone.label}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                        placeholder={donateContent.form.info.fields.phone.placeholder}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <PrimaryButton
                type="submit"
                disabled={isSubmitting || getCurrentAmount() <= 0}
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>{donateContent.form.submit.loadingLabel}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>{formatTemplate(donateContent.form.submit.defaultTemplate, { amount: getCurrentAmount() })}</span>
                  </>
                )}
              </PrimaryButton>

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-700 px-6 py-4 rounded-xl text-center"
                >
                  <p className="font-medium">{submitError}</p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Donation Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#e1a226] to-[#c78f1f] rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-xl font-medium mb-6">{donateContent.summary.title}</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-white/80">{donateContent.summary.labels.type}</span>
                  <span className="font-medium">{summaryTypeLabel}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-white/80">{donateContent.summary.labels.amount}</span>
                  <span className="text-3xl font-medium">${getCurrentAmount()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">{donateContent.summary.labels.frequency}</span>
                  <span className="font-medium">{summaryTypeLabel}</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-white/80 mb-2">{donateContent.summary.labels.impact}</p>
                <p className="text-sm leading-relaxed">{getCurrentImpact()}</p>
              </div>

              <div className="space-y-3 text-sm text-white/90">
                {donateContent.summary.securityBadges.map((badge, index) => (
                  <div key={badge} className="flex items-center gap-2">
                    {index === 0 ? <Shield className="w-4 h-4" /> : null}
                    {index === 1 ? <CheckCircle className="w-4 h-4" /> : null}
                    {index === 2 ? <Lock className="w-4 h-4" /> : null}
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-6 border border-black/5">
              <h4 className="font-medium mb-4">{donateContent.trust.title}</h4>
              <div className="space-y-3 text-sm text-foreground/70">
                {donateContent.trust.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#e1a226] rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-br from-[#4A90E2] to-[#A8D5E2] rounded-2xl p-8 sm:p-12 text-white"
        >
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-8 text-center">
            {donateContent.stats.title}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {donateContent.stats.items.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-5xl font-medium mb-2">{item.number}</div>
                <p className="text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
    </PageLayout>
  );
}
