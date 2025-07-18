import React, { useState } from 'react';
import { ArrowLeft, Save, Send, Eye, FileText, Mail, Users, Calculator, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import QuotePDFPreview from './QuotePDFPreview';
import SendToTeamModal from './SendToTeamModal';
// import QuotePDFPreview from './QuotePDFPreview';
// import SendToTeamModal from './SendToTeamModal';

interface Lead {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    industry: string;
    address: string;
}

interface ServiceItem {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    unit: string;
    category: string;
    subcategory: string;
    fields: {
        [key: string]: {
            type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox';
            label: string;
            options?: string[];
            required?: boolean;
            defaultValue?: any;
        };
    };
}

interface CreateQuotePageProps {
    lead: Lead;
    onBack: () => void;
    onSave: (quote: any) => void;
}

const CreateQuotePage: React.FC<CreateQuotePageProps> = ({ lead, onBack, onSave }) => {
    const [quoteName, setQuoteName] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [notes, setNotes] = useState('');
    const [discount, setDiscount] = useState(0);
    const [selectedServices, setSelectedServices] = useState<{ [key: string]: any }>({});
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
    const [showPDFPreview, setShowPDFPreview] = useState(false);
    const [showSendToTeam, setShowSendToTeam] = useState(false);

    const serviceCategories = {
        'web': {
            name: 'Web Services',
            color: 'bg-blue-100 text-blue-800',
            subcategories: {
                'website-development': {
                    name: 'Website Development',
                    services: [
                        {
                            id: 'web-basic-website',
                            name: 'Basic Business Website',
                            description: 'Professional business website with essential pages',
                            basePrice: 2500,
                            unit: 'project',
                            fields: {
                                pages: { type: 'number', label: 'Number of Pages', required: true, defaultValue: 5 },
                                design: { type: 'select', label: 'Design Complexity', options: ['Basic', 'Standard', 'Premium'], required: true },
                                responsive: { type: 'checkbox', label: 'Mobile Responsive', defaultValue: true },
                                cms: { type: 'select', label: 'Content Management', options: ['None', 'WordPress', 'Custom CMS'] },
                                timeline: { type: 'text', label: 'Timeline', defaultValue: '4-6 weeks' },
                                revisions: { type: 'number', label: 'Design Revisions Included', defaultValue: 3 }
                            }
                        },
                        {
                            id: 'web-ecommerce',
                            name: 'E-commerce Platform',
                            description: 'Complete online store with payment integration',
                            basePrice: 8000,
                            unit: 'project',
                            fields: {
                                products: { type: 'number', label: 'Number of Products', required: true, defaultValue: 50 },
                                payment: { type: 'select', label: 'Payment Gateway', options: ['Stripe', 'PayPal', 'Both'], required: true },
                                inventory: { type: 'checkbox', label: 'Inventory Management', defaultValue: true },
                                shipping: { type: 'checkbox', label: 'Shipping Calculator', defaultValue: true },
                                analytics: { type: 'checkbox', label: 'Analytics Integration', defaultValue: true },
                                mobile_app: { type: 'checkbox', label: 'Mobile App Integration' }
                            }
                        },
                        {
                            id: 'web-custom-app',
                            name: 'Custom Web Application',
                            description: 'Tailored web application for specific business needs',
                            basePrice: 15000,
                            unit: 'project',
                            fields: {
                                complexity: { type: 'select', label: 'Application Complexity', options: ['Simple', 'Medium', 'Complex'], required: true },
                                users: { type: 'number', label: 'Expected Users', required: true },
                                database: { type: 'select', label: 'Database Type', options: ['MySQL', 'PostgreSQL', 'MongoDB'] },
                                api: { type: 'checkbox', label: 'API Development', defaultValue: true },
                                authentication: { type: 'select', label: 'User Authentication', options: ['Basic', 'OAuth', 'Multi-factor'] },
                                hosting: { type: 'select', label: 'Hosting Requirements', options: ['Shared', 'VPS', 'Dedicated', 'Cloud'] }
                            }
                        }
                    ]
                },
                'maintenance': {
                    name: 'Website Maintenance',
                    services: [
                        {
                            id: 'web-maintenance-basic',
                            name: 'Basic Maintenance',
                            description: 'Essential website maintenance and updates',
                            basePrice: 300,
                            unit: 'month',
                            fields: {
                                updates: { type: 'number', label: 'Content Updates per Month', defaultValue: 4 },
                                backup: { type: 'select', label: 'Backup Frequency', options: ['Weekly', 'Daily'], defaultValue: 'Weekly' },
                                security: { type: 'checkbox', label: 'Security Monitoring', defaultValue: true },
                                uptime: { type: 'checkbox', label: 'Uptime Monitoring', defaultValue: true },
                                support: { type: 'select', label: 'Support Hours', options: ['Business Hours', '24/7'] }
                            }
                        },
                        {
                            id: 'web-maintenance-premium',
                            name: 'Premium Maintenance',
                            description: 'Comprehensive maintenance with priority support',
                            basePrice: 800,
                            unit: 'month',
                            fields: {
                                updates: { type: 'number', label: 'Content Updates per Month', defaultValue: 12 },
                                backup: { type: 'select', label: 'Backup Frequency', options: ['Daily', 'Real-time'], defaultValue: 'Daily' },
                                security: { type: 'checkbox', label: 'Advanced Security', defaultValue: true },
                                performance: { type: 'checkbox', label: 'Performance Optimization', defaultValue: true },
                                analytics: { type: 'checkbox', label: 'Monthly Analytics Report', defaultValue: true },
                                priority: { type: 'checkbox', label: 'Priority Support', defaultValue: true }
                            }
                        }
                    ]
                }
            }
        },
        'content': {
            name: 'Content Marketing',
            color: 'bg-green-100 text-green-800',
            subcategories: {
                'content-strategy': {
                    name: 'Content Strategy',
                    services: [
                        {
                            id: 'content-strategy-basic',
                            name: 'Content Strategy Development',
                            description: 'Comprehensive content marketing strategy',
                            basePrice: 2000,
                            unit: 'project',
                            fields: {
                                audit: { type: 'checkbox', label: 'Content Audit', defaultValue: true },
                                personas: { type: 'number', label: 'Buyer Personas', defaultValue: 3 },
                                calendar: { type: 'select', label: 'Content Calendar Duration', options: ['3 months', '6 months', '12 months'] },
                                channels: { type: 'select', label: 'Marketing Channels', options: ['Blog only', 'Blog + Social', 'Multi-channel'] },
                                competitors: { type: 'number', label: 'Competitor Analysis', defaultValue: 5 }
                            }
                        }
                    ]
                },
                'blog-writing': {
                    name: 'Blog & Article Writing',
                    services: [
                        {
                            id: 'content-blog-posts',
                            name: 'Blog Post Writing',
                            description: 'Professional blog posts and articles',
                            basePrice: 250,
                            unit: 'article',
                            fields: {
                                word_count: { type: 'select', label: 'Word Count', options: ['500-800', '800-1200', '1200-1500', '1500+'], required: true },
                                research: { type: 'checkbox', label: 'In-depth Research', defaultValue: true },
                                seo: { type: 'checkbox', label: 'SEO Optimization', defaultValue: true },
                                images: { type: 'number', label: 'Custom Images', defaultValue: 2 },
                                revisions: { type: 'number', label: 'Revisions Included', defaultValue: 2 },
                                tone: { type: 'select', label: 'Writing Tone', options: ['Professional', 'Casual', 'Technical', 'Creative'] }
                            }
                        },
                        {
                            id: 'content-case-studies',
                            name: 'Case Study Writing',
                            description: 'Detailed case studies showcasing success stories',
                            basePrice: 800,
                            unit: 'case study',
                            fields: {
                                interviews: { type: 'number', label: 'Client Interviews', defaultValue: 2 },
                                data_analysis: { type: 'checkbox', label: 'Data Analysis', defaultValue: true },
                                design: { type: 'checkbox', label: 'Visual Design', defaultValue: true },
                                length: { type: 'select', label: 'Case Study Length', options: ['Short (1-2 pages)', 'Medium (3-4 pages)', 'Long (5+ pages)'] },
                                format: { type: 'select', label: 'Delivery Format', options: ['PDF', 'Web Page', 'Both'] }
                            }
                        }
                    ]
                },
                'seo': {
                    name: 'SEO Services',
                    services: [
                        {
                            id: 'seo-audit',
                            name: 'SEO Audit & Strategy',
                            description: 'Comprehensive SEO analysis and strategy development',
                            basePrice: 1500,
                            unit: 'project',
                            fields: {
                                pages: { type: 'number', label: 'Pages to Audit', required: true, defaultValue: 20 },
                                keywords: { type: 'number', label: 'Target Keywords', defaultValue: 50 },
                                competitors: { type: 'number', label: 'Competitor Analysis', defaultValue: 5 },
                                technical: { type: 'checkbox', label: 'Technical SEO Audit', defaultValue: true },
                                local: { type: 'checkbox', label: 'Local SEO Analysis' },
                                reporting: { type: 'select', label: 'Reporting Frequency', options: ['One-time', 'Monthly', 'Quarterly'] }
                            }
                        },
                        {
                            id: 'seo-monthly',
                            name: 'Monthly SEO Management',
                            description: 'Ongoing SEO optimization and management',
                            basePrice: 2000,
                            unit: 'month',
                            fields: {
                                keywords: { type: 'number', label: 'Target Keywords', defaultValue: 30 },
                                content: { type: 'number', label: 'Content Pieces per Month', defaultValue: 4 },
                                backlinks: { type: 'number', label: 'Link Building Target', defaultValue: 10 },
                                reporting: { type: 'checkbox', label: 'Monthly Reports', defaultValue: true },
                                consultation: { type: 'number', label: 'Strategy Calls per Month', defaultValue: 2 }
                            }
                        }
                    ]
                }
            }
        },
        'design': {
            name: 'Design Services',
            color: 'bg-purple-100 text-purple-800',
            subcategories: {
                'brand-identity': {
                    name: 'Brand Identity',
                    services: [
                        {
                            id: 'design-logo',
                            name: 'Logo Design',
                            description: 'Professional logo design with multiple concepts',
                            basePrice: 1200,
                            unit: 'project',
                            fields: {
                                concepts: { type: 'number', label: 'Initial Concepts', defaultValue: 3 },
                                revisions: { type: 'number', label: 'Revision Rounds', defaultValue: 3 },
                                formats: { type: 'checkbox', label: 'Multiple File Formats', defaultValue: true },
                                guidelines: { type: 'checkbox', label: 'Brand Guidelines', defaultValue: true },
                                variations: { type: 'checkbox', label: 'Logo Variations' },
                                timeline: { type: 'text', label: 'Timeline', defaultValue: '2-3 weeks' }
                            }
                        },
                        {
                            id: 'design-brand-package',
                            name: 'Complete Brand Package',
                            description: 'Comprehensive brand identity development',
                            basePrice: 4500,
                            unit: 'project',
                            fields: {
                                logo: { type: 'checkbox', label: 'Logo Design', defaultValue: true },
                                colors: { type: 'checkbox', label: 'Color Palette', defaultValue: true },
                                typography: { type: 'checkbox', label: 'Typography System', defaultValue: true },
                                guidelines: { type: 'checkbox', label: 'Brand Guidelines', defaultValue: true },
                                business_cards: { type: 'checkbox', label: 'Business Card Design' },
                                letterhead: { type: 'checkbox', label: 'Letterhead Design' },
                                social_templates: { type: 'checkbox', label: 'Social Media Templates' }
                            }
                        }
                    ]
                },
                'ui-ux': {
                    name: 'UI/UX Design',
                    services: [
                        {
                            id: 'design-ui-website',
                            name: 'Website UI/UX Design',
                            description: 'User interface and experience design for websites',
                            basePrice: 3500,
                            unit: 'project',
                            fields: {
                                pages: { type: 'number', label: 'Number of Pages', required: true, defaultValue: 8 },
                                wireframes: { type: 'checkbox', label: 'Wireframes', defaultValue: true },
                                prototypes: { type: 'checkbox', label: 'Interactive Prototypes', defaultValue: true },
                                user_testing: { type: 'checkbox', label: 'User Testing' },
                                responsive: { type: 'checkbox', label: 'Responsive Design', defaultValue: true },
                                style_guide: { type: 'checkbox', label: 'Style Guide', defaultValue: true }
                            }
                        },
                        {
                            id: 'design-app-ui',
                            name: 'Mobile App UI Design',
                            description: 'Mobile application user interface design',
                            basePrice: 5000,
                            unit: 'project',
                            fields: {
                                screens: { type: 'number', label: 'Number of Screens', required: true, defaultValue: 15 },
                                platform: { type: 'select', label: 'Platform', options: ['iOS', 'Android', 'Both'], required: true },
                                wireframes: { type: 'checkbox', label: 'Wireframes', defaultValue: true },
                                prototypes: { type: 'checkbox', label: 'Interactive Prototypes', defaultValue: true },
                                animations: { type: 'checkbox', label: 'Micro-animations' },
                                user_flow: { type: 'checkbox', label: 'User Flow Diagrams', defaultValue: true }
                            }
                        }
                    ]
                },
                'print-design': {
                    name: 'Print Design',
                    services: [
                        {
                            id: 'design-brochure',
                            name: 'Brochure Design',
                            description: 'Professional brochure and flyer design',
                            basePrice: 600,
                            unit: 'design',
                            fields: {
                                type: { type: 'select', label: 'Brochure Type', options: ['Bi-fold', 'Tri-fold', 'Z-fold', 'Multi-page'], required: true },
                                sides: { type: 'select', label: 'Print Sides', options: ['Single-sided', 'Double-sided'], required: true },
                                size: { type: 'select', label: 'Size', options: ['A4', 'A5', 'Letter', 'Custom'] },
                                quantity: { type: 'number', label: 'Print Quantity Estimate', defaultValue: 1000 },
                                finish: { type: 'select', label: 'Finish Type', options: ['Matte', 'Gloss', 'Satin'] }
                            }
                        }
                    ]
                }
            }
        }
    };

    const toggleCategory = (categoryKey: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryKey]: !prev[categoryKey]
        }));
    };

    const handleServiceToggle = (serviceId: string) => {
        setSelectedServices(prev => {
            const newServices = { ...prev };
            if (newServices[serviceId]) {
                delete newServices[serviceId];
            } else {
                const service = findServiceById(serviceId);
                if (service) {
                    const defaultFields: any = {};
                    Object.entries(service.fields).forEach(([key, field]) => {
                        defaultFields[key] = field.defaultValue || '';
                    });
                    newServices[serviceId] = {
                        quantity: 1,
                        customPrice: null,
                        fields: defaultFields
                    };
                }
            }
            return newServices;
        });
    };

    const findServiceById = (serviceId: string): ServiceItem | null => {
        for (const category of Object.values(serviceCategories)) {
            for (const subcategory of Object.values(category.subcategories)) {
                const service = subcategory.services.find(s => s.id === serviceId);
                if (service) {
                    return {
                        ...service,
                        category: category.name,
                        subcategory: subcategory.name
                    };
                }
            }
        }
        return null;
    };

    const updateServiceField = (serviceId: string, fieldKey: string, value: any) => {
        setSelectedServices(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                fields: {
                    ...prev[serviceId].fields,
                    [fieldKey]: value
                }
            }
        }));
    };

    const updateServiceQuantity = (serviceId: string, quantity: number) => {
        if (quantity < 1) return;
        setSelectedServices(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                quantity
            }
        }));
    };

    const updateCustomPrice = (serviceId: string, price: number | null) => {
        setSelectedServices(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                customPrice: price
            }
        }));
    };

    const calculateTotal = () => {
        let subtotal = 0;
        Object.entries(selectedServices).forEach(([serviceId, serviceData]) => {
            const service = findServiceById(serviceId);
            if (service) {
                const price = serviceData.customPrice || service.basePrice;
                subtotal += price * serviceData.quantity;
            }
        });
        const discountAmount = subtotal * (discount / 100);
        return {
            subtotal,
            discountAmount,
            total: subtotal - discountAmount
        };
    };

    const handleSaveQuote = () => {
        const { subtotal, discountAmount, total } = calculateTotal();

        const quote = {
            id: Date.now().toString(),
            name: quoteName,
            leadId: lead.id,
            leadName: lead.name,
            company: lead.company,
            services: Object.entries(selectedServices).map(([serviceId, serviceData]) => {
                const service = findServiceById(serviceId)!;
                return {
                    ...service,
                    ...serviceData,
                    lineTotal: (serviceData.customPrice || service.basePrice) * serviceData.quantity
                };
            }),
            subtotal,
            discount,
            discountAmount,
            total,
            validUntil,
            notes,
            status: 'draft',
            createdAt: new Date().toISOString(),
            createdBy: 'Current User'
        };

        onSave(quote);
    };

    const renderServiceField = (serviceId: string, fieldKey: string, field: any) => {
        const value = selectedServices[serviceId]?.fields[fieldKey] || field.defaultValue || '';

        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => updateServiceField(serviceId, fieldKey, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder={field.label}
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => updateServiceField(serviceId, fieldKey, Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        min="0"
                    />
                );
            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => updateServiceField(serviceId, fieldKey, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => updateServiceField(serviceId, fieldKey, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        rows={3}
                        placeholder={field.label}
                    />
                );
            case 'checkbox':
                return (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => updateServiceField(serviceId, fieldKey, e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{field.label}</span>
                    </label>
                );
            default:
                return null;
        }
    };

    const { subtotal, discountAmount, total } = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Create Quote</h1>
                                <p className="text-gray-600">for {lead.name} at {lead.company}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowPDFPreview(true)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                Preview PDF
                            </button>
                            <button
                                onClick={() => setShowSendToTeam(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Send to Team
                            </button>
                            <button
                                onClick={handleSaveQuote}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quote Details */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quote Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quote Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={quoteName}
                                        onChange={(e) => setQuoteName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter quote name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Valid Until
                                    </label>
                                    <input
                                        type="date"
                                        value={validUntil}
                                        onChange={(e) => setValidUntil(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Add any additional notes or terms..."
                                />
                            </div>
                        </div>

                        {/* Services Selection */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Services</h2>
                            <div className="space-y-6">
                                {Object.entries(serviceCategories).map(([categoryKey, category]) => (
                                    <div key={categoryKey} className="border border-gray-200 rounded-lg">
                                        <button
                                            onClick={() => toggleCategory(categoryKey)}
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                                                    {category.name}
                                                </span>
                                            </div>
                                            {expandedCategories[categoryKey] ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>

                                        {expandedCategories[categoryKey] && (
                                            <div className="border-t border-gray-200 p-4 space-y-6">
                                                {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                                                    <div key={subKey}>
                                                        <h4 className="text-lg font-medium text-gray-900 mb-4">{subcategory.name}</h4>
                                                        <div className="space-y-4">
                                                            {subcategory.services.map(service => (
                                                                <div key={service.id} className="border border-gray-100 rounded-lg p-4">
                                                                    <div className="flex items-start justify-between mb-4">
                                                                        <div className="flex items-start space-x-3">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!!selectedServices[service.id]}
                                                                                onChange={() => handleServiceToggle(service.id)}
                                                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                                                                            />
                                                                            <div className="flex-1">
                                                                                <h5 className="font-medium text-gray-900">{service.name}</h5>
                                                                                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <div className="font-medium text-gray-900">
                                                                                ${service.basePrice.toLocaleString()}
                                                                            </div>
                                                                            <div className="text-sm text-gray-600">per {service.unit}</div>
                                                                        </div>
                                                                    </div>

                                                                    {selectedServices[service.id] && (
                                                                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                                                                            {/* Quantity and Custom Price */}
                                                                            <div className="flex items-center space-x-4">
                                                                                <div className="flex items-center space-x-2">
                                                                                    <span className="text-sm text-gray-600">Quantity:</span>
                                                                                    <button
                                                                                        onClick={() => updateServiceQuantity(service.id, selectedServices[service.id].quantity - 1)}
                                                                                        className="p-1 hover:bg-gray-100 rounded"
                                                                                    >
                                                                                        <Minus className="w-4 h-4" />
                                                                                    </button>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={selectedServices[service.id].quantity}
                                                                                        onChange={(e) => updateServiceQuantity(service.id, Number(e.target.value))}
                                                                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                                                                                        min="1"
                                                                                    />
                                                                                    <button
                                                                                        onClick={() => updateServiceQuantity(service.id, selectedServices[service.id].quantity + 1)}
                                                                                        className="p-1 hover:bg-gray-100 rounded"
                                                                                    >
                                                                                        <Plus className="w-4 h-4" />
                                                                                    </button>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                    <span className="text-sm text-gray-600">Custom Price:</span>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={selectedServices[service.id].customPrice || ''}
                                                                                        onChange={(e) => updateCustomPrice(service.id, e.target.value ? Number(e.target.value) : null)}
                                                                                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                                                                        placeholder={service.basePrice.toString()}
                                                                                    />
                                                                                </div>
                                                                                <div className="text-sm font-medium text-gray-900">
                                                                                    Line Total: ${((selectedServices[service.id].customPrice || service.basePrice) * selectedServices[service.id].quantity).toLocaleString()}
                                                                                </div>
                                                                            </div>

                                                                            {/* Service Fields */}
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                {Object.entries(service.fields).map(([fieldKey, field]) => (
                                                                                    <div key={fieldKey}>
                                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                            {field.label}
                                                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                                                        </label>
                                                                                        {renderServiceField(service.id, fieldKey, field)}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Lead Information */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-medium">{lead.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Company</p>
                                    <p className="font-medium">{lead.company}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium">{lead.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium">{lead.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Industry</p>
                                    <p className="font-medium">{lead.industry}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote Summary */}
                        {Object.keys(selectedServices).length > 0 && (
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Calculator className="w-5 h-5 mr-2" />
                                    Quote Summary
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Discount:</span>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                value={discount}
                                                onChange={(e) => setDiscount(Number(e.target.value))}
                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                                                min="0"
                                                max="100"
                                            />
                                            <span className="text-sm text-gray-600">%</span>
                                        </div>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount Amount:</span>
                                            <span>-${discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                                        <span>Total:</span>
                                        <span>${total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {showPDFPreview && (
                <QuotePDFPreview
                    quote={{
                        name: quoteName,
                        lead,
                        services: Object.entries(selectedServices).map(([serviceId, serviceData]) => {
                            const service = findServiceById(serviceId)!;
                            return {
                                ...service,
                                ...serviceData,
                                lineTotal: (serviceData.customPrice || service.basePrice) * serviceData.quantity
                            };
                        }),
                        subtotal,
                        discount,
                        discountAmount,
                        total,
                        validUntil,
                        notes
                    }}
                    onClose={() => setShowPDFPreview(false)}
                />
            )}

            {/* Send to Team Modal */}
            {showSendToTeam && (
                <SendToTeamModal
                    quote={{
                        name: quoteName,
                        lead,
                        total
                    }}
                    onClose={() => setShowSendToTeam(false)}
                />
            )}
        </div>
    );
};

export default CreateQuotePage;