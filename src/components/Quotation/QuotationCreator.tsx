import React, { useState } from 'react';
import {
    Plus,
    Send,
    Download,
    FileText,
    Calculator,
    Check,
    X,
    Mail,
    Users,
    Calendar,
    DollarSign,
    Package,
    Target,
    Palette,
    TrendingUp,
    Globe,
} from 'lucide-react';

interface ServiceField {
    id: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date';
    required: boolean;
    options?: string[];
    placeholder?: string;
    unit?: string;
}

interface ServiceType {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    fields: ServiceField[];
    pricingFactors: {
        [key: string]: number;
    };
}

interface QuotationData {
    id: string;
    clientName: string;
    clientEmail: string;
    clientCompany: string;
    clientPhone: string;
    serviceCategory: string;
    serviceType: string;
    serviceDetails: Record<string, any>;
    calculatedPrice: number;
    discount: number;
    tax: number;
    finalPrice: number;
    notes: string;
    createdAt: string;
    status: 'draft' | 'sent' | 'approved' | 'rejected';
    teamAssigned: string[];
}

const QuotationCreator: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [quotation, setQuotation] = useState<QuotationData>({
        id: `QT-${Date.now()}`,
        clientName: '',
        clientEmail: '',
        clientCompany: '',
        clientPhone: '',
        serviceCategory: '',
        serviceType: '',
        serviceDetails: {},
        calculatedPrice: 0,
        discount: 0,
        tax: 10,
        finalPrice: 0,
        notes: '',
        createdAt: new Date().toISOString(),
        status: 'draft',
        teamAssigned: [],
    });

    const serviceCategories = [
        { id: 'content', name: 'Content Marketing', icon: FileText, color: 'bg-blue-500' },
        { id: 'web-service', name: 'Web Services', icon: Globe, color: 'bg-green-500' },
        { id: 'seo', name: 'SEO Services', icon: TrendingUp, color: 'bg-purple-500' },
        { id: 'design', name: 'Design Services', icon: Palette, color: 'bg-pink-500' },
        { id: 'paid-ads', name: 'Paid Advertising', icon: Target, color: 'bg-orange-500' },
    ];

    const serviceTypes: Record<string, ServiceType[]> = {
        content: [
            {
                id: 'blog-writing',
                name: 'Blog Writing',
                description: 'Professional blog content creation',
                basePrice: 150,
                fields: [
                    {
                        id: 'wordCount',
                        label: 'Word Count per Article',
                        type: 'select',
                        required: true,
                        options: ['500-800', '800-1200', '1200-1500', '1500-2000', '2000+'],
                    },
                    {
                        id: 'articlesPerMonth',
                        label: 'Articles per Month',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 4',
                    },
                    {
                        id: 'researchLevel',
                        label: 'Research Level',
                        type: 'select',
                        required: true,
                        options: ['Basic', 'Intermediate', 'Advanced', 'Expert'],
                    },
                    {
                        id: 'seoOptimization',
                        label: 'SEO Optimization',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'industryExpertise',
                        label: 'Industry/Niche',
                        type: 'text',
                        required: true,
                        placeholder: 'e.g., Technology, Healthcare',
                    },
                    {
                        id: 'contentStyle',
                        label: 'Content Style',
                        type: 'select',
                        required: true,
                        options: ['Professional', 'Casual', 'Technical', 'Creative'],
                    },
                    {
                        id: 'revisions',
                        label: 'Revisions Included',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 2',
                    },
                ],
                pricingFactors: {
                    wordCount: {
                        '500-800': 1,
                        '800-1200': 1.3,
                        '1200-1500': 1.6,
                        '1500-2000': 2,
                        '2000+': 2.5,
                    },
                    researchLevel: { Basic: 1, Intermediate: 1.2, Advanced: 1.5, Expert: 2 },
                    seoOptimization: { true: 1.3, false: 1 },
                },
            },
            {
                id: 'social-media-content',
                name: 'Social Media Content',
                description: 'Social media posts and content creation',
                basePrice: 80,
                fields: [
                    {
                        id: 'platforms',
                        label: 'Platforms',
                        type: 'select',
                        required: true,
                        options: [
                            'Facebook',
                            'Instagram',
                            'LinkedIn',
                            'Twitter',
                            'TikTok',
                            'YouTube',
                        ],
                    },
                    {
                        id: 'postsPerWeek',
                        label: 'Posts per Week',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 5',
                    },
                    {
                        id: 'contentType',
                        label: 'Content Type',
                        type: 'select',
                        required: true,
                        options: [
                            'Text Only',
                            'Images + Text',
                            'Videos',
                            'Stories',
                            'Reels/Shorts',
                        ],
                    },
                    {
                        id: 'designIncluded',
                        label: 'Graphic Design Included',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'hashtagResearch',
                        label: 'Hashtag Research',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'schedulingTool',
                        label: 'Scheduling Tool Setup',
                        type: 'checkbox',
                        required: false,
                    },
                ],
                pricingFactors: {
                    contentType: {
                        'Text Only': 1,
                        'Images + Text': 1.5,
                        Videos: 2.5,
                        Stories: 1.8,
                        'Reels/Shorts': 3,
                    },
                    designIncluded: { true: 1.5, false: 1 },
                    hashtagResearch: { true: 1.2, false: 1 },
                },
            },
        ],
        'web-service': [
            {
                id: 'website-development',
                name: 'Website Development',
                description: 'Custom website development',
                basePrice: 2500,
                fields: [
                    {
                        id: 'websiteType',
                        label: 'Website Type',
                        type: 'select',
                        required: true,
                        options: [
                            'Landing Page',
                            'Business Website',
                            'E-commerce',
                            'Portfolio',
                            'Blog',
                            'Custom Application',
                        ],
                    },
                    {
                        id: 'pages',
                        label: 'Number of Pages',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 5',
                    },
                    {
                        id: 'responsive',
                        label: 'Responsive Design',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'cms',
                        label: 'Content Management System',
                        type: 'select',
                        required: true,
                        options: [
                            'WordPress',
                            'Shopify',
                            'Custom CMS',
                            'Static HTML',
                            'React/Next.js',
                        ],
                    },
                    {
                        id: 'ecommerce',
                        label: 'E-commerce Features',
                        type: 'checkbox',
                        required: false,
                    },
                    { id: 'seoSetup', label: 'Basic SEO Setup', type: 'checkbox', required: false },
                    {
                        id: 'timeline',
                        label: 'Timeline (weeks)',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 4',
                    },
                    {
                        id: 'maintenance',
                        label: 'Maintenance Package',
                        type: 'select',
                        required: false,
                        options: ['None', '3 months', '6 months', '12 months'],
                    },
                ],
                pricingFactors: {
                    websiteType: {
                        'Landing Page': 1,
                        'Business Website': 1.5,
                        'E-commerce': 3,
                        Portfolio: 1.2,
                        Blog: 1.3,
                        'Custom Application': 4,
                    },
                    cms: {
                        WordPress: 1,
                        Shopify: 1.3,
                        'Custom CMS': 2,
                        'Static HTML': 0.8,
                        'React/Next.js': 1.8,
                    },
                    ecommerce: { true: 2, false: 1 },
                    maintenance: { None: 1, '3 months': 1.1, '6 months': 1.2, '12 months': 1.3 },
                },
            },
            {
                id: 'web-maintenance',
                name: 'Website Maintenance',
                description: 'Ongoing website maintenance and updates',
                basePrice: 200,
                fields: [
                    {
                        id: 'maintenanceLevel',
                        label: 'Maintenance Level',
                        type: 'select',
                        required: true,
                        options: ['Basic', 'Standard', 'Premium', 'Enterprise'],
                    },
                    {
                        id: 'updatesPerMonth',
                        label: 'Content Updates per Month',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 4',
                    },
                    {
                        id: 'securityMonitoring',
                        label: 'Security Monitoring',
                        type: 'checkbox',
                        required: false,
                    },
                    { id: 'backups', label: 'Regular Backups', type: 'checkbox', required: false },
                    {
                        id: 'performanceOptimization',
                        label: 'Performance Optimization',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'analyticsReporting',
                        label: 'Monthly Analytics Report',
                        type: 'checkbox',
                        required: false,
                    },
                ],
                pricingFactors: {
                    maintenanceLevel: { Basic: 1, Standard: 1.5, Premium: 2.5, Enterprise: 4 },
                    securityMonitoring: { true: 1.3, false: 1 },
                    performanceOptimization: { true: 1.4, false: 1 },
                },
            },
        ],
        seo: [
            {
                id: 'comprehensive-seo',
                name: 'Comprehensive SEO',
                description: 'Complete SEO strategy and implementation',
                basePrice: 1500,
                fields: [
                    {
                        id: 'websiteSize',
                        label: 'Website Size',
                        type: 'select',
                        required: true,
                        options: [
                            'Small (1-10 pages)',
                            'Medium (11-50 pages)',
                            'Large (51-200 pages)',
                            'Enterprise (200+ pages)',
                        ],
                    },
                    {
                        id: 'competitiveness',
                        label: 'Industry Competitiveness',
                        type: 'select',
                        required: true,
                        options: ['Low', 'Medium', 'High', 'Very High'],
                    },
                    {
                        id: 'targetKeywords',
                        label: 'Target Keywords',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 20',
                    },
                    { id: 'localSeo', label: 'Local SEO', type: 'checkbox', required: false },
                    {
                        id: 'technicalAudit',
                        label: 'Technical SEO Audit',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'contentOptimization',
                        label: 'Content Optimization',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'linkBuilding',
                        label: 'Link Building',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'monthlyReporting',
                        label: 'Monthly Reporting',
                        type: 'checkbox',
                        required: false,
                    },
                ],
                pricingFactors: {
                    websiteSize: {
                        'Small (1-10 pages)': 1,
                        'Medium (11-50 pages)': 1.5,
                        'Large (51-200 pages)': 2.5,
                        'Enterprise (200+ pages)': 4,
                    },
                    competitiveness: { Low: 1, Medium: 1.3, High: 1.8, 'Very High': 2.5 },
                    localSeo: { true: 1.3, false: 1 },
                    linkBuilding: { true: 1.5, false: 1 },
                },
            },
            {
                id: 'keyword-seo',
                name: 'Keyword-Focused SEO',
                description: 'Targeted keyword optimization',
                basePrice: 800,
                fields: [
                    {
                        id: 'keywordCount',
                        label: 'Number of Keywords',
                        type: 'select',
                        required: true,
                        options: ['5-10', '11-20', '21-50', '51-100', '100+'],
                    },
                    {
                        id: 'keywordDifficulty',
                        label: 'Keyword Difficulty',
                        type: 'select',
                        required: true,
                        options: [
                            'Easy (0-30)',
                            'Medium (31-60)',
                            'Hard (61-80)',
                            'Very Hard (81-100)',
                        ],
                    },
                    {
                        id: 'keywordResearch',
                        label: 'Keyword Research',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'competitorAnalysis',
                        label: 'Competitor Analysis',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'onPageOptimization',
                        label: 'On-Page Optimization',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'rankingTracking',
                        label: 'Ranking Tracking',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'monthlyDuration',
                        label: 'Campaign Duration (months)',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 6',
                    },
                ],
                pricingFactors: {
                    keywordCount: { '5-10': 1, '11-20': 1.5, '21-50': 2.5, '51-100': 4, '100+': 6 },
                    keywordDifficulty: {
                        'Easy (0-30)': 1,
                        'Medium (31-60)': 1.3,
                        'Hard (61-80)': 1.8,
                        'Very Hard (81-100)': 2.5,
                    },
                    competitorAnalysis: { true: 1.2, false: 1 },
                    rankingTracking: { true: 1.3, false: 1 },
                },
            },
        ],
        design: [
            {
                id: 'logo-branding',
                name: 'Logo & Branding',
                description: 'Complete brand identity design',
                basePrice: 1200,
                fields: [
                    {
                        id: 'logoType',
                        label: 'Logo Type',
                        type: 'select',
                        required: true,
                        options: ['Text-based', 'Icon-based', 'Combination', 'Emblem'],
                    },
                    {
                        id: 'brandingPackage',
                        label: 'Branding Package',
                        type: 'select',
                        required: true,
                        options: [
                            'Logo Only',
                            'Basic Package',
                            'Standard Package',
                            'Premium Package',
                        ],
                    },
                    {
                        id: 'revisions',
                        label: 'Revisions Included',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 3',
                    },
                    {
                        id: 'fileFormats',
                        label: 'File Formats',
                        type: 'select',
                        required: true,
                        options: [
                            'Basic (PNG, JPG)',
                            'Standard (+ AI, EPS)',
                            'Premium (+ SVG, PDF)',
                            'Complete (All formats)',
                        ],
                    },
                    {
                        id: 'brandGuidelines',
                        label: 'Brand Guidelines',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'businessCards',
                        label: 'Business Card Design',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'letterhead',
                        label: 'Letterhead Design',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'socialMediaKit',
                        label: 'Social Media Kit',
                        type: 'checkbox',
                        required: false,
                    },
                ],
                pricingFactors: {
                    brandingPackage: {
                        'Logo Only': 1,
                        'Basic Package': 1.5,
                        'Standard Package': 2.5,
                        'Premium Package': 4,
                    },
                    fileFormats: {
                        'Basic (PNG, JPG)': 1,
                        'Standard (+ AI, EPS)': 1.2,
                        'Premium (+ SVG, PDF)': 1.4,
                        'Complete (All formats)': 1.6,
                    },
                    brandGuidelines: { true: 1.5, false: 1 },
                    socialMediaKit: { true: 1.3, false: 1 },
                },
            },
            {
                id: 'graphic-design',
                name: 'Graphic Design',
                description: 'Custom graphic design services',
                basePrice: 300,
                fields: [
                    {
                        id: 'designType',
                        label: 'Design Type',
                        type: 'select',
                        required: true,
                        options: [
                            'Flyer/Poster',
                            'Brochure',
                            'Banner/Display',
                            'Social Media Graphics',
                            'Infographic',
                            'Presentation',
                        ],
                    },
                    {
                        id: 'quantity',
                        label: 'Number of Designs',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 5',
                    },
                    {
                        id: 'complexity',
                        label: 'Design Complexity',
                        type: 'select',
                        required: true,
                        options: ['Simple', 'Moderate', 'Complex', 'Highly Complex'],
                    },
                    {
                        id: 'printReady',
                        label: 'Print-Ready Files',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'stockPhotos',
                        label: 'Stock Photos Included',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'customIllustration',
                        label: 'Custom Illustrations',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'rushDelivery',
                        label: 'Rush Delivery (48h)',
                        type: 'checkbox',
                        required: false,
                    },
                ],
                pricingFactors: {
                    designType: {
                        'Flyer/Poster': 1,
                        Brochure: 1.5,
                        'Banner/Display': 1.2,
                        'Social Media Graphics': 0.8,
                        Infographic: 2,
                        Presentation: 1.8,
                    },
                    complexity: { Simple: 1, Moderate: 1.4, Complex: 2, 'Highly Complex': 3 },
                    customIllustration: { true: 2, false: 1 },
                    rushDelivery: { true: 1.5, false: 1 },
                },
            },
        ],
        'paid-ads': [
            {
                id: 'google-ads',
                name: 'Google Ads Management',
                description: 'Google Ads campaign management',
                basePrice: 1000,
                fields: [
                    {
                        id: 'campaignType',
                        label: 'Campaign Type',
                        type: 'select',
                        required: true,
                        options: [
                            'Search Ads',
                            'Display Ads',
                            'Shopping Ads',
                            'Video Ads',
                            'App Ads',
                            'Multi-Campaign',
                        ],
                    },
                    {
                        id: 'monthlyBudget',
                        label: 'Monthly Ad Budget ($)',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 5000',
                    },
                    {
                        id: 'targetLocations',
                        label: 'Target Locations',
                        type: 'select',
                        required: true,
                        options: ['Local (City)', 'Regional (State)', 'National', 'International'],
                    },
                    {
                        id: 'keywordResearch',
                        label: 'Keyword Research',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'adCopyCreation',
                        label: 'Ad Copy Creation',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'landingPageOptimization',
                        label: 'Landing Page Optimization',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'conversionTracking',
                        label: 'Conversion Tracking Setup',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'monthlyReporting',
                        label: 'Monthly Performance Reports',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'managementDuration',
                        label: 'Management Duration (months)',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 6',
                    },
                ],
                pricingFactors: {
                    campaignType: {
                        'Search Ads': 1,
                        'Display Ads': 1.2,
                        'Shopping Ads': 1.4,
                        'Video Ads': 1.6,
                        'App Ads': 1.8,
                        'Multi-Campaign': 2.5,
                    },
                    targetLocations: {
                        'Local (City)': 1,
                        'Regional (State)': 1.2,
                        National: 1.5,
                        International: 2,
                    },
                    landingPageOptimization: { true: 1.4, false: 1 },
                    conversionTracking: { true: 1.2, false: 1 },
                },
            },
            {
                id: 'facebook-ads',
                name: 'Facebook & Instagram Ads',
                description: 'Social media advertising campaigns',
                basePrice: 800,
                fields: [
                    {
                        id: 'platforms',
                        label: 'Platforms',
                        type: 'select',
                        required: true,
                        options: [
                            'Facebook Only',
                            'Instagram Only',
                            'Facebook + Instagram',
                            'All Meta Platforms',
                        ],
                    },
                    {
                        id: 'campaignObjective',
                        label: 'Campaign Objective',
                        type: 'select',
                        required: true,
                        options: [
                            'Brand Awareness',
                            'Traffic',
                            'Engagement',
                            'Lead Generation',
                            'Conversions',
                            'Sales',
                        ],
                    },
                    {
                        id: 'monthlyBudget',
                        label: 'Monthly Ad Budget ($)',
                        type: 'number',
                        required: true,
                        placeholder: 'e.g., 3000',
                    },
                    {
                        id: 'audienceSize',
                        label: 'Target Audience Size',
                        type: 'select',
                        required: true,
                        options: [
                            'Small (10K-100K)',
                            'Medium (100K-1M)',
                            'Large (1M-10M)',
                            'Very Large (10M+)',
                        ],
                    },
                    {
                        id: 'creativeProduction',
                        label: 'Creative Production',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'videoAds',
                        label: 'Video Ad Creation',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'audienceResearch',
                        label: 'Audience Research',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'retargeting',
                        label: 'Retargeting Setup',
                        type: 'checkbox',
                        required: false,
                    },
                    {
                        id: 'pixelSetup',
                        label: 'Facebook Pixel Setup',
                        type: 'checkbox',
                        required: false,
                    },
                ],
                pricingFactors: {
                    platforms: {
                        'Facebook Only': 1,
                        'Instagram Only': 1,
                        'Facebook + Instagram': 1.3,
                        'All Meta Platforms': 1.6,
                    },
                    campaignObjective: {
                        'Brand Awareness': 1,
                        Traffic: 1.1,
                        Engagement: 1.2,
                        'Lead Generation': 1.4,
                        Conversions: 1.6,
                        Sales: 1.8,
                    },
                    creativeProduction: { true: 1.5, false: 1 },
                    videoAds: { true: 2, false: 1 },
                    retargeting: { true: 1.3, false: 1 },
                },
            },
        ],
    };

    const teamMembers = [
        { id: 'content-team', name: 'Content Team', email: 'content@agency.com' },
        { id: 'dev-team', name: 'Development Team', email: 'dev@agency.com' },
        { id: 'seo-team', name: 'SEO Team', email: 'seo@agency.com' },
        { id: 'design-team', name: 'Design Team', email: 'design@agency.com' },
        { id: 'ads-team', name: 'Paid Ads Team', email: 'ads@agency.com' },
        { id: 'project-manager', name: 'Project Manager', email: 'pm@agency.com' },
    ];

    const calculatePrice = () => {
        if (!quotation.serviceCategory || !quotation.serviceType) return 0;

        const serviceType = serviceTypes[quotation.serviceCategory]?.find(
            s => s.id === quotation.serviceType
        );
        if (!serviceType) return 0;

        let price = serviceType.basePrice;

        // Apply pricing factors based on service details
        Object.entries(quotation.serviceDetails).forEach(([fieldId, value]) => {
            const factor = serviceType.pricingFactors[fieldId];
            if (factor && value) {
                if (typeof factor === 'object') {
                    price *= factor[value.toString()] || 1;
                } else if (typeof value === 'number') {
                    price *= value;
                }
            }
        });

        // Apply quantity multipliers for certain fields
        if (quotation.serviceDetails.articlesPerMonth) {
            price *= quotation.serviceDetails.articlesPerMonth;
        }
        if (quotation.serviceDetails.postsPerWeek) {
            price *= quotation.serviceDetails.postsPerWeek * 4; // Monthly
        }
        if (quotation.serviceDetails.pages && quotation.serviceDetails.pages > 5) {
            price *= 1 + (quotation.serviceDetails.pages - 5) * 0.1;
        }
        if (quotation.serviceDetails.quantity) {
            price *= quotation.serviceDetails.quantity;
        }
        if (quotation.serviceDetails.managementDuration) {
            price *= quotation.serviceDetails.managementDuration;
        }
        if (quotation.serviceDetails.monthlyDuration) {
            price *= quotation.serviceDetails.monthlyDuration;
        }

        return Math.round(price);
    };

    const updateServiceDetail = (fieldId: string, value: any) => {
        setQuotation(prev => ({
            ...prev,
            serviceDetails: {
                ...prev.serviceDetails,
                [fieldId]: value,
            },
        }));
    };

    const generatePDF = () => {
        const calculatedPrice = calculatePrice();
        const discountAmount = (calculatedPrice * quotation.discount) / 100;
        const taxAmount = ((calculatedPrice - discountAmount) * quotation.tax) / 100;
        const finalPrice = calculatedPrice - discountAmount + taxAmount;

        const serviceType = serviceTypes[quotation.serviceCategory]?.find(
            s => s.id === quotation.serviceType
        );
        const category = serviceCategories.find(c => c.id === quotation.serviceCategory);

        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Quotation ${quotation.id}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 40px; background: #f8f9fa; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #3B82F6; padding-bottom: 20px; }
            .header h1 { color: #1F2937; margin: 0; font-size: 32px; }
            .header p { color: #6B7280; margin: 5px 0; }
            .client-info { background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .client-info h3 { color: #1F2937; margin-top: 0; }
            .service-details { margin-bottom: 30px; }
            .service-header { background: #3B82F6; color: white; padding: 15px; border-radius: 8px 8px 0 0; }
            .service-content { border: 1px solid #E5E7EB; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F3F4F6; }
            .detail-row:last-child { border-bottom: none; }
            .pricing { background: #F9FAFB; padding: 20px; border-radius: 8px; margin-top: 30px; }
            .pricing-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .total-row { border-top: 2px solid #3B82F6; padding-top: 15px; margin-top: 15px; font-weight: bold; font-size: 18px; color: #1F2937; }
            .notes { margin-top: 30px; padding: 20px; background: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B; }
            .footer { margin-top: 40px; text-align: center; color: #6B7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>QUOTATION</h1>
              <p><strong>Quote ID:</strong> ${quotation.id}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="client-info">
              <h3>Client Information</h3>
              <div class="detail-row">
                <span><strong>Name:</strong></span>
                <span>${quotation.clientName}</span>
              </div>
              <div class="detail-row">
                <span><strong>Company:</strong></span>
                <span>${quotation.clientCompany}</span>
              </div>
              <div class="detail-row">
                <span><strong>Email:</strong></span>
                <span>${quotation.clientEmail}</span>
              </div>
              <div class="detail-row">
                <span><strong>Phone:</strong></span>
                <span>${quotation.clientPhone}</span>
              </div>
            </div>
            
            <div class="service-details">
              <div class="service-header">
                <h3 style="margin: 0;">${category?.name} - ${serviceType?.name}</h3>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">${serviceType?.description}</p>
              </div>
              <div class="service-content">
                ${Object.entries(quotation.serviceDetails)
                    .map(([key, value]) => {
                        const field = serviceType?.fields.find(f => f.id === key);
                        if (!field || !value) return '';
                        return `
                    <div class="detail-row">
                      <span><strong>${field.label}:</strong></span>
                      <span>${typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}${field.unit ? ` ${field.unit}` : ''}</span>
                    </div>
                  `;
                    })
                    .join('')}
              </div>
            </div>
            
            <div class="pricing">
              <h3 style="margin-top: 0; color: #1F2937;">Pricing Breakdown</h3>
              <div class="pricing-row">
                <span>Base Price:</span>
                <span>$${calculatedPrice.toLocaleString()}</span>
              </div>
              <div class="pricing-row">
                <span>Discount (${quotation.discount}%):</span>
                <span style="color: #EF4444;">-$${discountAmount.toLocaleString()}</span>
              </div>
              <div class="pricing-row">
                <span>Tax (${quotation.tax}%):</span>
                <span>$${taxAmount.toLocaleString()}</span>
              </div>
              <div class="pricing-row total-row">
                <span>Total Amount:</span>
                <span style="color: #059669;">$${finalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            ${
                quotation.notes
                    ? `
              <div class="notes">
                <h4 style="margin-top: 0; color: #92400E;">Additional Notes:</h4>
                <p style="margin-bottom: 0;">${quotation.notes}</p>
              </div>
            `
                    : ''
            }
            
            <div class="footer">
              <p><strong>This quotation is valid for 30 days from the date of issue.</strong></p>
              <p>Thank you for considering our services. We look forward to working with you!</p>
            </div>
          </div>
        </body>
      </html>
    `;

        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(htmlContent);
            newWindow.document.close();
        }
    };

    const sendToTeam = () => {
        const calculatedPrice = calculatePrice();
        const discountAmount = (calculatedPrice * quotation.discount) / 100;
        const taxAmount = ((calculatedPrice - discountAmount) * quotation.tax) / 100;
        const finalPrice = calculatedPrice - discountAmount + taxAmount;

        // Update quotation with calculated prices
        const updatedQuotation = {
            ...quotation,
            calculatedPrice,
            finalPrice,
            status: 'sent' as const,
        };

        // Simulate sending email to team
        const teamEmails = quotation.teamAssigned
            .map(teamId => teamMembers.find(t => t.id === teamId)?.email)
            .filter(Boolean);

        console.log('Sending quotation to team:', {
            quotation: updatedQuotation,
            teamEmails,
            pdfGenerated: true,
        });

        // Generate PDF for attachment
        generatePDF();

        alert(
            `Quotation ${quotation.id} has been sent to the assigned team members: ${teamEmails.join(', ')}\n\nTotal Amount: $${finalPrice.toLocaleString()}`
        );

        // Reset form
        setQuotation({
            id: `QT-${Date.now()}`,
            clientName: '',
            clientEmail: '',
            clientCompany: '',
            clientPhone: '',
            serviceCategory: '',
            serviceType: '',
            serviceDetails: {},
            calculatedPrice: 0,
            discount: 0,
            tax: 10,
            finalPrice: 0,
            notes: '',
            createdAt: new Date().toISOString(),
            status: 'draft',
            teamAssigned: [],
        });
        setCurrentStep(1);
    };

    const renderServiceFields = () => {
        if (!quotation.serviceCategory || !quotation.serviceType) return null;

        const serviceType = serviceTypes[quotation.serviceCategory]?.find(
            s => s.id === quotation.serviceType
        );
        if (!serviceType) return null;

        return (
            <div className="space-y-4">
                {serviceType.fields.map(field => (
                    <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}{' '}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === 'text' && (
                            <input
                                type="text"
                                value={quotation.serviceDetails[field.id] || ''}
                                onChange={e => updateServiceDetail(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={field.required}
                            />
                        )}

                        {field.type === 'number' && (
                            <input
                                type="number"
                                value={quotation.serviceDetails[field.id] || ''}
                                onChange={e =>
                                    updateServiceDetail(field.id, parseInt(e.target.value) || 0)
                                }
                                placeholder={field.placeholder}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={field.required}
                            />
                        )}

                        {field.type === 'select' && (
                            <select
                                value={quotation.serviceDetails[field.id] || ''}
                                onChange={e => updateServiceDetail(field.id, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={field.required}
                            >
                                <option value="">Select {field.label}</option>
                                {field.options?.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}

                        {field.type === 'textarea' && (
                            <textarea
                                value={quotation.serviceDetails[field.id] || ''}
                                onChange={e => updateServiceDetail(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={field.required}
                            />
                        )}

                        {field.type === 'checkbox' && (
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={quotation.serviceDetails[field.id] || false}
                                    onChange={e => updateServiceDetail(field.id, e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600">Include this feature</span>
                            </label>
                        )}

                        {field.type === 'date' && (
                            <input
                                type="date"
                                value={quotation.serviceDetails[field.id] || ''}
                                onChange={e => updateServiceDetail(field.id, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={field.required}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const calculatedPrice = calculatePrice();
    const discountAmount = (calculatedPrice * quotation.discount) / 100;
    const taxAmount = ((calculatedPrice - discountAmount) * quotation.tax) / 100;
    const finalPrice = calculatedPrice - discountAmount + taxAmount;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Quotation</h2>
                    <p className="text-gray-600">
                        Generate professional quotations for your services
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                                        currentStep >= step
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                                </div>
                                {step < 4 && (
                                    <div
                                        className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>
                            Client Info
                        </span>
                        <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>
                            Service Category
                        </span>
                        <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>
                            Service Details
                        </span>
                        <span className={currentStep >= 4 ? 'text-blue-600 font-medium' : ''}>
                            Review & Send
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    {/* Step 1: Client Information */}
                    {currentStep === 1 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Client Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Client Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={quotation.clientName}
                                        onChange={e =>
                                            setQuotation(prev => ({
                                                ...prev,
                                                clientName: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter client name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={quotation.clientEmail}
                                        onChange={e =>
                                            setQuotation(prev => ({
                                                ...prev,
                                                clientEmail: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        value={quotation.clientCompany}
                                        onChange={e =>
                                            setQuotation(prev => ({
                                                ...prev,
                                                clientCompany: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter company name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={quotation.clientPhone}
                                        onChange={e =>
                                            setQuotation(prev => ({
                                                ...prev,
                                                clientPhone: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Service Category */}
                    {currentStep === 2 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Select Service Category
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                {serviceCategories.map(category => {
                                    const Icon = category.icon;
                                    return (
                                        <div
                                            key={category.id}
                                            onClick={() =>
                                                setQuotation(prev => ({
                                                    ...prev,
                                                    serviceCategory: category.id,
                                                    serviceType: '',
                                                    serviceDetails: {},
                                                }))
                                            }
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                                quotation.serviceCategory === category.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3`}
                                            >
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="font-medium text-gray-900 mb-1">
                                                {category.name}
                                            </h4>
                                        </div>
                                    );
                                })}
                            </div>

                            {quotation.serviceCategory && (
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">
                                        Select Service Type
                                    </h4>
                                    <div className="space-y-3">
                                        {serviceTypes[quotation.serviceCategory]?.map(service => (
                                            <div
                                                key={service.id}
                                                onClick={() =>
                                                    setQuotation(prev => ({
                                                        ...prev,
                                                        serviceType: service.id,
                                                        serviceDetails: {},
                                                    }))
                                                }
                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                    quotation.serviceType === service.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h5 className="font-medium text-gray-900">
                                                            {service.name}
                                                        </h5>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm font-medium text-green-600">
                                                        From ${service.basePrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Service Details */}
                    {currentStep === 3 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Service Details
                            </h3>
                            {renderServiceFields()}

                            {calculatedPrice > 0 && (
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-blue-900">
                                            Estimated Price:
                                        </span>
                                        <span className="text-lg font-bold text-blue-900">
                                            ${calculatedPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 4: Review & Send */}
                    {currentStep === 4 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Review & Finalize
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">
                                        Quotation Summary
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Quote ID:</span>
                                            <span className="text-sm font-medium">
                                                {quotation.id}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Client:</span>
                                            <span className="text-sm font-medium">
                                                {quotation.clientName}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Service:</span>
                                            <span className="text-sm font-medium">
                                                {
                                                    serviceCategories.find(
                                                        c => c.id === quotation.serviceCategory
                                                    )?.name
                                                }{' '}
                                                -
                                                {
                                                    serviceTypes[quotation.serviceCategory]?.find(
                                                        s => s.id === quotation.serviceType
                                                    )?.name
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-medium text-gray-900 mb-3">Pricing</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Base Price:</span>
                                                <span>${calculatedPrice.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2">
                                                    <span>Discount:</span>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={quotation.discount}
                                                        onChange={e =>
                                                            setQuotation(prev => ({
                                                                ...prev,
                                                                discount:
                                                                    parseFloat(e.target.value) || 0,
                                                            }))
                                                        }
                                                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                                                    />
                                                    <span>%</span>
                                                </div>
                                                <span className="text-red-600">
                                                    -${discountAmount.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2">
                                                    <span>Tax:</span>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={quotation.tax}
                                                        onChange={e =>
                                                            setQuotation(prev => ({
                                                                ...prev,
                                                                tax:
                                                                    parseFloat(e.target.value) || 0,
                                                            }))
                                                        }
                                                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                                                    />
                                                    <span>%</span>
                                                </div>
                                                <span className="text-blue-600">
                                                    +${taxAmount.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="border-t pt-2">
                                                <div className="flex justify-between items-center text-lg font-bold">
                                                    <span>Total:</span>
                                                    <span className="text-green-600">
                                                        ${finalPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">
                                        Additional Notes
                                    </h4>
                                    <textarea
                                        value={quotation.notes}
                                        onChange={e =>
                                            setQuotation(prev => ({
                                                ...prev,
                                                notes: e.target.value,
                                            }))
                                        }
                                        placeholder="Add any additional notes or terms..."
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                    />

                                    <h4 className="font-medium text-gray-900 mb-3 mt-4">
                                        Assign to Team
                                    </h4>
                                    <div className="space-y-2">
                                        {teamMembers.map(member => (
                                            <label key={member.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={quotation.teamAssigned.includes(
                                                        member.id
                                                    )}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setQuotation(prev => ({
                                                                ...prev,
                                                                teamAssigned: [
                                                                    ...prev.teamAssigned,
                                                                    member.id,
                                                                ],
                                                            }));
                                                        } else {
                                                            setQuotation(prev => ({
                                                                ...prev,
                                                                teamAssigned:
                                                                    prev.teamAssigned.filter(
                                                                        id => id !== member.id
                                                                    ),
                                                            }));
                                                        }
                                                    }}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{member.name}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <button
                                            onClick={generatePDF}
                                            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Preview PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        <div className="space-x-3">
                            {currentStep < 4 ? (
                                <button
                                    onClick={() => setCurrentStep(prev => prev + 1)}
                                    disabled={
                                        (currentStep === 1 &&
                                            (!quotation.clientName || !quotation.clientEmail)) ||
                                        (currentStep === 2 &&
                                            (!quotation.serviceCategory ||
                                                !quotation.serviceType)) ||
                                        (currentStep === 3 && calculatedPrice === 0)
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={sendToTeam}
                                    disabled={quotation.teamAssigned.length === 0}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send to Team
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationCreator;
