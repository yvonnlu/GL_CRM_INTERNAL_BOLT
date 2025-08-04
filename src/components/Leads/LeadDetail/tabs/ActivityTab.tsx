import React from 'react';

interface ActivityTabProps {
    lead: any;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ lead }) => {
    return (
        <div className="space-y-6">
            {/* Contact History */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact History</h3>
                <div className="space-y-4">
                    {lead.contactHistory.map(contact => (
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
                    {lead.activities.map(activity => (
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
                                <p className="text-xs text-gray-500 mt-1">
                                    By {activity.createdBy}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityTab;
