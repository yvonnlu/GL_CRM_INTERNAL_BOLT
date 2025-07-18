import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Eye, Edit3, Copy, Trash2, Calendar, DollarSign, User, Building, Clock } from 'lucide-react';
import CreateQuotePage from './CreateQuotePage';
import QuotePDFPreview from './QuotePDFPreview';
// import CreateQuotePage from './CreateQuotePage';
// import QuotePDFPreview from './QuotePDFPreview';

interface Lead {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    industry: string;
}

interface Quote {
    id: string;
    name: string;
    leadId: string;
    leadName: string;
    company: string;
    services: any[];
    subtotal: number;
    discount: number;
    discountAmount: number;
    total: number;
    validUntil: string;
    notes: string;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    createdAt: string;
    createdBy: string;
}

interface QuotationTabProps {
    lead: Lead;
}

const QuotationTab: React.FC<QuotationTabProps> = ({ lead }) => {
    const [quotes, setQuotes] = useState<Quote[]>([
        {
            id: '1',
            name: 'Digital Marketing Package',
            leadId: lead.id,
            leadName: lead.name,
            company: lead.company,
            services: [
                {
                    id: 'content-strategy-basic',
                    name: 'Content Strategy Development',
                    description: 'Comprehensive content marketing strategy',
                    basePrice: 2000,
                    unit: 'project',
                    category: 'Content Marketing',
                    subcategory: 'Content Strategy',
                    quantity: 1,
                    customPrice: null,
                    fields: {
                        audit: true,
                        personas: 3,
                        calendar: '6 months',
                        channels: 'Multi-channel',
                        competitors: 5
                    },
                    lineTotal: 2000
                },
                {
                    id: 'seo-monthly',
                    name: 'Monthly SEO Management',
                    description: 'Ongoing SEO optimization and management',
                    basePrice: 2000,
                    unit: 'month',
                    category: 'Content Marketing',
                    subcategory: 'SEO Services',
                    quantity: 6,
                    customPrice: 1800,
                    fields: {
                        keywords: 30,
                        content: 4,
                        backlinks: 10,
                        reporting: true,
                        consultation: 2
                    },
                    lineTotal: 10800
                }
            ],
            subtotal: 15000,
            discount: 10,
            discountAmount: 1500,
            total: 13500,
            validUntil: '2024-12-15',
            notes: 'Comprehensive digital marketing solution including website development and content strategy.',
            status: 'sent',
            createdAt: '2024-02-10T10:30:00Z',
            createdBy: 'John Doe'
        },
        {
            id: '2',
            name: 'Website Redesign',
            leadId: lead.id,
            leadName: lead.name,
            company: lead.company,
            services: [
                {
                    id: 'web-basic-website',
                    name: 'Basic Business Website',
                    description: 'Professional business website with essential pages',
                    basePrice: 2500,
                    unit: 'project',
                    category: 'Web Services',
                    subcategory: 'Website Development',
                    quantity: 1,
                    customPrice: null,
                    fields: {
                        pages: 8,
                        design: 'Premium',
                        responsive: true,
                        cms: 'WordPress',
                        timeline: '4-6 weeks',
                        revisions: 3
                    },
                    lineTotal: 2500
                },
                {
                    id: 'design-ui-website',
                    name: 'Website UI/UX Design',
                    description: 'User interface and experience design for websites',
                    basePrice: 3500,
                    unit: 'project',
                    category: 'Design Services',
                    subcategory: 'UI/UX Design',
                    quantity: 1,
                    customPrice: 3000,
                    fields: {
                        pages: 8,
                        wireframes: true,
                        prototypes: true,
                        user_testing: false,
                        responsive: true,
                        style_guide: true
                    },
                    lineTotal: 3000
                }
            ],
            subtotal: 8000,
            discount: 0,
            discountAmount: 0,
            total: 8000,
            validUntil: '2024-12-20',
            notes: 'Modern website redesign with responsive design and CMS integration.',
            status: 'draft',
            createdAt: '2024-02-12T14:15:00Z',
            createdBy: 'Jane Smith'
        }
    ]);

    const [showCreatePage, setShowCreatePage] = useState(false);
    const [showPDFPreview, setShowPDFPreview] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'sent': return 'bg-blue-100 text-blue-800';
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'expired': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'draft': return '📝';
            case 'sent': return '📤';
            case 'accepted': return '✅';
            case 'rejected': return '❌';
            case 'expired': return '⏰';
            default: return '📄';
        }
    };

    const handleCreateQuote = (newQuote: Quote) => {
        setQuotes(prev => [newQuote, ...prev]);
    };

    const handleDeleteQuote = (quoteId: string) => {
        setQuotes(prev => prev.filter(q => q.id !== quoteId));
    };

    const handleViewQuote = (quote: Quote) => {
        setSelectedQuote(quote);
        setShowPDFPreview(true);
    };
    if (showCreatePage) {
        return (
            <CreateQuotePage
                lead={lead}
                onBack={() => setShowCreatePage(false)}
                onSave={(quote) => {
                    handleCreateQuote(quote);
                    setShowCreatePage(false);
                }}
            />
        );
    }

    const filteredQuotes = quotes.filter(quote => {
        const matchesSearch = quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isExpired = (validUntil: string) => {
        return new Date(validUntil) < new Date();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Quotations</h2>
                        <p className="text-gray-600 mt-1">Manage quotes for {lead.name} at {lead.company}</p>
                    </div>
                    <button
                        onClick={() => setShowCreatePage(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Quote
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search quotes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="draft">Draft</option>
                            <option value="sent">Sent</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Quotes List */}
            <div className="space-y-4">
                {filteredQuotes.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'all'
                                ? 'No quotes match your current filters.'
                                : 'Get started by creating your first quote.'}
                        </p>
                        <button
                            onClick={() => setShowCreatePage(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Quote
                        </button>
                    </div>
                ) : (
                    filteredQuotes.map((quote) => (
                        <div key={quote.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900">{quote.name}</h3>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                                            <span className="mr-1">{getStatusIcon(quote.status)}</span>
                                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                        </span>
                                        {isExpired(quote.validUntil) && quote.status !== 'accepted' && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                ⚠️ Expired
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Lead</p>
                                                <p className="font-medium">{quote.leadName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Building className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Company</p>
                                                <p className="font-medium">{quote.company}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Valid Until</p>
                                                <p className="font-medium">{formatDate(quote.validUntil)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Created</p>
                                                <p className="font-medium">{formatDate(quote.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-6">
                                            <div>
                                                <p className="text-sm text-gray-600">Subtotal</p>
                                                <p className="font-medium">${quote.subtotal.toLocaleString()}</p>
                                            </div>
                                            {quote.discount > 0 && (
                                                <div>
                                                    <p className="text-sm text-gray-600">Discount</p>
                                                    <p className="font-medium text-green-600">-${quote.discountAmount.toLocaleString()} ({quote.discount}%)</p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-xl font-bold text-gray-900">${quote.total.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View PDF"
                                                onClick={() => handleViewQuote(quote)}
                                            >
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                                                <Edit3 className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Duplicate">
                                                <Copy className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Delete"
                                                onClick={() => handleDeleteQuote(quote.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {quote.notes && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-700">{quote.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* PDF Preview Modal */}
            {showPDFPreview && selectedQuote && (
                <QuotePDFPreview
                    quote={{
                        name: selectedQuote.name,
                        lead,
                        services: selectedQuote.services,
                        subtotal: selectedQuote.subtotal,
                        discount: selectedQuote.discount,
                        discountAmount: selectedQuote.discountAmount,
                        total: selectedQuote.total,
                        validUntil: selectedQuote.validUntil,
                        notes: selectedQuote.notes
                    }}
                    onClose={() => {
                        setShowPDFPreview(false);
                        setSelectedQuote(null);
                    }}
                />
            )}
        </div>
    );
};

export default QuotationTab;