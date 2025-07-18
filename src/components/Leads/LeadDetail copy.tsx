// import React, { useState } from 'react';
// import { ArrowLeft, User, Mail, Phone, Building, Calendar, DollarSign, Star, MoreVertical, Plus, FileText, MessageSquare, Phone as PhoneIcon, Edit3, Target, Clock, TrendingUp, Calculator } from 'lucide-react';
// // import MultiServiceQuotation from './MultiServiceQuotation';

// interface LeadDetailProps {
//   leadId: string;
//   onBack: () => void;
// }

// const LeadDetail: React.FC<LeadDetailProps> = ({ leadId, onBack }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   // Mock lead data - in real app, this would come from props or API
//   const lead = {
//     id: leadId,
//     name: 'Jennifer Walsh',
//     company: 'TechCorp Inc.',
//     email: 'jennifer@techcorp.com',
//     phone: '+1 (555) 123-4567',
//     status: 'new',
//     score: 85,
//     lastContact: '2 hours ago',
//     source: 'inbound-livechat',
//     estimatedValue: '$45,000',
//     avatar: 'JW',
//     createdAt: '2024-02-10T14:30:00Z',
//     leadType: 'hot',
//     industry: 'Technology',
//     notes: 'Interested in comprehensive digital marketing package',
//     nextAction: 'Schedule discovery call',
//     priority: 'high',
//     address: '123 Tech Street, Silicon Valley, CA 94000',
//     website: 'https://techcorp.com',
//     employees: '50-200',
//     revenue: '$5M - $10M',
//     businessHours: 'Mon-Fri 9AM-6PM PST',
//     timezone: 'Pacific Time',
//     contactHistory: [
//       {
//         id: 1,
//         date: '2024-02-10T14:30:00Z',
//         type: 'inbound',
//         channel: 'livechat',
//         subject: 'Initial inquiry about digital marketing services',
//         summary: 'Customer interested in comprehensive digital marketing package including SEO, content marketing, and paid advertising. Budget range: $40,000-$50,000.',
//         status: 'completed'
//       },
//       {
//         id: 2,
//         date: '2024-02-09T10:15:00Z',
//         type: 'outbound',
//         channel: 'email',
//         subject: 'Follow-up on live chat conversation',
//         summary: 'Sent detailed service brochure and case studies. Scheduled discovery call for next week.',
//         status: 'sent'
//       }
//     ],
//     activities: [
//       {
//         id: 1,
//         type: 'note',
//         date: '2024-02-10T15:00:00Z',
//         title: 'Discovery Call Scheduled',
//         description: 'Scheduled discovery call for Feb 15th at 2:00 PM PST. Customer wants to discuss SEO and content marketing specifically.',
//         createdBy: 'John Doe'
//       },
//       {
//         id: 2,
//         type: 'email',
//         date: '2024-02-10T14:45:00Z',
//         title: 'Welcome Email Sent',
//         description: 'Sent welcome email with company overview and next steps.',
//         createdBy: 'Auto System'
//       }
//     ]
//   };

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: User },
//     { id: 'quotation', label: 'Quotation', icon: Calculator },
//     { id: 'activity', label: 'Activity', icon: Clock },
//     { id: 'notes', label: 'Notes', icon: FileText },
//     { id: 'proposals', label: 'Proposals', icon: Target }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'new': return 'bg-blue-100 text-blue-800';
//       case 'qualified': return 'bg-green-100 text-green-800';
//       case 'contacted': return 'bg-yellow-100 text-yellow-800';
//       case 'nurturing': return 'bg-purple-100 text-purple-800';
//       case 'proposal': return 'bg-orange-100 text-orange-800';
//       case 'lost': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getLeadTypeColor = (type: string) => {
//     switch (type) {
//       case 'hot': return 'bg-red-100 text-red-800';
//       case 'warm': return 'bg-yellow-100 text-yellow-800';
//       case 'cold': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getScoreColor = (score: number) => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const renderOverview = () => (
//     <div className="space-y-6">
//       {/* Lead Information */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex items-center space-x-3">
//             <Mail className="w-5 h-5 text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-600">Email</p>
//               <p className="font-medium">{lead.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Phone className="w-5 h-5 text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-600">Phone</p>
//               <p className="font-medium">{lead.phone}</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Building className="w-5 h-5 text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-600">Company</p>
//               <p className="font-medium">{lead.company}</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Target className="w-5 h-5 text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-600">Industry</p>
//               <p className="font-medium">{lead.industry}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Lead Status */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
//               {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
//             </div>
//             <p className="text-xs text-gray-600 mt-1">Status</p>
//           </div>
//           <div className="text-center">
//             <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getLeadTypeColor(lead.leadType)}`}>
//               {lead.leadType.charAt(0).toUpperCase() + lead.leadType.slice(1)}
//             </div>
//             <p className="text-xs text-gray-600 mt-1">Lead Type</p>
//           </div>
//           <div className="text-center">
//             <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
//               {lead.score}
//             </div>
//             <p className="text-xs text-gray-600 mt-1">Score</p>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600">
//               {lead.estimatedValue}
//             </div>
//             <p className="text-xs text-gray-600 mt-1">Est. Value</p>
//           </div>
//         </div>
//       </div>

