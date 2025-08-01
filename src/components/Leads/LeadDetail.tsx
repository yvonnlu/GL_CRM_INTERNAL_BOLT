import React, { useState } from 'react';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Building,
    Calendar,
    Plus,
    FileText,
    Calculator,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import QuotationTab from '../Quotation/QuotationTab';
import leadsData, { formatCurrency } from '../../data/leadsData';

// Create compatible interface for QuotationTab's Lead props
interface QuotationLead {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    industry: string;
}

const LeadDetail: React.FC = () => {
    // Get leadId from route parameters
    const { leadId } = useParams<{ leadId: string }>();
    const navigate = useNavigate();

    // Find the lead with the matching ID
    const actualLead = leadsData.find(l => l.id === leadId);

    // If no lead is found, use fallback data
    const lead = actualLead || {
        id: leadId || '',
        fullName: 'Lead Not Found',
        companyName: 'Unknown Company',
        email: 'not.found@example.com',
        phone: 'N/A',
        pipelineStatus: 'New' as const,
        temperatureStatus: 'Cold' as const,
        source: 'Website Visit' as const,
        estimatedValue: 0,
        created: new Date(),
        notes: 'Lead information not available',
    };

    // Create a compatible lead object for QuotationTab component
    const quotationLead: QuotationLead = {
        id: lead.id,
        name: lead.fullName,
        company: lead.companyName,
        email: lead.email,
        phone: lead.phone,
        industry: 'Technology', // Default value since it's required by QuotationTab
    };

    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'quotation', label: 'Quotation', icon: Calculator },
        { id: 'notes', label: 'Notes', icon: FileText },
    ];

    const getPipelineStatusColor = (status: string) => {
        switch (status) {
            case 'New':
                return 'bg-blue-100 text-blue-800';
            case 'Proposal':
                return 'bg-yellow-100 text-yellow-800';
            case 'Negotiation':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTemperatureStatusColor = (status: string) => {
        switch (status) {
            case 'Hot':
                return 'bg-red-100 text-red-800';
            case 'Warm':
                return 'bg-orange-100 text-orange-800';
            case 'Cold':
                return 'bg-cyan-100 text-cyan-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Lead Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{lead.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">{lead.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Company</p>
                            <p className="font-medium">{lead.companyName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Created</p>
                            <p className="font-medium">{lead.created.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lead Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPipelineStatusColor(lead.pipelineStatus)}`}
                        >
                            {lead.pipelineStatus}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Pipeline Status</p>
                    </div>
                    <div className="text-center">
                        <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTemperatureStatusColor(lead.temperatureStatus)}`}
                        >
                            {lead.temperatureStatus}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Temperature</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(lead.estimatedValue)}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Est. Value</p>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Source</p>
                        <p className="font-medium">{lead.source}</p>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                <p className="text-gray-700">{lead.notes}</p>
            </div>
        </div>
    );

    const renderNotes = () => (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                </button>
            </div>
            <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-yellow-800">{lead.notes}</p>
                            <p className="text-xs text-yellow-600 mt-2">
                                Added on {lead.created.toLocaleDateString()}
                            </p>
                        </div>
                        <button className="text-yellow-600 hover:text-yellow-800">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/leads')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{lead.fullName}</h1>
                            <div className="flex items-center space-x-4">
                                <p className="text-gray-600">{lead.companyName}</p>
                                <div
                                    className={`px-2 py-0.5 rounded text-xs ${getPipelineStatusColor(lead.pipelineStatus)}`}
                                >
                                    {lead.pipelineStatus}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Convert to Client
                        </button>
                        <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                            Edit Lead
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="flex border-b border-gray-200">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'quotation' && <QuotationTab lead={quotationLead} />}
                    {activeTab === 'notes' && renderNotes()}
                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
