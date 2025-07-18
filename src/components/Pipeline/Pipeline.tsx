import React, { useState } from 'react';
import { Plus, MoreVertical, DollarSign, Calendar, User } from 'lucide-react';

const Pipeline: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const pipelineStages = [
    { id: 'lead', title: 'Lead', color: 'border-blue-500', count: 12, value: '$345K' },
    { id: 'qualified', title: 'Qualified', color: 'border-green-500', count: 8, value: '$280K' },
    { id: 'proposal', title: 'Proposal', color: 'border-yellow-500', count: 5, value: '$190K' },
    { id: 'negotiation', title: 'Negotiation', color: 'border-orange-500', count: 3, value: '$125K' },
    { id: 'closed', title: 'Closed Won', color: 'border-purple-500', count: 7, value: '$450K' }
  ];

  const deals = [
    {
      id: '1',
      title: 'Digital Marketing Campaign',
      company: 'TechCorp Inc.',
      value: '$45,000',
      probability: 85,
      stage: 'qualified',
      closeDate: '2024-02-15',
      owner: 'Sarah J.',
      avatar: 'SJ'
    },
    {
      id: '2',
      title: 'Brand Redesign Project',
      company: 'StartupXYZ',
      value: '$28,000',
      probability: 60,
      stage: 'proposal',
      closeDate: '2024-02-20',
      owner: 'Mike C.',
      avatar: 'MC'
    },
    {
      id: '3',
      title: 'SEO Optimization',
      company: 'Enterprise Ltd.',
      value: '$75,000',
      probability: 90,
      stage: 'negotiation',
      closeDate: '2024-02-10',
      owner: 'Emma R.',
      avatar: 'ER'
    },
    {
      id: '4',
      title: 'Social Media Management',
      company: 'Local Business',
      value: '$12,000',
      probability: 40,
      stage: 'lead',
      closeDate: '2024-03-01',
      owner: 'David T.',
      avatar: 'DT'
    },
    {
      id: '5',
      title: 'Content Marketing Strategy',
      company: 'Marketing Plus',
      value: '$52,000',
      probability: 75,
      stage: 'proposal',
      closeDate: '2024-02-25',
      owner: 'Lisa M.',
      avatar: 'LM'
    },
    {
      id: '6',
      title: 'PPC Campaign Management',
      company: 'RetailCorp',
      value: '$35,000',
      probability: 95,
      stage: 'closed',
      closeDate: '2024-01-30',
      owner: 'John D.',
      avatar: 'JD'
    }
  ];

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedItem(dealId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    // In a real app, this would update the deal's stage
    console.log(`Moving deal ${draggedItem} to stage ${stage}`);
    setDraggedItem(null);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                <span className="text-sm text-gray-500">{stage.count}</span>
              </div>
              <div className={`h-1 rounded-full ${stage.color.replace('border-', 'bg-')} mb-2`}></div>
              <p className="text-sm font-medium text-gray-700">{stage.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {pipelineStages.map((stage) => (
          <div
            key={stage.id}
            className="bg-gray-100 rounded-lg p-4 min-h-screen"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{stage.title}</h3>
              <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            <div className="space-y-3">
              {deals
                .filter(deal => deal.stage === stage.id)
                .map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{deal.title}</h4>
                        <p className="text-sm text-gray-600">{deal.company}</p>
                      </div>
                      <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{deal.value}</span>
                      </div>
                      <span className={`text-sm font-medium ${getProbabilityColor(deal.probability)}`}>
                        {deal.probability}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{deal.closeDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                          {deal.avatar}
                        </div>
                        <span>{deal.owner}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;