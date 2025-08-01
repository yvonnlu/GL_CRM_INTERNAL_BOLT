import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Phone,
    Mail,
    User,
    Clock,
    Send,
    Paperclip,
    MoreVertical,
    Quote,
    Star,
    Tag,
    UserPlus,
    FileText,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import QuotationGenerator from '../Quotation/QuotationGenerator';

interface ChatwootMessage {
    id: string;
    content: string;
    messageType: 'incoming' | 'outgoing';
    createdAt: string;
    sender: {
        name: string;
        email?: string;
        avatar?: string;
    };
    attachments?: Array<{
        id: string;
        fileName: string;
        fileType: string;
        fileUrl: string;
    }>;
}

interface ChatwootConversation {
    id: string;
    contactId: string;
    inboxId: string;
    status: 'open' | 'resolved' | 'pending';
    assigneeId?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    labels: string[];
    customAttributes: Record<string, any>;
    messages: ChatwootMessage[];
    contact: {
        id: string;
        name: string;
        email?: string;
        phoneNumber?: string;
        company?: string;
        avatar?: string;
        customAttributes: Record<string, any>;
    };
    inbox: {
        id: string;
        name: string;
        channelType: 'web_widget' | 'whatsapp' | 'facebook' | 'instagram' | 'email' | 'sms';
    };
    lastActivityAt: string;
    isQuoteRequest?: boolean;
    leadScore?: number;
    dealStage?: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
}

