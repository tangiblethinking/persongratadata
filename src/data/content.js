export const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'quote', label: 'Vision' },
  { id: 'problem', label: 'Problem' },
  { id: 'goal', label: 'Goal' },
  { id: 'tool', label: 'The Tool' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'persona-tiers', label: 'Personas' },
  { id: 'department-use', label: 'Departments' },
  { id: 'validation', label: 'Validation' },
  { id: 'org-adoption', label: 'Org Adoption' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'next-steps', label: 'Next Steps' },
];

export const SNAPSHOT_STATS = [
  { value: '200K', label: 'Active Personas Generated', icon: 'people' },
  { value: '100%', label: 'Customer Segment Capture', icon: 'verified' },
  { value: '4mo', label: 'End-to-End Delivery', icon: 'schedule' },
  { value: '40+', label: 'Cross-Functional Users', icon: 'groups' },
];

export const PROBLEM_POINTS = [
  {
    icon: 'account_tree',
    headline: 'Fragmented Customer View',
    support: 'Research, BI, Marketing, Product, and UX each held partial, disconnected views of the customer.',
    detail: 'Quantitative data drove decisions but lacked behavioral context and "why." Teams operated from different assumptions, creating invisible misalignment across every function.',
  },
  {
    icon: 'sync_disabled',
    headline: 'Static Artifacts, Zero Trust',
    support: 'Personas existed as static deliverables that quickly became outdated and were actively distrusted.',
    detail: 'When teams couldn\'t trust shared artifacts, they reverted to domain-specific assumptions—compounding the fragmentation problem at every sprint cycle.',
  },
  {
    icon: 'fork_right',
    headline: 'Execution Without Alignment',
    support: 'Teams executed independently, resulting in misaligned roadmaps, redundant efforts, and inconsistent customer experiences.',
    detail: 'Directors and managers were optimizing within their own domains—not as a coordinated system. There was no shared mechanism to translate insight into action or align strategy across departments.',
  },
  {
    icon: 'speed',
    headline: 'Slowed Decision Velocity',
    support: 'Without a shared source of truth, every cross-functional decision required excessive alignment overhead.',
    detail: 'Meetings to align on who the customer even was consumed bandwidth that should have driven execution. Decision latency compounded into missed market opportunities.',
  },
];

export const TOOL_MODES = [
  {
    mode: 'Guided',
    icon: 'auto_fix_high',
    tagline: 'One click. Follow the prompts.',
    description: 'Structured inputs with conditional logic ensure persona integrity. The system validates customer type against loyalty classification automatically.',
    capabilities: [
      'Automatic conditional logic prevents invalid combinations',
      'Customer type locked to loyalty tier (Ambassador ≠ infrequent shopper)',
      'Guided prompts surface the right data inputs',
      'Output generated with zero manual configuration',
    ],
    willDo: [
      'Generate validated, behavior-driven personas',
      'Enforce loyalty-type consistency automatically',
      'Surface actionable outputs across all departments',
    ],
    wontDo: [
      'Accept logically inconsistent inputs',
      'Operate as a black box — outputs are explainable',
      'Require BI or research expertise to operate',
    ],
  },
  {
    mode: 'Perspicacious',
    icon: 'psychology',
    tagline: 'Override with precision. For the un-timid.',
    description: 'Instruction-based generation using custom overrides and special considerations. Uses instruction to generate code that overrides the tool for advanced use cases.',
    capabilities: [
      'Manual instruction input for edge cases',
      'Custom overrides and special considerations',
      'Paste instructions → LLM generates override code',
      'Re-paste generated code into tool for custom output',
    ],
    willDo: [
      'Accept advanced user-defined instructions',
      'Generate override logic for non-standard personas',
      'Support power users with granular control',
    ],
    wontDo: [
      'Validate inputs automatically in manual mode',
      'Catch user errors in instruction logic',
      'Guarantee accuracy without correct inputs',
    ],
  },
];

export const INPUT_LAYERS = [
  { icon: 'lock', label: 'Hard-Coded Instructions', type: 'automatic', detail: 'Core behavioral logic and validation rules baked into the system. These cannot be overridden and ensure baseline persona integrity across all outputs.' },
  { icon: 'public', label: 'Dynamic Public Signals', type: 'automatic', detail: 'Real-time public and behavioral data feeds. Market signals, trend data, and publicly available behavioral indicators inform persona context continuously.' },
  { icon: 'analytics', label: 'Internal BI & Research', type: 'automatic', detail: 'Proprietary Plexus data: purchase patterns, loyalty classifications, CX scores, and validated research attributes. Anonymized and structured for generation.' },
  { icon: 'tune', label: 'Soft Instructions', type: 'manual', detail: 'User-provided guidance that shapes how the system interprets and frames outputs. These are "how-to" directives that improve generation accuracy without altering core logic.' },
  { icon: 'edit_note', label: 'Overrides', type: 'manual', detail: 'Advanced instruction sets that modify generation behavior for specific use cases. Requires user expertise — incorrect inputs produce incorrect outputs.' },
  { icon: 'star', label: 'Special Considerations', type: 'manual', detail: 'Context flags for edge cases, seasonal factors, or segment-specific nuance. Allows teams to annotate generations with situational awareness.' },
];

