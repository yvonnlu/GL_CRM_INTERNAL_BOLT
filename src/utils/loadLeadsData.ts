import { parseISO } from 'date-fns';
import leadsJsonData from '../data/leads.json';

// Define Lead types and statuses based on actual JSON data
export type SalesStage = 'New' | 'Proposal' | 'Negotiation';
export type LeadPriority = 'Urgent' | 'Normal' | 'Low';
export type CustomerPotential = 'Hot' | 'Warm' | 'Cold';
export type LeadSource =
    | 'Website'
    | 'Referral'
    | 'LinkedIn'
    | 'Cold Call'
    | 'Email Campaign'
    | 'Trade Show'
    | 'Live Chat'
    | 'LinkedIn Outreach'
    | 'Contact Form'
    | 'Website Visit';
export type LeadType = 'Company' | 'Individual';
export type Industry =
    | 'Technology'
    | 'Healthcare'
    | 'Finance'
    | 'Education'
    | 'Manufacturing'
    | 'Retail';

// Define social media object interface
export interface SocialMedia {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
}

// Define Note interface
export interface Note {
    id: string;
    content: string;
    createdAt: string;
}

// Define Lead interface
export interface Lead {
    id: string;
    leadType: LeadType;
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    website?: string;
    budget?: number;
    address?: string;
    companyAddress?: string;
    industry?: Industry | string;
    socialMedia?: SocialMedia;
    salesStage: SalesStage;
    priority: LeadPriority;
    customerPotential: CustomerPotential;
    source: LeadSource | string;
    estimatedValue: number;
    created: Date;
    notes: Note[];
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

// Define raw JSON lead data structure as it comes from the file
// This type allows for string values that will be converted to our specific types
export interface RawJsonLead {
    id: string;
    leadType: string;
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    website?: string;
    budget?: number;
    address?: string;
    companyAddress?: string;
    industry?: string;
    socialMedia?: SocialMedia;
    salesStage: string;
    priority: string;
    customerPotential: string;
    source: string;
    estimatedValue: number;
    created: string; // Date as string in JSON
    notes: Note[] | string; // Can be either a string (old format) or Note array (new format)
}

// Function to convert string notes to Note array
const processNotes = (lead: RawJsonLead): Note[] => {
    if (typeof lead.notes === 'string') {
        // Convert string note to Note object
        return [
            {
                id: `note-legacy-${lead.id}`,
                content: lead.notes,
                createdAt: lead.created,
            },
        ];
    } else if (Array.isArray(lead.notes)) {
        // Map to remove createdBy if it exists in the array data
        return lead.notes.map(note => ({
            id: note.id,
            content: note.content,
            createdAt: note.createdAt,
        }));
    }
    return [];
};

// Define JSON data structure for raw lead data from file

// Function to load leads data from JSON file
export const loadLeadsData = async (): Promise<Lead[]> => {
    try {
        // Fetch the JSON file
        const response = await fetch('/src/data/leads.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const leadsData: RawJsonLead[] = await response.json();

        // Filter out incomplete lead entries that don't have required fields
        const validLeads = leadsData.filter(
            (lead: Partial<RawJsonLead>) =>
                lead.id &&
                lead.fullName &&
                lead.email &&
                lead.salesStage &&
                lead.customerPotential &&
                lead.created
        );

        // Convert string dates to Date objects and cast string types to their specific types
        const processedData: Lead[] = validLeads.map((lead: RawJsonLead) => ({
            ...lead,
            leadType: lead.leadType as LeadType,
            industry: lead.industry as Industry | string,
            salesStage: lead.salesStage as SalesStage,
            priority: lead.priority as LeadPriority,
            customerPotential: lead.customerPotential as CustomerPotential,
            source: lead.source as LeadSource | string,
            created: parseISO(lead.created),
            notes: processNotes(lead),
        }));

        return processedData;
    } catch (error) {
        console.error('Failed to load leads data:', error);
        return [];
    }
};

// Function to load leads data synchronously (for initial rendering)
export const loadLeadsDataSync = (): Lead[] => {
    try {
        // Using the imported JSON data directly
        // Filter out incomplete lead entries that don't have required fields
        const validLeads = leadsJsonData.filter(
            (lead: Partial<RawJsonLead>) =>
                lead.id &&
                lead.fullName &&
                lead.email &&
                lead.salesStage &&
                lead.customerPotential &&
                lead.created
        );

        // Convert string dates to Date objects and cast string types to their specific types
        const processedData: Lead[] = validLeads.map((lead: RawJsonLead) => ({
            ...lead,
            leadType: lead.leadType as LeadType,
            industry: lead.industry as Industry | string,
            salesStage: lead.salesStage as SalesStage,
            priority: lead.priority as LeadPriority,
            customerPotential: lead.customerPotential as CustomerPotential,
            source: lead.source as LeadSource | string,
            created: parseISO(lead.created),
            notes: processNotes(lead),
        }));

        return processedData;
    } catch (error) {
        console.error('Failed to load leads data synchronously:', error);
        return [];
    }
};

// Export a synchronously loaded version for immediate use
export const leadsData = loadLeadsDataSync();

// Export default for convenience
export default leadsData;
