import React from 'react';
import { Download } from 'lucide-react';

interface LeadsHeaderProps {
    onExportLeads: () => void;
}

const LeadsHeader: React.FC<LeadsHeaderProps> = ({ onExportLeads }) => {
    return (
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
                    <p className="text-gray-600">
                        Track and manage all your sales leads in one place
                    </p>
                </div>

                <button
                    onClick={onExportLeads}
                    className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export Leads
                </button>
            </div>
        </div>
    );
};

export default LeadsHeader;