//       {/* Company Details */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-600">Website</p>
//             <p className="font-medium text-blue-600">{lead.website}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Employees</p>
//             <p className="font-medium">{lead.employees}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Revenue</p>
//             <p className="font-medium">{lead.revenue}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Business Hours</p>
//             <p className="font-medium">{lead.businessHours}</p>
//           </div>
//           <div className="md:col-span-2">
//             <p className="text-sm text-gray-600">Address</p>
//             <p className="font-medium">{lead.address}</p>
//           </div>
//         </div>
//       </div>

//       {/* Notes */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
//         <p className="text-gray-700">{lead.notes}</p>
//         <div className="mt-4">
//           <p className="text-sm text-gray-600">Next Action: <span className="font-medium text-gray-900">{lead.nextAction}</span></p>
//         </div>
//       </div>
//     </div>
//   );

//   const renderActivity = () => (
//     <div className="space-y-6">
//       {/* Contact History */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact History</h3>
//         <div className="space-y-4">
//           {lead.contactHistory.map((contact) => (
//             <div key={contact.id} className="border-l-4 border-blue-500 pl-4 py-2">
//               <div className="flex items-center justify-between">
//                 <h4 className="font-medium text-gray-900">{contact.subject}</h4>
//                 <span className="text-sm text-gray-500">
//                   {new Date(contact.date).toLocaleDateString()}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">{contact.summary}</p>
//               <div className="flex items-center space-x-2 mt-2">
//                 <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                   {contact.type}
//                 </span>
//                 <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
//                   {contact.channel}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Activities */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
//         <div className="space-y-4">
//           {lead.activities.map((activity) => (
//             <div key={activity.id} className="flex items-start space-x-3">
//               <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//               <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-medium text-gray-900">{activity.title}</h4>
//                   <span className="text-sm text-gray-500">
//                     {new Date(activity.date).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
//                 <p className="text-xs text-gray-500 mt-1">By {activity.createdBy}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderNotes = () => (
//     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
//           <Plus className="w-4 h-4 mr-2" />
//           Add Note
//         </button>
//       </div>
//       <div className="space-y-4">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-yellow-800">{lead.notes}</p>
//               <p className="text-xs text-yellow-600 mt-2">Added on {new Date(lead.createdAt).toLocaleDateString()}</p>
//             </div>
//             <button className="text-yellow-600 hover:text-yellow-800">
//               <Edit3 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderProposals = () => (
//     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Proposals</h3>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
//           <Plus className="w-4 h-4 mr-2" />
//           Create Proposal
//         </button>
//       </div>
//       <div className="text-center py-8">
//         <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//         <p className="text-gray-600">No proposals created yet</p>
//         <p className="text-sm text-gray-500 mt-1">Create your first proposal to get started</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={onBack}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-600" />
//             </button>
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
//                 {lead.avatar}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
//                 <p className="text-gray-600">{lead.company}</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <Star className="w-5 h-5 text-gray-600" />
//             </button>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
//               <Mail className="w-4 h-4 mr-2" />
//               Send Email
//             </button>
//             <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
//               <PhoneIcon className="w-4 h-4 mr-2" />
//               Call
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <MoreVertical className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex border-b border-gray-200">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div>
//           {activeTab === 'overview' && renderOverview()}
//           {/* {activeTab === 'quotation' && <MultiServiceQuotation lead={lead} />} */}
//           {activeTab === 'activity' && renderActivity()}
//           {activeTab === 'notes' && renderNotes()}
//           {activeTab === 'proposals' && renderProposals()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadDetail;

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Building, Calendar, DollarSign, Star, MoreVertical, Plus, FileText, MessageSquare, Phone as PhoneIcon, Edit3, Target, Clock, TrendingUp, Calculator } from 'lucide-react';
import QuotationTab from './QuotationTab';

