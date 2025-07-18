import React, { useState, useEffect } from 'react';
import { Plus, Minus, FileText, Download, Send, Calculator, Check, X, Edit3, Save, Eye, Mail, Copy, Printer } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  unit: string;
  category: string;
}

interface QuoteItem {
  serviceId: string;
  quantity: number;
  duration: number;
  customPrice?: number;
  notes?: string;
}

interface QuotationData {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  items: QuoteItem[];
  discount: number;
  tax: number;
  validUntil: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
  notes: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  terms: string;
  paymentTerms: string;
  deliveryTimeline: string;
}

interface QuotationTemplate {
  id: string;
  name: string;
  description: string;
  services: string[];
  discount: number;
  category: string;
}

const QuotationGenerator: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clientData?: any;
  conversationId?: string;
}> = ({ isOpen, onClose, clientData, conversationId }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [quotation, setQuotation] = useState<QuotationData>({
    id: `QT-${Date.now()}`,
    clientId: clientData?.id || '',
    clientName: clientData?.name || '',
    clientEmail: clientData?.email || '',
    clientCompany: clientData?.company || '',
    items: [],
    discount: 0,
    tax: 10,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    terms: 'Payment is due within 30 days of invoice date. Late payments may incur additional charges.',
    paymentTerms: '50% upfront, 50% upon completion',
    deliveryTimeline: 'Project will be completed within the agreed timeline as specified in the proposal.'
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [savedQuotations, setSavedQuotations] = useState<QuotationData[]>([]);

  const serviceItems: ServiceItem[] = [
    {
      id: 'seo-basic',
      name: 'SEO Optimization - Basic',
      description: 'Keyword research, on-page optimization, technical SEO audit',
      basePrice: 1500,
      unit: 'month',
      category: 'SEO'
    },
    {
      id: 'seo-advanced',
      name: 'SEO Optimization - Advanced',
      description: 'Comprehensive SEO with link building, content strategy, and reporting',
      basePrice: 3000,
      unit: 'month',
      category: 'SEO'
    },
    {
      id: 'ppc-google',
      name: 'Google Ads Management',
      description: 'Campaign setup, optimization, and monthly management',
      basePrice: 2000,
      unit: 'month',
      category: 'PPC'
    },
    {
      id: 'ppc-facebook',
      name: 'Facebook Ads Management',
      description: 'Social media advertising across Facebook and Instagram',
      basePrice: 1800,
      unit: 'month',
      category: 'PPC'
    },
    {
      id: 'social-basic',
      name: 'Social Media Management - Basic',
      description: '3 platforms, 15 posts/month, community management',
      basePrice: 1200,
      unit: 'month',
      category: 'Social Media'
    },
    {
      id: 'social-premium',
      name: 'Social Media Management - Premium',
      description: '5 platforms, 30 posts/month, stories, community management',
      basePrice: 2500,
      unit: 'month',
      category: 'Social Media'
    },
    {
      id: 'content-blog',
      name: 'Content Marketing - Blog',
      description: '8 blog posts per month with SEO optimization',
      basePrice: 2000,
      unit: 'month',
      category: 'Content'
    },
    {
      id: 'branding-logo',
      name: 'Logo Design & Branding',
      description: 'Complete brand identity package with logo variations',
      basePrice: 3500,
      unit: 'project',
      category: 'Branding'
    },
    {
      id: 'web-design',
      name: 'Website Design & Development',
      description: 'Responsive website with CMS integration',
      basePrice: 8000,
      unit: 'project',
      category: 'Web Development'
    },
    {
      id: 'email-marketing',
      name: 'Email Marketing Campaign',
      description: 'Monthly email campaigns with automation setup',
      basePrice: 800,
      unit: 'month',
      category: 'Email Marketing'
    },
    {
      id: 'analytics-setup',
      name: 'Analytics & Tracking Setup',
      description: 'Google Analytics, conversion tracking, dashboard setup',
      basePrice: 1200,
      unit: 'project',
      category: 'Analytics'
    },
    {
      id: 'consultation',
      name: 'Marketing Strategy Consultation',
      description: 'Comprehensive marketing strategy and planning session',
      basePrice: 500,
      unit: 'hour',
      category: 'Consultation'
    }
  ];

  const quotationTemplates: QuotationTemplate[] = [
    {
      id: 'startup-package',
      name: 'Startup Growth Package',
      description: 'Perfect for startups looking to establish their digital presence',
      services: ['seo-basic', 'social-basic', 'content-blog'],
      discount: 10,
      category: 'Startup'
    },
    {
      id: 'enterprise-package',
      name: 'Enterprise Marketing Suite',
      description: 'Comprehensive marketing solution for large businesses',
      services: ['seo-advanced', 'ppc-google', 'ppc-facebook', 'social-premium', 'email-marketing'],
      discount: 15,
      category: 'Enterprise'
    },
    {
      id: 'ecommerce-package',
      name: 'E-commerce Boost Package',
      description: 'Specialized package for online stores and e-commerce businesses',
      services: ['ppc-google', 'ppc-facebook', 'social-premium', 'email-marketing'],
      discount: 12,
      category: 'E-commerce'
    },
    {
      id: 'branding-package',
      name: 'Complete Branding Solution',
      description: 'Full branding and web presence package',
      services: ['branding-logo', 'web-design', 'social-basic', 'seo-basic'],
      discount: 20,
      category: 'Branding'
    }
  ];

  const applyTemplate = (templateId: string) => {
    const template = quotationTemplates.find(t => t.id === templateId);
    if (!template) return;

    const templateItems: QuoteItem[] = template.services.map(serviceId => ({
      serviceId,
      quantity: 1,
      duration: serviceId.includes('project') ? 1 : 3, // 3 months for recurring, 1 for projects
      notes: ''
    }));

    setQuotation(prev => ({
      ...prev,
      items: templateItems,
      discount: template.discount
    }));
  };

  const addItem = (serviceId: string) => {
    const newItem: QuoteItem = {
      serviceId,
      quantity: 1,
      duration: 1,
      notes: ''
    };
    setQuotation(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      updatedAt: new Date().toISOString()
    }));
  };

  const updateItem = (index: number, updates: Partial<QuoteItem>) => {
    setQuotation(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? { ...item, ...updates } : item),
      updatedAt: new Date().toISOString()
    }));
  };

  const removeItem = (index: number) => {
    setQuotation(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
      updatedAt: new Date().toISOString()
    }));
  };

  const calculateItemTotal = (item: QuoteItem) => {
    const service = serviceItems.find(s => s.id === item.serviceId);
    if (!service) return 0;

    const price = item.customPrice || service.basePrice;
    return price * item.quantity * item.duration;
  };

  const calculateSubtotal = () => {
    return quotation.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * quotation.discount) / 100;
  };

  const calculateTax = () => {
    return ((calculateSubtotal() - calculateDiscount()) * quotation.tax) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  // Auto-calculate total when items change
  useEffect(() => {
    // This will trigger re-render when items change
  }, [quotation.items, quotation.discount, quotation.tax]);

  const PDFPreview: React.FC = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    const total = calculateTotal();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold">PDF Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setShowPDFPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div className="text-center mb-8 border-b-4 border-blue-600 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">QUOTATION</h1>
              <p className="text-gray-600"><strong>Quote ID:</strong> {quotation.id}</p>
              <p className="text-gray-600"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            {/* Client Info */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{quotation.clientName}</p>
                  <p className="text-gray-700">{quotation.clientCompany}</p>
                  <p className="text-gray-700">{quotation.clientEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600"><strong>Valid Until:</strong> {quotation.validUntil}</p>
                  <p className="text-sm text-gray-600"><strong>Payment Terms:</strong> {quotation.paymentTerms}</p>
                  <p className="text-sm text-gray-600"><strong>Delivery:</strong> {quotation.deliveryTimeline}</p>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left">Service</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">Qty</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">Duration</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">Rate</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotation.items.map((item, index) => {
                      const service = serviceItems.find(s => s.id === item.serviceId);
                      const price = item.customPrice || service?.basePrice || 0;
                      const itemTotal = calculateItemTotal(item);

                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-300 px-4 py-3 font-medium">
                            {service?.name || 'Unknown Service'}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm">
                            {service?.description || ''}
                            {item.notes && (
                              <div className="text-gray-600 mt-1 italic">Note: {item.notes}</div>
                            )}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{item.quantity}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {item.duration} {service?.unit || 'unit'}(s)
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-right">
                            ${price.toLocaleString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                            ${itemTotal.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Discount ({quotation.discount}%):</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Tax ({quotation.tax}%):</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-blue-600 pt-2 mt-4">
                  <div className="flex justify-between text-xl font-bold text-green-600">
                    <span>Total Amount:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Notes */}
            {(quotation.notes || quotation.terms) && (
              <div className="mb-8">
                {quotation.notes && (
                  <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Additional Notes:</h4>
                    <p className="text-yellow-700">{quotation.notes}</p>
                  </div>
                )}

                {quotation.terms && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Terms & Conditions:</h4>
                    <p className="text-gray-700 text-sm">{quotation.terms}</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-gray-600 text-sm border-t border-gray-300 pt-6">
              <p className="font-semibold mb-2">This quotation is valid for 30 days from the date of issue.</p>
              <p>Thank you for considering our services. We look forward to working with you!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const generatePDF = () => {
    setShowPDFPreview(true);
  };

  const sendQuotation = () => {
    setQuotation(prev => ({
      ...prev,
      status: 'sent',
      sentAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    console.log('Sending quotation via Chatwoot:', conversationId);
    setSavedQuotations(prev => [...prev, { ...quotation, status: 'sent' }]);

    alert('Quotation sent successfully!');
    onClose();
  };

  const saveQuotation = () => {
    const updatedQuotation = {
      ...quotation,
      updatedAt: new Date().toISOString()
    };

    setSavedQuotations(prev => {
      const existingIndex = prev.findIndex(q => q.id === quotation.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedQuotation;
        return updated;
      }
      return [...prev, updatedQuotation];
    });

    setQuotation(updatedQuotation);
    console.log('Saving quotation:', updatedQuotation);
    alert('Quotation saved successfully!');
  };

  const copyQuotationLink = () => {
    const link = `${window.location.origin}/quotation/${quotation.id}`;
    navigator.clipboard.writeText(link);
    alert('Quotation link copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Generate Quotation</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center mt-4 space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && <div className={`w-12 h-1 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
              <span className={currentStep >= 1 ? 'text-blue-600' : ''}>Client Info</span>
              <span className={currentStep >= 2 ? 'text-blue-600' : ''}>Template</span>
              <span className={currentStep >= 3 ? 'text-blue-600' : ''}>Configure Services</span>
              <span className={currentStep >= 4 ? 'text-blue-600' : ''}>Review</span>
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      value={quotation.clientName}
                      onChange={(e) => setQuotation(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={quotation.clientEmail}
                      onChange={(e) => setQuotation(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={quotation.clientCompany}
                      onChange={(e) => setQuotation(prev => ({ ...prev, clientCompany: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={quotation.validUntil}
                      onChange={(e) => setQuotation(prev => ({ ...prev, validUntil: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <input
                      type="text"
                      value={quotation.paymentTerms}
                      onChange={(e) => setQuotation(prev => ({ ...prev, paymentTerms: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 50% upfront, 50% upon completion"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Timeline</label>
                    <input
                      type="text"
                      value={quotation.deliveryTimeline}
                      onChange={(e) => setQuotation(prev => ({ ...prev, deliveryTimeline: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 4-6 weeks from project start"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Start from Scratch</h4>
                    <p className="text-sm text-gray-600 mb-3">Build a custom quotation by selecting individual services</p>
                    <button
                      onClick={() => setSelectedTemplate('')}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${selectedTemplate === ''
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      Select Custom
                    </button>
                  </div>

                  {quotationTemplates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="mb-3">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {template.category}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                          {template.discount}% Discount
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          applyTemplate(template.id);
                        }}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors ${selectedTemplate === template.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Services</h3>

                {/* Real-time Total Display */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Current Total</h4>
                      <p className="text-sm text-blue-700">
                        {quotation.items.length} service(s) selected
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">
                        ${calculateTotal().toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-700">
                        Subtotal: ${calculateSubtotal().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Available Services</h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {serviceItems.map((service) => (
                        <div key={service.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{service.name}</h5>
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                              <div className="flex items-center mt-2 space-x-4">
                                <span className="text-sm font-medium text-green-600">
                                  ${service.basePrice.toLocaleString()}/{service.unit}
                                </span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {service.category}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => addItem(service.id)}
                              className="ml-3 bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Selected Services</h4>
                    <div className="space-y-3">
                      {quotation.items.map((item, index) => {
                        const service = serviceItems.find(s => s.id === item.serviceId);
                        if (!service) return null;

                        return (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-3">
                              <h5 className="font-medium text-gray-900">{service.name}</h5>
                              <button
                                onClick={() => removeItem(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateItem(index, { quantity: parseInt(e.target.value) || 1 })}
                                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Duration ({service.unit}s)
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.duration}
                                  onChange={(e) => updateItem(index, { duration: parseInt(e.target.value) || 1 })}
                                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                              </div>
                            </div>

                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Custom Price (optional)</label>
                              <input
                                type="number"
                                placeholder={`Default: $${service.basePrice}`}
                                value={item.customPrice || ''}
                                onChange={(e) => updateItem(index, { customPrice: parseFloat(e.target.value) || undefined })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                              />
                            </div>

                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                              <textarea
                                value={item.notes || ''}
                                onChange={(e) => updateItem(index, { notes: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                rows={2}
                              />
                            </div>

                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900">
                                Total: ${calculateItemTotal(item).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {quotation.items.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No services selected. Add services from the left panel.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Finalize</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Quotation Summary</h4>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Quote ID:</span>
                        <span>{quotation.id}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Client:</span>
                        <span>{quotation.clientName}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Company:</span>
                        <span>{quotation.clientCompany}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Valid Until:</span>
                        <span>{quotation.validUntil}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${quotation.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            quotation.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                              quotation.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                          }`}>
                          {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span>Discount:</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={quotation.discount}
                            onChange={(e) => setQuotation(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <span>%</span>
                        </div>
                        <span className="text-red-600">-${calculateDiscount().toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span>Tax:</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={quotation.tax}
                            onChange={(e) => setQuotation(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <span>%</span>
                        </div>
                        <span className="text-blue-600">+${calculateTax().toLocaleString()}</span>
                      </div>

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">${calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Terms & Conditions</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">General Terms</label>
                        <textarea
                          value={quotation.terms}
                          onChange={(e) => setQuotation(prev => ({ ...prev, terms: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                        <textarea
                          value={quotation.notes}
                          onChange={(e) => setQuotation(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Add any additional terms, conditions, or notes..."
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={generatePDF}
                        className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview PDF
                      </button>

                      <button
                        onClick={copyQuotationLink}
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Shareable Link
                      </button>

                      <button
                        onClick={saveQuotation}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-between">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="space-x-3">
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={
                    (currentStep === 1 && (!quotation.clientName || !quotation.clientEmail)) ||
                    (currentStep === 3 && quotation.items.length === 0)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={sendQuotation}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Quotation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPDFPreview && <PDFPreview />}
    </>
  );
};

export default QuotationGenerator;