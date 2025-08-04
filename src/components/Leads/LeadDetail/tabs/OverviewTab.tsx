import React from 'react';
import {
    Mail,
    Phone,
    Building,
    Target,
    Globe,
    DollarSign,
    Tag,
    User,
    MapPin,
    FileText,
    BarChart3,
    Flame,
    AlertCircle,
    Facebook,
    Linkedin,
    Twitter,
    Instagram,
    Share2,
} from 'lucide-react';
import { Lead } from '../../../../utils/loadLeadsData';

// Helper functions
const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'new':
            return 'bg-blue-100 text-blue-800';
        case 'proposal':
            return 'bg-green-100 text-green-800';
        case 'negotiation':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getLeadTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'hot':
            return 'bg-red-100 text-red-800';
        case 'warm':
            return 'bg-orange-100 text-orange-800';
        case 'cold':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Format currency with K for thousands and M for millions
const formatCurrencyWithSuffix = (value: number): string => {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`;
    } else {
        return `$${value}`;
    }
};

interface OverviewTabProps {
    lead: Lead;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ lead }) => {
    return (
        <div className="space-y-6">
            {/* Lead Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {lead.email && (
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-medium">{lead.email}</p>
                            </div>
                        </div>
                    )}
                    {lead.phone && (
                        <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="font-medium">{lead.phone}</p>
                            </div>
                        </div>
                    )}
                    {lead.address && (
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="font-medium">{lead.address}</p>
                            </div>
                        </div>
                    )}
                    {lead.website && lead.leadType !== 'Company' && (
                        <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-600">Website</p>
                                <p className="font-medium">
                                    <a
                                        href={lead.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {lead.website}
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                    {lead.budget !== undefined && (
                        <div className="flex items-center space-x-3">
                            <DollarSign className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-600">Budget</p>
                                <p className="font-medium">
                                    {formatCurrencyWithSuffix(lead.budget)}
                                </p>
                            </div>
                        </div>
                    )}
                    {lead.source && (
                        <div className="flex items-center space-x-3">
                            <Tag className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-600">Source</p>
                                <p className="font-medium">{lead.source}</p>
                            </div>
                        </div>
                    )}
                    {lead.leadType && (
                        <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-600">Lead Type</p>
                                <p className="font-medium">{lead.leadType}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Company Information - Only shown for Company lead type */}
            {lead.leadType === 'Company' && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Company Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {lead.companyName && (
                            <div className="flex items-center space-x-3">
                                <Building className="w-5 h-5" />
                                <div>
                                    <p className="text-sm text-gray-600">Company Name</p>
                                    <p className="font-medium">{lead.companyName}</p>
                                </div>
                            </div>
                        )}
                        {lead.companyAddress && (
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5" />
                                <div>
                                    <p className="text-sm">Company Address</p>
                                    <p className="font-medium">{lead.companyAddress}</p>
                                </div>
                            </div>
                        )}
                        {lead.industry && (
                            <div className="flex items-center space-x-3">
                                <Target className="w-5 h-5" />
                                <div>
                                    <p className="text-sm text-gray-600">Industry</p>
                                    <p className="font-medium">{lead.industry}</p>
                                </div>
                            </div>
                        )}
                        {lead.website && (
                            <div className="flex items-center space-x-3">
                                <Globe className="w-5 h-5" />
                                <div>
                                    <p className="text-sm text-gray-600">Website</p>
                                    <a
                                        href={lead.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {lead.website}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Lead Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
                        <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
                        <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.salesStage)}`}
                        >
                            {lead.salesStage}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Sales Stage</p>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
                        <Flame className="w-6 h-6 text-red-500 mb-2" />
                        <div
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getLeadTypeColor(lead.customerPotential)}`}
                        >
                            {lead.customerPotential}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Potential</p>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
                        <AlertCircle className="w-6 h-6 text-purple-500 mb-2" />
                        <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            {lead.priority}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Priority</p>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
                        <DollarSign className="w-6 h-6 text-green-500 mb-2" />
                        <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {formatCurrencyWithSuffix(lead.estimatedValue)}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Est. Value</p>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                    <FileText className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">
                        {lead.notes && lead.notes.length > 0
                            ? lead.notes[0].content
                            : 'No notes available for this lead.'}
                    </p>
                </div>
            </div>

            {/* Social Media */}
            {lead.socialMedia && Object.keys(lead.socialMedia).length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                        <Share2 className="w-5 h-5 text-gray-400 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {lead.socialMedia.facebook && (
                            <div className="flex items-center space-x-3">
                                <Facebook className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Facebook</p>
                                    <a
                                        href={`https://${lead.socialMedia.facebook}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {lead.socialMedia.facebook}
                                    </a>
                                </div>
                            </div>
                        )}
                        {lead.socialMedia.linkedin && (
                            <div className="flex items-center space-x-3">
                                <Linkedin className="w-5 h-5 text-blue-800" />
                                <div>
                                    <p className="text-sm text-gray-600">LinkedIn</p>
                                    <a
                                        href={`https://${lead.socialMedia.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {lead.socialMedia.linkedin}
                                    </a>
                                </div>
                            </div>
                        )}
                        {lead.socialMedia.twitter && (
                            <div className="flex items-center space-x-3">
                                <Twitter className="w-5 h-5 text-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-600">Twitter</p>
                                    <a
                                        href={`https://${lead.socialMedia.twitter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {lead.socialMedia.twitter}
                                    </a>
                                </div>
                            </div>
                        )}
                        {lead.socialMedia.instagram && (
                            <div className="flex items-center space-x-3">
                                <Instagram className="w-5 h-5 text-pink-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Instagram</p>
                                    <a
                                        href={`https://${lead.socialMedia.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {lead.socialMedia.instagram}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverviewTab;
