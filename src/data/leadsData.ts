// Define Lead types and statuses
export type LeadPipelineStatus = 'New' | 'Proposal' | 'Negotiation';
export type LeadTemperatureStatus = 'Hot' | 'Warm' | 'Cold';
export type LeadSource =
    | 'Live Chat'
    | 'LinkedIn Outreach'
    | 'Referral'
    | 'Contact Form'
    | 'Email Campaign'
    | 'Trade Show'
    | 'Website Visit'
    | 'Cold Call';

// Define Lead interface
export interface Lead {
    id: string;
    fullName: string;
    companyName: string;
    email: string;
    phone: string; // Added phone number field
    pipelineStatus: LeadPipelineStatus;
    temperatureStatus: LeadTemperatureStatus;
    source: LeadSource;
    estimatedValue: number; // Stored as a number for calculations
    created: Date;
    notes: string;
}

// Helper function to format currency
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// Generate a date for each day of the year
const generateDistributedDates = (): Date[] => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const isCurrentYearLeap = isLeapYear(currentYear);
    const daysInYear = isCurrentYearLeap ? 366 : 365;

    // Create dates for each day of the year
    const allDates: Date[] = [];

    // Generate exactly one date for each day of the year
    for (let i = 0; i < daysInYear; i++) {
        const dayDate = new Date(currentYear, 0, 1); // Start with Jan 1
        dayDate.setDate(1 + i); // Set to the i-th day of the year

        // Add some random time component to make it look more natural
        dayDate.setHours(Math.floor(Math.random() * 24));
        dayDate.setMinutes(Math.floor(Math.random() * 60));
        dayDate.setSeconds(Math.floor(Math.random() * 60));

        allDates.push(dayDate);
    }

    return allDates;
};

// Check if a year is a leap year
const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Get random item from array
const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

// Generate a random lead
const generateRandomLead = (id: number): Lead => {
    const firstNames = [
        'Jennifer',
        'Michael',
        'Sarah',
        'Robert',
        'Emily',
        'David',
        'Alexandra',
        'James',
        'Olivia',
        'Benjamin',
        'Sophia',
        'Daniel',
        'Rachel',
        'Thomas',
        'Natalie',
        'Christopher',
        'Lisa',
        'Kevin',
        'Amanda',
        'Jonathan',
        'Jessica',
        'Andrew',
        'Elizabeth',
        'Matthew',
        'Lauren',
    ];
    const lastNames = [
        'Martinez',
        'Chen',
        'Johnson',
        'Williams',
        'Rodriguez',
        'Thompson',
        'Patel',
        'Wilson',
        'Garcia',
        'Lee',
        'Kim',
        'Brown',
        'Green',
        'Wright',
        'Wong',
        'Davis',
        'Taylor',
        'Jackson',
        'Martin',
        'Miller',
        'Anderson',
        'White',
        'Harris',
        'Clark',
        'Lewis',
    ];
    const companyPrefixes = [
        'Innovate',
        'Tech',
        'Global',
        'Bright',
        'Stellar',
        'Precision',
        'Horizon',
        'Urban',
        'Sunrise',
        'Quantum',
        'Elite',
        'Eco',
        'Modern',
        'Heritage',
        'Pacific',
        'Premier',
        'Velocity',
        'United',
        'Riverside',
        'Advanced',
        'Digital',
        'Strategic',
        'Creative',
        'Pinnacle',
        'Summit',
    ];
    const companySuffixes = [
        'Solutions',
        'Inc',
        'Consulting',
        'Enterprises',
        'Group',
        'Manufacturing',
        'Services',
        'Development',
        'Retail',
        'Analytics',
        'Financial',
        'Solutions',
        'Interiors',
        'Construction',
        'Logistics',
        'Education',
        'Software',
        'Healthcare',
        'Hospitality',
        'Technologies',
        'Industries',
        'Media',
        'Systems',
        'Partners',
        'Innovations',
    ];
    const domains = ['com', 'org', 'io', 'co', 'net', 'tech', 'ai', 'design'];

    const pipelineStatuses: LeadPipelineStatus[] = ['New', 'Proposal', 'Negotiation'];
    const temperatureStatuses: LeadTemperatureStatus[] = ['Hot', 'Warm', 'Cold'];
    const sources: LeadSource[] = [
        'Live Chat',
        'LinkedIn Outreach',
        'Referral',
        'Contact Form',
        'Email Campaign',
        'Trade Show',
        'Website Visit',
        'Cold Call',
    ];

    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const companyPrefix = getRandomItem(companyPrefixes);
    const companySuffix = getRandomItem(companySuffixes);
    const domain = getRandomItem(domains);

    const companyName = `${companyPrefix} ${companySuffix}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companyPrefix.toLowerCase()}.${domain}`;

    // Notes examples
    const notesPrefixes = [
        'Looking for a comprehensive CRM solution',
        'Referred by existing client',
        'In final stage of contract review',
        'Met at tech expo',
        'Requested a demo',
        'Responded to our Q3 campaign',
        'Large enterprise seeking scalable solution',
        'Downloaded whitepaper',
        'Urgent need after rapid expansion',
        'Positive response to outreach',
    ];

    const notesDetails = [
        'for their expanding sales team.',
        'needs integration with existing systems.',
        'requires customization for specific workflow.',
        'initial interest but no follow-up yet.',
        'after discussing features with support.',
        'interested in specific modules.',
        'legal team reviewing contract.',
        'but minimal engagement since then.',
        'decision expected within 2 weeks.',
        'scheduled for demo next week.',
    ];

    const notes = `${getRandomItem(notesPrefixes)} ${getRandomItem(notesDetails)}`;

    // Phone number generation
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 9000) + 1000;

    return {
        id: `ld${String(id).padStart(3, '0')}`,
        fullName: `${firstName} ${lastName}`,
        companyName,
        email,
        phone: `+1 (${areaCode}) ${prefix}-${lineNumber}`,
        pipelineStatus: getRandomItem(pipelineStatuses),
        temperatureStatus: getRandomItem(temperatureStatuses),
        source: getRandomItem(sources),
        estimatedValue: Math.floor(Math.random() * 150000) + 20000, // Random value between 20,000 and 170,000
        created: new Date(), // This will be overridden with distributed dates
        notes,
    };
};

// Generate a lead for every day of the year
const distributedDates = generateDistributedDates();

// Generate leads for every day of the year
export const leadsData: Lead[] = distributedDates.map((date, index) => {
    const lead = generateRandomLead(index + 1);
    lead.created = date; // Use the date for this specific day
    return lead;
});

// Export default for convenience
export default leadsData;
