'use client'

import { useEffect, useRef } from 'react'

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const modules = [
      {
        id: 'ai-doctor',
        title: 'AI Doctor',
        eyebrow: 'AI consultation',
        tagline: 'Instant triage, intelligent care guidance, fewer physical visits.',
        description:
          'A clinically-minded AI consultation layer that helps users assess symptoms, understand next steps, and route into the right care pathway before they even step into a waiting room.',
        benefits: [
          'Smart symptom triage with unified health context',
          'Faster answers before in-person escalation',
          'Continuous guidance that follows the user journey',
        ],
        cta: 'Explore consultations',
        accent: '#8f67ff',
        glow: '#d8c7ff',
        shape: 'orb',
        position: [-3.8, 1.8, -1.4],
        mobilePosition: [-1.7, 1.2, -0.8],
      },
      {
        id: 'pharmacy',
        title: 'Pharmacy',
        eyebrow: 'Medication fulfillment',
        tagline: 'Prescriptions, refills, and pharmacy logistics inside one flow.',
        description:
          'orenva connects consultations to pharmacy actions so care plans move directly from recommendation to fulfillment without forcing users into fragmented systems.',
        benefits: [
          'Integrated prescription and refill workflows',
          'Fast medication discovery and ordering',
          'Reduced friction between doctor, patient, and pharmacy',
        ],
        cta: 'Open pharmacy flow',
        accent: '#a975ff',
        glow: '#e4d6ff',
        shape: 'cube',
        position: [3.9, 1.5, -1.8],
        mobilePosition: [1.7, 1.1, -0.8],
      },
      {
        id: 'diet-fitness',
        title: 'Diet & Fitness',
        eyebrow: 'Lifestyle intelligence',
        tagline: 'Adaptive routines for nutrition, movement, and prevention.',
        description:
          'A dynamic coaching layer that turns health recommendations into everyday plans for meals, recovery, sleep, and movement based on the user\'s profile.',
        benefits: [
          'Adaptive meal, movement, and recovery plans',
          'Preventive insights guided by health context',
          'Health goals linked to the broader care system',
        ],
        cta: 'View coaching',
        accent: '#7ad4ff',
        glow: '#d8f4ff',
        shape: 'ring',
        position: [-4.3, -1.2, -1],
        mobilePosition: [-1.9, -0.4, -0.6],
      },
      {
        id: 'therapy',
        title: 'Therapy & Mental Health',
        eyebrow: 'Emotional support',
        tagline: 'Human-centered support for mood, resilience, and mental wellbeing.',
        description:
          'Therapy and wellbeing support sits alongside physical healthcare, helping orenva treat the user as a whole person rather than a list of disconnected issues.',
        benefits: [
          'Mental wellbeing check-ins within the same platform',
          'Support flows that feel empathetic, not clinical',
          'A continuous bridge between emotional and physical care',
        ],
        cta: 'See support system',
        accent: '#ff9cc8',
        glow: '#ffe0ef',
        shape: 'capsule',
        position: [0.1, -2.4, -2.1],
        mobilePosition: [0, -1.2, -0.8],
      },
      {
        id: 'insurance',
        title: 'Insurance',
        eyebrow: 'Coverage intelligence',
        tagline: 'Coverage and claims clarity built into the patient journey.',
        description:
          'Insurance becomes a readable, actionable layer inside the product so users can understand coverage and next steps without translating medical and administrative complexity on their own.',
        benefits: [
          'Coverage-aware care recommendations',
          'Reduced uncertainty around cost and claims',
          'A simpler path from diagnosis to covered action',
        ],
        cta: 'Review coverage',
        accent: '#86b6ff',
        glow: '#dceaff',
        shape: 'diamond',
        position: [4.4, -1.4, -1.2],
        mobilePosition: [1.9, -0.4, -0.6],
      },
      {
        id: 'store',
        title: 'Supplements & Store',
        eyebrow: 'Marketplace layer',
        tagline: 'Supplements, proteins, and trusted health products in one ecosystem.',
        description:
          'The store layer extends the health journey into recommended products and wellness essentials, keeping product discovery aligned with personal health goals.',
        benefits: [
          'Trusted wellness products alongside care insights',
          'Contextual supplement and protein recommendations',
          'One checkout mindset across care and commerce',
        ],
        cta: 'Enter marketplace',
        accent: '#ffcb7a',
        glow: '#fff0d4',
        shape: 'prism',
        position: [0.5, 2.9, -2.5],
        mobilePosition: [0, 2.1, -1],
      },
    ]

    const state = {
      activated: false,
      activeModuleId: null,
    }

    // Load Three.js dynamically
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/three@0.164.1/build/three.min.js'
    script.async = true
    script.onload = () => {
      // Scene will be initialized here
      console.log('Three.js loaded')
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="scene-shell" aria-hidden="true">
      <canvas ref={canvasRef} id="sceneCanvas" />
      <div className="scene-aura scene-aura-one" />
      <div className="scene-aura scene-aura-two" />
      <div className="scene-pulse" id="scenePulse" />
    </div>
  )
}
