import React from 'react';
import { Plus } from 'lucide-react';

const ProposalsTab: React.FC = () => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Proposals</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Proposal
                </button>
            </div>
            <p className="text-gray-600 italic">No proposals have been created yet.</p>
        </div>
    );
};

export default ProposalsTab;
