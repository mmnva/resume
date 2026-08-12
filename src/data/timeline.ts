// Impact timeline — chronological milestones from 2002 to present.
// Each milestone includes a measurable outcome and a link to a case study or track page.

export interface Milestone {
  year: number;
  role: string;
  company: string;
  duration: string;
  outcome: string;
  link?: string;
  domain: 'legal' | 'data' | 'ppm' | 'ai';
}

export const milestones: Milestone[] = [
  {
    year: 2002,
    role: 'Lead Logistician',
    company: 'Veridian IT Services',
    duration: 'Jun 2002 – Feb 2003',
    outcome: 'Scheduled installations and deliveries for all 164 U.S. Senate offices in DC; built first-ever workflow DB meeting Senate Sergeant at Arms requirements',
    link: '/case-study/senate-installations/',
    domain: 'ppm',
  },
  {
    year: 2004,
    role: 'Procurement Analyst',
    company: 'Perot Systems Government Services',
    duration: 'May 2004 – Aug 2006',
    outcome: 'Migrated purchasing dept to Deltek Costpoint; built vendor evaluation database for SOX audits',
    domain: 'ppm',
  },
  {
    year: 2006,
    role: 'Procurement Analyst/Planner',
    company: 'Micron Technology',
    duration: 'Aug 2006 – Aug 2013',
    outcome: 'Reduced silicon-wafer inventory by $17M via LEAN/JIT; earned APICS CSCP (2008)',
    domain: 'ppm',
  },
  {
    year: 2013,
    role: 'Business Process Analyst',
    company: 'Micron Technology',
    duration: 'Aug 2013 – May 2016',
    outcome: 'Led Ariba Network P2P integration; migrated 40,000+ docs from Documentum to SharePoint',
    link: '/case-study/ariba-sharepoint-migration/',
    domain: 'ppm',
  },
  {
    year: 2016,
    role: 'IT Metadata Engineer',
    company: 'Micron Technology',
    duration: 'May 2016 – Oct 2017',
    outcome: 'Pioneered $1.5M metadata management initiative inception to delivery; DG&IQ Conference 2017 speaker',
    link: '/case-study/metadata-platform-launch/',
    domain: 'data',
  },
  {
    year: 2017,
    role: 'IT Manager, Metadata Management',
    company: 'Micron Technology',
    duration: 'Oct 2017 – Jan 2021',
    outcome: 'Led 5-person team supporting 1,000+ databases; achieved 95%+ global adoption',
    domain: 'data',
  },
  {
    year: 2021,
    role: 'Sr Program Manager, Information Governance',
    company: 'Micron Technology',
    duration: 'Jan 2021 – Jan 2023',
    outcome: 'Directed enterprise-wide Information Governance initiative; Purview deployment planning',
    domain: 'legal',
  },
  {
    year: 2023,
    role: 'Strategic Portfolio Manager, Legal Tech',
    company: 'Micron Technology',
    duration: 'Jan 2023 – Jun 2024',
    outcome: 'Managed 12-system, $1.25M legal tech portfolio; CLM/eBilling platform evaluations',
    link: '/case-study/legal-tech-portfolio/',
    domain: 'legal',
  },
  {
    year: 2024,
    role: 'Enterprise Data Strategy & Governance Manager — CDO Delegate',
    company: 'Freddie Mac',
    duration: 'Jun 2024 – Present',
    outcome: 'CDO Delegate for $3T GSE Legal Division under FHFA oversight; Tier 2 lineage in Collibra',
    domain: 'data',
  },
];
