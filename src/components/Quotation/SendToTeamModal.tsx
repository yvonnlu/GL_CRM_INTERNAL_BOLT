import React, { useState } from 'react';
import { X, Send, Users, Mail, FileText, User } from 'lucide-react';

interface SendToTeamModalProps {
    quote: any;
    onClose: () => void;
}

const SendToTeamModal: React.FC<SendToTeamModalProps> = ({ quote, onClose }) => {
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
    const [emailSubject, setEmailSubject] = useState(`Quote Review Required: ${quote.name}`);
    const [emailMessage, setEmailMessage] = useState(`Hi team,

Please review the attached quote for ${quote.lead.name} at ${quote.lead.company}.

Quote Details:
- Quote Name: ${quote.name}
- Client: ${quote.lead.name} (${quote.lead.company})
- Total Value: $${quote.total?.toLocaleString() || '0'}

Please review and provide your feedback. If approved, we can proceed to send this to the client.

Best regards`);
    const [sendToClient, setSendToClient] = useState(false);
    const [clientMessage, setClientMessage] = useState(`Dear ${quote.lead.name},

Thank you for your interest in our services. Please find attached our detailed quote for your project.

We've carefully reviewed your requirements and put together a comprehensive proposal that we believe will meet your needs perfectly.

The quote includes:
- Detailed breakdown of all services
- Timeline and deliverables
- Terms and conditions

This quote is valid for 30 days. Please don't hesitate to reach out if you have any questions or would like to discuss any aspect of the proposal.

We look forward to the opportunity to work with you.

Best regards,
Your Company Team`);
    const [selectedSender, setSelectedSender] = useState('1');

    const teamMembers = [
        { id: '1', name: 'John Doe', email: 'john@company.com', role: 'Project Manager' },
        { id: '2', name: 'Jane Smith', email: 'jane@company.com', role: 'Sales Director' },
        { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'Technical Lead' },
        { id: '4', name: 'Sarah Wilson', email: 'sarah@company.com', role: 'Account Manager' },
    ];

    const handleTeamMemberToggle = (memberId: string) => {
        setSelectedTeamMembers(prev =>
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const handleSend = () => {
        // Here you would implement the actual email sending logic
        console.log('Sending to team members:', selectedTeamMembers);
        console.log('Send to client:', sendToClient);
        console.log('Email subject:', emailSubject);
        console.log('Team message:', emailMessage);
        console.log('Selected sender:', selectedSender);
        if (sendToClient) {
            console.log('Client message:', clientMessage);
        }

        // Show success message and close modal
        alert('Quote sent successfully!');
        onClose();
    };

    const getSenderInfo = () => {
        return teamMembers.find(member => member.id === selectedSender);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Users className="w-6 h-6 mr-2" />
                            Send Quote for Review
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Quote Summary */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quote Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Quote Name</p>
                                <p className="font-medium">{quote.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Client</p>
                                <p className="font-medium">{quote.lead.name}</p>
                                <p className="text-sm text-gray-500">{quote.lead.company}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Value</p>
                                <p className="font-medium text-green-600">
                                    ${quote.total?.toLocaleString() || '0'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Team Members Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Select Team Members
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {teamMembers.map(member => (
                                <label
                                    key={member.id}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedTeamMembers.includes(member.id)}
                                        onChange={() => handleTeamMemberToggle(member.id)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{member.name}</p>
                                        <p className="text-sm text-gray-600">{member.role}</p>
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sender Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Sender</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                    Send email as:
                                </span>
                            </div>
                            <select
                                value={selectedSender}
                                onChange={e => setSelectedSender(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {teamMembers.map(member => (
                                    <option key={member.id} value={member.id}>
                                        {member.name} ({member.role}) - {member.email}
                                    </option>
                                ))}
                            </select>
                            {getSenderInfo() && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">
                                            Email will be sent from:
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-700 mt-1">
                                        {getSenderInfo()?.name} ({getSenderInfo()?.email})
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Email Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Subject
                        </label>
                        <input
                            type="text"
                            value={emailSubject}
                            onChange={e => setEmailSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Team Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message to Team
                        </label>
                        <textarea
                            value={emailMessage}
                            onChange={e => setEmailMessage(e.target.value)}
                            rows={8}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Send to Client Option */}
                    <div className="border-t border-gray-200 pt-6">
                        <label className="flex items-center space-x-3 mb-4">
                            <input
                                type="checkbox"
                                checked={sendToClient}
                                onChange={e => setSendToClient(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">
                                Also send directly to client
                            </span>
                        </label>

                        {sendToClient && (
                            <div className="space-y-4 pl-7">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-2">
                                        <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">
                                                Client Email Details
                                            </p>
                                            <p className="text-sm text-blue-700">
                                                To: {quote.lead.email}
                                            </p>
                                            <p className="text-sm text-blue-700">
                                                Subject: Quote for {quote.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message to Client
                                    </label>
                                    <textarea
                                        value={clientMessage}
                                        onChange={e => setClientMessage(e.target.value)}
                                        rows={10}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Attachments Info */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                            <FileText className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-yellow-900">Attachments</p>
                                <p className="text-sm text-yellow-700">
                                    The following will be attached to the email:
                                </p>
                                <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                                    <li>Quote PDF ({quote.name})</li>
                                    <li>Company brochure</li>
                                    <li>Terms and conditions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                    <div className="flex items-center justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={selectedTeamMembers.length === 0}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Send {sendToClient ? 'to Team & Client' : 'to Team'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendToTeamModal;
