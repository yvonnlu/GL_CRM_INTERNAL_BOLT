import React, { useState } from 'react';
import OverviewTab from './tabs/OverviewTab';
import NotesTab from './tabs/NotesTab';
import QuotationTab from './tabs/QuotationTab';
import ClientQuestionnaireTab from './tabs/ClientQuestionnaireTab';
import DocumentsTab from './tabs/DocumentsTab';
import LeadHeader from './LeadHeader';
import LeadTabs from './LeadTabs';
import leadsData from '../../../utils/loadLeadsData';

interface LeadDetailProps {
    leadId: string;
    onBack: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ leadId, onBack }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Find the lead by ID from the actual leads data
    const lead = leadsData.find(lead => lead.id === leadId);

    // If lead not found, show a message
    if (!lead) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                        &larr; Back to Leads
                    </button>
                    <p className="text-lg text-gray-700">Lead not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="">
                <div className="p-6">
                    <LeadHeader lead={lead} onBack={onBack} />

                    {/* Tabs */}
                    <LeadTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === 'overview' && <OverviewTab lead={lead} />}
                        {activeTab === 'questionnaire' && <ClientQuestionnaireTab lead={lead} />}
                        {activeTab === 'quotation' && (
                            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                                <p className="text-gray-600">
                                    Quotation tab is not yet implemented.
                                </p>
                            </div>
                        )}
                        {activeTab === 'notes' && <NotesTab lead={lead} />}
                        {activeTab === 'documents' && <DocumentsTab lead={lead} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
