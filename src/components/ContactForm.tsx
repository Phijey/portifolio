import emailjs from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiCheckCircle, HiExclamationCircle, HiOutlinePaperAirplane } from 'react-icons/hi'
import { z } from 'zod'
import type { TranslationKey } from '../i18n/translations'
import { useLanguage } from '../i18n/useLanguage'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

type Status = 'idle' | 'success' | 'error' | 'config'

function buildSchema(t: (key: TranslationKey) => string) {
  return z.object({
    name: z.string().trim().min(2, t('contact.val.nameMin')).max(80, t('contact.val.nameMax')),
    email: z.string().trim().email(t('contact.val.email')),
    message: z.string().trim().min(10, t('contact.val.messageMin')).max(2000, t('contact.val.messageMax')),
  })
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>

export function ContactForm() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Status>('idle')

  // o schema é recriado na troca de idioma para as mensagens de erro acompanharem
  const schema = useMemo(() => buildSchema(t), [t])

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  })

  // revalida ao trocar de idioma para traduzir as mensagens de erro já exibidas
  useEffect(() => {
    if (isSubmitted) void trigger()
  }, [schema, isSubmitted, trigger])

  const onSubmit = async (values: FormValues) => {
    setStatus('idle')
    const { serviceId, templateId, publicKey } = emailConfig
    if (!serviceId || !templateId || !publicKey) {
      setStatus('config')
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: values.name, from_email: values.email, message: values.message },
        { publicKey },
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:outline-none focus:ring-2 ${
      hasError ? 'border-danger focus:ring-danger/40' : 'border-line focus:border-accent focus:ring-accent/30'
    }`

  const feedback =
    status === 'success'
      ? { tone: 'success', text: t('contact.form.success'), Icon: HiCheckCircle }
      : status === 'error'
        ? { tone: 'error', text: t('contact.form.error'), Icon: HiExclamationCircle }
        : status === 'config'
          ? { tone: 'error', text: t('contact.form.config'), Icon: HiExclamationCircle }
          : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card flex flex-col gap-5 p-5 md:p-7">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold">
          {t('contact.form.name')}
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={t('contact.form.namePh')}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={fieldClass(!!errors.name)}
          {...register('name')}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold">
          {t('contact.form.email')}
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t('contact.form.emailPh')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={fieldClass(!!errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold">
          {t('contact.form.message')}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={t('contact.form.messagePh')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${fieldClass(!!errors.message)} resize-y`}
          {...register('message')}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.message.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70">
        {isSubmitting ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" aria-hidden />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <HiOutlinePaperAirplane className="rotate-90" aria-hidden />
            {t('contact.form.send')}
          </>
        )}
      </button>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${
                feedback.tone === 'success'
                  ? 'border-success/40 bg-success/10 text-success'
                  : 'border-danger/40 bg-danger/10 text-danger'
              }`}
            >
              <feedback.Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
              {feedback.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