export const PERSONA_TIERS = [
  {
    id: 'unaware',
    tier: 'Unaware',
    icon: 'visibility_off',
    color: '#78ACAF',
    orbitRadius: 200,
    angle: 210,
    traits: ['Infrequent buyers', 'Gaining trust in brand', 'Low brand awareness', 'Price-sensitive explorers'],
    behavior: 'First-time or rare purchasers who are in the early trust-building phase. They may have discovered Plexus through word-of-mouth or advertising but have not yet committed to the brand.',
    experience: 'CX Score: Low — High friction onboarding, unclear value proposition, needs nurturing flows.',
    actions: {
      Marketing: 'Awareness campaigns, educational content, low-barrier trials',
      Product: 'Simplified onboarding, social proof integration, low-risk CTAs',
      UX: 'Reduce cognitive load, clarify value, streamline first-touch flows',
    },
    imageUrl: '', // ← Unaware tier side sheet image URL
  },
  {
    id: 'vip',
    tier: 'VIP',
    icon: 'star',
    color: '#438F9C',
    orbitRadius: 130,
    angle: 330,
    traits: ['Losing trust or interest', 'Potential Ambassadorship at risk', 'High past engagement', 'At churn threshold'],
    behavior: 'Previously high-value customers showing signs of disengagement. They know the brand well and once transacted frequently — but something eroded their confidence or interest.',
    experience: 'CX Score: Medium-declining — Re-engagement is highest ROI opportunity in this cohort.',
    actions: {
      Marketing: 'Win-back sequences, exclusive VIP recognition, personalized offers',
      Product: 'Feature reminders, loyalty program visibility, frictionless re-entry',
      UX: 'Reduce re-onboarding friction, surface missed value, proactive outreach triggers',
    },
    imageUrl: '', // ← VIP tier side sheet image URL
  },
  {
    id: 'ambassador',
    tier: 'Ambassador',
    icon: 'campaign',
    color: '#A56935',
    orbitRadius: 70,
    angle: 90,
    traits: ['Struggling or thriving Ambassadorship', 'Influential Entrepreneur profile', 'High lifetime value', 'Network multipliers'],
    behavior: 'The brand\'s highest-value segment. Ambassadors are influential entrepreneurs who actively promote Plexus within their networks. Some are struggling with their own business context; others are thriving and amplifying brand reach.',
    experience: 'CX Score: High — Investment in this segment yields disproportionate network returns.',
    actions: {
      Marketing: 'Co-creation opportunities, referral amplification, success story content',
      Product: 'Advanced features, business tools, priority support pathways',
      UX: 'Power-user flows, business dashboard access, reduced friction at every touchpoint',
    },
    imageUrl: '', // ← Ambassador tier side sheet image URL
  },
]; = [
  {
    icon: 'science',
    name: 'Research & Analysis',
    color: '#78ACAF',
    uses: ['Survey structure design', 'User testing (Acceptance, A/B)', 'Persona validation against real data'],
    detail: 'R&A teams used persona outputs to structure research instruments that targeted the right behavioral segments, then validated generated personas against real customer data to close the accuracy loop.',
  },
  {
    icon: 'campaign',
    name: 'Marketing',
    color: '#438F9C',
    uses: ['Targeted communications', 'Social media segmentation', 'Campaign funnel design'],
    detail: 'Marketing embedded persona outputs directly into campaign briefs. Messaging, channel selection, and funnel architecture were all driven by the behavioral and motivational profile of the target tier.',
  },
  {
    icon: 'inventory_2',
    name: 'Product',
    color: '#365C6F',
    uses: ['Feature development roadmap', 'Development feasibility alignment', 'UX planning inputs'],
    detail: 'Product teams used persona data to prioritize the feature backlog against real user need — not assumptions. Roadmaps became defensible with behavioral evidence rather than opinion.',
  },
  {
    icon: 'brush',
    name: 'UX Design',
    color: '#A56935',
    uses: ['Personality trait integration', 'Experience score benchmarking', 'Flow and interaction design'],
    detail: 'UX designers used generated personas as live design references. Personality traits and CX scores informed information architecture, tone of voice, and interaction pattern decisions.',
  },
  {
    icon: 'support_agent',
    name: 'Customer Experience',
    color: '#78ACAF',
    uses: ['Customer Experience Score tracking', 'Loyalty classification by touchpoint', 'Proactive support trigger design'],
    detail: 'CX teams mapped persona outputs to service touchpoints, enabling proactive intervention before churn signals became irreversible — especially for the VIP at-risk segment.',
  },
  {
    icon: 'trending_up',
    name: 'Sales & Field Development',
    color: '#5F331D',
    uses: ['Pitch personalization by tier', 'Field team training alignment', 'Conversion funnel optimization'],
    detail: 'Sales and field teams translated persona outputs into pitch strategies. Understanding whether a prospect was Unaware or Ambassador-adjacent changed the entire engagement approach.',
  },
];

