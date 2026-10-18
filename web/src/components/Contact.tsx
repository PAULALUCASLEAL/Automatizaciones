import { useRef, useState, type FormEvent } from 'react'
import { CONTACT, CONTACT_COPY } from '../content/site'
import { Icon } from './Icon'

type FieldName = 'name' | 'company' | 'email' | 'message'
type Errors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'sending' | 'preview' | 'sent' | 'failed'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data: Record<FieldName, string>): Errors {
  const e: Errors = {}
  if (!data.name.trim()) e.name = 'Escribe tu nombre.'
  if (!data.email.trim()) e.email = 'Escribe un correo para poder responderte.'
  else if (!EMAIL_RE.test(data.email.trim())) e.email = 'Revisa el correo: parece que falta algo, por ejemplo la @ o el dominio.'
  if (data.message.trim().length < 10) e.message = 'Cuéntanos un poco más: con una o dos frases es suficiente.'
  return e
}

export function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const connected = Boolean(CONTACT.formEndpoint)

  const read = (): Record<FieldName, string> => {
    const fd = new FormData(formRef.current!)
    return {
      name: String(fd.get('name') ?? ''),
      company: String(fd.get('company') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const data = read()
    const errs = validate(data)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      setStatus('idle')
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (!connected) {
      setStatus('preview')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(CONTACT.formEndpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      formRef.current?.reset()
    } catch {
      setStatus('failed')
    }
  }

  // Revalida un campo al salir de él solo si ya mostraba un error.
  const onBlur = (name: FieldName) => {
    if (!errors[name]) return
    const errs = validate(read())
    setErrors((prev) => ({ ...prev, [name]: errs[name] }))
  }

  const field = (name: FieldName, opts: { type?: string; autoComplete?: string; required?: boolean; textarea?: boolean; hint?: string }) => {
    const id = `f-${name}`
    const err = errors[name]
    const describedBy = [opts.hint ? `${id}-hint` : '', err ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined
    const common = {
      id,
      name,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': describedBy,
      onBlur: () => onBlur(name),
    }
    return (
      <div className={`field${err ? ' has-error' : ''}${opts.textarea ? ' field-wide' : ''}`}>
        <label htmlFor={id}>
          {CONTACT_COPY.fields[name]}
          {!opts.required && <span className="optional"> (opcional)</span>}
        </label>
        {opts.hint && (
          <p className="field-hint" id={`${id}-hint`}>
            {opts.hint}
          </p>
        )}
        {opts.textarea ? (
          <textarea {...common} rows={5} />
        ) : (
          <input {...common} type={opts.type ?? 'text'} autoComplete={opts.autoComplete} />
        )}
        {err && (
          <p className="field-error" id={`${id}-err`}>
            <Icon name="alert" size={16} />
            {err}
          </p>
        )}
      </div>
    )
  }

  return (
    <section className="section contact" id="contacto" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <h2 id="contact-title">{CONTACT_COPY.title}</h2>
          <p className="lead">{CONTACT_COPY.body}</p>
        </div>
        <form ref={formRef} className="contact-form" noValidate onSubmit={onSubmit}>
          {!connected && (
            <p className="form-preview">
              <Icon name="alert" size={18} />
              {CONTACT_COPY.previewNotice}
            </p>
          )}
          <div className="form-grid">
            {field('name', { autoComplete: 'name', required: true })}
            {field('company', { autoComplete: 'organization' })}
            {field('email', { type: 'email', autoComplete: 'email', required: true })}
            {field('message', { textarea: true, required: true, hint: CONTACT_COPY.messageHint })}
          </div>
          <div className="form-foot">
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : CONTACT_COPY.submit}
              {status !== 'sending' && <Icon name="arrow" size={18} />}
            </button>
            <div className="form-status" role="status" aria-live="polite">
              {status === 'preview' && <p className="status-preview">{CONTACT_COPY.previewResult}</p>}
              {status === 'sent' && (
                <p className="status-ok">
                  <Icon name="check" size={18} />
                  {CONTACT_COPY.success}
                </p>
              )}
              {status === 'failed' && (
                <p className="status-fail">
                  <Icon name="alert" size={18} />
                  {CONTACT_COPY.failure}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
