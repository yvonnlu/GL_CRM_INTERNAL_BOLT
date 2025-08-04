import React from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
    Lead,
    SalesStage,
    LeadPriority,
    CustomerPotential,
    formatCurrency,
} from '../../../utils/loadLeadsData';

interface LeadRowProps {
    lead: Lead;
    openDropdownId: string | null;
    toggleDropdown: (id: string) => void;
    handleEdit: (lead: Lead) => void;
    handleDelete: (lead: Lead) => void;
}

const LeadRow: React.FC<LeadRowProps> = ({
    lead,
    openDropdownId,
    toggleDropdown,
    handleEdit,
    handleDelete,
}) => {
    // Format date
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Get sales stage styles
    const getSalesStageStyle = (status: SalesStage) => {
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

    // Get priority status styles
    const getPriorityStatusStyle = (priority: LeadPriority) => {
        switch (priority) {
            case 'Urgent':
                return 'bg-red-100 text-red-800';
            case 'Normal':
                return 'bg-green-100 text-green-800';
            case 'Low':
                return 'bg-gray-100 text-gray-600';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get customer potential styles
    const getCustomerPotentialStyle = (status: CustomerPotential) => {
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

    // Get the latest note content and the original content (for tooltip)
    const getLatestNote = () => {
        // Basic check for lead.notes
        if (!lead.notes || !Array.isArray(lead.notes) || lead.notes.length === 0) {
            return { content: 'No notes', originalContent: '', truncated: false };
        }

        try {
            // Sort notes by date (newest first) and get the first one
            const sortedNotes = [...lead.notes].sort((a, b) => {
                // Make sure a and b have createdAt properties that are valid dates
                if (!a.createdAt || !b.createdAt) {
                    return 0;
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            // Check if sortedNotes[0] exists and has content
            if (!sortedNotes[0] || typeof sortedNotes[0].content !== 'string') {
                return { content: 'No notes content', originalContent: '', truncated: false };
            }

            const originalContent = sortedNotes[0].content;
            const truncated = originalContent.length > 100;
            const content = truncated ? truncateText(originalContent, 100) : originalContent;

            return { content, originalContent, truncated };
        } catch (error) {
            console.error('Error processing notes:', error);
            return { content: 'Error displaying note', originalContent: '', truncated: false };
        }
    };

    // Truncate text with ellipsis if it exceeds max length
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };
    return (
        <tr key={lead.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div>
                    <div className="font-medium text-gray-900 md:text-base">{lead.fullName}</div>
                    <div className="text-sm md:text-base text-gray-500">{lead.companyName}</div>
                    <div className="text-xs md:text-sm text-gray-400">{lead.email}</div>
                    <div className="text-xs text-gray-400">{lead.phone}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSalesStageStyle(lead.salesStage)}`}
                >
                    {lead.salesStage}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStatusStyle(lead.priority)}`}
                >
                    {lead.priority}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCustomerPotentialStyle(lead.customerPotential)}`}
                >
                    {lead.customerPotential}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCurrency(lead.estimatedValue)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                {formatDate(lead.created)}
            </td>
            <td className="px-6 py-4 text-sm md:text-base text-gray-500">
                <div className="whitespace-normal break-words max-w-md">
                    {lead.notes && Array.isArray(lead.notes) && lead.notes.length > 0 ? (
                        <div
                            title={getLatestNote().truncated ? getLatestNote().originalContent : ''}
                        >
                            {getLatestNote().content}
                        </div>
                    ) : (
                        'No notes'
                    )}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <div className="relative">
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={e => {
                            e.stopPropagation();
                            toggleDropdown(lead.id);
                        }}
                    >
                        <MoreHorizontal className="h-5 w-5 md:h-6 md:w-6" />
                    </button>

                    {openDropdownId === lead.id && (
                        <div className="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                                <button
                                    className="flex items-center px-4 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleEdit(lead);
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </button>
                                <button
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleDelete(lead);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default LeadRow;
