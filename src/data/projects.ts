// Project scatterplot — what I have actually delivered.
// Axes: X = complexity/scope, Y = business impact. Both defined, not arbitrary.
// Every dot self-narrates via visible label and links to a case study.

export interface Project {
  slug: string;
  label: string;        // shown on chart
  shortLabel: string;   // for legend / tooltip
  domain: 'legal' | 'data' | 'ppm' | 'ai';
  scope: 1 | 2 | 3;     // X-axis: 1=low (1-2 stakeholders, single system), 2=med, 3=high (enterprise-wide, multi-year)
  impact: 1 | 2 | 3;    // Y-axis: 1=low (<10%), 2=med (10-50% or measurable $), 3=high (>$1M saved, >50% cycle cut, regulator-grade)
  size: 1 | 2 | 3;      // bubble size: 1=small, 2=med, 3=large
  href: string;
}

export const projects: Project[] = [
  {
    slug: 'ai-doc-classifier',
    label: 'AI doc classifier — 3,000 docs, 300% faster iManage migration',
    shortLabel: 'AI doc classifier',
    domain: 'ai',
    scope: 2,
    impact: 3,
    size: 2,
    href: '/case-study/ai-doc-classifier/',
  },
  {
    slug: 'records-review-redesign',
    label: 'Records review redesign — 16 stakeholder groups, 60% cycle cut',
    shortLabel: 'Records review redesign',
    domain: 'data',
    scope: 3,
    impact: 3,
    size: 3,
    href: '/case-study/records-review-redesign/',
  },
  {
    slug: 'legal-tech-portfolio',
    label: '$1.25M legal tech portfolio — 12 systems, 3-yr roadmap',
    shortLabel: '$1.25M legal tech portfolio',
    domain: 'legal',
    scope: 3,
    impact: 3,
    size: 2,
    href: '/case-study/legal-tech-portfolio/',
  },
  {
    slug: 'nda-self-service',
    label: 'NDA self-service — 20 NDAs/mo, $50K+ saved, 75% faster',
    shortLabel: 'NDA self-service',
    domain: 'legal',
    scope: 1,
    impact: 2,
    size: 1,
    href: '/case-study/nda-self-service/',
  },
  {
    slug: 'metadata-platform-launch',
    label: '$1.5M metadata platform — 1,000+ DBs, 95% adoption',
    shortLabel: '$1.5M metadata platform',
    domain: 'data',
    scope: 3,
    impact: 3,
    size: 3,
    href: '/case-study/metadata-platform-launch/',
  },
  {
    slug: 'collibra-lineage-cde',
    label: 'Tier 2 lineage in Collibra — CDE program at $3T GSE',
    shortLabel: 'Collibra Tier 2 lineage',
    domain: 'data',
    scope: 2,
    impact: 3,
    size: 2,
    href: '/case-study/collibra-lineage-cde/',
  },
  {
    slug: 'senate-installations',
    label: 'Senate installations — 164 Senate offices, full lifecycle',
    shortLabel: 'Senate installations',
    domain: 'ppm',
    scope: 2,
    impact: 2,
    size: 2,
    href: '/case-study/senate-installations/',
  },
  {
    slug: 'ariba-sharepoint-migration',
    label: 'Ariba + SharePoint migration — 40,000 docs, 800 sites',
    shortLabel: 'Ariba + SharePoint migration',
    domain: 'ppm',
    scope: 3,
    impact: 2,
    size: 3,
    href: '/case-study/ariba-sharepoint-migration/',
  },
  {
    slug: 'risk-based-classification',
    label: 'Risk-based classification — enterprise-wide rollout',
    shortLabel: 'Risk-based classification',
    domain: 'data',
    scope: 2,
    impact: 3,
    size: 2,
    href: '/case-study/risk-based-classification/',
  },
  {
    slug: 'clm-platform-evaluation',
    label: 'CLM platform eval — 4 vendors POC\'d, drove selection',
    shortLabel: 'CLM platform eval',
    domain: 'legal',
    scope: 2,
    impact: 2,
    size: 1,
    href: '/case-study/clm-platform-evaluation/',
  },
];

export const domainMeta = {
  legal: { label: 'Legal Ops', color: 'var(--color-legal)' },
  data: { label: 'Data Governance', color: 'var(--color-data)' },
  ppm: { label: 'PPM', color: 'var(--color-ppm)' },
  ai: { label: 'AI / Automation', color: 'var(--color-ai)' },
};
