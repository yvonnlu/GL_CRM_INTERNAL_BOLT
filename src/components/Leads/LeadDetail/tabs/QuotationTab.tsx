import React from 'react';

interface QuotationTabProps {
    lead: any;
}

const QuotationTab: React.FC<QuotationTabProps> = ({ lead }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quotation</h3>
            <p className="text-gray-600">
                Create and manage quotations for {lead.name} from {lead.company}.
            </p>

            {/* Placeholder for actual quotation functionality */}
            <div className="mt-6 p-8 border border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-500">No quotations have been created yet.</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Create New Quotation
                </button>
            </div>
        </div>
    );
};

export default QuotationTab;