export const VALIDATION_NODES = [
  {
    id: 'risk',
    label: 'Risk',
    icon: 'warning_amber',
    color: '#A56935',
    headline: 'The Generative Risk',
    summary: 'AI outputs can appear correct while containing subtle inaccuracies.',
    detail: 'Generative systems introduce a critical failure mode: outputs that look authoritative but are subtly wrong. Without validation, this erodes trust, leads to poor decisions, and blocks adoption at the leadership level. The executive agreement: 90–95% accuracy or the initiative stops.',
    bullets: [
      'Outputs can appear correct while containing subtle inaccuracies',
      'Unvalidated errors compound into systemic poor decisions',
      'Leadership trust requires measurable, defined accuracy thresholds',
      '90–95% accuracy defined as minimum viable standard with executive alignment',
    ],
  },
  {
    id: 'test',
    label: 'Test',
    icon: 'biotech',
    color: '#438F9C',
    headline: 'Structured Testing Methodology',
    summary: 'Each output tested against real behavioral data across 4 dimensions.',
    detail: 'Validation was conducted through direct comparison against real customer data using the exact same metrics that informed persona generation. This ensured the system was measured against reality — not assumptions.',
    bullets: [
      'Behavioral data: purchase patterns and engagement signals',
      'Loyalty classification: Unaware → VIP → Ambassador mapping',
      'Customer experience indicators and CX score alignment',
      'Known BI and research attributes cross-referenced per output',
    ],
  },
  {
    id: 'result',
    label: 'Result',
    icon: 'verified',
    color: '#78ACAF',
    headline: 'Precision Deployment & Rapid Correction',
    summary: 'Edit-in-place capability enabled continuous accuracy improvement.',
    detail: 'Rather than requiring perfection, confidence thresholds were established for usage. Teams trusted outputs because they understood how they were validated, where they could fail, and how to correct them. This reframed adoption from "does it work?" to "how do we use it well?"',
    bullets: [
      'Edit-in-place after generation: adjust inputs, regenerate instantly',
      'Errors became diagnostic signals — not hidden risks',
      'Shorter feedback loops → continuous accuracy improvement',
      'Shared understanding: 100% accuracy unrealistic, high-confidence sufficient',
      'Built executive confidence enabling controlled organization-wide rollout',
    ],
  },
];

export const ORG_LAYERS = [
  {
    id: 'director',
    level: 'Director Layer',
    subtitle: 'Strategic Alignment',
    icon: 'corporate_fare',
    color: '#A56935',
    accountability: [
      'Aligned departmental roadmaps to the shared persona framework',
      'Validated strategic decisions using system-generated outputs',
      'Identified cross-functional gaps and drove clarity across domains',
      'Accountable for consistent interpretation and application across their function',
    ],
    responsibilities: [
      'Chaired cross-functional alignment sessions using persona data',
      'Escalated validation gaps to executive leadership',
      'Defined success criteria per department tied to persona accuracy thresholds',
    ],
    toolNarrative: 'Directors used the system as a strategic audit layer — before committing resources to a roadmap initiative, they validated that the target customer segment was accurately represented in the persona output and that cross-functional assumptions aligned. This eliminated the most expensive form of misalignment: strategic-level drift.',
  },
  {
    id: 'manager',
    level: 'Manager Layer',
    subtitle: 'Execution Integration',
    icon: 'manage_accounts',
    color: '#438F9C',
    accountability: [
      'Embedded persona outputs into sprint planning and campaign development',
      'Translated system outputs into team-specific action items',
      'Ensured personas were actively used — not passively referenced',
      'Validated research designs against current persona outputs',
    ],
    responsibilities: [
      'Incorporated persona data into every sprint brief and campaign kickoff',
      'Ran team-level training on guided vs. perspicacious generation modes',
      'Flagged output drift to directors when behavioral signals changed',
    ],
    toolNarrative: 'Managers operated as the execution bridge — translating strategic persona outputs into concrete team actions. Every sprint planning session began with a persona check: which tier are we designing for, and does our output serve their actual behavioral profile? This habit created consistent customer-centric execution without requiring top-down mandates.',
  },
  {
    id: 'ic',
    level: 'IC Layer',
    subtitle: 'Production & Delivery',
    icon: 'construction',
    color: '#78ACAF',
    accountability: [
      'Used outputs to guide UX decisions, feature prioritization, and messaging',
      'Executed with clarity and autonomy without requiring constant alignment overhead',
      'Applied persona intelligence directly to flows, copy, and interaction patterns',
      'Flagged anomalies in outputs to managers for rapid correction',
    ],
    responsibilities: [
      'Referenced persona outputs as live design and development criteria',
      'Applied personality traits and CX scores to interface and content decisions',
      'Contributed input quality improvements based on generation results',
    ],
    toolNarrative: 'Individual contributors — designers, researchers, developers, and architects — experienced the most direct impact. With personas as a live reference rather than a static document, decisions that previously required a customer research meeting could be made in the moment. The result: faster delivery, fewer revisions, and higher confidence in shipped work.',
  },
];

