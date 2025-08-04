import React from 'react';
import { User, Calculator, FileText, ClipboardList, File } from 'lucide-react';

interface LeadTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const LeadTabs: React.FC<LeadTabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'questionnaire', label: 'Questionnaire', icon: ClipboardList },
        { id: 'quotation', label: 'Quotation', icon: Calculator },
        { id: 'notes', label: 'Notes', icon: FileText },
        { id: 'documents', label: 'Documents', icon: File },
    ];

    return (
        <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`flex items-center pb-4 px-1 ${
                                activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Icon className="w-5 h-5 mr-2" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default LeadTabs;
