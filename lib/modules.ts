// The six modules that make up the orenva ecosystem — the single
// source of truth for the home showcase, the /ecosystem page, and
// the per-module pages at /ecosystem/[module].

export interface OrenvaModule {
  /** URL-safe id; also the anchor on /ecosystem and the route segment */
  id: string
  title: string
  /** Short uppercase category label */
  label: string
  /** One-line essence, used on the home module cards */
  tagline: string
  /** Fuller description for the ecosystem pages */
  summary: string
  /** Three concrete capabilities */
  capabilities: string[]
  /** The two modules this one most naturally hands off to */
  connectsTo: string[]
}

export const MODULES: OrenvaModule[] = [
  {
    id: 'ai-doctor',
    title: 'AI Doctor',
    label: 'AI consultation',
    tagline: 'Consultation that listens before it concludes.',
    summary:
      "orenva's AI doctor triages symptoms with care, surfaces the questions a clinician would ask, and routes you to the right next step — a prescription, a specialist, a therapist — before you ever enter a fragmented care loop.",
    capabilities: [
      'Conversational symptom triage that adapts to your history',
      'A clear, ranked next step — never a dead end',
      'Every consultation flows straight into pharmacy, therapy, or insurance',
    ],
    connectsTo: ['pharmacy', 'therapy'],
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    label: 'Medication fulfilment',
    tagline: 'From diagnosis to doorstep, without the gap.',
    summary:
      'Medication fulfilment wired directly to your consultation. When a prescription is issued, it arrives in pharmacy already understood — no re-entered history, no lost context between diagnosis and dispensing.',
    capabilities: [
      'Prescriptions carried over from consultation automatically',
      'Refill reminders timed to your actual usage',
      'Interaction checks against your full orenva health context',
    ],
    connectsTo: ['ai-doctor', 'insurance'],
  },
  {
    id: 'diet-fitness',
    title: 'Diet & Fitness',
    label: 'Lifestyle intelligence',
    tagline: 'Prevention, working quietly in the background.',
    summary:
      'Lifestyle intelligence that turns everyday habits into preventive care. Diet and fitness run continuously alongside the rest of your health — so the platform can act on patterns long before they become problems.',
    capabilities: [
      'Nutrition and activity guidance shaped by your conditions',
      'Trends shared with consultation and therapy, never siloed',
      'Goals that adjust as your health changes',
    ],
    connectsTo: ['ai-doctor', 'therapy'],
  },
  {
    id: 'therapy',
    title: 'Therapy & Mental Health',
    label: 'Emotional support',
    tagline: 'Mental health, never a separate file.',
    summary:
      'Emotional support held in the same context as the rest of your care. Therapy sits alongside consultation and lifestyle, so the platform treats the whole person rather than a disconnected, siloed record.',
    capabilities: [
      'Matched support, from self-guided tools to licensed therapists',
      'Context shared with consent, so you never start over',
      'Gentle check-ins that notice when something shifts',
    ],
    connectsTo: ['ai-doctor', 'diet-fitness'],
  },
  {
    id: 'insurance',
    title: 'Insurance',
    label: 'Coverage intelligence',
    tagline: 'Coverage that reads your real care journey.',
    summary:
      'Coverage intelligence that understands the care you have actually received and clarifies what is covered — removing the paperwork, the guesswork, and the cold calls that usually stand between you and a claim.',
    capabilities: [
      'Plain-language answers on what your plan covers',
      'Claims pre-filled from your consultation and pharmacy records',
      'Cost estimates before you commit to care',
    ],
    connectsTo: ['ai-doctor', 'pharmacy'],
  },
  {
    id: 'store',
    title: 'Supplements & Store',
    label: 'Marketplace layer',
    tagline: 'Wellness products, recommended in context.',
    summary:
      'A curated marketplace layer for supplements and wellness products. Recommendations are made in step with your health context — what you are treating, what you are managing, what would genuinely help — not generic best-sellers.',
    capabilities: [
      'Supplements suggested against your actual care plan',
      'Vetted products, with no pay-to-rank shelves',
      'One basket across every part of orenva',
    ],
    connectsTo: ['diet-fitness', 'ai-doctor'],
  },
]

/** Look up a single module by id. */
export function getModule(id: string): OrenvaModule | undefined {
  return MODULES.find((m) => m.id === id)
}
