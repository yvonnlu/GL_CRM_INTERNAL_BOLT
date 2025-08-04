import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Edit,
    Save,
    FileText,
    User,
    Building,
    Globe,
    Target,
    MessageSquare,
    CheckCircle,
    Clock,
    Star,
    DollarSign,
    TrendingUp,
    Plus,
    Send,
    Eye,
    Download,
    Minus,
    Calculator,
    Check,
    X,
    Printer,
    Copy,
} from 'lucide-react';
import QuotationTab from '../Quotation/QuotationTab';

interface ServiceQuestionnaire {
    serviceId: string;
    serviceName: string;
    questions: Array<{
        id: string;
        question: string;
        type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox';
        options?: string[];
        required: boolean;
    }>;
}

interface QuestionnaireSubmission {
    id: string;
    submissionDate: string;
    services: string[];
    generalInfo: Record<string, any>;
    serviceAnswers: Record<string, Record<string, any>>;
    status: 'draft' | 'submitted' | 'processed';
    submittedBy: string;
    notes?: string;
    version: number;
}

interface ServiceItem {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    unit: string;
    category: string;
}

interface ClientDetailProps {
    clientId: string;
    onBack: () => void;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ clientId, onBack }) => {
    const [activeTab, setActiveTab] = useState<
        | 'overview'
        | 'projects'
        | 'billing'
        | 'activities'
        | 'questionnaire'
        | 'quote'
        | 'quotes'
        | 'quotation'
    >('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [showNewQuestionnaire, setShowNewQuestionnaire] = useState(false);

    const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

    const [showPDFPreview, setShowPDFPreview] = useState(false);

    // Questionnaire state
    const [generalInfo, setGeneralInfo] = useState({
        companyWebsite: '',
        industry: '',
        companySize: '',
        currentChallenges: '',
        goals: '',
        budget: '',
        timeline: '',
        decisionMakers: '',
        previousExperience: '',
        competitors: '',
    });

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [serviceAnswers, setServiceAnswers] = useState<Record<string, Record<string, any>>>({});

    // Mock client data - in real app, fetch by clientId
    const client = {
        id: clientId,
        name: 'TechCorp Inc.',
        company: 'TechCorp Inc.', // Thêm trường company cho QuotationTab
        contactPerson: 'Jennifer Walsh',
        email: 'jennifer@techcorp.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        tier: 'enterprise',
        monthlyValue: '$15,000',
        totalSpent: '$180,000',
        avatar: 'TC',
        startDate: '2023-08-15T00:00:00Z',
        industry: 'Technology',
        services: ['SEO', 'PPC', 'Content Marketing'],
        nextReview: '2024-03-15',
        satisfaction: 4.8,
        projects: 12,
        accountManager: 'Sarah Johnson',
        website: 'https://techcorp.com',
        address: '123 Tech Street, San Francisco, CA 94105',
        companySize: '50-100 employees',
        notes: 'High-value client with excellent relationship. Always pays on time.',
        activities: [
            {
                id: '1',
                type: 'meeting',
                description: 'Monthly review meeting completed',
                date: '2024-02-10T14:30:00Z',
                user: 'Sarah Johnson',
            },
            {
                id: '2',
                type: 'invoice',
                description: 'Invoice #INV-2024-002 sent ($15,000)',
                date: '2024-02-01T09:00:00Z',
                user: 'System',
            },
            {
                id: '3',
                type: 'project',
                description: 'New SEO campaign launched',
                date: '2024-01-28T16:20:00Z',
                user: 'Mike Chen',
            },
        ],
        projects_list: [
            {
                id: 'proj-1',
                name: 'Q1 2024 SEO Campaign',
                status: 'active',
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                budget: '$45,000',
                progress: 65,
                team: ['Mike Chen', 'Emma Rodriguez'],
            },
            {
                id: 'proj-2',
                name: 'Website Redesign',
                status: 'completed',
                startDate: '2023-11-01',
                endDate: '2023-12-31',
                budget: '$25,000',
                progress: 100,
                team: ['John Davis', 'Lisa Martinez'],
            },
            {
                id: 'proj-3',
                name: 'Content Marketing Strategy',
                status: 'planning',
                startDate: '2024-03-01',
                endDate: '2024-05-31',
                budget: '$30,000',
                progress: 15,
                team: ['Emma Rodriguez'],
            },
        ],
        billing: [
            {
                id: 'inv-1',
                invoiceNumber: 'INV-2024-002',
                date: '2024-02-01',
                amount: '$15,000',
                status: 'paid',
                dueDate: '2024-02-15',
                services: ['SEO Optimization', 'PPC Management', 'Content Creation'],
            },
            {
                id: 'inv-2',
                invoiceNumber: 'INV-2024-001',
                date: '2024-01-01',
                amount: '$15,000',
                status: 'paid',
                dueDate: '2024-01-15',
                services: ['SEO Optimization', 'PPC Management', 'Content Creation'],
            },
            {
                id: 'inv-3',
                invoiceNumber: 'INV-2023-012',
                date: '2023-12-01',
                amount: '$15,000',
                status: 'paid',
                dueDate: '2023-12-15',
                services: ['SEO Optimization', 'PPC Management'],
            },
        ],
    };

    // Mock questionnaire submissions
    const questionnaireSubmissions: QuestionnaireSubmission[] = [
        {
            id: 'sub-1',
            submissionDate: '2023-08-15T10:00:00Z',
            services: ['seo-services', 'content-marketing'],
            generalInfo: {
                companyWebsite: 'https://techcorp.com',
                industry: 'Technology',
                companySize: '50-100 employees',
                currentChallenges: 'Low organic traffic, need better content strategy',
                goals: 'Increase organic traffic by 200% in 12 months',
                budget: '$15,000-$30,000/month',
                timeline: 'Immediately',
                decisionMakers: 'Jennifer Walsh (CMO), John Smith (CEO)',
                previousExperience: 'Worked with 2 agencies before, mixed results',
                competitors: 'CompetitorA, CompetitorB, CompetitorC',
            },
            serviceAnswers: {
                'seo-services': {
                    current_website: 'https://techcorp.com',
                    seo_goals: ['Increase organic traffic', 'Improve search rankings'],
                    target_keywords: 'enterprise software, business solutions, tech consulting',
                    geographic_target: 'United States, Canada',
                    main_competitors: 'CompetitorA, CompetitorB',
                },
                'content-marketing': {
                    website_project: 'https://techcorp.com',
                    industry_field: 'Technology',
                    content_services: ['Blog Writing', 'Social Media Content', 'Case Studies'],
                    content_goals: 'Establish thought leadership and generate leads',
                    target_audience: 'Enterprise decision makers, CTOs, IT managers',
                },
            },
            status: 'processed',
            submittedBy: 'Jennifer Walsh',
            notes: 'Initial onboarding questionnaire - comprehensive SEO and content strategy needed',
            version: 1,
        },
        {
            id: 'sub-2',
            submissionDate: '2024-01-15T14:30:00Z',
            services: ['paid-advertising'],
            generalInfo: {
                companyWebsite: 'https://techcorp.com',
                industry: 'Technology',
                companySize: '50-100 employees',
                currentChallenges: 'Need to scale lead generation, current PPC not performing well',
                goals: 'Generate 50 qualified leads per month',
                budget: '$10,000-$15,000/month',
                timeline: 'Within 1 month',
                decisionMakers: 'Jennifer Walsh (CMO)',
                previousExperience: 'Running Google Ads in-house with poor results',
                competitors: 'Same as before plus new competitor CompetitorD',
            },
            serviceAnswers: {
                'paid-advertising': {
                    advertising_platforms: ['Google Ads', 'LinkedIn Ads'],
                    advertising_goals: ['Lead generation', 'Brand awareness'],
                    monthly_budget: '$10,000 - $15,000',
                    target_audience_ads:
                        'Enterprise CTOs, IT Directors, Business owners looking for tech solutions',
                    previous_ad_experience:
                        'Running Google Ads in-house for 6 months, low conversion rates',
                },
            },
            status: 'processed',
            submittedBy: 'Jennifer Walsh',
            notes: 'Service expansion - adding PPC to existing SEO and content services',
            version: 2,
        },
    ];

    const serviceQuestionnaires: ServiceQuestionnaire[] = [
        {
            serviceId: 'content-marketing',
            serviceName: 'Content Marketing',
            questions: [
                {
                    id: 'website_project',
                    question: 'What is your company website or project?',
                    type: 'text',
                    required: true,
                },
                {
                    id: 'industry_field',
                    question: 'What industry/field do you want content written for?',
                    type: 'select',
                    options: [
                        'Technology',
                        'Healthcare',
                        'Finance',
                        'E-commerce',
                        'Education',
                        'Real Estate',
                        'Manufacturing',
                        'Other',
                    ],
                    required: true,
                },
                {
                    id: 'content_services',
                    question: 'Which content services are you interested in?',
                    type: 'multiselect',
                    options: [
                        'Blog Writing',
                        'Social Media Content',
                        'Website Copy',
                        'Email Marketing',
                        'Video Scripts',
                        'Infographics',
                        'Case Studies',
                        'White Papers',
                    ],
                    required: true,
                },
                {
                    id: 'content_goals',
                    question: 'What are your goals for implementing a content strategy?',
                    type: 'textarea',
                    required: true,
                },
                {
                    id: 'target_audience',
                    question: 'Who is your target audience?',
                    type: 'textarea',
                    required: true,
                },
                {
                    id: 'content_frequency',
                    question: 'How often do you want to publish content?',
                    type: 'select',
                    options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'As needed'],
                    required: true,
                },
                {
                    id: 'brand_voice',
                    question: 'How would you describe your brand voice?',
                    type: 'select',
                    options: [
                        'Professional',
                        'Casual',
                        'Friendly',
                        'Authoritative',
                        'Creative',
                        'Technical',
                    ],
                    required: false,
                },
            ],
        },
        {
            serviceId: 'seo-services',
            serviceName: 'SEO Services',
            questions: [
                {
                    id: 'current_website',
                    question: 'What is your current website URL?',
                    type: 'text',
                    required: true,
                },
                {
                    id: 'seo_goals',
                    question: 'What are your main SEO goals?',
                    type: 'multiselect',
                    options: [
                        'Increase organic traffic',
                        'Improve search rankings',
                        'Local SEO',
                        'E-commerce SEO',
                        'Technical SEO fixes',
                        'Content optimization',
                    ],
                    required: true,
                },
                {
                    id: 'target_keywords',
                    question: 'Do you have specific keywords you want to target?',
                    type: 'textarea',
                    required: false,
                },
                {
                    id: 'current_seo_efforts',
                    question: 'What SEO efforts have you tried before?',
                    type: 'textarea',
                    required: false,
                },
                {
                    id: 'geographic_target',
                    question: 'What geographic areas do you want to target?',
                    type: 'text',
                    required: true,
                },
                {
                    id: 'main_competitors',
                    question: 'Who are your main competitors online?',
                    type: 'textarea',
                    required: false,
                },
            ],
        },
        {
            serviceId: 'paid-advertising',
            serviceName: 'Paid Advertising',
            questions: [
                {
                    id: 'advertising_platforms',
                    question: 'Which advertising platforms are you interested in?',
                    type: 'multiselect',
                    options: [
                        'Google Ads',
                        'Facebook Ads',
                        'Instagram Ads',
                        'LinkedIn Ads',
                        'YouTube Ads',
                        'TikTok Ads',
                    ],
                    required: true,
                },
                {
                    id: 'advertising_goals',
                    question: 'What are your advertising goals?',
                    type: 'multiselect',
                    options: [
                        'Brand awareness',
                        'Lead generation',
                        'Sales/conversions',
                        'Website traffic',
                        'App downloads',
                        'Event promotion',
                    ],
                    required: true,
                },
                {
                    id: 'monthly_budget',
                    question: 'What is your monthly advertising budget?',
                    type: 'select',
                    options: [
                        'Under $1,000',
                        '$1,000 - $5,000',
                        '$5,000 - $10,000',
                        '$10,000 - $25,000',
                        '$25,000+',
                    ],
                    required: true,
                },
                {
                    id: 'target_audience_ads',
                    question: 'Describe your target audience for ads',
                    type: 'textarea',
                    required: true,
                },
                {
                    id: 'previous_ad_experience',
                    question: 'Have you run paid ads before? What were the results?',
                    type: 'textarea',
                    required: false,
                },
            ],
        },
        {
            serviceId: 'web-development',
            serviceName: 'Web Development',
            questions: [
                {
                    id: 'website_type',
                    question: 'What type of website do you need?',
                    type: 'select',
                    options: [
                        'Business Website',
                        'E-commerce Store',
                        'Portfolio',
                        'Blog',
                        'Landing Page',
                        'Web Application',
                    ],
                    required: true,
                },
                {
                    id: 'website_features',
                    question: 'What features do you need on your website?',
                    type: 'multiselect',
                    options: [
                        'Contact Forms',
                        'Online Store',
                        'Blog',
                        'User Accounts',
                        'Payment Processing',
                        'Booking System',
                        'Live Chat',
                        'Multi-language',
                    ],
                    required: true,
                },
                {
                    id: 'design_preferences',
                    question: 'Do you have any design preferences or examples?',
                    type: 'textarea',
                    required: false,
                },
                {
                    id: 'current_website',
                    question: 'Do you have an existing website that needs redesign?',
                    type: 'radio',
                    options: ['Yes', 'No'],
                    required: true,
                },
                {
                    id: 'timeline_launch',
                    question: 'When do you need the website to launch?',
                    type: 'select',
                    options: ['ASAP', '1 month', '2-3 months', '3-6 months', 'Flexible'],
                    required: true,
                },
            ],
        },
        {
            serviceId: 'social-media',
            serviceName: 'Social Media Management',
            questions: [
                {
                    id: 'social_platforms',
                    question: 'Which social media platforms do you want to focus on?',
                    type: 'multiselect',
                    options: [
                        'Facebook',
                        'Instagram',
                        'LinkedIn',
                        'Twitter',
                        'TikTok',
                        'YouTube',
                        'Pinterest',
                    ],
                    required: true,
                },
                {
                    id: 'social_goals',
                    question: 'What are your social media goals?',
                    type: 'multiselect',
                    options: [
                        'Brand awareness',
                        'Community building',
                        'Lead generation',
                        'Customer service',
                        'Sales',
                        'Thought leadership',
                    ],
                    required: true,
                },
                {
                    id: 'posting_frequency',
                    question: 'How often would you like to post?',
                    type: 'select',
                    options: ['Daily', '3-5 times per week', 'Weekly', 'Bi-weekly', 'Monthly'],
                    required: true,
                },
                {
                    id: 'content_types',
                    question: 'What types of content do you want to share?',
                    type: 'multiselect',
                    options: [
                        'Educational posts',
                        'Behind-the-scenes',
                        'Product showcases',
                        'Industry news',
                        'User-generated content',
                        'Videos',
                        'Stories',
                    ],
                    required: true,
                },
                {
                    id: 'current_social_presence',
                    question:
                        'Do you currently have social media accounts? How are they performing?',
                    type: 'textarea',
                    required: false,
                },
            ],
        },
    ];

    const generalQuestions = [
        {
            id: 'companyWebsite',
            label: 'Company Website',
            type: 'text' as const,
            placeholder: 'https://yourcompany.com',
        },
        {
            id: 'industry',
            label: 'Industry/Business Field',
            type: 'select' as const,
            options: [
                'Technology',
                'Healthcare',
                'Finance',
                'E-commerce',
                'Education',
                'Real Estate',
                'Manufacturing',
                'Consulting',
                'Other',
            ],
        },
        {
            id: 'companySize',
            label: 'Company Size',
            type: 'select' as const,
            options: [
                '1-10 employees',
                '11-50 employees',
                '51-200 employees',
                '201-500 employees',
                '500+ employees',
            ],
        },
        {
            id: 'currentChallenges',
            label: 'What are your current marketing challenges?',
            type: 'textarea' as const,
            placeholder: 'Describe your main challenges...',
        },
        {
            id: 'goals',
            label: 'What are your business goals for the next 12 months?',
            type: 'textarea' as const,
            placeholder: 'Describe your goals...',
        },
        {
            id: 'budget',
            label: 'Marketing Budget Range',
            type: 'select' as const,
            options: [
                'Under $5,000/month',
                '$5,000-$15,000/month',
                '$15,000-$30,000/month',
                '$30,000-$50,000/month',
                '$50,000+/month',
            ],
        },
        {
            id: 'timeline',
            label: 'When do you want to start?',
            type: 'select' as const,
            options: [
                'Immediately',
                'Within 1 month',
                '1-3 months',
                '3-6 months',
                'Just exploring',
            ],
        },
        {
            id: 'decisionMakers',
            label: 'Who are the decision makers for this project?',
            type: 'text' as const,
            placeholder: 'Names and roles...',
        },
        {
            id: 'previousExperience',
            label: 'Have you worked with marketing agencies before?',
            type: 'textarea' as const,
            placeholder: 'Tell us about your experience...',
        },
        {
            id: 'competitors',
            label: 'Who are your main competitors?',
            type: 'textarea' as const,
            placeholder: 'List your main competitors...',
        },
    ];

    // Questionnaire functions
    const updateGeneralInfo = (field: string, value: string) => {
        setGeneralInfo(prev => ({ ...prev, [field]: value }));
    };

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
        );
    };

    const updateServiceAnswer = (serviceId: string, questionId: string, value: any) => {
        setServiceAnswers(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                [questionId]: value,
            },
        }));
    };

    const sendToTeam = () => {
        const data = {
            client,
            generalInfo,
            selectedServices,
            serviceAnswers,
            timestamp: new Date().toISOString(),
            submissionType: 'service_expansion',
        };

        const serviceNames = selectedServices
            .map(id => serviceQuestionnaires.find(s => s.serviceId === id)?.serviceName)
            .join(', ');

        alert(
            `Client questionnaire sent to team successfully!\n\nClient: ${client.name}\nServices: ${serviceNames}\nGeneral info and service-specific answers included.`
        );

        setShowNewQuestionnaire(false);
        setSelectedServices([]);
        setServiceAnswers({});
    };

    const viewSubmission = (submissionId: string) => {
        setSelectedSubmission(submissionId);
    };

    const downloadSubmission = (submissionId: string) => {
        const submission = questionnaireSubmissions.find(s => s.id === submissionId);
        if (!submission) return;

        const content = {
            client: client.name,
            submissionDate: submission.submissionDate,
            services: submission.services,
            generalInfo: submission.generalInfo,
            serviceAnswers: submission.serviceAnswers,
            notes: submission.notes,
        };

        alert(`Downloading submission ${submissionId} as PDF...`);
    };

    // Status color functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'paused':
                return 'bg-yellow-100 text-yellow-800';
            case 'churned':
                return 'bg-red-100 text-red-800';
            case 'at-risk':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'enterprise':
                return 'bg-purple-100 text-purple-800';
            case 'growth':
                return 'bg-blue-100 text-blue-800';
            case 'basic':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getProjectStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'planning':
                return 'bg-yellow-100 text-yellow-800';
            case 'on-hold':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getInvoiceStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'overdue':
                return 'bg-red-100 text-red-800';
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getSubmissionStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            case 'submitted':
                return 'bg-blue-100 text-blue-800';
            case 'processed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getSatisfactionColor = (satisfaction: number) => {
        if (satisfaction >= 4.5) return 'text-green-600';
        if (satisfaction >= 4.0) return 'text-yellow-600';
        return 'text-red-600';
    };

    const renderGeneralQuestions = () => (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">General Information</h4>
                <p className="text-sm text-blue-700">
                    This information is required for all services to better understand your business
                    needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generalQuestions.map(question => (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {question.label}
                        </label>

                        {question.type === 'text' && (
                            <input
                                type="text"
                                value={generalInfo[question.id as keyof typeof generalInfo]}
                                onChange={e => updateGeneralInfo(question.id, e.target.value)}
                                placeholder={question.placeholder}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}

                        {question.type === 'select' && (
                            <select
                                value={generalInfo[question.id as keyof typeof generalInfo]}
                                onChange={e => updateGeneralInfo(question.id, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select {question.label}</option>
                                {question.options?.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}

                        {question.type === 'textarea' && (
                            <textarea
                                value={generalInfo[question.id as keyof typeof generalInfo]}
                                onChange={e => updateGeneralInfo(question.id, e.target.value)}
                                placeholder={question.placeholder}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderServiceSelection = () => (
        <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Service Selection</h4>
                <p className="text-sm text-green-700">
                    Select the services you're interested in. Each service will have specific
                    questions to help us understand your needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceQuestionnaires.map(service => (
                    <div
                        key={service.serviceId}
                        onClick={() => toggleService(service.serviceId)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedServices.includes(service.serviceId)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{service.serviceName}</h4>
                            {selectedServices.includes(service.serviceId) && (
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            {service.questions.length} questions
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderServiceQuestions = () => (
        <div className="space-y-8">
            {selectedServices.map(serviceId => {
                const service = serviceQuestionnaires.find(s => s.serviceId === serviceId);
                if (!service) return null;

                return (
                    <div key={serviceId} className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            {service.serviceName} Questions
                        </h4>

                        <div className="space-y-4">
                            {service.questions.map(question => (
                                <div key={question.id}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {question.question}
                                        {question.required && (
                                            <span className="text-red-500 ml-1">*</span>
                                        )}
                                    </label>

                                    {question.type === 'text' && (
                                        <input
                                            type="text"
                                            value={serviceAnswers[serviceId]?.[question.id] || ''}
                                            onChange={e =>
                                                updateServiceAnswer(
                                                    serviceId,
                                                    question.id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required={question.required}
                                        />
                                    )}

                                    {question.type === 'textarea' && (
                                        <textarea
                                            value={serviceAnswers[serviceId]?.[question.id] || ''}
                                            onChange={e =>
                                                updateServiceAnswer(
                                                    serviceId,
                                                    question.id,
                                                    e.target.value
                                                )
                                            }
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required={question.required}
                                        />
                                    )}

                                    {question.type === 'select' && (
                                        <select
                                            value={serviceAnswers[serviceId]?.[question.id] || ''}
                                            onChange={e =>
                                                updateServiceAnswer(
                                                    serviceId,
                                                    question.id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required={question.required}
                                        >
                                            <option value="">Select an option</option>
                                            {question.options?.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {question.type === 'multiselect' && (
                                        <div className="space-y-2">
                                            {question.options?.map(option => (
                                                <label key={option} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={(
                                                            serviceAnswers[serviceId]?.[
                                                                question.id
                                                            ] || []
                                                        ).includes(option)}
                                                        onChange={e => {
                                                            const currentValues =
                                                                serviceAnswers[serviceId]?.[
                                                                    question.id
                                                                ] || [];
                                                            const newValues = e.target.checked
                                                                ? [...currentValues, option]
                                                                : currentValues.filter(
                                                                      (v: string) => v !== option
                                                                  );
                                                            updateServiceAnswer(
                                                                serviceId,
                                                                question.id,
                                                                newValues
                                                            );
                                                        }}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {option}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {question.type === 'radio' && (
                                        <div className="space-y-2">
                                            {question.options?.map(option => (
                                                <label key={option} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name={`${serviceId}-${question.id}`}
                                                        value={option}
                                                        checked={
                                                            serviceAnswers[serviceId]?.[
                                                                question.id
                                                            ] === option
                                                        }
                                                        onChange={e =>
                                                            updateServiceAnswer(
                                                                serviceId,
                                                                question.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mr-2"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {option}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderQuestionnaireHistory = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Questionnaire History</h3>
                <button
                    onClick={() => setShowNewQuestionnaire(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Questionnaire
                </button>
            </div>

            <div className="space-y-4">
                {questionnaireSubmissions.map(submission => (
                    <div
                        key={submission.id}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="font-medium text-gray-900">
                                        Submission #{submission.version}
                                    </h4>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSubmissionStatusColor(submission.status)}`}
                                    >
                                        {submission.status.charAt(0).toUpperCase() +
                                            submission.status.slice(1)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Submitted by {submission.submittedBy} on{' '}
                                    {new Date(submission.submissionDate).toLocaleDateString()}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {submission.services.map(serviceId => {
                                        const service = serviceQuestionnaires.find(
                                            s => s.serviceId === serviceId
                                        );
                                        return (
                                            <span
                                                key={serviceId}
                                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                            >
                                                {service?.serviceName || serviceId}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => viewSubmission(submission.id)}
                                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => downloadSubmission(submission.id)}
                                    className="p-2 text-gray-400 hover:text-green-600 transition-colors border border-gray-300 rounded-lg"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {submission.notes && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-700">{submission.notes}</p>
                            </div>
                        )}

                        {selectedSubmission === submission.id && (
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-medium text-gray-900 mb-3">
                                            General Information
                                        </h5>
                                        <div className="space-y-2">
                                            {Object.entries(submission.generalInfo).map(
                                                ([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="flex justify-between text-sm"
                                                    >
                                                        <span className="text-gray-500 capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                        </span>
                                                        <span className="text-gray-900 text-right max-w-xs">
                                                            {value}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-gray-900 mb-3">
                                            Service Answers
                                        </h5>
                                        <div className="space-y-4">
                                            {Object.entries(submission.serviceAnswers).map(
                                                ([serviceId, answers]) => {
                                                    const service = serviceQuestionnaires.find(
                                                        s => s.serviceId === serviceId
                                                    );
                                                    return (
                                                        <div key={serviceId}>
                                                            <h6 className="text-sm font-medium text-blue-600 mb-2">
                                                                {service?.serviceName}
                                                            </h6>
                                                            <div className="space-y-1">
                                                                {Object.entries(answers).map(
                                                                    ([questionId, answer]) => {
                                                                        const question =
                                                                            service?.questions.find(
                                                                                q =>
                                                                                    q.id ===
                                                                                    questionId
                                                                            );
                                                                        return (
                                                                            <div
                                                                                key={questionId}
                                                                                className="text-xs"
                                                                            >
                                                                                <span className="text-gray-500">
                                                                                    {
                                                                                        question?.question
                                                                                    }
                                                                                    :
                                                                                </span>
                                                                                <span className="text-gray-900 ml-2">
                                                                                    {Array.isArray(
                                                                                        answer
                                                                                    )
                                                                                        ? answer.join(
                                                                                              ', '
                                                                                          )
                                                                                        : answer}
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // PDF Preview Component
    const PDFPreview: React.FC = () => {
        const subtotal = calculateSubtotal();
        const discount = calculateDiscount();
        const tax = calculateTax();
        const total = calculateTotal();

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">PDF Preview</h3>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => window.print()}
                                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print</span>
                            </button>
                            <button
                                onClick={() => setShowPDFPreview(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Clients
                        </button>
                        <div className="h-6 border-l border-gray-300"></div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                            <p className="text-gray-600">{client.contactPerson}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}
                        >
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(client.tier)}`}
                        >
                            {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'overview'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Overview
                    </button>

                    <button
                        onClick={() => setActiveTab('questionnaire')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'questionnaire'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Client Questionnaire
                    </button>
                    <button
                        onClick={() => setActiveTab('quotation')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'quotation'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Quotation
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'projects'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('billing')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'billing'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Billing
                    </button>
                    <button
                        onClick={() => setActiveTab('activities')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'activities'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Activities
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Client Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Client Information
                                </h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    {isEditing ? (
                                        <Save className="w-4 h-4 mr-1" />
                                    ) : (
                                        <Edit className="w-4 h-4 mr-1" />
                                    )}
                                    {isEditing ? 'Save' : 'Edit'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{client.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{client.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Website</p>
                                        <a
                                            href={client.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {client.website}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Building className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Industry</p>
                                        <p className="font-medium">{client.industry}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Company Size</p>
                                        <p className="font-medium">{client.companySize}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Client Since</p>
                                        <p className="font-medium">
                                            {new Date(client.startDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-1">Address</p>
                                <p className="text-gray-900">{client.address}</p>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-1">Notes</p>
                                {isEditing ? (
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                        defaultValue={client.notes}
                                    />
                                ) : (
                                    <p className="text-gray-900">{client.notes}</p>
                                )}
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Active Services
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {client.services.map((service, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Key Metrics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Monthly Value</span>
                                    <span className="font-bold text-green-600">
                                        {client.monthlyValue}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Spent</span>
                                    <span className="font-bold text-gray-900">
                                        {client.totalSpent}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Projects</span>
                                    <span className="font-bold text-gray-900">
                                        {client.projects}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Satisfaction</span>
                                    <div className="flex items-center space-x-1">
                                        <span
                                            className={`font-bold ${getSatisfactionColor(client.satisfaction)}`}
                                        >
                                            {client.satisfaction}
                                        </span>
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Email
                                </button>

                                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Create Invoice
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Account Manager
                            </h3>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {client.accountManager
                                        .split(' ')
                                        .map(n => n[0])
                                        .join('')}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {client.accountManager}
                                    </p>
                                    <p className="text-sm text-gray-600">Account Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'questionnaire' && (
                <div className="max-w-6xl mx-auto">
                    {!showNewQuestionnaire ? (
                        renderQuestionnaireHistory()
                    ) : (
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        New Client Questionnaire
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Gather additional information for new services or updated
                                        requirements
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setShowNewQuestionnaire(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={sendToTeam}
                                        disabled={selectedServices.length === 0}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Send to Team
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {renderGeneralQuestions()}
                                {renderServiceSelection()}
                                {selectedServices.length > 0 && renderServiceQuestions()}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'projects' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                New Project
                            </button>
                        </div>

                        <div className="space-y-4">
                            {client.projects_list.map(project => (
                                <div
                                    key={project.id}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-900">
                                            {project.name}
                                        </h4>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}
                                        >
                                            {project.status.charAt(0).toUpperCase() +
                                                project.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-medium">
                                                {project.startDate} - {project.endDate}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Budget</p>
                                            <p className="font-medium text-green-600">
                                                {project.budget}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Team</p>
                                            <p className="font-medium">{project.team.join(', ')}</p>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-medium">{project.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Create Invoice
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-gray-900">
                                            Invoice
                                        </th>
                                        <th className="text-left p-4 font-medium text-gray-900">
                                            Date
                                        </th>
                                        <th className="text-left p-4 font-medium text-gray-900">
                                            Amount
                                        </th>
                                        <th className="text-left p-4 font-medium text-gray-900">
                                            Due Date
                                        </th>
                                        <th className="text-left p-4 font-medium text-gray-900">
                                            Status
                                        </th>
                                        <th className="text-left p-4 font-medium text-gray-900">
                                            Services
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {client.billing.map(invoice => (
                                        <tr key={invoice.id} className="border-b border-gray-200">
                                            <td className="p-4 font-medium text-blue-600">
                                                {invoice.invoiceNumber}
                                            </td>
                                            <td className="p-4 text-gray-600">{invoice.date}</td>
                                            <td className="p-4 font-medium text-gray-900">
                                                {invoice.amount}
                                            </td>
                                            <td className="p-4 text-gray-600">{invoice.dueDate}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}
                                                >
                                                    {invoice.status.charAt(0).toUpperCase() +
                                                        invoice.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">
                                                {invoice.services.join(', ')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'activities' && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>

                    <div className="space-y-4">
                        {client.activities.map(activity => (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                            >
                                <div
                                    className={`p-2 rounded-full ${
                                        activity.type === 'meeting'
                                            ? 'bg-green-100'
                                            : activity.type === 'invoice'
                                              ? 'bg-blue-100'
                                              : activity.type === 'project'
                                                ? 'bg-purple-100'
                                                : 'bg-gray-100'
                                    }`}
                                >
                                    {activity.type === 'meeting' && (
                                        <Calendar className="w-4 h-4 text-green-600" />
                                    )}
                                    {activity.type === 'invoice' && (
                                        <DollarSign className="w-4 h-4 text-blue-600" />
                                    )}
                                    {activity.type === 'project' && (
                                        <FileText className="w-4 h-4 text-purple-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                                        <span>{activity.user}</span>
                                        <span>•</span>
                                        <span>{new Date(activity.date).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'quotation' && (
                <div className="max-w-6xl mx-auto">
                    <QuotationTab lead={client} />
                </div>
            )}

            {/* PDF Preview Modal */}
            {showPDFPreview && <PDFPreview />}
        </div>
    );
};

export default ClientDetail;
