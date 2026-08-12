export const tracks = [
  {
    id: 'legal-operations',
    label: 'Legal Operations',
    summary:
      'Legal operations outcomes that reduce cost, accelerate work, and increase control.',
    frames: [
      {
        id: 'legal-value',
        eyebrow: '1. Value delivered',
        title: 'Portfolio value and avoided cost',
        chart: 'comparison',
        metrics: [
          {
            value: '$1.25M',
            label: 'legal technology portfolio',
            tone: 'cranberry',
            amount: 100,
          },
          {
            value: '$50K+',
            label: 'CLM licensing avoided',
            tone: 'positive',
            amount: 40,
          },
        ],
        source: {
          company: 'Micron Technology',
          project: 'Legal technology portfolio and NDA self-service',
        },
      },
      {
        id: 'legal-scale',
        eyebrow: '2. Scale achieved',
        title: 'Systems and workflow coverage',
        chart: 'units',
        metrics: [
          { value: '12', label: 'systems managed' },
          { value: '4', label: 'CLM proofs of concept' },
          { value: '20', label: 'NDAs per month' },
        ],
        source: {
          company: 'Micron Technology',
          project: 'Legal technology portfolio and NDA self-service',
        },
      },
      {
        id: 'legal-efficiency',
        eyebrow: '3. Efficiency improvement',
        title: 'Cycle-time reductions',
        chart: 'progress',
        metrics: [
          { value: '60%', label: 'faster records review', amount: 60 },
          { value: '75%', label: 'faster NDA turnaround', amount: 75 },
          {
            value: '6 → 1.5',
            suffix: 'months',
            label: 'AI-assisted migration',
            amount: 75,
          },
        ],
        source: {
          company: 'Freddie Mac and Micron Technology',
          project: 'Records review, NDA self-service, and iManage migration',
        },
      },
    ],
  },
  {
    id: 'data-governance',
    label: 'Data Governance',
    summary:
      'Governance programs that improve adoption, discovery, lineage, and regulatory confidence.',
    frames: [
      {
        id: 'data-impact',
        eyebrow: '1. Impact delivered',
        title: 'Adoption and discovery',
        chart: 'comparison',
        metrics: [
          {
            value: '95%+',
            label: 'global platform adoption',
            tone: 'positive',
            amount: 95,
          },
          {
            value: '~60%',
            label: 'faster data discovery',
            amount: 60,
          },
        ],
        source: {
          company: 'Micron Technology',
          project: 'Metadata management platform',
        },
      },
      {
        id: 'data-scale',
        eyebrow: '2. Scale governed',
        title: 'Enterprise coverage',
        chart: 'units',
        metrics: [
          { value: '$3T', label: 'GSE environment' },
          { value: '1,000+', label: 'databases cataloged' },
          { value: '16', label: 'stakeholder groups aligned' },
        ],
        source: {
          company: 'Freddie Mac and Micron Technology',
          project: 'CDE lineage, metadata platform, and records review',
        },
      },
      {
        id: 'data-efficiency',
        eyebrow: '3. Process improvement',
        title: 'Manual work removed',
        chart: 'progress',
        metrics: [
          { value: '45 → 0', label: 'manual process steps', amount: 100 },
          { value: '100 → 40', label: 'relative cycle time', amount: 60 },
        ],
        source: {
          company: 'Freddie Mac',
          project: 'Annual records review redesign',
        },
      },
    ],
  },
  {
    id: 'program-portfolio',
    label: 'Program & Portfolio',
    summary:
      'Programs and portfolios that deliver financial value, enterprise scale, and dependable execution.',
    frames: [
      {
        id: 'ppm-impact',
        eyebrow: '1. Financial impact',
        title: 'Value delivered',
        chart: 'comparison',
        metrics: [
          {
            value: '$17M',
            label: 'inventory reduction',
            tone: 'cranberry',
            amount: 100,
          },
          { value: '$1.5M', label: 'platform delivery', amount: 55 },
          { value: '$1.25M', label: 'portfolio ownership', amount: 45 },
        ],
        source: {
          company: 'Micron Technology',
          project:
            'Silicon-wafer inventory, metadata platform, and legal technology portfolio',
        },
      },
      {
        id: 'ppm-scale',
        eyebrow: '2. Scale delivered',
        title: 'Enterprise reach',
        chart: 'units',
        metrics: [
          { value: '40,000+', label: 'documents migrated' },
          { value: '800+', label: 'SharePoint sites' },
          { value: '164', label: 'Senate offices' },
        ],
        source: {
          company: 'Micron Technology and Veridian IT Services',
          project: 'Ariba/SharePoint migration and Senate installations',
        },
      },
      {
        id: 'ppm-quality',
        eyebrow: '3. Delivery quality',
        title: 'Controlled outcomes',
        chart: 'progress',
        metrics: [
          { value: '0', label: 'data-loss incidents', amount: 100 },
          { value: '95%+', label: 'platform adoption', amount: 95 },
          { value: '3-year', label: 'roadmap completed', amount: 100 },
        ],
        source: {
          company: 'Micron Technology',
          project:
            'Ariba/SharePoint migration, metadata platform, and legal technology portfolio',
        },
      },
    ],
  },
];

export const credentials = [
  {
    name: 'CDMP',
    detail: 'Certified Data Management Professional — achieved February 2026',
  },
  {
    name: 'APICS CSCP',
    detail: 'Certified Supply Chain Professional — earned 2008',
  },
  {
    name: 'LUMA Practitioner',
    detail: 'Human-Centered Design',
  },
];
