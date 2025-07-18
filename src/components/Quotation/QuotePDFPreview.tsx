import React from 'react';
import { X, Download, Send, Mail, Building } from 'lucide-react';

interface QuotePDFPreviewProps {
    quote: any;
    onClose: () => void;
}

const QuotePDFPreview: React.FC<QuotePDFPreviewProps> = ({ quote, onClose }) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Quote Preview</h2>
                    <div className="flex items-center space-x-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            Send to Client
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* PDF Template */}
                    <div className="bg-white max-w-3xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {/* Header */}
                        <div className="border-b-4 border-blue-600 pb-6 mb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <Building className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-4xl font-bold text-gray-900">QUOTATION</h1>
                                        </div>
                                    </div>
                                    <p className="text-lg text-gray-600">Professional Services Proposal</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600 mb-2">Gleads Agency</div>
                                    <div className="text-sm text-gray-600">
                                        <p>123 Business Street</p>
                                        <p>City, State 12345</p>
                                        <p>Phone: (555) 123-4567</p>
                                        <p>Email: hello@company.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quote Info */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote To:</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-semibold text-gray-900">{quote.lead.name}</p>
                                    <p className="text-gray-700">{quote.lead.company}</p>
                                    <p className="text-gray-600">{quote.lead.email}</p>
                                    <p className="text-gray-600">{quote.lead.phone}</p>
                                    {quote.lead.address && <p className="text-gray-600">{quote.lead.address}</p>}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Details:</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Quote Name:</span>
                                        <span className="font-medium">{quote.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium">{currentDate}</span>
                                    </div>
                                    {quote.validUntil && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Valid Until:</span>
                                            <span className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Quote ID:</span>
                                        <span className="font-medium">#{Date.now().toString().slice(-6)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services Table */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Included:</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Service</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Description</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">Qty</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-200">Unit Price</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-200">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quote.services.map((service: any, index: number) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900">{service.name}</td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    <p>{service.description}</p>
                                                    {service.fields && Object.entries(service.fields).length > 0 && (
                                                        <div className="mt-2 text-xs text-gray-500">
                                                            {Object.entries(service.fields).map(([key, value]: [string, any]) => (
                                                                <div key={key} className="flex justify-between">
                                                                    <span>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
                                                                    <span>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-center text-gray-900">{service.quantity}</td>
                                                <td className="px-4 py-4 text-sm text-right text-gray-900">
                                                    ${(service.customPrice || service.basePrice).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-right font-medium text-gray-900">
                                                    ${service.lineTotal.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-8">
                            <div className="w-80">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-medium">${quote.subtotal.toLocaleString()}</span>
                                        </div>
                                        {quote.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount ({quote.discount}%):</span>
                                                <span>-${quote.discountAmount.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-300">
                                            <span>Total:</span>
                                            <span>${quote.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {quote.notes && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes:</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700 whitespace-pre-wrap">{quote.notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Terms */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions:</h3>
                            <div className="text-sm text-gray-600 space-y-2">
                                <p>• Payment terms: 50% upfront, 50% upon completion</p>
                                <p>• This quote is valid for 30 days from the date issued</p>
                                <p>• All prices are in USD and exclude applicable taxes</p>
                                <p>• Changes to scope may affect pricing and timeline</p>
                                <p>• Work will commence upon signed agreement and initial payment</p>
                            </div>
                        </div>

                        {/* Signature Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Acceptance & Signature:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-4">Client Acceptance:</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Signature:</p>
                                            <div className="border-b-2 border-gray-300 h-12"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Print Name:</p>
                                            <div className="border-b border-gray-300 h-8"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Title:</p>
                                            <div className="border-b border-gray-300 h-8"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Date:</p>
                                            <div className="border-b border-gray-300 h-8"></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-4">Company Representative:</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Signature:</p>
                                            <div className="border-b-2 border-gray-300 h-12"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Print Name:</p>
                                            <div className="border-b border-gray-300 h-8 flex items-end">
                                                <span className="text-sm text-gray-500 pb-1">John Doe</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Title:</p>
                                            <div className="border-b border-gray-300 h-8 flex items-end">
                                                <span className="text-sm text-gray-500 pb-1">Sales Director</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Date:</p>
                                            <div className="border-b border-gray-300 h-8 flex items-end">
                                                <span className="text-sm text-gray-500 pb-1">{currentDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>Instructions:</strong> Please sign and return this quote to confirm your acceptance of the proposed services and terms.
                                    You may scan and email the signed document to hello@company.com or return the original by mail.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 pt-6 text-center">
                            <p className="text-gray-600 mb-2">Thank you for considering our services!</p>
                            <p className="text-sm text-gray-500">
                                Please contact us if you have any questions about this quote.
                            </p>
                            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
                                <span>Quote ID: #{Date.now().toString().slice(-6)}</span>
                                <span>•</span>
                                <span>Generated on {currentDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotePDFPreview;