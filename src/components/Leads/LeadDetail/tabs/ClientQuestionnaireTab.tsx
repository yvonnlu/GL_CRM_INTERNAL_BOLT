import React from 'react';
import { Lead } from '../../../../utils/loadLeadsData';

interface ClientQuestionnaireTabProps {
    lead: Lead;
}

const ClientQuestionnaireTab: React.FC<ClientQuestionnaireTabProps> = ({ lead }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Questionnaire</h3>

                <div className="space-y-6">
                    {/* Company Goals */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Company Goals</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                Not filled yet. Send a questionnaire to {lead.fullName} at{' '}
                                {lead.companyName}.
                            </p>
                        </div>
                    </div>

                    {/* Target Audience */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Target Audience</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                Not filled yet. Send a questionnaire to {lead.fullName} at{' '}
                                {lead.companyName}.
                            </p>
                        </div>
                    </div>

                    {/* Current Challenges */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Current Challenges</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                Not filled yet. Send a questionnaire to {lead.fullName} at{' '}
                                {lead.companyName}.
                            </p>
                        </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Budget & Timeline</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                Not filled yet. Send a questionnaire to {lead.fullName} at{' '}
                                {lead.companyName}.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Send Questionnaire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientQuestionnaireTab;
