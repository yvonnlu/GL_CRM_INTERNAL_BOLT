import React, { useState } from 'react';
import { Users, Shield, Building, Settings as SettingsIcon, Zap, Bell, TrendingUp, MessageSquare, BarChart3, Server, CreditCard, Download, Plus, Edit, Trash2, Save, Upload, Eye, EyeOff, Copy, Check, X, Search, Filter, Calendar, Clock, Mail, Phone, Globe, Database, Activity, HardDrive, FileText, DollarSign, Percent, Target, Palette, Type, Image, ChevronDown, ChevronRight, AlertTriangle, Info, CheckCircle, RefreshCw, ExternalLink, Key, Webhook, Smartphone, Mic, Send, BookTemplate as Template, PieChart, LineChart, BarChart2, Trash, Archive, Monitor, Cpu, MemoryStick, Wifi, CreditCard as PaymentCard, Receipt, Package, Import, Import as Export, FileUp, FileDown, Shuffle, ChevronUp } from 'lucide-react';

interface SettingsProps { }

const Settings: React.FC<SettingsProps> = () => {
    const [activeCategory, setActiveCategory] = useState('user-management');
    const [activeSubsection, setActiveSubsection] = useState('user-list');
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['user-management']);

    // State for various settings
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 10:30', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Sales Manager', status: 'Active', lastLogin: '2024-01-15 09:15', avatar: 'JS' },
        { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Sales Rep', status: 'Inactive', lastLogin: '2024-01-14 16:45', avatar: 'MJ' }
    ]);

    const [inviteForm, setInviteForm] = useState({ email: '', role: 'Sales Rep', message: '' });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [ipWhitelist, setIpWhitelist] = useState(['192.168.1.1', '10.0.0.1']);
    const [newIp, setNewIp] = useState('');

    // Company settings
    const [companyInfo, setCompanyInfo] = useState({
        name: 'ABCCRM Company',
        email: 'contact@abccrm.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business St, City, State 12345',
        website: 'https://abccrm.com',
        taxId: 'TAX123456789'
    });

    const [businessHours, setBusinessHours] = useState({
        monday: { enabled: true, start: '09:00', end: '17:00' },
        tuesday: { enabled: true, start: '09:00', end: '17:00' },
        wednesday: { enabled: true, start: '09:00', end: '17:00' },
        thursday: { enabled: true, start: '09:00', end: '17:00' },
        friday: { enabled: true, start: '09:00', end: '17:00' },
        saturday: { enabled: false, start: '09:00', end: '17:00' },
        sunday: { enabled: false, start: '09:00', end: '17:00' }
    });

    const [regionalSettings, setRegionalSettings] = useState({
        currency: 'USD',
        language: 'en',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h'
    });

    // CRM Configuration
    const [customFields, setCustomFields] = useState([
        { id: 1, name: 'Industry', type: 'select', options: ['Technology', 'Healthcare', 'Finance'], required: true },
        { id: 2, name: 'Company Size', type: 'number', required: false },
        { id: 3, name: 'Notes', type: 'textarea', required: false }
    ]);

    const [pipelineStages, setPipelineStages] = useState([
        { id: 1, name: 'Lead', color: '#3B82F6', order: 1 },
        { id: 2, name: 'Qualified', color: '#F59E0B', order: 2 },
        { id: 3, name: 'Proposal', color: '#8B5CF6', order: 3 },
        { id: 4, name: 'Negotiation', color: '#EF4444', order: 4 },
        { id: 5, name: 'Closed Won', color: '#10B981', order: 5 }
    ]);

    const [leadSources, setLeadSources] = useState([
        { id: 1, name: 'Website', active: true, tracking: true },
        { id: 2, name: 'Social Media', active: true, tracking: true },
        { id: 3, name: 'Email Campaign', active: true, tracking: false },
        { id: 4, name: 'Referral', active: false, tracking: false }
    ]);

    // Integrations
    const [clickupSettings, setClickupSettings] = useState({
        apiKey: '',
        workspaceId: '',
        syncTasks: true,
        syncComments: false,
        autoCreateTasks: true
    });

    const [chatwootSettings, setChatwootSettings] = useState({
        url: '',
        accessToken: '',
        inboxId: '',
        autoAssign: true,
        syncContacts: true
    });

    const [emailProvider, setEmailProvider] = useState({
        provider: 'gmail',
        smtpHost: '',
        smtpPort: '587',
        username: '',
        password: '',
        encryption: 'tls'
    });

    // Sales & Pipeline Settings
    const [salesProcess, setSalesProcess] = useState({
        autoAssignLeads: true,
        leadRotation: 'round-robin',
        requireApproval: false,
        approvalAmount: 10000,
        followUpReminders: true,
        reminderInterval: 24
    });

    const [quotationTemplates, setQuotationTemplates] = useState([
        { id: 1, name: 'Standard Quote', isDefault: true, lastModified: '2024-01-15' },
        { id: 2, name: 'Service Quote', isDefault: false, lastModified: '2024-01-10' },
        { id: 3, name: 'Product Quote', isDefault: false, lastModified: '2024-01-08' }
    ]);

    const [pricingRules, setPricingRules] = useState([
        { id: 1, name: 'Volume Discount', type: 'percentage', value: 10, condition: 'quantity > 100', active: true },
        { id: 2, name: 'Early Bird', type: 'fixed', value: 500, condition: 'days_to_close < 7', active: true },
        { id: 3, name: 'Loyalty Discount', type: 'percentage', value: 5, condition: 'customer_type = returning', active: false }
    ]);

    const [commissionSettings, setCommissionSettings] = useState({
        defaultRate: 5,
        tieredCommission: true,
        tiers: [
            { min: 0, max: 10000, rate: 3 },
            { min: 10001, max: 50000, rate: 5 },
            { min: 50001, max: 999999, rate: 7 }
        ],
        paymentSchedule: 'monthly'
    });

    // Communication Settings
    const [emailTemplates, setEmailTemplates] = useState([
        { id: 1, name: 'Welcome Email', subject: 'Welcome to our service!', type: 'lead', active: true },
        { id: 2, name: 'Follow Up', subject: 'Following up on your inquiry', type: 'follow-up', active: true },
        { id: 3, name: 'Quote Sent', subject: 'Your quote is ready', type: 'quote', active: true }
    ]);

    const [smsConfig, setSmsConfig] = useState({
        provider: 'twilio',
        accountSid: '',
        authToken: '',
        fromNumber: '',
        enabled: false
    });

    const [callRecording, setCallRecording] = useState({
        enabled: false,
        autoRecord: true,
        retention: 90,
        transcription: false,
        storage: 'local'
    });

    const [autoResponder, setAutoResponder] = useState({
        enabled: true,
        businessHoursOnly: true,
        message: 'Thank you for your message. We will get back to you soon.',
        delay: 5
    });

    // Reports & Analytics
    const [dashboardWidgets, setDashboardWidgets] = useState([
        { id: 1, name: 'Revenue Chart', enabled: true, position: 1 },
        { id: 2, name: 'Pipeline Overview', enabled: true, position: 2 },
        { id: 3, name: 'Team Performance', enabled: true, position: 3 },
        { id: 4, name: 'Recent Activity', enabled: false, position: 4 }
    ]);

    const [reportTemplates, setReportTemplates] = useState([
        { id: 1, name: 'Monthly Sales Report', type: 'sales', schedule: 'monthly', recipients: ['manager@company.com'] },
        { id: 2, name: 'Lead Generation Report', type: 'leads', schedule: 'weekly', recipients: ['marketing@company.com'] },
        { id: 3, name: 'Performance Dashboard', type: 'performance', schedule: 'daily', recipients: ['admin@company.com'] }
    ]);

    const [dataRetention, setDataRetention] = useState({
        leads: 365,
        deals: 2555, // 7 years
        activities: 730, // 2 years
        logs: 90,
        backups: 30
    });

    // System & Performance
    const [systemLogs, setSystemLogs] = useState([
        { id: 1, timestamp: '2024-01-15 10:30:15', level: 'INFO', message: 'User login successful', user: 'john@company.com' },
        { id: 2, timestamp: '2024-01-15 10:25:32', level: 'WARNING', message: 'Failed login attempt', user: 'unknown@test.com' },
        { id: 3, timestamp: '2024-01-15 10:20:45', level: 'ERROR', message: 'Database connection timeout', user: 'system' }
    ]);

    const [performanceMetrics, setPerformanceMetrics] = useState({
        cpuUsage: 45,
        memoryUsage: 62,
        diskUsage: 78,
        activeUsers: 23,
        responseTime: 245
    });

    const [storageUsage, setStorageUsage] = useState({
        total: 1000, // GB
        used: 456,
        breakdown: {
            documents: 234,
            images: 123,
            backups: 89,
            logs: 10
        }
    });

    // Billing & Subscription
    const [subscriptionPlan, setSubscriptionPlan] = useState({
        current: 'Professional',
        users: 25,
        storage: 500,
        features: ['Advanced Reports', 'API Access', 'Priority Support'],
        nextBilling: '2024-02-15',
        amount: 299
    });

    const [billingHistory, setBillingHistory] = useState([
        { id: 1, date: '2024-01-15', amount: 299, status: 'Paid', invoice: 'INV-2024-001' },
        { id: 2, date: '2023-12-15', amount: 299, status: 'Paid', invoice: 'INV-2023-012' },
        { id: 3, date: '2023-11-15', amount: 299, status: 'Paid', invoice: 'INV-2023-011' }
    ]);

    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'card', last4: '4242', brand: 'Visa', isDefault: true, expires: '12/25' },
        { id: 2, type: 'card', last4: '5555', brand: 'Mastercard', isDefault: false, expires: '08/26' }
    ]);

    // Import/Export
    const [importHistory, setImportHistory] = useState([
        { id: 1, type: 'Leads', file: 'leads_jan_2024.csv', status: 'Completed', date: '2024-01-15', records: 1250 },
        { id: 2, type: 'Contacts', file: 'contacts_backup.xlsx', status: 'Failed', date: '2024-01-14', records: 0 },
        { id: 3, type: 'Deals', file: 'deals_q4_2023.csv', status: 'Completed', date: '2024-01-10', records: 89 }
    ]);

    const [exportFormats, setExportFormats] = useState({
        csv: true,
        excel: true,
        json: false,
        xml: false
    });

    const settingsCategories = [
        {
            id: 'user-management',
            label: 'User Management',
            icon: Users,
            subsections: [
                { id: 'user-list', label: 'User List & Profiles' },
                { id: 'invite-users', label: 'Invite New Users' },
                { id: 'roles-permissions', label: 'Roles & Permissions' },
                { id: 'login-activity', label: 'Login Activity & Session Logs' }
            ]
        },
        {
            id: 'security-privacy',
            label: 'Security & Privacy',
            icon: Shield,
            subsections: [
                { id: 'two-factor', label: 'Two-Factor Authentication' },
                { id: 'ip-whitelist', label: 'IP Whitelist' },
                { id: 'data-backup', label: 'Data Export & Backup' },
                { id: 'password-policies', label: 'Password Policies' }
            ]
        },
        // {
        //     id: 'company-organization',
        //     label: 'Company & Organization',
        //     icon: Building,
        //     subsections: [
        //         { id: 'company-profile', label: 'Company Profile & Information' },
        //         { id: 'business-hours', label: 'Business Hours & Timezone' },
        //         { id: 'currency-regional', label: 'Currency & Regional Settings' },
        //         { id: 'logo-branding', label: 'Logo & Branding' }
        //     ]
        // },
        {
            id: 'crm-configuration',
            label: 'CRM Configuration',
            icon: SettingsIcon,
            subsections: [
                { id: 'custom-fields', label: 'Custom Fields Management' },
                { id: 'pipeline-stages', label: 'Pipeline Stages Configuration' },
                { id: 'lead-sources', label: 'Lead Sources Setup' },
                { id: 'deal-status', label: 'Deal Status Customization' }
            ]
        },
        {
            id: 'integrations-apis',
            label: 'Integrations & APIs',
            icon: Zap,
            subsections: [
                { id: 'clickup-integration', label: 'ClickUp Integration Settings' },
                { id: 'chatwoot-config', label: 'Chatwoot Configuration' },
                { id: 'email-provider', label: 'Email Provider Setup' },
                // { id: 'api-webhooks', label: 'API Keys & Webhooks' }
            ]
        },
        {
            id: 'notifications-alerts',
            label: 'Notifications & Alerts',
            icon: Bell,
            subsections: [
                { id: 'email-notifications', label: 'Email Notification Preferences' },
                { id: 'inapp-notifications', label: 'In-app Notification Settings' },
                { id: 'alert-rules', label: 'Alert Rules Configuration' },
                { id: 'reminders', label: 'Reminder Settings' }
            ]
        },
        {
            id: 'sales-pipeline',
            label: 'Sales & Pipeline',
            icon: TrendingUp,
            subsections: [
                { id: 'sales-process', label: 'Sales Process Configuration' },
                { id: 'quotation-templates', label: 'Quotation Templates' },
                { id: 'pricing-rules', label: 'Pricing Rules & Discounts' },
                { id: 'commission-settings', label: 'Commission Settings' }
            ]
        },
        {
            id: 'communication-settings',
            label: 'Communication Settings',
            icon: MessageSquare,
            subsections: [
                { id: 'email-templates', label: 'Email Templates' },
                // { id: 'sms-configuration', label: 'SMS Configuration' },
                // { id: 'call-recording', label: 'Call Recording Settings' },
                { id: 'auto-responder', label: 'Auto-responder Setup' }
            ]
        },
        {
            id: 'reports-analytics',
            label: 'Reports & Analytics',
            icon: BarChart3,
            subsections: [
                { id: 'dashboard-customization', label: 'Dashboard Customization' },
                { id: 'report-templates', label: 'Report Templates' },
                { id: 'data-retention', label: 'Data Retention Policies' },
                { id: 'custom-metrics', label: 'Custom Metrics Configuration' }
            ]
        },
        {
            id: 'system-performance',
            label: 'System & Performance',
            icon: Server,
            subsections: [
                { id: 'database-maintenance', label: 'Database Maintenance' },
                { id: 'system-logs', label: 'System Logs' },
                { id: 'performance-monitoring', label: 'Performance Monitoring' },
                { id: 'storage-usage', label: 'Storage Usage' }
            ]
        },
        {
            id: 'billing-subscription',
            label: 'Billing & Subscription',
            icon: CreditCard,
            subsections: [
                // { id: 'subscription-plans', label: 'Subscription Plans' },
                { id: 'billing-history', label: 'Billing History' },
                { id: 'payment-methods', label: 'Payment Methods' }
                // { id: 'usage-statistics', label: 'Usage Statistics' }
            ]
        },
        {
            id: 'import-export',
            label: 'Import/Export',
            icon: Download,
            subsections: [
                { id: 'data-import', label: 'Data Import Tools' },
                { id: 'export-formats', label: 'Export Formats' },
                // { id: 'migration-utilities', label: 'Migration Utilities' },
                { id: 'bulk-operations', label: 'Bulk Operations' }
            ]
        }
    ];

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCategoryClick = (categoryId: string, subsectionId: string) => {
        setActiveCategory(categoryId);
        setActiveSubsection(subsectionId);
        if (!expandedCategories.includes(categoryId)) {
            setExpandedCategories(prev => [...prev, categoryId]);
        }
    };

    // Render functions for each category
    const renderUserManagement = () => {
        switch (activeSubsection) {
            case 'user-list':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">User List & Profiles</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add User
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                            {user.avatar}
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'invite-users':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Invite New Users</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={inviteForm.email}
                                        onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="user@company.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                    <select
                                        value={inviteForm.role}
                                        onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Sales Manager">Sales Manager</option>
                                        <option value="Sales Rep">Sales Rep</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Support">Support</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Personal Message (Optional)</label>
                                    <textarea
                                        value={inviteForm.message}
                                        onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Welcome to our team! We're excited to have you join us."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Invitation
                                </button>
                            </form>
                        </div>
                    </div>
                );

            case 'roles-permissions':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Roles & Permissions</h3>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Manager</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rep</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Support</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            'View Dashboard',
                                            'Manage Leads',
                                            'Manage Clients',
                                            'View Reports',
                                            'Manage Users',
                                            'System Settings',
                                            'Export Data',
                                            'API Access'
                                        ].map((permission) => (
                                            <tr key={permission}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <input type="checkbox" defaultChecked={permission !== 'Manage Users' && permission !== 'System Settings'} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <input type="checkbox" defaultChecked={!['Manage Users', 'System Settings', 'Export Data', 'API Access'].includes(permission)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <input type="checkbox" defaultChecked={['View Dashboard', 'Manage Leads', 'View Reports'].includes(permission)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <input type="checkbox" defaultChecked={['View Dashboard', 'Manage Clients'].includes(permission)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Save className="w-4 h-4 mr-2" />
                                Save Permissions
                            </button>
                        </div>
                    </div>
                );

            case 'login-activity':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Login Activity & Session Logs</h3>
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search logs..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            { user: 'john@company.com', ip: '192.168.1.100', device: 'Chrome on Windows', time: '2024-01-15 10:30', status: 'Success' },
                                            { user: 'jane@company.com', ip: '192.168.1.101', device: 'Safari on macOS', time: '2024-01-15 09:15', status: 'Success' },
                                            { user: 'unknown@test.com', ip: '203.0.113.1', device: 'Chrome on Linux', time: '2024-01-15 08:45', status: 'Failed' }
                                        ].map((log, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ip}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.device}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderSecurityPrivacy = () => {
        switch (activeSubsection) {
            case 'two-factor':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={twoFactorEnabled}
                                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {twoFactorEnabled && (
                                <div className="space-y-4 pt-4 border-t border-gray-200">
                                    <div>
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">Setup Authenticator App</h5>
                                        <p className="text-sm text-gray-600 mb-4">Scan this QR code with your authenticator app:</p>
                                        <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">QR Code</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit code"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                        Verify & Enable
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'ip-whitelist':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">IP Whitelist Management</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-4 mb-4">
                                <input
                                    type="text"
                                    value={newIp}
                                    onChange={(e) => setNewIp(e.target.value)}
                                    placeholder="Enter IP address (e.g., 192.168.1.1)"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => {
                                        if (newIp) {
                                            setIpWhitelist([...ipWhitelist, newIp]);
                                            setNewIp('');
                                        }
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add IP
                                </button>
                            </div>

                            <div className="space-y-2">
                                {ipWhitelist.map((ip, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-900">{ip}</span>
                                        <button
                                            onClick={() => setIpWhitelist(ipWhitelist.filter((_, i) => i !== index))}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'data-backup':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Data Export & Backup</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Export Data</h4>
                                <div className="space-y-3">
                                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export All Data
                                    </button>
                                    <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Leads Only
                                    </button>
                                    <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Clients Only
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Automatic Backup</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Enable Auto Backup</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="30">30 days</option>
                                            <option value="90">90 days</option>
                                            <option value="365">1 year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    // const renderCompanyOrganization = () => {
    //     switch (activeSubsection) {
    //         case 'company-profile':
    //             return (
    //                 <div className="space-y-6">
    //                     <h3 className="text-lg font-semibold text-gray-900">Company Profile & Information</h3>
    //
    //                     <div className="bg-white p-6 rounded-lg border border-gray-200">
    //                         <form className="space-y-4">
    //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
    //                                     <input
    //                                         type="text"
    //                                         value={companyInfo.name}
    //                                         onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
    //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                     />
    //                                 </div>
    //
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
    //                                     <input
    //                                         type="email"
    //                                         value={companyInfo.email}
    //                                         onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
    //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                     />
    //                                 </div>
    //
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
    //                                     <input
    //                                         type="tel"
    //                                         value={companyInfo.phone}
    //                                         onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
    //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                     />
    //                                 </div>
    //
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
    //                                     <input
    //                                         type="url"
    //                                         value={companyInfo.website}
    //                                         onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
    //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                     />
    //                                 </div>
    //                             </div>
    //
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
    //                                 <textarea
    //                                     value={companyInfo.address}
    //                                     onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
    //                                     rows={3}
    //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 />
    //                             </div>
    //
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
    //                                 <input
    //                                     type="text"
    //                                     value={companyInfo.taxId}
    //                                     onChange={(e) => setCompanyInfo({ ...companyInfo, taxId: e.target.value })}
    //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 />
    //                             </div>
    //
    //                             <div className="flex justify-end">
    //                                 <button
    //                                     type="submit"
    //                                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
    //                                 >
    //                                     <Save className="w-4 h-4 mr-2" />
    //                                     Save Changes
    //                                 </button>
    //                             </div>
    //                         </form>
    //                     </div>
    //                 </div>
    //             );
    //
    //         case 'business-hours':
    //             return (
    //                 <div className="space-y-6">
    //                     <h3 className="text-lg font-semibold text-gray-900">Business Hours & Timezone</h3>
    //
    //                     <div className="bg-white p-6 rounded-lg border border-gray-200">
    //                         <div className="mb-6">
    //                             <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
    //                             <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    //                                 <option value="America/New_York">Eastern Time (ET)</option>
    //                                 <option value="America/Chicago">Central Time (CT)</option>
    //                                 <option value="America/Denver">Mountain Time (MT)</option>
    //                                 <option value="America/Los_Angeles">Pacific Time (PT)</option>
    //                                 <option value="Europe/London">London (GMT)</option>
    //                                 <option value="Asia/Tokyo">Tokyo (JST)</option>
    //                             </select>
    //                         </div>
    //
    //                         <div className="space-y-4">
    //                             <h4 className="text-sm font-medium text-gray-900">Business Hours</h4>
    //                             {Object.entries(businessHours).map(([day, hours]) => (
    //                                 <div key={day} className="flex items-center space-x-4">
    //                                     <div className="w-20">
    //                                         <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
    //                                     </div>
    //                                     <label className="relative inline-flex items-center cursor-pointer">
    //                                         <input
    //                                             type="checkbox"
    //                                             checked={hours.enabled}
    //                                             onChange={(e) => setBusinessHours({
    //                                                 ...businessHours,
    //                                                 [day]: { ...hours, enabled: e.target.checked }
    //                                             })}
    //                                             className="sr-only peer"
    //                                         />
    //                                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                                     </label>
    //                                     {hours.enabled && (
    //                                         <>
    //                                             <input
    //                                                 type="time"
    //                                                 value={hours.start}
    //                                                 onChange={(e) => setBusinessHours({
    //                                                     ...businessHours,
    //                                                     [day]: { ...hours, start: e.target.value }
    //                                                 })}
    //                                                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                             />
    //                                             <span className="text-gray-500">to</span>
    //                                             <input
    //                                                 type="time"
    //                                                 value={hours.end}
    //                                                 onChange={(e) => setBusinessHours({
    //                                                     ...businessHours,
    //                                                     [day]: { ...hours, end: e.target.value }
    //                                                 })}
    //                                                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                             />
    //                                         </>
    //                                     )}
    //                                 </div>
    //                             ))}
    //                         </div>
    //
    //                         <div className="flex justify-end mt-6">
    //                             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
    //                                 <Save className="w-4 h-4 mr-2" />
    //                                 Save Hours
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             );
    //
    //         case 'currency-regional':
    //             return (
    //                 <div className="space-y-6">
    //                     <h3 className="text-lg font-semibold text-gray-900">Currency & Regional Settings</h3>
    //
    //                     <div className="bg-white p-6 rounded-lg border border-gray-200">
    //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
    //                                 <select
    //                                     value={regionalSettings.currency}
    //                                     onChange={(e) => setRegionalSettings({ ...regionalSettings, currency: e.target.value })}
    //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 >
    //                                     <option value="USD">US Dollar (USD)</option>
    //                                     <option value="EUR">Euro (EUR)</option>
    //                                     <option value="GBP">British Pound (GBP)</option>
    //                                     <option value="JPY">Japanese Yen (JPY)</option>
    //                                     <option value="CAD">Canadian Dollar (CAD)</option>
    //                                 </select>
    //                             </div>
    //
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
    //                                 <select
    //                                     value={regionalSettings.language}
    //                                     onChange={(e) => setRegionalSettings({ ...regionalSettings, language: e.target.value })}
    //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 >
    //                                     <option value="en">English</option>
    //                                     <option value="es">Spanish</option>
    //                                     <option value="fr">French</option>
    //                                     <option value="de">German</option>
    //                                     <option value="ja">Japanese</option>
    //                                 </select>
    //                             </div>
    //
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
    //                                 <select
    //                                     value={regionalSettings.dateFormat}
    //                                     onChange={(e) => setRegionalSettings({ ...regionalSettings, dateFormat: e.target.value })}
    //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 >
    //                                     <option value="MM/DD/YYYY">MM/DD/YYYY</option>
    //                                     <option value="DD/MM/YYYY">DD/MM/YYYY</option>
    //                                     <option value="YYYY-MM-DD">YYYY-MM-DD</option>
    //                                 </select>
    //                             </div>
    //
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
    //                                 <select
    //                                     value={regionalSettings.timeFormat}
    //                                     onChange={(e) => setRegionalSettings({ ...regionalSettings, timeFormat: e.target.value })}
    //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                 >
    //                                     <option value="12h">12 Hour</option>
    //                                     <option value="24h">24 Hour</option>
    //                                 </select>
    //                             </div>
    //                         </div>
    //
    //                         <div className="flex justify-end mt-6">
    //                             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
    //                                 <Save className="w-4 h-4 mr-2" />
    //                                 Save Settings
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             );
    //
    //         case 'logo-branding':
    //             return (
    //                 <div className="space-y-6">
    //                     <h3 className="text-lg font-semibold text-gray-900">Logo & Branding</h3>
    //
    //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    //                         <div className="bg-white p-6 rounded-lg border border-gray-200">
    //                             <h4 className="text-sm font-medium text-gray-900 mb-4">Company Logo</h4>
    //                             <div className="space-y-4">
    //                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
    //                                     <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
    //                                     <p className="text-sm text-gray-600">Drop your logo here or click to upload</p>
    //                                     <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
    //                                 </div>
    //
    //                                 <div className="flex items-center space-x-4">
    //                                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
    //                                         <span className="text-white font-bold text-lg">AC</span>
    //                                     </div>
    //                                     <div>
    //                                         <p className="text-sm font-medium text-gray-900">Current Logo</p>
    //                                         <p className="text-xs text-gray-500">64x64 pixels</p>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //
    //                         <div className="bg-white p-6 rounded-lg border border-gray-200">
    //                             <h4 className="text-sm font-medium text-gray-900 mb-4">Brand Colors</h4>
    //                             <div className="space-y-4">
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
    //                                     <div className="flex items-center space-x-3">
    //                                         <input
    //                                             type="color"
    //                                             defaultValue="#3B82F6"
    //                                             className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             defaultValue="#3B82F6"
    //                                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                         />
    //                                     </div>
    //                                 </div>
    //
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
    //                                     <div className="flex items-center space-x-3">
    //                                         <input
    //                                             type="color"
    //                                             defaultValue="#8B5CF6"
    //                                             className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             defaultValue="#8B5CF6"
    //                                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                         />
    //                                     </div>
    //                                 </div>
    //
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
    //                                     <div className="flex items-center space-x-3">
    //                                         <input
    //                                             type="color"
    //                                             defaultValue="#10B981"
    //                                             className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             defaultValue="#10B981"
    //                                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="bg-white p-6 rounded-lg border border-gray-200">
    //                         <h4 className="text-sm font-medium text-gray-900 mb-4">Typography</h4>
    //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Primary Font</label>
    //                                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    //                                     <option value="inter">Inter</option>
    //                                     <option value="roboto">Roboto</option>
    //                                     <option value="opensans">Open Sans</option>
    //                                     <option value="lato">Lato</option>
    //                                 </select>
    //                             </div>
    //
    //                             <div>
    //                                 <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Font</label>
    //                                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    //                                     <option value="inter">Inter</option>
    //                                     <option value="roboto">Roboto</option>
    //                                     <option value="opensans">Open Sans</option>
    //                                     <option value="lato">Lato</option>
    //                                 </select>
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <div className="flex justify-end">
    //                         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
    //                             <Save className="w-4 h-4 mr-2" />
    //                             Save Branding
    //                         </button>
    //                     </div>
    //                 </div>
    //             );
    //
    //         default:
    //             return <div>Select a subsection</div>;
    //     }
    // };

    const renderCrmConfiguration = () => {
        switch (activeSubsection) {
            case 'custom-fields':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Custom Fields Management</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Field
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {customFields.map((field) => (
                                            <tr key={field.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{field.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${field.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {field.required ? 'Required' : 'Optional'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {field.options ? field.options.join(', ') : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'pipeline-stages':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Pipeline Stages Configuration</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Stage
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-4">
                                {pipelineStages.map((stage) => (
                                    <div key={stage.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: stage.color }}
                                            ></div>
                                            <input
                                                type="text"
                                                value={stage.name}
                                                onChange={(e) => setPipelineStages(pipelineStages.map(s =>
                                                    s.id === stage.id ? { ...s, name: e.target.value } : s
                                                ))}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="color"
                                                value={stage.color}
                                                onChange={(e) => setPipelineStages(pipelineStages.map(s =>
                                                    s.id === stage.id ? { ...s, color: e.target.value } : s
                                                ))}
                                                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Stages
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'lead-sources':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Lead Sources Setup</h3>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {leadSources.map((source) => (
                                            <tr key={source.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{source.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={source.active}
                                                            onChange={(e) => setLeadSources(leadSources.map(s =>
                                                                s.id === source.id ? { ...s, active: e.target.checked } : s
                                                            ))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={source.tracking}
                                                            onChange={(e) => setLeadSources(leadSources.map(s =>
                                                                s.id === source.id ? { ...s, tracking: e.target.checked } : s
                                                            ))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'deal-status':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Deal Status Customization</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Status
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: 'Open', color: '#3B82F6', count: 45 },
                                { name: 'In Progress', color: '#F59E0B', count: 23 },
                                { name: 'Won', color: '#10B981', count: 12 },
                                { name: 'Lost', color: '#EF4444', count: 8 },
                                { name: 'On Hold', color: '#8B5CF6', count: 5 }
                            ].map((status, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: status.color }}
                                            ></div>
                                            <span className="font-medium text-gray-900">{status.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{status.count} deals</span>
                                    </div>

                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            defaultValue={status.name}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="color"
                                            defaultValue={status.color}
                                            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                                        />
                                    </div>

                                    <div className="flex justify-end mt-3">
                                        <button className="text-red-600 hover:text-red-900">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderIntegrationsApis = () => {
        switch (activeSubsection) {
            case 'clickup-integration':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">ClickUp Integration Settings</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={clickupSettings.apiKey}
                                            onChange={(e) => setClickupSettings({ ...clickupSettings, apiKey: e.target.value })}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your ClickUp API key"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            <EyeOff className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Workspace ID</label>
                                    <input
                                        type="text"
                                        value={clickupSettings.workspaceId}
                                        onChange={(e) => setClickupSettings({ ...clickupSettings, workspaceId: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter workspace ID"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-900">Sync Options</h4>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Sync Tasks</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={clickupSettings.syncTasks}
                                                onChange={(e) => setClickupSettings({ ...clickupSettings, syncTasks: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Sync Comments</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={clickupSettings.syncComments}
                                                onChange={(e) => setClickupSettings({ ...clickupSettings, syncComments: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Auto Create Tasks</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={clickupSettings.autoCreateTasks}
                                                onChange={(e) => setClickupSettings({ ...clickupSettings, autoCreateTasks: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        Test Connection
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            case 'chatwoot-config':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Chatwoot Configuration</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Chatwoot URL</label>
                                    <input
                                        type="url"
                                        value={chatwootSettings.url}
                                        onChange={(e) => setChatwootSettings({ ...chatwootSettings, url: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://your-chatwoot-instance.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={chatwootSettings.accessToken}
                                            onChange={(e) => setChatwootSettings({ ...chatwootSettings, accessToken: e.target.value })}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter access token"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            <EyeOff className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Inbox ID</label>
                                    <input
                                        type="text"
                                        value={chatwootSettings.inboxId}
                                        onChange={(e) => setChatwootSettings({ ...chatwootSettings, inboxId: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter inbox ID"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-900">Configuration Options</h4>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Auto Assign Conversations</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={chatwootSettings.autoAssign}
                                                onChange={(e) => setChatwootSettings({ ...chatwootSettings, autoAssign: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Sync Contacts</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={chatwootSettings.syncContacts}
                                                onChange={(e) => setChatwootSettings({ ...chatwootSettings, syncContacts: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        Test Connection
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            case 'email-provider':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Email Provider Setup</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                                    <select
                                        value={emailProvider.provider}
                                        onChange={(e) => setEmailProvider({ ...emailProvider, provider: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="gmail">Gmail</option>
                                        <option value="outlook">Outlook</option>
                                        <option value="smtp">Custom SMTP</option>
                                    </select>
                                </div>

                                {emailProvider.provider === 'smtp' && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                                                <input
                                                    type="text"
                                                    value={emailProvider.smtpHost}
                                                    onChange={(e) => setEmailProvider({ ...emailProvider, smtpHost: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="smtp.example.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                                                <input
                                                    type="text"
                                                    value={emailProvider.smtpPort}
                                                    onChange={(e) => setEmailProvider({ ...emailProvider, smtpPort: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="587"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                            <input
                                                type="text"
                                                value={emailProvider.username}
                                                onChange={(e) => setEmailProvider({ ...emailProvider, username: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="your-email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                            <input
                                                type="password"
                                                value={emailProvider.password}
                                                onChange={(e) => setEmailProvider({ ...emailProvider, password: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter password"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                                            <select
                                                value={emailProvider.encryption}
                                                onChange={(e) => setEmailProvider({ ...emailProvider, encryption: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        Test Connection
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            // case 'api-webhooks':
            //     return (
            //         <div className="space-y-6">
            //             <h3 className="text-lg font-semibold text-gray-900">API Keys & Webhooks</h3>

            //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            //                 <div className="bg-white p-6 rounded-lg border border-gray-200">
            //                     <div className="flex items-center justify-between mb-4">
            //                         <h4 className="text-sm font-medium text-gray-900">API Keys</h4>
            //                         <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            //                             Generate New Key
            //                         </button>
            //                     </div>

            //                     <div className="space-y-3">
            //                         {[
            //                             { name: 'Production API Key', key: 'pk_live_51H...', created: '2024-01-15' },
            //                             { name: 'Development API Key', key: 'pk_test_51H...', created: '2024-01-10' }
            //                         ].map((apiKey, index) => (
            //                             <div key={index} className="p-3 bg-gray-50 rounded-lg">
            //                                 <div className="flex items-center justify-between mb-2">
            //                                     <span className="text-sm font-medium text-gray-900">{apiKey.name}</span>
            //                                     <span className="text-xs text-gray-500">Created: {apiKey.created}</span>
            //                                 </div>
            //                                 <div className="flex items-center space-x-2">
            //                                     <code className="flex-1 text-sm bg-gray-100 px-2 py-1 rounded font-mono">
            //                                         {apiKey.key}
            //                                     </code>
            //                                     <button className="text-gray-600 hover:text-gray-800">
            //                                         <Copy className="w-4 h-4" />
            //                                     </button>
            //                                     <button className="text-red-600 hover:text-red-800">
            //                                         <Trash2 className="w-4 h-4" />
            //                                     </button>
            //                                 </div>
            //                             </div>
            //                         ))}
            //                     </div>
            //                 </div>

            //                 <div className="bg-white p-6 rounded-lg border border-gray-200">
            //                     <div className="flex items-center justify-between mb-4">
            //                         <h4 className="text-sm font-medium text-gray-900">Webhooks</h4>
            //                         <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            //                             Add Webhook
            //                         </button>
            //                     </div>

            //                     <div className="space-y-3">
            //                         {[
            //                             { url: 'https://api.example.com/webhook', events: ['lead.created', 'deal.updated'], status: 'Active' },
            //                             { url: 'https://hooks.slack.com/services/...', events: ['deal.closed'], status: 'Active' }
            //                         ].map((webhook, index) => (
            //                             <div key={index} className="p-3 bg-gray-50 rounded-lg">
            //                                 <div className="flex items-center justify-between mb-2">
            //                                     <span className="text-sm font-medium text-gray-900 truncate">{webhook.url}</span>
            //                                     <span className={`text-xs px-2 py-1 rounded-full ${webhook.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            //                                         }`}>
            //                                         {webhook.status}
            //                                     </span>
            //                                 </div>
            //                                 <div className="flex items-center justify-between">
            //                                     <span className="text-xs text-gray-500">
            //                                         Events: {webhook.events.join(', ')}
            //                                     </span>
            //                                     <div className="flex items-center space-x-1">
            //                                         <button className="text-blue-600 hover:text-blue-800">
            //                                             <Edit className="w-3 h-3" />
            //                                         </button>
            //                                         <button className="text-red-600 hover:text-red-800">
            //                                             <Trash2 className="w-3 h-3" />
            //                                         </button>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         ))}
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderNotificationsAlerts = () => {
        switch (activeSubsection) {
            case 'email-notifications':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Email Notification Preferences</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-4">
                                {[
                                    { id: 'new-lead', label: 'New Lead Created', description: 'Get notified when a new lead is added to the system' },
                                    { id: 'deal-updated', label: 'Deal Status Updated', description: 'Receive updates when deal status changes' },
                                    { id: 'task-assigned', label: 'Task Assigned', description: 'Get notified when a task is assigned to you' },
                                    { id: 'meeting-reminder', label: 'Meeting Reminders', description: 'Receive reminders before scheduled meetings' },
                                    { id: 'quota-achieved', label: 'Quota Achieved', description: 'Get notified when sales quotas are met' },
                                    { id: 'system-updates', label: 'System Updates', description: 'Receive notifications about system maintenance and updates' }
                                ].map((notification) => (
                                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">{notification.label}</h4>
                                            <p className="text-sm text-gray-500">{notification.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                defaultChecked={!['system-updates'].includes(notification.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'inapp-notifications':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">In-app Notification Settings</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Position</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['top-right', 'top-left', 'bottom-right', 'bottom-left'].map((position) => (
                                            <label key={position} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                                <input
                                                    type="radio"
                                                    name="position"
                                                    value={position}
                                                    defaultChecked={position === 'top-right'}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700 capitalize">{position.replace('-', ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Behavior</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Auto-dismiss notifications</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Play notification sounds</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Show desktop notifications</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Auto-dismiss after (seconds)</label>
                                    <input
                                        type="number"
                                        defaultValue="5"
                                        min="1"
                                        max="30"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'alert-rules':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Alert Rules Configuration</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Rule
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            { name: 'High Value Deal', condition: 'Deal value > $50,000', action: 'Email to Manager', status: 'Active' },
                                            { name: 'Stale Lead Alert', condition: 'Lead not contacted for 7 days', action: 'Slack notification', status: 'Active' },
                                            { name: 'Quota Achievement', condition: 'Monthly quota reached', action: 'Team notification', status: 'Inactive' }
                                        ].map((rule, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.condition}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.action}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {rule.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'reminders':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Reminder Settings</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Follow-up Reminders</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Enable automatic follow-up reminders</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">First reminder after</label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option value="1">1 day</option>
                                                    <option value="3">3 days</option>
                                                    <option value="7">1 week</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Second reminder after</label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option value="7">1 week</option>
                                                    <option value="14">2 weeks</option>
                                                    <option value="30">1 month</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Meeting Reminders</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Send meeting reminders</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Remind me before</label>
                                            <div className="space-y-2">
                                                {['15 minutes', '30 minutes', '1 hour', '1 day'].map((time) => (
                                                    <label key={time} className="flex items-center space-x-3">
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={['15 minutes', '1 day'].includes(time)}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">{time}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Escalation Rules</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Enable escalation for overdue tasks</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Level 1 (Manager)</label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option value="1">1 day overdue</option>
                                                    <option value="2">2 days overdue</option>
                                                    <option value="3">3 days overdue</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Level 2 (Director)</label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option value="3">3 days overdue</option>
                                                    <option value="5">5 days overdue</option>
                                                    <option value="7">1 week overdue</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Level 3 (Executive)</label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option value="7">1 week overdue</option>
                                                    <option value="14">2 weeks overdue</option>
                                                    <option value="30">1 month overdue</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderSalesPipeline = () => {
        switch (activeSubsection) {
            case 'sales-process':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Sales Process Configuration</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Lead Assignment</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Auto-assign new leads</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={salesProcess.autoAssignLeads}
                                                    onChange={(e) => setSalesProcess({ ...salesProcess, autoAssignLeads: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Lead rotation method</label>
                                            <select
                                                value={salesProcess.leadRotation}
                                                onChange={(e) => setSalesProcess({ ...salesProcess, leadRotation: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="round-robin">Round Robin</option>
                                                <option value="load-balanced">Load Balanced</option>
                                                <option value="territory-based">Territory Based</option>
                                                <option value="skill-based">Skill Based</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Deal Approval</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Require approval for large deals</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={salesProcess.requireApproval}
                                                    onChange={(e) => setSalesProcess({ ...salesProcess, requireApproval: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        {salesProcess.requireApproval && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Approval threshold ($)</label>
                                                <input
                                                    type="number"
                                                    value={salesProcess.approvalAmount}
                                                    onChange={(e) => setSalesProcess({ ...salesProcess, approvalAmount: parseInt(e.target.value) })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Follow-up Settings</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Enable follow-up reminders</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={salesProcess.followUpReminders}
                                                    onChange={(e) => setSalesProcess({ ...salesProcess, followUpReminders: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        {salesProcess.followUpReminders && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Reminder interval (hours)</label>
                                                <input
                                                    type="number"
                                                    value={salesProcess.reminderInterval}
                                                    onChange={(e) => setSalesProcess({ ...salesProcess, reminderInterval: parseInt(e.target.value) })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'quotation-templates':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Quotation Templates</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Template
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {quotationTemplates.map((template) => (
                                            <tr key={template.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {template.isDefault ? (
                                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                            Default
                                                        </span>
                                                    ) : (
                                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                                            Set as Default
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.lastModified}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Template Editor</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter template name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Content</label>
                                    <textarea
                                        rows={10}
                                        placeholder="Enter your quotation template content here..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                                        Preview
                                    </button>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'pricing-rules':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Pricing Rules & Discounts</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Rule
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pricingRules.map((rule) => (
                                            <tr key={rule.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{rule.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {rule.type === 'percentage' ? `${rule.value}%` : `$${rule.value}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.condition}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${rule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {rule.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Create New Pricing Rule</h4>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter rule name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="percentage">Percentage</option>
                                            <option value="fixed">Fixed Amount</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                                        <input
                                            type="number"
                                            placeholder="Enter value"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., quantity > 100 OR deal_value > 10000"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Create Rule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            case 'commission-settings':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Commission Settings</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Default Commission Rate</h4>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="number"
                                            value={commissionSettings.defaultRate}
                                            onChange={(e) => setCommissionSettings({ ...commissionSettings, defaultRate: parseFloat(e.target.value) })}
                                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                        />
                                        <span className="text-sm text-gray-700">%</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-medium text-gray-900">Tiered Commission Structure</h4>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={commissionSettings.tieredCommission}
                                                onChange={(e) => setCommissionSettings({ ...commissionSettings, tieredCommission: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    {commissionSettings.tieredCommission && (
                                        <div className="space-y-3">
                                            {commissionSettings.tiers.map((tier, index) => (
                                                <div key={index} className="grid grid-cols-4 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Min ($)</label>
                                                        <input
                                                            type="number"
                                                            value={tier.min}
                                                            onChange={(e) => {
                                                                const newTiers = [...commissionSettings.tiers];
                                                                newTiers[index].min = parseInt(e.target.value);
                                                                setCommissionSettings({ ...commissionSettings, tiers: newTiers });
                                                            }}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Max ($)</label>
                                                        <input
                                                            type="number"
                                                            value={tier.max}
                                                            onChange={(e) => {
                                                                const newTiers = [...commissionSettings.tiers];
                                                                newTiers[index].max = parseInt(e.target.value);
                                                                setCommissionSettings({ ...commissionSettings, tiers: newTiers });
                                                            }}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Rate (%)</label>
                                                        <input
                                                            type="number"
                                                            value={tier.rate}
                                                            onChange={(e) => {
                                                                const newTiers = [...commissionSettings.tiers];
                                                                newTiers[index].rate = parseFloat(e.target.value);
                                                                setCommissionSettings({ ...commissionSettings, tiers: newTiers });
                                                            }}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            step="0.1"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button className="text-red-600 hover:text-red-800">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700">
                                                + Add Tier
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Schedule</h4>
                                    <select
                                        value={commissionSettings.paymentSchedule}
                                        onChange={(e) => setCommissionSettings({ ...commissionSettings, paymentSchedule: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                        <option value="annually">Annually</option>
                                        <option value="on-close">On Deal Close</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Commission Settings
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderCommunicationSettings = () => {
        switch (activeSubsection) {
            case 'email-templates':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Template
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {emailTemplates.map((template) => (
                                            <tr key={template.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{template.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {template.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Template Editor</h4>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter template name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="lead">Lead</option>
                                            <option value="follow-up">Follow-up</option>
                                            <option value="quote">Quote</option>
                                            <option value="welcome">Welcome</option>
                                            <option value="reminder">Reminder</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                                    <input
                                        type="text"
                                        placeholder="Enter email subject"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
                                    <textarea
                                        rows={10}
                                        placeholder="Enter your email template content here..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Template
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            // case 'sms-configuration':
            //     return (
            //         <div className="space-y-6">
            //             <h3 className="text-lg font-semibold text-gray-900">SMS Configuration</h3>
            //             ...
            //         </div>
            //     );

            // case 'call-recording':
            //     return (
            //         <div className="space-y-6">
            //             <h3 className="text-lg font-semibold text-gray-900">Call Recording Settings</h3>
            //             ...
            //         </div>
            //     );

            case 'auto-responder':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Auto-responder Setup</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Enable Auto-responder</h4>
                                        <p className="text-sm text-gray-500">Automatically respond to incoming messages</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={autoResponder.enabled}
                                            onChange={(e) => setAutoResponder({ ...autoResponder, enabled: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {autoResponder.enabled && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Business hours only</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={autoResponder.businessHoursOnly}
                                                    onChange={(e) => setAutoResponder({ ...autoResponder, businessHoursOnly: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-response Message</label>
                                            <textarea
                                                value={autoResponder.message}
                                                onChange={(e) => setAutoResponder({ ...autoResponder, message: e.target.value })}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your auto-response message"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Response Delay (minutes)</label>
                                            <input
                                                type="number"
                                                value={autoResponder.delay}
                                                onChange={(e) => setAutoResponder({ ...autoResponder, delay: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="0"
                                                max="60"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Set to 0 for immediate response</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderReportsAnalytics = () => {
        switch (activeSubsection) {
            case 'dashboard-customization':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Dashboard Customization</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Available Widgets</h4>
                            <div className="space-y-3">
                                {dashboardWidgets.map((widget) => (
                                    <div key={widget.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <ChevronUp className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <ChevronDown className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{widget.name}</span>
                                            <span className="text-xs text-gray-500">Position: {widget.position}</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={widget.enabled}
                                                onChange={(e) => setDashboardWidgets(dashboardWidgets.map(w =>
                                                    w.id === widget.id ? { ...w, enabled: e.target.checked } : w
                                                ))}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Layout
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Dashboard Themes</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['Light', 'Dark', 'Auto'].map((theme) => (
                                    <label key={theme} className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value={theme.toLowerCase()}
                                            defaultChecked={theme === 'Light'}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">{theme}</span>
                                            <p className="text-xs text-gray-500">
                                                {theme === 'Light' && 'Light theme for daytime use'}
                                                {theme === 'Dark' && 'Dark theme for low-light environments'}
                                                {theme === 'Auto' && 'Automatically switch based on system preference'}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'report-templates':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Template
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reportTemplates.map((template) => (
                                            <tr key={template.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{template.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{template.schedule}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {template.recipients.length} recipient(s)
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900 mr-3">
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Create New Report Template</h4>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter template name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="sales">Sales Report</option>
                                            <option value="leads">Lead Report</option>
                                            <option value="performance">Performance Report</option>
                                            <option value="activity">Activity Report</option>
                                            <option value="custom">Custom Report</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="quarterly">Quarterly</option>
                                            <option value="manual">Manual Only</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="pdf">PDF</option>
                                            <option value="excel">Excel</option>
                                            <option value="csv">CSV</option>
                                            <option value="email">Email Summary</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                                    <input
                                        type="text"
                                        placeholder="Enter email addresses separated by commas"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Create Template
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            case 'data-retention':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Data Retention Policies</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Retention Periods (Days)</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Leads Data</label>
                                            <input
                                                type="number"
                                                value={dataRetention.leads}
                                                onChange={(e) => setDataRetention({ ...dataRetention, leads: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Currently: {dataRetention.leads} days (1 year)</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Deals Data</label>
                                            <input
                                                type="number"
                                                value={dataRetention.deals}
                                                onChange={(e) => setDataRetention({ ...dataRetention, deals: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Currently: {dataRetention.deals} days (7 years)</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Logs</label>
                                            <input
                                                type="number"
                                                value={dataRetention.activities}
                                                onChange={(e) => setDataRetention({ ...dataRetention, activities: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Currently: {dataRetention.activities} days (2 years)</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">System Logs</label>
                                            <input
                                                type="number"
                                                value={dataRetention.logs}
                                                onChange={(e) => setDataRetention({ ...dataRetention, logs: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Currently: {dataRetention.logs} days (3 months)</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Files</label>
                                            <input
                                                type="number"
                                                value={dataRetention.backups}
                                                onChange={(e) => setDataRetention({ ...dataRetention, backups: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Currently: {dataRetention.backups} days (1 month)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Automated Cleanup</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Enable automatic data cleanup</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Send cleanup notifications</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Policies
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'custom-metrics':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Custom Metrics Configuration</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Metric
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: 'Lead Conversion Rate', formula: '(Converted Leads / Total Leads) * 100', type: 'percentage' },
                                { name: 'Average Deal Size', formula: 'Total Deal Value / Number of Deals', type: 'currency' },
                                { name: 'Sales Cycle Length', formula: 'Average Days from Lead to Close', type: 'days' },
                                { name: 'Customer Lifetime Value', formula: 'Average Deal Value * Repeat Purchase Rate', type: 'currency' },
                                { name: 'Monthly Recurring Revenue', formula: 'Sum of Monthly Subscription Values', type: 'currency' },
                                { name: 'Churn Rate', formula: '(Lost Customers / Total Customers) * 100', type: 'percentage' }
                            ].map((metric, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-medium text-gray-900">{metric.name}</h4>
                                        <div className="flex items-center space-x-1">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-600 mb-3">{metric.formula}</p>

                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs px-2 py-1 rounded-full ${metric.type === 'percentage' ? 'bg-blue-100 text-blue-800' :
                                            metric.type === 'currency' ? 'bg-green-100 text-green-800' :
                                                'bg-purple-100 text-purple-800'
                                            }`}>
                                            {metric.type}
                                        </span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Create Custom Metric</h4>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Metric Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter metric name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="number">Number</option>
                                            <option value="percentage">Percentage</option>
                                            <option value="currency">Currency</option>
                                            <option value="days">Days</option>
                                            <option value="ratio">Ratio</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Formula</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Enter calculation formula (e.g., SUM(deals.value) / COUNT(deals))"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Brief description of what this metric measures"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Create Metric
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderSystemPerformance = () => {
        switch (activeSubsection) {
            case 'database-maintenance':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Database Maintenance</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Maintenance Tasks</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Optimize Database</span>
                                            <p className="text-xs text-gray-500">Last run: 2024-01-14 02:00</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Run Now
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Rebuild Indexes</span>
                                            <p className="text-xs text-gray-500">Last run: 2024-01-13 02:00</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Run Now
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Clean Temp Data</span>
                                            <p className="text-xs text-gray-500">Last run: 2024-01-15 01:00</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Run Now
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Update Statistics</span>
                                            <p className="text-xs text-gray-500">Last run: 2024-01-15 03:00</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Run Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Scheduled Maintenance</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Window</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="time"
                                                defaultValue="02:00"
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="time"
                                                defaultValue="04:00"
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Enable automatic maintenance</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Send maintenance notifications</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'system-logs':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                            <div className="flex items-center space-x-2">
                                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="all">All Levels</option>
                                    <option value="error">Error</option>
                                    <option value="warning">Warning</option>
                                    <option value="info">Info</option>
                                </select>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Export Logs
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {systemLogs.map((log) => (
                                            <tr key={log.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                                                        log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {log.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.user}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Log Configuration</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Log Level</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="debug">Debug</option>
                                        <option value="info">Info</option>
                                        <option value="warning">Warning</option>
                                        <option value="error">Error</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Log Rotation</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="size">By Size (100MB)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Log Files</label>
                                    <input
                                        type="number"
                                        defaultValue="30"
                                        min="1"
                                        max="365"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Log Format</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="json">JSON</option>
                                        <option value="text">Plain Text</option>
                                        <option value="structured">Structured</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'performance-monitoring':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Performance Monitoring</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <Cpu className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-900">CPU Usage</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{performanceMetrics.cpuUsage}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${performanceMetrics.cpuUsage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <MemoryStick className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900">Memory</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{performanceMetrics.memoryUsage}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${performanceMetrics.memoryUsage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <HardDrive className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-medium text-gray-900">Disk Usage</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{performanceMetrics.diskUsage}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-yellow-500 h-2 rounded-full"
                                        style={{ width: `${performanceMetrics.diskUsage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm font-medium text-gray-900">Active Users</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{performanceMetrics.activeUsers}</div>
                                <div className="text-sm text-gray-500">Currently online</div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <Activity className="w-5 h-5 text-red-500" />
                                    <span className="text-sm font-medium text-gray-900">Response Time</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{performanceMetrics.responseTime}ms</div>
                                <div className="text-sm text-gray-500">Average</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Performance Alerts</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">CPU Usage Alert</span>
                                            <p className="text-xs text-gray-500">Alert when CPU {'>'} 80%</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Memory Usage Alert</span>
                                            <p className="text-xs text-gray-500">Alert when Memory {'>'} 85%</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Response Time Alert</span>
                                            <p className="text-xs text-gray-500">Alert when Response {'>'} 500ms</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Monitoring Settings</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monitoring Interval</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="30">30 seconds</option>
                                            <option value="60">1 minute</option>
                                            <option value="300">5 minutes</option>
                                            <option value="900">15 minutes</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="7">7 days</option>
                                            <option value="30">30 days</option>
                                            <option value="90">90 days</option>
                                            <option value="365">1 year</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Enable real-time monitoring</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'storage-usage':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-sm font-medium text-gray-900">Storage Overview</h4>
                                <div className="text-sm text-gray-600">
                                    {storageUsage.used}GB of {storageUsage.total}GB used
                                </div>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                                <div
                                    className="bg-blue-500 h-4 rounded-full"
                                    style={{ width: `${(storageUsage.used / storageUsage.total) * 100}%` }}
                                ></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                    <div className="text-lg font-semibold text-gray-900">{storageUsage.breakdown.documents}GB</div>
                                    <div className="text-sm text-gray-600">Documents</div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <Image className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <div className="text-lg font-semibold text-gray-900">{storageUsage.breakdown.images}GB</div>
                                    <div className="text-sm text-gray-600">Images</div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <Archive className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-lg font-semibold text-gray-900">{storageUsage.breakdown.backups}GB</div>
                                    <div className="text-sm text-gray-600">Backups</div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <Database className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                    <div className="text-lg font-semibold text-gray-900">{storageUsage.breakdown.logs}GB</div>
                                    <div className="text-sm text-gray-600">Logs</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Storage Cleanup</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Clean Temporary Files</span>
                                            <p className="text-xs text-gray-500">Remove temporary and cache files</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Clean Now
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Archive Old Data</span>
                                            <p className="text-xs text-gray-500">Move old records to archive storage</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Archive
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Compress Backups</span>
                                            <p className="text-xs text-gray-500">Compress old backup files</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                            Compress
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Storage Alerts</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Enable storage alerts</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Alert threshold (%)</label>
                                        <input
                                            type="number"
                                            defaultValue="80"
                                            min="50"
                                            max="95"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Auto-cleanup when full</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderBillingSubscription = () => {
        switch (activeSubsection) {
            // case 'subscription-plans':
            //     return (
            //         <div className="space-y-6">
            //             <h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
            //             ...
            //         </div>
            //     );

            case 'billing-history':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Download className="w-4 h-4 mr-2" />
                                Download All
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {billingHistory.map((bill) => (
                                            <tr key={bill.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bill.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.invoice}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${bill.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {bill.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Billing Summary</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900">$897</div>
                                    <div className="text-sm text-gray-600">Total Paid (YTD)</div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900">$299</div>
                                    <div className="text-sm text-gray-600">Next Payment</div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900">3</div>
                                    <div className="text-sm text-gray-600">Invoices (YTD)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'payment-methods':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Payment Method
                            </button>
                        </div>

                        <div className="space-y-4">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                                <PaymentCard className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-900">{method.brand}</span>
                                                    <span className="text-sm text-gray-500">•••• {method.last4}</span>
                                                    {method.isDefault && (
                                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">Expires {method.expires}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {!method.isDefault && (
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    Set as Default
                                                </button>
                                            )}
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Add New Payment Method</h4>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Month</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Year</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {Array.from({ length: 10 }, (_, i) => (
                                                <option key={2024 + i} value={2024 + i}>{2024 + i}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            maxLength={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="setDefault"
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="setDefault" className="text-sm text-gray-700">
                                        Set as default payment method
                                    </label>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Add Payment Method
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            // case 'usage-statistics':
            //     return (
            //         <div className="space-y-6">
            //             <h3 className="text-lg font-semibold text-gray-900">Usage Statistics</h3>
            //             ...
            //         </div>
            //     );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderImportExport = () => {
        switch (activeSubsection) {
            case 'data-import':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Data Import Tools</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Import Data</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="leads">Leads</option>
                                        <option value="contacts">Contacts</option>
                                        <option value="deals">Deals</option>
                                        <option value="companies">Companies</option>
                                        <option value="activities">Activities</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">File Format</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="csv">CSV</option>
                                        <option value="excel">Excel (XLSX)</option>
                                        <option value="json">JSON</option>
                                        <option value="xml">XML</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <FileUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Drop your file here or click to upload</p>
                                    <p className="text-xs text-gray-500 mt-1">Supports CSV, Excel, JSON, XML (Max 10MB)</p>
                                    <input type="file" className="hidden" accept=".csv,.xlsx,.json,.xml" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="skipDuplicates"
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="skipDuplicates" className="text-sm text-gray-700">
                                        Skip duplicate records
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Import Data
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900">Import History</h4>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {importHistory.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.file}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.records}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'export-formats':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Export Formats</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Supported Export Formats</h4>
                            <div className="space-y-4">
                                {Object.entries(exportFormats).map(([format, enabled]) => (
                                    <div key={format} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <span className="text-sm font-medium text-gray-900 uppercase">{format}</span>
                                                <p className="text-sm text-gray-500">
                                                    {format === 'csv' && 'Comma-separated values - Compatible with Excel and most tools'}
                                                    {format === 'excel' && 'Microsoft Excel format with formatting and formulas'}
                                                    {format === 'json' && 'JavaScript Object Notation - For developers and APIs'}
                                                    {format === 'xml' && 'Extensible Markup Language - Structured data format'}
                                                </p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={enabled}
                                                onChange={(e) => setExportFormats({ ...exportFormats, [format]: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Format Settings
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Quick Export</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="all">All Data</option>
                                        <option value="leads">Leads Only</option>
                                        <option value="contacts">Contacts Only</option>
                                        <option value="deals">Deals Only</option>
                                        <option value="activities">Activities Only</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="csv">CSV</option>
                                        <option value="excel">Excel</option>
                                        <option value="json">JSON</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="all">All Time</option>
                                        <option value="30">Last 30 days</option>
                                        <option value="90">Last 90 days</option>
                                        <option value="365">Last year</option>
                                        <option value="custom">Custom Range</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Archived records</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Custom fields</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Now
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'migration-utilities':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Migration Utilities</h3>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Platform Migration</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { name: 'Salesforce', icon: '🏢', supported: true },
                                    { name: 'HubSpot', icon: '🧡', supported: true },
                                    { name: 'Pipedrive', icon: '🟢', supported: true },
                                    { name: 'Zoho CRM', icon: '🔵', supported: true },
                                    { name: 'Microsoft Dynamics', icon: '🔷', supported: false },
                                    { name: 'SugarCRM', icon: '🍯', supported: false }
                                ].map((platform, index) => (
                                    <div key={index} className={`p-4 rounded-lg border-2 ${platform.supported ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                                        }`}>
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">{platform.icon}</div>
                                            <h5 className="text-sm font-medium text-gray-900">{platform.name}</h5>
                                            <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${platform.supported
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {platform.supported ? 'Supported' : 'Coming Soon'}
                                            </span>
                                        </div>
                                        {platform.supported && (
                                            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                                                Start Migration
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Migration Wizard</h4>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Source Platform</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select source platform</option>
                                        <option value="salesforce">Salesforce</option>
                                        <option value="hubspot">HubSpot</option>
                                        <option value="pipedrive">Pipedrive</option>
                                        <option value="zoho">Zoho CRM</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Data to Migrate</label>
                                    <div className="space-y-2">
                                        {['Contacts', 'Leads', 'Deals', 'Companies', 'Activities', 'Custom Fields'].map((item) => (
                                            <label key={item} className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Migration Options</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Preserve record relationships</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Skip duplicate records</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Create backup before migration</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                                        <Shuffle className="w-4 h-4 mr-2" />
                                        Start Migration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'bulk-operations':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Bulk Operations</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Bulk Update</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="leads">Leads</option>
                                            <option value="contacts">Contacts</option>
                                            <option value="deals">Deals</option>
                                            <option value="companies">Companies</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter Criteria</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., status = 'New' AND created_date > '2024-01-01'"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Field</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="status">Status</option>
                                            <option value="owner">Owner</option>
                                            <option value="source">Source</option>
                                            <option value="priority">Priority</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Value</label>
                                        <input
                                            type="text"
                                            placeholder="Enter new value"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Update Records
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Bulk Delete</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="leads">Leads</option>
                                            <option value="contacts">Contacts</option>
                                            <option value="deals">Deals</option>
                                            <option value="activities">Activities</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Delete Criteria</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., status = 'Inactive' AND last_activity < '2023-01-01'"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <div className="flex items-center space-x-2">
                                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                            <span className="text-sm font-medium text-yellow-800">Warning</span>
                                        </div>
                                        <p className="text-sm text-yellow-700 mt-1">
                                            This action cannot be undone. Please review your criteria carefully.
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="confirmDelete"
                                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                        />
                                        <label htmlFor="confirmDelete" className="text-sm text-gray-700">
                                            I understand this action is permanent
                                        </label>
                                    </div>

                                    <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center">
                                        <Trash className="w-4 h-4 mr-2" />
                                        Delete Records
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Bulk Operations History</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            { date: '2024-01-15 14:30', operation: 'Bulk Update - Lead Status', records: 156, status: 'Completed', user: 'John Doe' },
                                            { date: '2024-01-14 09:15', operation: 'Bulk Delete - Old Activities', records: 89, status: 'Completed', user: 'Jane Smith' },
                                            { date: '2024-01-13 16:45', operation: 'Bulk Update - Owner Assignment', records: 234, status: 'Failed', user: 'Mike Johnson' }
                                        ].map((operation, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{operation.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{operation.operation}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{operation.records}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${operation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {operation.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{operation.user}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a subsection</div>;
        }
    };

    const renderContent = () => {
        switch (activeCategory) {
            case 'user-management':
                return renderUserManagement();
            case 'security-privacy':
                return renderSecurityPrivacy();
            case 'company-organization':
                return renderCompanyOrganization();
            case 'crm-configuration':
                return renderCrmConfiguration();
            case 'integrations-apis':
                return renderIntegrationsApis();
            case 'notifications-alerts':
                return renderNotificationsAlerts();
            case 'sales-pipeline':
                return renderSalesPipeline();
            case 'communication-settings':
                return renderCommunicationSettings();
            case 'reports-analytics':
                return renderReportsAnalytics();
            case 'system-performance':
                return renderSystemPerformance();
            case 'billing-subscription':
                return renderBillingSubscription();
            case 'import-export':
                return renderImportExport();
            default:
                return <div>Select a category</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Settings Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                    <p className="text-sm text-gray-600">Manage your CRM configuration</p>
                </div>

                <nav className="p-4">
                    {settingsCategories.map((category) => {
                        const Icon = category.icon;
                        const isExpanded = expandedCategories.includes(category.id);
                        const isActive = activeCategory === category.id;

                        return (
                            <div key={category.id} className="mb-2">
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <Icon className="w-5 h-5 mr-3" />
                                        {category.label}
                                    </div>
                                    {isExpanded ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                {isExpanded && category.subsections && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {category.subsections.map((subsection) => (
                                            <button
                                                key={subsection.id}
                                                onClick={() => handleCategoryClick(category.id, subsection.id)}
                                                className={`w-full text-left px-3 py-1 text-sm rounded transition-colors ${activeCategory === category.id && activeSubsection === subsection.id
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {subsection.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 pl-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;