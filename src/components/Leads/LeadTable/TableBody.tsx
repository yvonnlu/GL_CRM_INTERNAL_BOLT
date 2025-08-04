import React from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Lead, formatCurrency } from '../../../utils/loadLeadsData';
import LeadRow from './LeadRow';

interface TableBodyProps {
    paginatedLeads: Lead[];
    openDropdownId: string | null;
    toggleDropdown: (id: string) => void;
    handleEdit: (lead: Lead) => void;
    handleDelete: (lead: Lead) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
    paginatedLeads,
    openDropdownId,
    toggleDropdown,
    handleEdit,
    handleDelete,
}) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLeads.length > 0 ? (
                paginatedLeads.map(lead => (
                    <LeadRow
                        key={lead.id}
                        lead={lead}
                        openDropdownId={openDropdownId}
                        toggleDropdown={toggleDropdown}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))
            ) : (
                <tr>
                    <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                        No leads found. Try adjusting your filters or add new leads.
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default TableBody;
