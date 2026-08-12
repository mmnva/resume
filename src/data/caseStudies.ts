// Case study content — evidence-first structure per visual rules.
// Each case study = Business Problem → Tools & Methods → Approach → Outcomes → Related

export interface CaseStudy {
  slug: string;
  title: string;
  domain: 'legal' | 'data' | 'ppm' | 'ai';
  headline: string;          // one big number/metric that proves the impact
  headlineLabel: string;     // short label for the headline metric
  period: string;
  company: string;
  problem: string;           // business problem
  tools: string[];           // tools & methods
  approach: string[];        // approach steps (process map narrative)
  outcomes: { metric: string; label: string }[];
  visuals?: { kind: 'process' | 'kpi' | 'architecture'; caption: string; data?: any }[];
  relatedTrack: string;
  relatedTrackLabel: string;
  reflection?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-doc-classifier',
    title: 'AI document classifier for iManage migration',
    domain: 'ai',
    headline: '300%',
    headlineLabel: 'faster iManage migration',
    period: '2024',
    company: 'Freddie Mac',
    problem:
      'Freddie Mac\'s Legal Division was migrating 3,000+ legal documents into iManage. Manual review of each document to assign metadata, categorization, and recommended placement was the bottleneck — projected to take 4-6 months of legal-ops analyst time and delay the migration. AI/automation was identified as the path, but the team needed a tool that could be built and validated quickly without an enterprise ML platform.',
    tools: ['Python', 'iManage API', 'NLP libraries', 'Microsoft Power Platform'],
    approach: [
      'Built custom Python application to ingest documents from the legacy system',
      'Applied NLP-based classification to predict category, metadata, and target iManage location',
      'Generated pre-migration recommendations with confidence scores for human review',
      'Iterated on classification accuracy using reviewer feedback loop',
    ],
    outcomes: [
      { metric: '300%', label: 'faster migration timeline' },
      { metric: '3,000+', label: 'documents processed' },
      { metric: 'Months', label: 'of analyst time saved' },
    ],
    visuals: [
      { kind: 'process', caption: 'Before/after: each document required manual review; after the classifier, only flagged/low-confidence items needed a human.' },
      { kind: 'kpi', caption: 'Migration timeline: baseline 6 months (manual) vs. end state ~1.5 months (AI-assisted).' },
    ],
    relatedTrack: '/track/data-governance/',
    relatedTrackLabel: 'Data Governance',
    reflection: 'The biggest unlock was treating this as a recommendation engine with a human-in-the-loop, not a full automation. Confidence scores let analysts focus only on edge cases.',
  },
  {
    slug: 'records-review-redesign',
    title: 'Annual records review redesign',
    domain: 'data',
    headline: '60%',
    headlineLabel: 'cycle time reduction',
    period: '2024-2025',
    company: 'Freddie Mac',
    problem:
      'The annual records review across 16 stakeholder groups in the Legal Division was a 45-step manual process. It consumed weeks of legal-ops time, was prone to compliance errors at handoff points, and produced low stakeholder satisfaction. The process had grown organically over years and resisted incremental fixes.',
    tools: ['LUMA Human-Centered Design', 'Mural', 'Visio', 'SharePoint', 'Power Automate', 'Power BI'],
    approach: [
      'Applied LUMA HCD methodology — interviewed 16 stakeholder groups to map their workflows and pain points',
      'Mapped the current 45-step process in Visio, identified handoff failures and redundant steps',
      'Co-designed target process with stakeholder representatives using Mural workshops',
      'Rebuilt the workflow on SharePoint + Power Automate, with Power BI dashboard for visibility',
    ],
    outcomes: [
      { metric: '45→0', label: 'manual steps eliminated' },
      { metric: '60%', label: 'cycle time reduction' },
      { metric: '16', label: 'stakeholder groups aligned' },
      { metric: '↑', label: 'compliance accuracy improved' },
    ],
    visuals: [
      { kind: 'process', caption: 'Before: 45 manual steps across 16 groups, multiple handoff failures. After: linear automated workflow on SharePoint + Power Automate.' },
      { kind: 'kpi', caption: 'Cycle time: baseline 100% (manual) → 40% (end state). Compliance accuracy: up across all 16 stakeholder groups.' },
    ],
    relatedTrack: '/track/data-governance/',
    relatedTrackLabel: 'Data Governance',
    reflection: 'LUMA HCD was the unlock. Without stakeholder interviews, I would have optimized for the wrong thing.',
  },
  {
    slug: 'legal-tech-portfolio',
    title: '$1.25M legal technology portfolio',
    domain: 'legal',
    headline: '$1.25M',
    headlineLabel: '12-system portfolio owned',
    period: 'Jan 2023 – Jun 2024',
    company: 'Micron Technology',
    problem:
      'Micron\'s enterprise Legal Department was running 12 disparate legal technology systems across matter management, e-billing, CLM, and records, with no single owner, no consistent ROI tracking, and no roadmap. Vendor management was ad hoc. The General Counsel needed a strategic view and a 3-year plan.',
    tools: ['Microsoft Power Platform', 'Tableau', 'CLOC framework', 'Vendor evaluation methodology'],
    approach: [
      'Inventoried all 12 systems, owners, contracts, and renewal dates',
      'Built Tableau dashboard for GC tracking spend, KPIs, subscription utilization',
      'Ran formal CLM/eBilling POC evaluations (Conga, Agiloft, Ironclad, Evisort, Mitratech TeamConnect, Brightflag)',
      'Authored 3-year technology roadmap with phased consolidation and modernization plan',
      'Implemented CLOC framework for legal subscription tracking — improved vendor mgmt efficiency by 10%+',
    ],
    outcomes: [
      { metric: '12', label: 'systems inventoried and managed' },
      { metric: '$1.25M', label: 'portfolio budget owned' },
      { metric: '3-yr', label: 'roadmap delivered to GC' },
      { metric: '10%+', label: 'vendor mgmt efficiency gain' },
    ],
    visuals: [
      { kind: 'architecture', caption: 'Portfolio architecture: 12 systems mapped across matter mgmt, eBilling, CLM, records, intake, analytics layers.' },
      { kind: 'kpi', caption: 'Vendor mgmt efficiency: baseline → end state with CLOC framework. Spend visibility: zero → 100% via Tableau dashboard.' },
    ],
    relatedTrack: '/track/legal-ops/',
    relatedTrackLabel: 'Legal Ops',
    reflection: 'The hardest part wasn\'t the technology — it was getting 12 system owners to agree on shared metrics and a single roadmap.',
  },
  {
    slug: 'metadata-platform-launch',
    title: '$1.5M metadata management platform launch',
    domain: 'data',
    headline: '$1.5M',
    headlineLabel: 'platform delivered, 95% adoption',
    period: 'May 2016 – Oct 2017',
    company: 'Micron Technology',
    problem:
      'Micron\'s enterprise data estate had no unified metadata layer. Data discovery was slow, governance was inconsistent, and there was no catalog for analysts to find authoritative data sources. A formal metadata management initiative was needed from inception.',
    tools: ['ASG Data Intelligence', 'Data governance framework', 'Cross-functional stakeholder management'],
    approach: [
      'Conducted market research and proof-of-concept across metadata platform vendors',
      'Negotiated contracts and selected ASG Data Intelligence as the platform',
      'Built the data catalog structure, subject area model, and stewardship roles',
      'Designed and delivered training programs for organizational adoption',
      'Presented insights and best practices at DG&IQ Winter Conference 2017',
    ],
    outcomes: [
      { metric: '$1.5M', label: 'budget owned, delivered on time' },
      { metric: '1,000+', label: 'databases cataloged' },
      { metric: '95%+', label: 'global adoption (later, at scale)' },
      { metric: '1', label: 'DG&IQ Conference speaking engagement' },
    ],
    visuals: [
      { kind: 'architecture', caption: 'Platform architecture: ASG Data Intelligence core with subject area model, stewardship layer, and consumer catalog.' },
      { kind: 'kpi', caption: 'Adoption curve over 12 months post-launch. Discovery time reduced by ~60% for cataloged assets.' },
    ],
    relatedTrack: '/track/data-governance/',
    relatedTrackLabel: 'Data Governance',
    reflection: 'The DG&IQ speaking engagement was external validation that the work had industry-level credibility, not just internal adoption.',
  },
  {
    slug: 'collibra-lineage-cde',
    title: 'Tier 2 lineage for Critical Data Elements at Freddie Mac',
    domain: 'data',
    headline: 'CDE',
    headlineLabel: 'Critical Data Element program at $3T GSE',
    period: '2024 – Present',
    company: 'Freddie Mac',
    problem:
      'As CDO Delegate for Freddie Mac\'s Legal Division ($3T GSE under FHFA oversight), the priority was establishing Tier 2 data lineage and Data Quality Metrics for Critical Data Elements to support regulatory reporting. Without lineage, the Legal Division could not demonstrate data provenance for FHFA exams.',
    tools: ['Collibra', 'DAMA-DMBOK', 'FHFA regulatory framework', 'Risk-based data classification'],
    approach: [
      'Mapped Critical Data Elements across legal data estate with business owners',
      'Built Tier 2 lineage in Collibra from source systems through to regulatory reports',
      'Established Data Quality Metrics (completeness, validity, timeliness, accuracy) per CDE',
      'Developed and implemented a risk-based data classification methodology',
      'Aligned lineage and classification with FHFA regulatory expectations',
    ],
    outcomes: [
      { metric: 'Tier 2', label: 'lineage established in Collibra' },
      { metric: 'CDE', label: 'program live with DQ metrics' },
      { metric: '$3T', label: 'GSE under FHFA oversight' },
      { metric: 'Enterprise', label: 'risk-based classification adopted' },
    ],
    visuals: [
      { kind: 'architecture', caption: 'Lineage architecture: source systems → CDE layer → regulatory reports, with DQ metrics and risk classification at each node.' },
      { kind: 'kpi', caption: 'CDE coverage: baseline 0% → end state per legal data estate. DQ metric adoption: baseline 0 → full coverage on tier-1 CDEs.' },
    ],
    relatedTrack: '/track/data-governance/',
    relatedTrackLabel: 'Data Governance',
    reflection: 'The hardest part was agreeing on which data elements were "Critical" — that definition is what makes lineage tractable at scale.',
  },
  {
    slug: 'nda-self-service',
    title: 'NDA self-service Power Platform solution',
    domain: 'legal',
    headline: '$50K+',
    headlineLabel: 'saved on CLM licensing',
    period: '2023-2024',
    company: 'Micron Technology',
    problem:
      'Legal was processing 20+ NDAs per month manually through email and Word documents. Turnaround was days, and the volume didn\'t justify the cost of an enterprise CLM platform license. Legal Operations needed a fast, self-service solution for employees to generate NDAs without Legal involvement for routine cases.',
    tools: ['Microsoft Power Apps', 'Power Automate', 'SharePoint', 'CLOC framework'],
    approach: [
      'Designed a self-service Power App that walks employees through NDA generation',
      'Built approval routing into Power Automate for edge cases requiring legal review',
      'Integrated with SharePoint for document storage and audit trail',
      'Avoided $50K+ in CLM platform license costs by staying within Power Platform',
    ],
    outcomes: [
      { metric: '20', label: 'NDAs per month handled' },
      { metric: '$50K+', label: 'CLM license costs avoided' },
      { metric: '75%', label: 'faster turnaround' },
      { metric: 'Self-service', label: 'for routine cases' },
    ],
    relatedTrack: '/track/legal-ops/',
    relatedTrackLabel: 'Legal Ops',
  },
  {
    slug: 'ariba-sharepoint-migration',
    title: 'Ariba + SharePoint migration (40,000 docs)',
    domain: 'ppm',
    headline: '40,000+',
    headlineLabel: 'documents migrated, zero data loss',
    period: 'Aug 2013 – May 2016',
    company: 'Micron Technology',
    problem:
      'Global Procurement at Micron was running on Documentum for document management and SharePoint 2007 for collaboration — both aging, expensive, and disconnected. Ariba Network integration was also needed for P2P and Spend Visibility. The combined transformation touched 800+ SharePoint sites and decades of procurement documentation.',
    tools: ['SAP Ariba', 'SharePoint 2013', 'Documentum', 'SQL', 'Power Query'],
    approach: [
      'Led Ariba Network integration into P2P and Spend Visibility as core team member',
      'Designed new SharePoint library, permission structure, and migration plan for 40,000+ documents from Documentum',
      'Migrated 800+ SharePoint sites from 2007 to 2013, including Site Collection Administration for Global Procurement',
      'Co-led Taxonomy project — developed managed metadata within Information Management and Search Governance',
      'Built SQL/Power Query reports and dashboards for ongoing data-driven decision making',
    ],
    outcomes: [
      { metric: '40,000+', label: 'documents migrated from Documentum' },
      { metric: '800+', label: 'SharePoint sites migrated to 2013' },
      { metric: '0', label: 'data loss incidents' },
      { metric: '1', label: 'Ariba P2P integration delivered' },
    ],
    relatedTrack: '/track/project-portfolio-management/',
    relatedTrackLabel: 'PPM',
  },
  {
    slug: 'senate-installations',
    title: 'U.S. Senate installations program (164 offices)',
    domain: 'ppm',
    headline: '164',
    headlineLabel: 'Senate offices supported',
    period: 'Jun 2002 – Feb 2003',
    company: 'Veridian IT Services',
    problem:
      'Veridian held the contract for IT hardware/software installations across all 164 U.S. Senate offices in DC. Scheduling, delivery tracking, and help desk coordination were being run on disconnected systems, with no single source of truth. The Senate Sergeant at Arms had strict delivery requirements that the existing process could not meet.',
    tools: ['Custom workflow database', 'Help desk ticketing', 'Inventory management'],
    approach: [
      'Built first-ever workflow database that met Senate Sergeant at Arms delivery requirements',
      'Coordinated with HP team for state-office installations and deliveries',
      'Managed inventory warehouse during contract inception',
      'Coordinated SMI (Senate Mail Infrastructure) team upgrades to existing mail management system',
      'Transition team member for incoming class of Senators',
    ],
    outcomes: [
      { metric: '164', label: 'Senate offices in DC supported' },
      { metric: '1st', label: 'workflow DB to meet SAA requirements' },
      { metric: 'Secret', label: 'USG clearance received' },
    ],
    relatedTrack: '/track/project-portfolio-management/',
    relatedTrackLabel: 'PPM',
  },
  {
    slug: 'risk-based-classification',
    title: 'Risk-based data classification (enterprise rollout)',
    domain: 'data',
    headline: 'Enterprise',
    headlineLabel: 'risk-based classification adopted',
    period: '2024 – Present',
    company: 'Freddie Mac',
    problem:
      'Data classification at Freddie Mac Legal Division was ad hoc and inconsistent. Without a risk-based methodology, sensitive data was over- or under-classified, creating regulatory exposure and operational friction. A standardized, business-driven classification was needed to support FHFA expectations and downstream tooling.',
    tools: ['Risk-based classification methodology', 'Collibra', 'DAMA-DMBOK', 'Cross-functional stakeholder alignment'],
    approach: [
      'Developed risk-based classification methodology based on data sensitivity, regulatory exposure, and business criticality',
      'Aligned classification schema with FHFA and DAMA-DMBOK best practices',
      'Rolled out across legal data estate with stakeholder engagement',
      'Integrated classification with Collibra and downstream controls',
    ],
    outcomes: [
      { metric: 'Enterprise', label: 'rollout completed' },
      { metric: '↑', label: 'data security posture improved' },
      { metric: '↑', label: 'regulatory compliance posture improved' },
    ],
    relatedTrack: '/track/data-governance/',
    relatedTrackLabel: 'Data Governance',
  },
  {
    slug: 'clm-platform-evaluation',
    title: 'CLM platform evaluation (4 vendors POC\'d)',
    domain: 'legal',
    headline: '4',
    headlineLabel: 'CLM vendors POC\'d',
    period: '2023-2024',
    company: 'Micron Technology',
    problem:
      'Micron Legal needed to select a Contract Lifecycle Management platform but had no formal evaluation framework. Multiple vendors (Conga, Agiloft, Ironclad, Evisort AI) claimed enterprise readiness, and the legal team lacked the methodology to compare them apples-to-apples.',
    tools: ['POC methodology', 'CLM platforms: Conga, Agiloft, Ironclad, Evisort AI', 'Gap analysis', 'Vendor demos'],
    approach: [
      'Defined evaluation criteria with legal leadership (functional, technical, cost, integration)',
      'Ran hands-on proof-of-concept demonstrations with each vendor',
      'Conducted requirements gathering with stakeholders across Legal, Procurement, IT',
      'Produced gap analysis and recommendations to General Counsel',
    ],
    outcomes: [
      { metric: '4', label: 'CLM vendors POC\'d' },
      { metric: '1', label: 'recommendation delivered to GC' },
      { metric: 'CLOC-aligned', label: 'evaluation framework' },
    ],
    relatedTrack: '/track/legal-ops/',
    relatedTrackLabel: 'Legal Ops',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(c => c.slug === slug);
}
