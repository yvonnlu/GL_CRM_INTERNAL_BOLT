import React from 'react';
import { ArrowLeft, Star, Mail, Phone as PhoneIcon, MoreVertical } from 'lucide-react';
import { Lead } from '../../../utils/loadLeadsData';

interface LeadHeaderProps {
    lead: Lead;
    onBack: () => void;
}

const LeadHeader: React.FC<LeadHeaderProps> = ({ lead, onBack }) => {
    // Create initials from full name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();
    };

    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {getInitials(lead.fullName)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{lead.fullName}</h1>
                        <p className="text-gray-600">{lead.companyName}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Call
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default LeadHeader;