interface LeadDetailProps {
  leadId: string;
  onBack: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ leadId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock lead data - in real app, this would come from props or API
  const lead = {
    id: leadId,
    name: 'Jennifer Walsh',
    company: 'TechCorp Inc.',
    email: 'jennifer@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'new',
    score: 85,
    lastContact: '2 hours ago',
    source: 'inbound-livechat',
    estimatedValue: '$45,000',
    avatar: 'JW',
    createdAt: '2024-02-10T14:30:00Z',
    leadType: 'hot',
    industry: 'Technology',
    notes: 'Interested in comprehensive digital marketing package',
    nextAction: 'Schedule discovery call',
    priority: 'high',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    website: 'https://techcorp.com',
    employees: '50-200',
    revenue: '$5M - $10M',
    businessHours: 'Mon-Fri 9AM-6PM PST',
    timezone: 'Pacific Time',
    contactHistory: [
      {
        id: 1,
        date: '2024-02-10T14:30:00Z',
        type: 'inbound',
        channel: 'livechat',
        subject: 'Initial inquiry about digital marketing services',
        summary: 'Customer interested in comprehensive digital marketing package including SEO, content marketing, and paid advertising. Budget range: $40,000-$50,000.',
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-02-09T10:15:00Z',
        type: 'outbound',
        channel: 'email',
        subject: 'Follow-up on live chat conversation',
        summary: 'Sent detailed service brochure and case studies. Scheduled discovery call for next week.',
        status: 'sent'
      }
    ],
    activities: [
      {
        id: 1,
        type: 'note',
        date: '2024-02-10T15:00:00Z',
        title: 'Discovery Call Scheduled',
        description: 'Scheduled discovery call for Feb 15th at 2:00 PM PST. Customer wants to discuss SEO and content marketing specifically.',
        createdBy: 'John Doe'
      },
      {
        id: 2,
        type: 'email',
        date: '2024-02-10T14:45:00Z',
        title: 'Welcome Email Sent',
        description: 'Sent welcome email with company overview and next steps.',
        createdBy: 'Auto System'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'quotation', label: 'Quotation', icon: Calculator },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'proposals', label: 'Proposals', icon: Target }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'nurturing': return 'bg-purple-100 text-purple-800';
      case 'proposal': return 'bg-orange-100 text-orange-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadTypeColor = (type: string) => {
    switch (type) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Lead Information */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{lead.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{lead.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-medium">{lead.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Industry</p>
              <p className="font-medium">{lead.industry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Status */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Status</p>
          </div>
          <div className="text-center">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getLeadTypeColor(lead.leadType)}`}>
              {lead.leadType.charAt(0).toUpperCase() + lead.leadType.slice(1)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Lead Type</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
              {lead.score}
            </div>
            <p className="text-xs text-gray-600 mt-1">Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {lead.estimatedValue}
            </div>
            <p className="text-xs text-gray-600 mt-1">Est. Value</p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Website</p>
            <p className="font-medium text-blue-600">{lead.website}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Employees</p>
            <p className="font-medium">{lead.employees}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="font-medium">{lead.revenue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Business Hours</p>
            <p className="font-medium">{lead.businessHours}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium">{lead.address}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
        <p className="text-gray-700">{lead.notes}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Next Action: <span className="font-medium text-gray-900">{lead.nextAction}</span></p>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      {/* Contact History */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact History</h3>
        <div className="space-y-4">
          {lead.contactHistory.map((contact) => (
            <div key={contact.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{contact.subject}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(contact.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{contact.summary}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {contact.type}
                </span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {contact.channel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {lead.activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">By {activity.createdBy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-yellow-800">{lead.notes}</p>
              <p className="text-xs text-yellow-600 mt-2">Added on {new Date(lead.createdAt).toLocaleDateString()}</p>
            </div>
            <button className="text-yellow-600 hover:text-yellow-800">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProposals = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Proposals</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Proposal
        </button>
      </div>
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No proposals created yet</p>
        <p className="text-sm text-gray-500 mt-1">Create your first proposal to get started</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {lead.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
                <p className="text-gray-600">{lead.company}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Star className="w-5 h-5 text-gray-600" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2" />
              Call
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'quotation' && <QuotationTab lead={lead} />}
          {activeTab === 'activity' && renderActivity()}
          {activeTab === 'notes' && renderNotes()}
          {activeTab === 'proposals' && renderProposals()}
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;