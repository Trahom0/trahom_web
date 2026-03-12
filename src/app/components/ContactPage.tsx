import { Phone, Mail, MapPin, Send, Clock, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { PrimaryButton } from './PrimaryButton';
import { SocialLinks } from './SocialLinks';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface ContactPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function ContactPage({ onNavigate, language, onLanguageChange }: ContactPageProps) {
  const contactContent = content.contact;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'sending') {
      return;
    }

    setFormStatus('sending');
    setFormError('');

    const subjectLabel =
      contactContent.form.fields.subject.options.find((option) => option.value === formData.subject)?.label ?? '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          subjectLabel,
          language: language ?? 'EN'
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error ?? contactContent.form.errorMessage);
      }

      setFormStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: ''
      });

      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : contactContent.form.errorMessage);
    }
  };

  const offices = contactContent.globalOffices.offices;

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="contact"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
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
              <Mail className="w-5 h-5 text-[#e1a226]" />
              <span className="text-sm font-medium text-[#e1a226]">{contactContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {contactContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {contactContent.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 sm:mb-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 sm:p-12 border border-black/5"
          >
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-6">{contactContent.form.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    {contactContent.form.fields.firstName.label}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                    placeholder={contactContent.form.fields.firstName.placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    {contactContent.form.fields.lastName.label}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                    placeholder={contactContent.form.fields.lastName.placeholder}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {contactContent.form.fields.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                    placeholder={contactContent.form.fields.email.placeholder}
                  />
                </div>
                <div className="hidden">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {contactContent.form.fields.phone.label}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                    placeholder={contactContent.form.fields.phone.placeholder}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  {contactContent.form.fields.subject.label}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all"
                >
                  <option value="">{contactContent.form.fields.subject.placeholder}</option>
                  {contactContent.form.fields.subject.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {contactContent.form.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#f9fbff] border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent transition-all resize-none"
                  placeholder={contactContent.form.fields.message.placeholder}
                />
              </div>

              <PrimaryButton
                type="submit"
                disabled={formStatus === 'sending'}
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                {formStatus === 'sending' ? (
                  <span>{contactContent.form.submit.sendingLabel}</span>
                ) : formStatus === 'success' ? (
                  <span>{contactContent.form.submit.sentLabel}</span>
                ) : (
                  <>
                    <span>{contactContent.form.submit.defaultLabel}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </PrimaryButton>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#A8D5E2]/20 text-[#4A90E2] px-4 py-3 rounded-xl text-center"
                >
                  {contactContent.form.successMessage}
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#F5A623]/15 text-[#8a5a00] px-4 py-3 rounded-xl text-center"
                >
                  {formError || contactContent.form.errorMessage}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="space-y-6"
          >
            {/* Quick Contact */}
            <div className="bg-white rounded-2xl p-8 border border-black/5">
              <h3 className="text-xl font-medium mb-6">{contactContent.quickContact.title}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 hidden">
                  <div className="w-12 h-12 bg-[#4A90E2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#4A90E2]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">{contactContent.quickContact.phone.label}</p>
                    <a href={`tel:${contactContent.quickContact.phone.value}`} className="font-medium hover:text-[#e1a226] transition-colors">
                      {contactContent.quickContact.phone.value}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#A8D5E2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#A8D5E2]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">{contactContent.quickContact.email.label}</p>
                    <a href={`mailto:${contactContent.quickContact.email.value}`} className="font-medium hover:text-[#e1a226] transition-colors">
                      {contactContent.quickContact.email.value}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5A623]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">{contactContent.quickContact.location.label}</p>
                    <p className="font-medium leading-relaxed">{contactContent.quickContact.location.value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-[#4A90E2] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-medium">{contactContent.officeHours.title}</h3>
              </div>
              <div className="space-y-2 text-white/90">
                {contactContent.officeHours.schedule.map((item) => (
                  <div key={item.day} className="flex justify-between">
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 border border-black/5">
              <h3 className="text-xl font-medium mb-4">{contactContent.social.title}</h3>
              <p className="text-sm text-foreground/60 mb-6">
                {contactContent.social.description}
              </p>
              <SocialLinks size="md" shape="rounded" />
            </div>
          </motion.div>
        </div>

        {/* Global Offices */}
        <div className="mb-16 sm:mb-24 hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {contactContent.globalOffices.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {contactContent.globalOffices.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-black/5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-[#e1a226]" />
                  <h3 className="text-2xl font-medium">{office.city}</h3>
                </div>
                <p className="text-foreground/60 mb-6">{office.country}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-foreground/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{office.address}</p>
                      <p>{office.postal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-foreground/40 flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="hover:text-[#e1a226] transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-foreground/40 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-[#e1a226] transition-colors">
                      {office.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-br from-[#A8D5E2] to-[#4A90E2] rounded-2xl p-8 sm:p-12 lg:p-16 text-white"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            {contactContent.about.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {contactContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-white/90 text-lg leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-4">{contactContent.about.whyTitle}</h3>
              <ul className="space-y-3 text-white/90">
                {contactContent.about.whyItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
    </PageLayout>
  );
}