const ChatwootIntegration: React.FC = () => {
    const [conversations, setConversations] = useState<ChatwootConversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<ChatwootConversation | null>(
        null
    );
    const [newMessage, setNewMessage] = useState('');
    const [showQuotationGenerator, setShowQuotationGenerator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'pending' | 'resolved'>(
        'all'
    );
    const [filterPriority, setFilterPriority] = useState<
        'all' | 'low' | 'medium' | 'high' | 'urgent'
    >('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - In real implementation, this would come from Chatwoot API
    useEffect(() => {
        const mockConversations: ChatwootConversation[] = [
            {
                id: '1',
                contactId: 'contact-1',
                inboxId: 'inbox-1',
                status: 'open',
                assigneeId: 'agent-1',
                priority: 'high',
                labels: ['quote-request', 'new-client'],
                customAttributes: {},
                lastActivityAt: '2024-02-10T14:30:00Z',
                isQuoteRequest: true,
                leadScore: 85,
                dealStage: 'qualified',
                contact: {
                    id: 'contact-1',
                    name: 'Jennifer Walsh',
                    email: 'jennifer@techcorp.com',
                    phoneNumber: '+1-555-123-4567',
                    company: 'TechCorp Inc.',
                    customAttributes: {
                        leadSource: 'website',
                        industry: 'Technology',
                        budget: '$50,000',
                        timeline: '3 months',
                    },
                },
                inbox: {
                    id: 'inbox-1',
                    name: 'Website Chat',
                    channelType: 'web_widget',
                },
                messages: [
                    {
                        id: 'msg-1',
                        content:
                            "Hi, I'm interested in your digital marketing services. Can you provide a quote for SEO and social media management for our tech company?",
                        messageType: 'incoming',
                        createdAt: '2024-02-10T14:30:00Z',
                        sender: {
                            name: 'Jennifer Walsh',
                            email: 'jennifer@techcorp.com',
                        },
                    },
                    {
                        id: 'msg-2',
                        content:
                            "Hello Jennifer! Thank you for your interest. I'd be happy to help you with a customized quote. Let me gather some information about your requirements.",
                        messageType: 'outgoing',
                        createdAt: '2024-02-10T14:32:00Z',
                        sender: {
                            name: 'Sarah Johnson',
                            email: 'sarah@agency.com',
                        },
                    },
                    {
                        id: 'msg-3',
                        content:
                            "We're a tech company with about 50 employees. We need to improve our online presence and generate more leads. Our budget is around $50,000 for the first 6 months.",
                        messageType: 'incoming',
                        createdAt: '2024-02-10T14:35:00Z',
                        sender: {
                            name: 'Jennifer Walsh',
                            email: 'jennifer@techcorp.com',
                        },
                    },
                ],
            },
            {
                id: '2',
                contactId: 'contact-2',
                inboxId: 'inbox-2',
                status: 'open',
                assigneeId: 'agent-2',
                priority: 'medium',
                labels: ['existing-client', 'support'],
                customAttributes: {},
                lastActivityAt: '2024-02-10T13:15:00Z',
                leadScore: 72,
                dealStage: 'proposal',
                contact: {
                    id: 'contact-2',
                    name: 'Michael Chen',
                    email: 'michael@startupxyz.com',
                    phoneNumber: '+1-555-987-6543',
                    company: 'StartupXYZ',
                    customAttributes: {
                        leadSource: 'referral',
                        industry: 'Startup',
                        budget: '$30,000',
                        timeline: '2 months',
                    },
                },
                inbox: {
                    id: 'inbox-2',
                    name: 'WhatsApp Business',
                    channelType: 'whatsapp',
                },
                messages: [
                    {
                        id: 'msg-4',
                        content:
                            "Hi! Can we schedule a call to discuss the campaign performance? Also, I'd like to get a quote for expanding our social media presence.",
                        messageType: 'incoming',
                        createdAt: '2024-02-10T13:15:00Z',
                        sender: {
                            name: 'Michael Chen',
                            email: 'michael@startupxyz.com',
                        },
                    },
                ],
            },
            {
                id: '3',
                contactId: 'contact-3',
                inboxId: 'inbox-3',
                status: 'pending',
                assigneeId: 'agent-1',
                priority: 'urgent',
                labels: ['quote-request', 'enterprise'],
                customAttributes: {},
                lastActivityAt: '2024-02-10T12:00:00Z',
                isQuoteRequest: true,
                leadScore: 95,
                dealStage: 'new',
                contact: {
                    id: 'contact-3',
                    name: 'Sarah Martinez',
                    email: 'sarah@enterprise.com',
                    phoneNumber: '+1-555-456-7890',
                    company: 'Enterprise Solutions Ltd.',
                    customAttributes: {
                        leadSource: 'linkedin',
                        industry: 'Enterprise',
                        budget: '$100,000+',
                        timeline: '6 months',
                    },
                },
                inbox: {
                    id: 'inbox-3',
                    name: 'Facebook Messenger',
                    channelType: 'facebook',
                },
                messages: [
                    {
                        id: 'msg-5',
                        content:
                            'We need a comprehensive digital marketing strategy for our enterprise. Can you provide a detailed quote for SEO, PPC, content marketing, and social media management?',
                        messageType: 'incoming',
                        createdAt: '2024-02-10T12:00:00Z',
                        sender: {
                            name: 'Sarah Martinez',
                            email: 'sarah@enterprise.com',
                        },
                    },
                ],
            },
        ];

        setTimeout(() => {
            setConversations(mockConversations);
            setLoading(false);
        }, 1000);
    }, []);

    const getChannelIcon = (channelType: string) => {
        switch (channelType) {
            case 'whatsapp':
                return '💬';
            case 'facebook':
                return '📘';
            case 'instagram':
                return '📷';
            case 'email':
                return '📧';
            case 'web_widget':
                return '🌐';
            case 'sms':
                return '📱';
            default:
                return '💬';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'resolved':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'text-red-600 bg-red-50';
            case 'high':
                return 'text-orange-600 bg-orange-50';
            case 'medium':
                return 'text-yellow-600 bg-yellow-50';
            case 'low':
                return 'text-green-600 bg-green-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getDealStageColor = (stage: string) => {
        switch (stage) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'qualified':
                return 'bg-green-100 text-green-800';
            case 'proposal':
                return 'bg-yellow-100 text-yellow-800';
            case 'negotiation':
                return 'bg-orange-100 text-orange-800';
            case 'closed-won':
                return 'bg-purple-100 text-purple-800';
            case 'closed-lost':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        const message: ChatwootMessage = {
            id: `msg-${Date.now()}`,
            content: newMessage,
            messageType: 'outgoing',
            createdAt: new Date().toISOString(),
            sender: {
                name: 'Sarah Johnson',
                email: 'sarah@agency.com',
            },
        };

        setConversations(prev =>
            prev.map(conv =>
                conv.id === selectedConversation.id
                    ? {
                          ...conv,
                          messages: [...conv.messages, message],
                          lastActivityAt: new Date().toISOString(),
                      }
                    : conv
            )
        );

        setSelectedConversation(prev =>
            prev
                ? {
                      ...prev,
                      messages: [...prev.messages, message],
                      lastActivityAt: new Date().toISOString(),
                  }
                : null
        );

        setNewMessage('');
    };

    const updateConversationStatus = (
        conversationId: string,
        status: 'open' | 'resolved' | 'pending'
    ) => {
        setConversations(prev =>
            prev.map(conv => (conv.id === conversationId ? { ...conv, status } : conv))
        );

        if (selectedConversation?.id === conversationId) {
            setSelectedConversation(prev => (prev ? { ...prev, status } : null));
        }
    };

    const updateDealStage = (
        conversationId: string,
        stage: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
    ) => {
        setConversations(prev =>
            prev.map(conv => (conv.id === conversationId ? { ...conv, dealStage: stage } : conv))
        );

        if (selectedConversation?.id === conversationId) {
            setSelectedConversation(prev => (prev ? { ...prev, dealStage: stage } : null));
        }
    };

    const markAsQuoteRequest = (conversationId: string) => {
        setConversations(prev =>
            prev.map(conv =>
                conv.id === conversationId
                    ? {
                          ...conv,
                          isQuoteRequest: true,
                          labels: [
                              ...conv.labels.filter(l => l !== 'quote-request'),
                              'quote-request',
                          ],
                          dealStage: 'qualified',
                      }
                    : conv
            )
        );

        if (selectedConversation?.id === conversationId) {
            setSelectedConversation(prev =>
                prev
                    ? {
                          ...prev,
                          isQuoteRequest: true,
                          labels: [
                              ...prev.labels.filter(l => l !== 'quote-request'),
                              'quote-request',
                          ],
                          dealStage: 'qualified',
                      }
                    : null
            );
        }
    };

    const assignConversation = (conversationId: string, assigneeId: string) => {
        setConversations(prev =>
            prev.map(conv => (conv.id === conversationId ? { ...conv, assigneeId } : conv))
        );
    };

    const addLabel = (conversationId: string, label: string) => {
        setConversations(prev =>
            prev.map(conv =>
                conv.id === conversationId
                    ? { ...conv, labels: [...conv.labels.filter(l => l !== label), label] }
                    : conv
            )
        );
    };

    const removeLabel = (conversationId: string, label: string) => {
        setConversations(prev =>
            prev.map(conv =>
                conv.id === conversationId
                    ? { ...conv, labels: conv.labels.filter(l => l !== label) }
                    : conv
            )
        );
    };

    const filteredConversations = conversations.filter(conv => {
        const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || conv.priority === filterPriority;
        const matchesSearch =
            searchTerm === '' ||
            conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesStatus && matchesPriority && matchesSearch;
    });

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading conversations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Communication Center</h2>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <select
                        value={filterPriority}
                        onChange={e => setFilterPriority(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Priority</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Conversations</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {conversations.length}
                                </p>
                            </div>
                            <MessageSquare className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Quote Requests</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {conversations.filter(c => c.isQuoteRequest).length}
                                </p>
                            </div>
                            <Quote className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Open Conversations</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {conversations.filter(c => c.status === 'open').length}
                                </p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">High Priority</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        conversations.filter(
                                            c => c.priority === 'high' || c.priority === 'urgent'
                                        ).length
                                    }
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-red-500" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
                {/* Conversations List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">
                            Conversations ({filteredConversations.length})
                        </h3>
                    </div>

                    <div className="overflow-y-auto h-full">
                        {filteredConversations.map(conversation => (
                            <div
                                key={conversation.id}
                                onClick={() => setSelectedConversation(conversation)}
                                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                                    selectedConversation?.id === conversation.id
                                        ? 'bg-blue-50 border-l-4 border-l-blue-600'
                                        : ''
                                }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                                            {conversation.contact.name
                                                .split(' ')
                                                .map(n => n[0])
                                                .join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {conversation.contact.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {conversation.contact.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-lg">
                                            {getChannelIcon(conversation.inbox.channelType)}
                                        </span>
                                        {conversation.isQuoteRequest && (
                                            <Quote className="w-4 h-4 text-green-600" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}
                                        >
                                            {conversation.status}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}
                                        >
                                            {conversation.priority}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(conversation.lastActivityAt).toLocaleTimeString()}
                                    </span>
                                </div>

                                {conversation.dealStage && (
                                    <div className="mb-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDealStageColor(conversation.dealStage)}`}
                                        >
                                            {conversation.dealStage.replace('-', ' ')}
                                        </span>
                                    </div>
                                )}

                                {conversation.leadScore && (
                                    <div className="mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-500">
                                                Lead Score:
                                            </span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${conversation.leadScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-900">
                                                {conversation.leadScore}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <p className="text-sm text-gray-600 truncate">
                                    {
                                        conversation.messages[conversation.messages.length - 1]
                                            ?.content
                                    }
                                </p>

                                {conversation.labels.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {conversation.labels.map((label, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                            {selectedConversation.contact.name
                                                .split(' ')
                                                .map(n => n[0])
                                                .join('')}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {selectedConversation.contact.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {selectedConversation.contact.company}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-500">
                                                    {selectedConversation.contact.email}
                                                </span>
                                                {selectedConversation.contact.phoneNumber && (
                                                    <>
                                                        <span className="text-xs text-gray-400">
                                                            •
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {
                                                                selectedConversation.contact
                                                                    .phoneNumber
                                                            }
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {!selectedConversation.isQuoteRequest && (
                                            <button
                                                onClick={() =>
                                                    markAsQuoteRequest(selectedConversation.id)
                                                }
                                                className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition-colors flex items-center text-sm"
                                            >
                                                <Quote className="w-4 h-4 mr-1" />
                                                Mark as Quote Request
                                            </button>
                                        )}

                                        {selectedConversation.isQuoteRequest && (
                                            <button
                                                onClick={() => setShowQuotationGenerator(true)}
                                                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                                            >
                                                <FileText className="w-4 h-4 mr-1" />
                                                Generate Quote
                                            </button>
                                        )}

                                        <select
                                            value={selectedConversation.status}
                                            onChange={e =>
                                                updateConversationStatus(
                                                    selectedConversation.id,
                                                    e.target.value as any
                                                )
                                            }
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="open">Open</option>
                                            <option value="pending">Pending</option>
                                            <option value="resolved">Resolved</option>
                                        </select>

                                        <select
                                            value={selectedConversation.dealStage || 'new'}
                                            onChange={e =>
                                                updateDealStage(
                                                    selectedConversation.id,
                                                    e.target.value as any
                                                )
                                            }
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="new">New Lead</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="proposal">Proposal</option>
                                            <option value="negotiation">Negotiation</option>
                                            <option value="closed-won">Closed Won</option>
                                            <option value="closed-lost">Closed Lost</option>
                                        </select>

                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Lead Source:</span>
                                            <span className="ml-2 font-medium">
                                                {
                                                    selectedConversation.contact.customAttributes
                                                        .leadSource
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Industry:</span>
                                            <span className="ml-2 font-medium">
                                                {
                                                    selectedConversation.contact.customAttributes
                                                        .industry
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Budget:</span>
                                            <span className="ml-2 font-medium">
                                                {
                                                    selectedConversation.contact.customAttributes
                                                        .budget
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Timeline:</span>
                                            <span className="ml-2 font-medium">
                                                {
                                                    selectedConversation.contact.customAttributes
                                                        .timeline
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {selectedConversation.messages.map(message => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.messageType === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                message.messageType === 'outgoing'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-900'
                                            }`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs opacity-75">
                                                    {message.sender.name}
                                                </span>
                                                <span className="text-xs opacity-75">
                                                    {new Date(
                                                        message.createdAt
                                                    ).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type your message..."
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!newMessage.trim()}
                                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">
                                    Select a conversation to start chatting
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quotation Generator Modal */}
            <QuotationGenerator
                isOpen={showQuotationGenerator}
                onClose={() => setShowQuotationGenerator(false)}
                clientData={selectedConversation?.contact}
                conversationId={selectedConversation?.id}
            />
        </div>
    );
};

export default ChatwootIntegration;
