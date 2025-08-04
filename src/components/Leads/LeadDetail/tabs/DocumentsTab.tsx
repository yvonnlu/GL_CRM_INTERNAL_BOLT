import React, { useState } from 'react';
import { Lead } from '../../../../utils/loadLeadsData';
import { File, Upload, Download, Trash2, Search, Filter } from 'lucide-react';

interface DocumentsTabProps {
    lead: Lead;
}

interface Document {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    uploadedBy: string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ lead }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    // Mock documents data
    const mockDocuments: Document[] = [
        {
            id: '1',
            name: 'Requirements_Specification.pdf',
            type: 'PDF',
            size: '2.4 MB',
            uploadDate: '2025-07-15',
            uploadedBy: 'Sarah Johnson',
        },
        {
            id: '2',
            name: 'Project_Proposal.docx',
            type: 'DOCX',
            size: '1.8 MB',
            uploadDate: '2025-07-20',
            uploadedBy: 'Michael Chen',
        },
        {
            id: '3',
            name: 'Contract_Draft.pdf',
            type: 'PDF',
            size: '3.2 MB',
            uploadDate: '2025-07-22',
            uploadedBy: 'Sarah Johnson',
        },
        {
            id: '4',
            name: 'Meeting_Notes.txt',
            type: 'TXT',
            size: '45 KB',
            uploadDate: '2025-07-25',
            uploadedBy: 'David Miller',
        },
    ];

    // Filter documents based on search term and filter
    const filteredDocuments = mockDocuments.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || doc.type.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    // Get the file icon based on file type
    const getFileIcon = (type: string) => {
        return <File className="w-5 h-5" />;
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-48">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="pdf">PDF</option>
                            <option value="docx">DOCX</option>
                            <option value="xlsx">XLSX</option>
                            <option value="txt">TXT</option>
                        </select>
                    </div>
                </div>

                {/* Documents List */}
                {filteredDocuments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Size
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Uploaded
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Uploaded By
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDocuments.map(doc => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getFileIcon(doc.type)}
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {doc.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {doc.type}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {doc.size}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(doc.uploadDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {doc.uploadedBy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <File className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            No documents found
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm || filter !== 'all'
                                ? 'Try adjusting your search or filter'
                                : `Upload documents related to ${lead.companyName}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentsTab;
