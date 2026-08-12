// Capability heatmap data — 4 discrete levels, each tied to evidence.
// Levels: 1 = working knowledge, 2 = delivery, 3 = leadership, 4 = recognized expertise
// Per visual rule: no fake percentages; every cell cites concrete evidence.

export interface Capability {
  name: string;
  level: 1 | 2 | 3 | 4;
  evidence: string;
  domain: 'legal' | 'data' | 'ppm' | 'ai';
}

export const capabilities: Capability[] = [
  // Recognized expertise (4)
  { name: 'Data Governance (DAMA-DMBOK, Collibra)', level: 4, evidence: 'Invited speaker, DG&IQ Conference 2017; CDMP-certified (DAMA International)', domain: 'data' },
  { name: 'Program/Portfolio Mgmt (>$1M budgets)', level: 4, evidence: 'Owned $1.5M metadata initiative and $1.25M legal tech portfolio', domain: 'ppm' },
  { name: 'Metadata Management (catalogs, lineage)', level: 4, evidence: '1,000+ databases at Micron; Tier 2 lineage in Collibra at Freddie Mac', domain: 'data' },
  { name: 'Cross-functional Alignment (Legal/IT/Risk)', level: 4, evidence: 'CDO Delegate at Freddie Mac; led 16-stakeholder change programs', domain: 'ppm' },

  // Leadership (3)
  { name: 'Legal Tech (CLM, eBilling, Matter Mgmt)', level: 3, evidence: '12-system $1.25M portfolio; CLM/eBilling POC evaluations (Conga, Ironclad, Agiloft, Evisort)', domain: 'legal' },
  { name: 'Records & Info Governance (Purview, iManage)', level: 3, evidence: 'Records review redesign (45 steps eliminated, 60% cycle cut); Purview deployment planning', domain: 'legal' },
  { name: 'Stakeholder/Change Mgmt (LUMA HCD)', level: 3, evidence: 'LUMA Practitioner; redesigned workflows across 16 stakeholder groups', domain: 'ppm' },
  { name: 'Vendor Mgmt & Contract Negotiation', level: 3, evidence: 'CLM/eBilling vendor selection; global offsite storage contract negotiation', domain: 'legal' },
  { name: 'Compliance & Regulatory (FHFA, GDPR, HIPAA)', level: 3, evidence: 'CDO Delegate under FHFA; GDPR mapping initiative; SOX audit experience', domain: 'data' },
  { name: 'Supply Chain & Process Improvement (CSCP)', level: 3, evidence: 'APICS CSCP (2008); $17M inventory reduction; kaizen program lead', domain: 'ppm' },

  // Delivery (2)
  { name: 'AI/Automation (Python, Power Platform)', level: 2, evidence: 'Built Python doc classifier (300% speedup); Power Platform NDA tool ($50K+ saved)', domain: 'ai' },
  { name: 'Data Analytics (SQL, Power BI, Tableau)', level: 2, evidence: 'Tableau dashboard for GC; Power Query reports & dashboards', domain: 'data' },
  { name: 'Process & Workflow Design', level: 2, evidence: '40,000-doc Documentum→SharePoint migration; Senate workflow DB', domain: 'ppm' },
  { name: 'Executive Communication', level: 2, evidence: 'Routinely briefed GC and CDO; 3-year roadmap authorship', domain: 'ppm' },
  { name: 'Programming (Python)', level: 2, evidence: 'Custom Python app for iManage migration; ad-hoc automation scripts', domain: 'ai' },
  { name: 'Documentation & Knowledge Mgmt', level: 2, evidence: 'Taxonomy co-lead (Micron); training programs for 800+ SharePoint sites', domain: 'ppm' },
];

export const levelLabels: Record<1 | 2 | 3 | 4, string> = {
  1: 'Working',
  2: 'Delivery',
  3: 'Leadership',
  4: 'Recognized',
};

export const levelDescriptions: Record<1 | 2 | 3 | 4, string> = {
  1: 'Can discuss and apply with guidance',
  2: 'Independently shipped production work',
  3: 'Led a team or initiative at scale',
  4: 'Invited speaker, industry reference, or external validation',
};