export const OUTCOMES = [
  {
    icon: 'trending_up',
    metric: '+19pts',
    label: 'Operating Margin Recovery',
    before: '-17% operating margin',
    after: '+2% operating margin',
    detail: 'Reversed multi-year negative profitability within four months of system deployment. The unified customer insight model eliminated redundant spend and accelerated revenue-generating decisions.',
    color: '#438F9C',
  },
  {
    icon: 'autorenew',
    metric: '+15%',
    label: 'Customer Retention & Renewals',
    before: 'Reactive retention, high churn signals missed',
    after: 'Proactive behavioral intervention by tier',
    detail: 'Actionable behavioral insights enabled CX and marketing teams to intervene before churn. Subscription renewals increased 15% through persona-driven re-engagement campaigns targeting the VIP at-risk cohort.',
    color: '#78ACAF',
  },
  {
    icon: 'shopping_cart',
    metric: '+10%',
    label: 'Average Cart Size & LTV',
    before: 'Generalized product recommendations',
    after: 'Tier-specific upsell pathways',
    detail: 'Persona-informed product and UX decisions drove measurable lift in average cart size and customer lifetime value. Ambassador-tier users responded to advanced product positioning; Unaware-tier responded to trust-building introductory offers.',
    color: '#A56935',
  },
  {
    icon: 'groups',
    metric: '40+',
    label: 'Cross-Functional Users Scaled',
    before: 'Insight siloed to Research & BI teams',
    after: 'Organization-wide access across 6 departments',
    detail: 'Scaled organizational customer awareness to ~40 cross-functional users across Sales, Customer Service, Field Development, Executive Leadership, Product, and UX — each operating from the same behavioral source of truth.',
    color: '#365C6F',
  },
];

export const NEXT_STEPS = [
  {
    icon: 'map',
    title: 'Journey Mapping',
    question: 'How do personas interact with the company?',
    detail: 'Build end-to-end journey maps grounded in real behavioral data from the persona system. Map touchpoints by loyalty tier to surface friction, delight, and intervention opportunity across the full customer lifecycle.',
    color: '#438F9C',
  },
  {
    icon: 'auto_awesome',
    title: 'Dynamic Archetypes',
    question: 'Can personas evolve with new data automatically?',
    detail: 'Structure a minimal set of archetypes designed to evolve continuously as BI and research data update. Move from static generation to a living persona model that reflects current market behavior.',
    color: '#78ACAF',
  },
  {
    icon: 'route',
    title: 'Journey of the Data',
    question: 'How does insight stay current and trusted?',
    detail: 'Design planned retrospectives to maintain persona alignment as the business evolves. Structure the data flow from BI → Research → Generation → Validation as a repeatable, governed process.',
    color: '#A56935',
  },
  {
    icon: 'rocket_launch',
    title: 'UX Maturity Advancement',
    question: 'What does the next level of design leadership look like?',
    detail: 'Continue advancing Plexus\'s UX maturity through the foundation this system established. The persona engine is infrastructure — the next chapter is using it to drive product strategy, not just inform it.',
    color: '#365C6F',
  },
];

export const TECH_STACK = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend' },
  { name: 'Vite', icon: 'https://vitejs.dev/logo.svg', category: 'Build Tool' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Language' },
  { name: 'Claude AI', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg', category: 'AI Layer' },
  { name: 'Gemini', icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg', category: 'AI Layer' },
];
