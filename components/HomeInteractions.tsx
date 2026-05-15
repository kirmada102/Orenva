'use client'

import { useEffect } from 'react'

// Wires the home page's interactive layer — the "Activate orenva" button,
// the six module cards, and the waitlist form. Renders nothing; it attaches
// behaviour to markup that page.tsx renders server-side (via data-* hooks),
// mirroring the ClientScripts pattern.

// Per-module copy shown in the "Current focus" panel when a card is picked.
const MODULE_FOCUS: Record<string, { title: string; text: string }> = {
  'ai-doctor': {
    title: 'AI Doctor',
    text: 'Intelligent consultation that listens first and triages with care — routing you to the right next step before you enter a fragmented care loop.',
  },
  pharmacy: {
    title: 'Pharmacy',
    text: 'Medication fulfilment connected directly to your consultation. No re-entry, no lost context between diagnosis and dispensing.',
  },
  'diet-fitness': {
    title: 'Diet & Fitness',
    text: 'Lifestyle intelligence that turns everyday habits into preventive care, working quietly in the background of your health.',
  },
  therapy: {
    title: 'Therapy & Mental Health',
    text: 'Emotional support held in the same context as the rest of your care — so mental health is never a separate, siloed conversation.',
  },
  insurance: {
    title: 'Insurance',
    text: 'Coverage intelligence that reads your real care journey, clarifying what is covered without the usual paperwork and guesswork.',
  },
  store: {
    title: 'Supplements & Store',
    text: 'A curated marketplace layer for supplements and wellness products, recommended in step with your health context.',
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function HomeInteractions() {
  useEffect(() => {
    const cleanups: Array<() => void> = []
    const body = document.body

    const activationStatus = document.getElementById('activationStatus')
    const activationDetail = document.getElementById('activationDetail')
    const focusTitle = document.getElementById('currentFocusTitle')
    const focusText = document.getElementById('currentFocusText')
    const scenePulse = document.getElementById('scenePulse')

    let activated = false

    // Replay the radial pulse behind the 3D scene.
    const firePulse = () => {
      if (!scenePulse) return
      scenePulse.classList.remove('is-live')
      // Force reflow so the animation can restart on repeat activations.
      void scenePulse.offsetWidth
      scenePulse.classList.add('is-live')
    }

    const activate = () => {
      if (!activated) {
        activated = true
        body.classList.add('orenva-activated')
        if (activationStatus) activationStatus.textContent = 'orenva activated'
        if (activationDetail) {
          activationDetail.textContent =
            'All six modules are live. Select any module to bring it into focus within the ecosystem.'
        }
        window.dispatchEvent(new CustomEvent('orenva:activate'))
      }
      firePulse()
    }

    // ─── Activate button ───
    const activateBtn = document.querySelector<HTMLButtonElement>('[data-activate]')
    if (activateBtn) {
      const onActivate = () => {
        activate()
        activateBtn.textContent = 'orenva is live'
      }
      activateBtn.addEventListener('click', onActivate)
      cleanups.push(() => activateBtn.removeEventListener('click', onActivate))
    }

    // ─── Module cards ───
    const moduleCards = document.querySelectorAll<HTMLButtonElement>('[data-module]')
    moduleCards.forEach((card) => {
      const onSelect = () => {
        const id = card.getAttribute('data-module') || ''
        const focus = MODULE_FOCUS[id]
        if (!focus) return

        // Selecting a module also activates the ecosystem.
        activate()

        moduleCards.forEach((c) => {
          const selected = c === card
          c.classList.toggle('is-selected', selected)
          c.setAttribute('aria-pressed', String(selected))
        })

        if (focusTitle) focusTitle.textContent = focus.title
        if (focusText) focusText.textContent = focus.text
        window.dispatchEvent(new CustomEvent('orenva:module', { detail: id }))
      }
      card.addEventListener('click', onSelect)
      cleanups.push(() => card.removeEventListener('click', onSelect))
    })

    // ─── Waitlist form ───
    const form = document.querySelector<HTMLFormElement>('[data-waitlist-form]')
    const feedback = document.querySelector<HTMLElement>('[data-waitlist-feedback]')
    if (form) {
      const input = form.querySelector<HTMLInputElement>('input[type="email"], input[name="email"]')
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')

      const setFeedback = (message: string, state: 'ok' | 'error' | 'pending') => {
        if (!feedback) return
        feedback.textContent = message
        feedback.dataset.state = state
      }

      const onSubmit = async (event: Event) => {
        event.preventDefault()
        const email = (input?.value || '').trim().toLowerCase()

        if (!EMAIL_RE.test(email)) {
          setFeedback('Please enter a valid email address.', 'error')
          input?.focus()
          return
        }

        setFeedback('Adding you to the waitlist…', 'pending')
        if (submitBtn) submitBtn.disabled = true

        try {
          const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          })
          const data = await res.json().catch(() => ({}))

          if (!res.ok) {
            setFeedback(data.error || 'Something went wrong. Please try again.', 'error')
          } else {
            setFeedback('You are on the waitlist. We will be in touch before launch.', 'ok')
            form.reset()
          }
        } catch {
          setFeedback('Could not reach the server. Please try again.', 'error')
        } finally {
          if (submitBtn) submitBtn.disabled = false
        }
      }

      form.addEventListener('submit', onSubmit)
      cleanups.push(() => form.removeEventListener('submit', onSubmit))
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
