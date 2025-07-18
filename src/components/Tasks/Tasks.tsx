import React, { useState } from 'react';
import { Plus, Calendar, User, Flag, CheckCircle, Circle, Clock } from 'lucide-react';

const Tasks: React.FC = () => {
  const [activeView, setActiveView] = useState<'board' | 'list'>('board');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-yellow-500' },
    { id: 'review', title: 'Review', color: 'bg-purple-500' },
    { id: 'done', title: 'Done', color: 'bg-green-500' }
  ];

  const tasks = [
    {
      id: '1',
      title: 'Design landing page mockups',
      description: 'Create wireframes and high-fidelity mockups for TechCorp campaign',
      assignee: 'Sarah J.',
      avatar: 'SJ',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-02-15',
      tags: ['Design', 'UI/UX'],
      project: 'TechCorp Campaign'
    },
    {
      id: '2',
      title: 'Set up Google Analytics',
      description: 'Configure GA4 tracking for new client website',
      assignee: 'Mike C.',
      avatar: 'MC',
      priority: 'medium',
      status: 'inprogress',
      dueDate: '2024-02-12',
      tags: ['Analytics', 'Setup'],
      project: 'StartupXYZ'
    },
    {
      id: '3',
      title: 'Content calendar review',
      description: 'Review and approve social media content for next month',
      assignee: 'Emma R.',
      avatar: 'ER',
      priority: 'high',
      status: 'review',
      dueDate: '2024-02-10',
      tags: ['Content', 'Social Media'],
      project: 'Marketing Plus'
    },
    {
      id: '4',
      title: 'Email campaign analysis',
      description: 'Analyze performance metrics and prepare report',
      assignee: 'David T.',
      avatar: 'DT',
      priority: 'low',
      status: 'done',
      dueDate: '2024-02-08',
      tags: ['Email', 'Analytics'],
      project: 'Enterprise Ltd.'
    },
    {
      id: '5',
      title: 'Client presentation prep',
      description: 'Prepare quarterly performance presentation',
      assignee: 'Lisa M.',
      avatar: 'LM',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-02-20',
      tags: ['Presentation', 'Reporting'],
      project: 'RetailCorp'
    },
    {
      id: '6',
      title: 'SEO audit completion',
      description: 'Complete comprehensive SEO audit and recommendations',
      assignee: 'John D.',
      avatar: 'JD',
      priority: 'medium',
      status: 'inprogress',
      dueDate: '2024-02-18',
      tags: ['SEO', 'Audit'],
      project: 'Local Business'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="w-4 h-4 text-red-600" />;
      case 'medium': return <Flag className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Flag className="w-4 h-4 text-green-600" />;
      default: return <Flag className="w-4 h-4 text-gray-600" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Tasks & Projects</h2>
          <div className="flex items-center space-x-3">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveView('board')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'board' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Board
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'inprogress').length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'done').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => isOverdue(t.dueDate)).length}</p>
              </div>
              <Flag className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {activeView === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <span className="text-sm text-gray-500">
                    ({tasks.filter(task => task.status === column.id).length})
                  </span>
                </div>
                <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>

              <div className="space-y-3">
                {tasks
                  .filter(task => task.status === column.id)
                  .map((task) => (
                    <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 pr-2">{task.title}</h4>
                        {getPriorityIcon(task.priority)}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className={`${isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-600'}`}>
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                            {task.avatar}
                          </div>
                          <span className="text-gray-600">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Task</th>
                  <th className="text-left p-4 font-medium text-gray-900">Project</th>
                  <th className="text-left p-4 font-medium text-gray-900">Assignee</th>
                  <th className="text-left p-4 font-medium text-gray-900">Priority</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{task.project}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                          {task.avatar}
                        </div>
                        <span className="text-sm text-gray-600">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'todo' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'inprogress' ? 'bg-yellow-100 text-yellow-800' :
                        task.status === 'review' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.status === 'todo' ? 'To Do' :
                         task.status === 'inprogress' ? 'In Progress' :
                         task.status === 'review' ? 'Review' :
                         'Done'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-600'}`}>
                        {task.dueDate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;