import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Building, Calendar, DollarSign, Star, MoreVertical, Plus, FileText, MessageSquare, Phone as PhoneIcon, Edit3, Target, Clock, TrendingUp, Calculator } from 'lucide-react';
import QuotationTab from '../Quotation/QuotationTab';


interface LeadDetailProps {
  leadId: string;
  onBack: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ leadId, onBack }) => {
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
  const [activeTab, setActiveTab] = useState('overview');
  // --- BEGIN: Questionnaire State & Logic (copy from ClientDetail, adjust for lead) ---
  const [showNewQuestionnaire, setShowNewQuestionnaire] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const [generalInfo, setGeneralInfo] = useState({
    companyWebsite: lead.website || '',
    industry: lead.industry || '',
    companySize: '',
    currentChallenges: '',
    goals: '',
    budget: '',
    timeline: '',
    decisionMakers: '',
    previousExperience: '',
    competitors: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceAnswers, setServiceAnswers] = useState<Record<string, Record<string, any>>>({});

  // Mock questionnaire submissions (for lead)
  const questionnaireSubmissions = [
    {
      id: 'sub-1',
      submissionDate: '2024-02-10T10:00:00Z',
      services: ['seo-services', 'content-marketing'],
      generalInfo: {
        companyWebsite: lead.website,
        industry: lead.industry,
        companySize: '50-100 employees',
        currentChallenges: 'Low organic traffic, need better content strategy',
        goals: 'Increase organic traffic by 200% in 12 months',
        budget: '$15,000-$30,000/month',
        timeline: 'Immediately',
        decisionMakers: 'Jennifer Walsh (CMO), John Smith (CEO)',
        previousExperience: 'Worked with 2 agencies before, mixed results',
        competitors: 'CompetitorA, CompetitorB, CompetitorC'
      },
      serviceAnswers: {
        'seo-services': {
          current_website: lead.website,
          seo_goals: ['Increase organic traffic', 'Improve search rankings'],
          target_keywords: 'enterprise software, business solutions, tech consulting',
          geographic_target: 'United States, Canada',
          main_competitors: 'CompetitorA, CompetitorB'
        },
        'content-marketing': {
          website_project: lead.website,
          industry_field: lead.industry,
          content_services: ['Blog Writing', 'Social Media Content', 'Case Studies'],
          content_goals: 'Establish thought leadership and generate leads',
          target_audience: 'Enterprise decision makers, CTOs, IT managers'
        }
      },
      status: 'processed',
      submittedBy: lead.name,
      notes: 'Initial onboarding questionnaire - comprehensive SEO and content strategy needed',
      version: 1
    }
  ];

  // Service questionnaires & general questions (copy from ClientDetail)
  const serviceQuestionnaires = [
    {
      serviceId: 'content-marketing',
      serviceName: 'Content Marketing',
      questions: [
        { id: 'website_project', question: 'What is your company website or project?', type: 'text', required: true },
        { id: 'industry_field', question: 'What industry/field do you want content written for?', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Real Estate', 'Manufacturing', 'Other'], required: true },
        { id: 'content_services', question: 'Which content services are you interested in?', type: 'multiselect', options: ['Blog Writing', 'Social Media Content', 'Website Copy', 'Email Marketing', 'Video Scripts', 'Infographics', 'Case Studies', 'White Papers'], required: true },
        { id: 'content_goals', question: 'What are your goals for implementing a content strategy?', type: 'textarea', required: true },
        { id: 'target_audience', question: 'Who is your target audience?', type: 'textarea', required: true },
        { id: 'content_frequency', question: 'How often do you want to publish content?', type: 'select', options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'As needed'], required: true },
        { id: 'brand_voice', question: 'How would you describe your brand voice?', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Authoritative', 'Creative', 'Technical'], required: false }
      ]
    },
    {
      serviceId: 'seo-services',
      serviceName: 'SEO Services',
      questions: [
        { id: 'current_website', question: 'What is your current website URL?', type: 'text', required: true },
        { id: 'seo_goals', question: 'What are your main SEO goals?', type: 'multiselect', options: ['Increase organic traffic', 'Improve search rankings', 'Local SEO', 'E-commerce SEO', 'Technical SEO fixes', 'Content optimization'], required: true },
        { id: 'target_keywords', question: 'Do you have specific keywords you want to target?', type: 'textarea', required: false },
        { id: 'current_seo_efforts', question: 'What SEO efforts have you tried before?', type: 'textarea', required: false },
        { id: 'geographic_target', question: 'What geographic areas do you want to target?', type: 'text', required: true },
        { id: 'main_competitors', question: 'Who are your main competitors online?', type: 'textarea', required: false }
      ]
    },
    {
      serviceId: 'paid-advertising',
      serviceName: 'Paid Advertising',
      questions: [
        { id: 'advertising_platforms', question: 'Which advertising platforms are you interested in?', type: 'multiselect', options: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'YouTube Ads', 'TikTok Ads'], required: true },
        { id: 'advertising_goals', question: 'What are your advertising goals?', type: 'multiselect', options: ['Brand awareness', 'Lead generation', 'Sales/conversions', 'Website traffic', 'App downloads', 'Event promotion'], required: true },
        { id: 'monthly_budget', question: 'What is your monthly advertising budget?', type: 'select', options: ['Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'], required: true },
        { id: 'target_audience_ads', question: 'Describe your target audience for ads', type: 'textarea', required: true },
        { id: 'previous_ad_experience', question: 'Have you run paid ads before? What were the results?', type: 'textarea', required: false }
      ]
    }
  ];
  const generalQuestions = [
    { id: 'companyWebsite', label: 'Company Website', type: 'text', placeholder: 'https://yourcompany.com' },
    { id: 'industry', label: 'Industry/Business Field', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Real Estate', 'Manufacturing', 'Consulting', 'Other'] },
    { id: 'companySize', label: 'Company Size', type: 'select', options: ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees'] },
    { id: 'currentChallenges', label: 'What are your current marketing challenges?', type: 'textarea', placeholder: 'Describe your main challenges...' },
    { id: 'goals', label: 'What are your business goals for the next 12 months?', type: 'textarea', placeholder: 'Describe your goals...' },
    { id: 'budget', label: 'Marketing Budget Range', type: 'select', options: ['Under $5,000/month', '$5,000-$15,000/month', '$15,000-$30,000/month', '$30,000-$50,000/month', '$50,000+/month'] },
    { id: 'timeline', label: 'When do you want to start?', type: 'select', options: ['Immediately', 'Within 1 month', '1-3 months', '3-6 months', 'Just exploring'] },
    { id: 'decisionMakers', label: 'Who are the decision makers for this project?', type: 'text', placeholder: 'Names and roles...' },
    { id: 'previousExperience', label: 'Have you worked with marketing agencies before?', type: 'textarea', placeholder: 'Tell us about your experience...' },
    { id: 'competitors', label: 'Who are your main competitors?', type: 'textarea', placeholder: 'List your main competitors...' }
  ];

  const updateGeneralInfo = (field: string, value: string) => {
    setGeneralInfo(prev => ({ ...prev, [field]: value }));
  };
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  const updateServiceAnswer = (serviceId: string, questionId: string, value: any) => {
    setServiceAnswers(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [questionId]: value
      }
    }));
  };
  const sendToTeam = () => {
    const data = {
      lead,
      generalInfo,
      selectedServices,
      serviceAnswers,
      timestamp: new Date().toISOString(),
      submissionType: 'service_expansion'
    };
    console.log('Sending lead questionnaire to team:', data);
    const serviceNames = selectedServices.map(id =>
      serviceQuestionnaires.find(s => s.serviceId === id)?.serviceName
    ).join(', ');
    alert(`Lead questionnaire sent to team successfully!\n\nLead: ${lead.name}\nServices: ${serviceNames}\nGeneral info and service-specific answers included.`);
    setShowNewQuestionnaire(false);
    setSelectedServices([]);
    setServiceAnswers({});
  };
  const viewSubmission = (submissionId: string) => {
    setSelectedSubmission(submissionId);
  };
  const downloadSubmission = (submissionId: string) => {
    const submission = questionnaireSubmissions.find(s => s.id === submissionId);
    if (!submission) return;
    const content = {
      lead: lead.name,
      submissionDate: submission.submissionDate,
      services: submission.services,
      generalInfo: submission.generalInfo,
      serviceAnswers: submission.serviceAnswers,
      notes: submission.notes
    };
    console.log('Downloading submission:', content);
    alert(`Downloading submission ${submissionId} as PDF...`);
  };
  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'processed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  // --- END: Questionnaire State & Logic ---

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'client-questionnaire', label: 'Client Questionnaire', icon: FileText },
    { id: 'quotation', label: 'Quotation', icon: Calculator },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'proposals', label: 'Proposals', icon: Target },
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

  // --- BEGIN: Questionnaire Render Functions (copy from ClientDetail, adjust for lead) ---
  const renderGeneralQuestions = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">General Information</h4>
        <p className="text-sm text-blue-700">
          This information is required for all services to better understand your business needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generalQuestions.map((question) => (
          <div key={question.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {question.label}
            </label>
            {question.type === 'text' && (
              <input
                type="text"
                value={generalInfo[question.id as keyof typeof generalInfo]}
                onChange={(e) => updateGeneralInfo(question.id, e.target.value)}
                placeholder={question.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {question.type === 'select' && (
              <select
                value={generalInfo[question.id as keyof typeof generalInfo]}
                onChange={(e) => updateGeneralInfo(question.id, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select {question.label}</option>
                {question.options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {question.type === 'textarea' && (
              <textarea
                value={generalInfo[question.id as keyof typeof generalInfo]}
                onChange={(e) => updateGeneralInfo(question.id, e.target.value)}
                placeholder={question.placeholder}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
  const renderServiceSelection = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Service Selection</h4>
        <p className="text-sm text-green-700">
          Select the services you're interested in. Each service will have specific questions to help us understand your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceQuestionnaires.map((service) => (
          <div
            key={service.serviceId}
            onClick={() => toggleService(service.serviceId)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedServices.includes(service.serviceId)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{service.serviceName}</h4>
              {selectedServices.includes(service.serviceId) && (
                <span className="w-5 h-5 text-blue-600">✔</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {service.questions.length} questions
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  const renderServiceQuestions = () => (
    <div className="space-y-8">
      {selectedServices.map((serviceId) => {
        const service = serviceQuestionnaires.find(s => s.serviceId === serviceId);
        if (!service) return null;
        return (
          <div key={serviceId} className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {service.serviceName} Questions
            </h4>
            <div className="space-y-4">
              {service.questions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {question.type === 'text' && (
                    <input
                      type="text"
                      value={serviceAnswers[serviceId]?.[question.id] || ''}
                      onChange={(e) => updateServiceAnswer(serviceId, question.id, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={question.required}
                    />
                  )}
                  {question.type === 'textarea' && (
                    <textarea
                      value={serviceAnswers[serviceId]?.[question.id] || ''}
                      onChange={(e) => updateServiceAnswer(serviceId, question.id, e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={question.required}
                    />
                  )}
                  {question.type === 'select' && (
                    <select
                      value={serviceAnswers[serviceId]?.[question.id] || ''}
                      onChange={(e) => updateServiceAnswer(serviceId, question.id, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={question.required}
                    >
                      <option value="">Select an option</option>
                      {question.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  {question.type === 'multiselect' && (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(serviceAnswers[serviceId]?.[question.id] || []).includes(option)}
                            onChange={(e) => {
                              const currentValues = serviceAnswers[serviceId]?.[question.id] || [];
                              const newValues = e.target.checked
                                ? [...currentValues, option]
                                : currentValues.filter((v: string) => v !== option);
                              updateServiceAnswer(serviceId, question.id, newValues);
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === 'radio' && (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={`${serviceId}-${question.id}`}
                            value={option}
                            checked={serviceAnswers[serviceId]?.[question.id] === option}
                            onChange={(e) => updateServiceAnswer(serviceId, question.id, e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
  const renderQuestionnaireHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Questionnaire History</h3>
        <button
          onClick={() => setShowNewQuestionnaire(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <span className="w-4 h-4 mr-2">+</span>
          New Questionnaire
        </button>
      </div>
      <div className="space-y-4">
        {questionnaireSubmissions.map((submission) => (
          <div key={submission.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">
                    Submission #{submission.version}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubmissionStatusColor(submission.status)}`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Submitted by {submission.submittedBy} on {new Date(submission.submissionDate).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {submission.services.map((serviceId) => {
                    const service = serviceQuestionnaires.find(s => s.serviceId === serviceId);
                    return (
                      <span key={serviceId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {service?.serviceName || serviceId}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => viewSubmission(submission.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg"
                >
                  <span className="w-4 h-4">👁</span>
                </button>
                <button
                  onClick={() => downloadSubmission(submission.id)}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors border border-gray-300 rounded-lg"
                >
                  <span className="w-4 h-4">⬇</span>
                </button>
              </div>
            </div>
            {submission.notes && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">{submission.notes}</p>
              </div>
            )}
            {selectedSubmission === submission.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">General Information</h5>
                    <div className="space-y-2">
                      {Object.entries(submission.generalInfo).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-gray-900 text-right max-w-xs">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Service Answers</h5>
                    <div className="space-y-4">
                      {Object.entries(submission.serviceAnswers).map(([serviceId, answers]) => {
                        const service = serviceQuestionnaires.find(s => s.serviceId === serviceId);
                        return (
                          <div key={serviceId}>
                            <h6 className="text-sm font-medium text-blue-600 mb-2">{service?.serviceName}</h6>
                            <div className="space-y-1">
                              {Object.entries(answers).map(([questionId, answer]) => {
                                const question = service?.questions.find(q => q.id === questionId);
                                return (
                                  <div key={questionId} className="text-xs">
                                    <span className="text-gray-500">{question?.question}:</span>
                                    <span className="text-gray-900 ml-2">
                                      {Array.isArray(answer) ? answer.join(', ') : answer}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  // --- END: Questionnaire Render Functions ---

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
          {activeTab === 'client-questionnaire' && (
            <div className="max-w-6xl mx-auto">
              {!showNewQuestionnaire ? (
                renderQuestionnaireHistory()
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">New Client Questionnaire</h3>
                      <p className="text-sm text-gray-600">Gather additional information for new services or updated requirements</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowNewQuestionnaire(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={sendToTeam}
                        disabled={selectedServices.length === 0}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="w-4 h-4 mr-2">→</span>
                        Send to Team
                      </button>
                    </div>
                  </div>
                  <div className="space-y-8">
                    {renderGeneralQuestions()}
                    {renderServiceSelection()}
                    {selectedServices.length > 0 && renderServiceQuestions()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;