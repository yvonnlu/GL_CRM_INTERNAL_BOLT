import React, { useState, useEffect } from 'react';
import { ExternalLink, FolderSync as Sync, CheckCircle, Clock, User, Calendar, Tag, Plus, Flag } from 'lucide-react';

interface ClickUpTask {
  id: string;
  name: string;
  description?: string;
  status: {
    status: string;
    color: string;
  };
  priority?: {
    priority: string;
    color: string;
  };
  assignees: Array<{
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
  }>;
  dueDate?: string;
  startDate?: string;
  tags: Array<{
    name: string;
    tagFg: string;
    tagBg: string;
  }>;
  list: {
    id: string;
    name: string;
  };
  folder: {
    id: string;
    name: string;
  };
  space: {
    id: string;
    name: string;
  };
  url: string;
  timeEstimate?: number;
  timeSpent?: number;
  customFields?: Array<{
    id: string;
    name: string;
    value: any;
  }>;
  dateCreated: string;
  dateUpdated: string;
}

interface ClickUpSpace {
  id: string;
  name: string;
  color?: string;
  private: boolean;
  statuses: Array<{
    status: string;
    color: string;
    orderindex: number;
  }>;
}

const ClickUpIntegration: React.FC = () => {
  const [activeView, setActiveView] = useState<'board' | 'list'>('board');
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [spaces, setSpaces] = useState<ClickUpSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // Mock ClickUp data
  useEffect(() => {
    const mockSpaces: ClickUpSpace[] = [
      {
        id: 'space-1',
        name: 'Marketing Agency',
        color: '#7B68EE',
        private: false,
        statuses: [
          { status: 'to do', color: '#d3d3d3', orderindex: 0 },
          { status: 'in progress', color: '#4194f6', orderindex: 1 },
          { status: 'review', color: '#f9d71c', orderindex: 2 },
          { status: 'done', color: '#6bc950', orderindex: 3 }
        ]
      },
      {
        id: 'space-2',
        name: 'Client Projects',
        color: '#FF6B6B',
        private: false,
        statuses: [
          { status: 'backlog', color: '#d3d3d3', orderindex: 0 },
          { status: 'active', color: '#4194f6', orderindex: 1 },
          { status: 'testing', color: '#f9d71c', orderindex: 2 },
          { status: 'completed', color: '#6bc950', orderindex: 3 }
        ]
      }
    ];

    const mockTasks: ClickUpTask[] = [
      {
        id: 'task-1',
        name: 'Design landing page mockups for TechCorp',
        description: 'Create wireframes and high-fidelity mockups for the new TechCorp campaign landing page',
        status: { status: 'in progress', color: '#4194f6' },
        priority: { priority: 'high', color: '#f50000' },
        assignees: [
          {
            id: 'user-1',
            username: 'sarah.johnson',
            email: 'sarah@agency.com',
            profilePicture: undefined
          }
        ],
        dueDate: '2024-02-15',
        startDate: '2024-02-10',
        tags: [
          { name: 'Design', tagFg: '#ffffff', tagBg: '#7B68EE' },
          { name: 'UI/UX', tagFg: '#ffffff', tagBg: '#FF6B6B' }
        ],
        list: { id: 'list-1', name: 'Design Tasks' },
        folder: { id: 'folder-1', name: 'TechCorp Project' },
        space: { id: 'space-1', name: 'Marketing Agency' },
        url: 'https://app.clickup.com/t/task-1',
        timeEstimate: 28800000,
        timeSpent: 14400000,
        dateCreated: '2024-02-10T09:00:00.000Z',
        dateUpdated: '2024-02-12T14:30:00.000Z'
      },
      {
        id: 'task-2',
        name: 'Set up Google Analytics for StartupXYZ',
        description: 'Configure GA4 tracking, set up conversion goals, and create custom dashboards',
        status: { status: 'review', color: '#f9d71c' },
        priority: { priority: 'medium', color: '#ffcc00' },
        assignees: [
          {
            id: 'user-2',
            username: 'mike.chen',
            email: 'mike@agency.com',
            profilePicture: undefined
          }
        ],
        dueDate: '2024-02-12',
        tags: [
          { name: 'Analytics', tagFg: '#ffffff', tagBg: '#4CAF50' },
          { name: 'Setup', tagFg: '#ffffff', tagBg: '#FF9800' }
        ],
        list: { id: 'list-2', name: 'Development Tasks' },
        folder: { id: 'folder-2', name: 'StartupXYZ Project' },
        space: { id: 'space-1', name: 'Marketing Agency' },
        url: 'https://app.clickup.com/t/task-2',
        timeEstimate: 14400000,
        timeSpent: 10800000,
        dateCreated: '2024-02-08T10:00:00.000Z',
        dateUpdated: '2024-02-11T16:45:00.000Z'
      },
      {
        id: 'task-3',
        name: 'Content calendar review for Marketing Plus',
        description: 'Review and approve social media content for the next month, ensure brand consistency',
        status: { status: 'completed', color: '#6bc950' },
        priority: { priority: 'high', color: '#f50000' },
        assignees: [
          {
            id: 'user-3',
            username: 'emma.rodriguez',
            email: 'emma@agency.com',
            profilePicture: undefined
          }
        ],
        dueDate: '2024-02-10',
        tags: [
          { name: 'Content', tagFg: '#ffffff', tagBg: '#9C27B0' },
          { name: 'Social Media', tagFg: '#ffffff', tagBg: '#E91E63' }
        ],
        list: { id: 'list-3', name: 'Content Tasks' },
        folder: { id: 'folder-3', name: 'Marketing Plus Project' },
        space: { id: 'space-2', name: 'Client Projects' },
        url: 'https://app.clickup.com/t/task-3',
        timeEstimate: 7200000,
        timeSpent: 7200000,
        dateCreated: '2024-02-05T09:00:00.000Z',
        dateUpdated: '2024-02-10T15:30:00.000Z'
      },
      {
        id: 'task-4',
        name: 'Email campaign analysis',
        description: 'Analyze performance metrics and prepare comprehensive report',
        status: { status: 'done', color: '#6bc950' },
        priority: { priority: 'low', color: '#28a745' },
        assignees: [
          {
            id: 'user-4',
            username: 'david.thompson',
            email: 'david@agency.com',
            profilePicture: undefined
          }
        ],
        dueDate: '2024-02-08',
        tags: [
          { name: 'Email', tagFg: '#ffffff', tagBg: '#FF5722' },
          { name: 'Analytics', tagFg: '#ffffff', tagBg: '#4CAF50' }
        ],
        list: { id: 'list-4', name: 'Marketing Tasks' },
        folder: { id: 'folder-4', name: 'Enterprise Ltd.' },
        space: { id: 'space-1', name: 'Marketing Agency' },
        url: 'https://app.clickup.com/t/task-4',
        timeEstimate: 10800000,
        timeSpent: 10800000,
        dateCreated: '2024-02-05T09:00:00.000Z',
        dateUpdated: '2024-02-08T17:00:00.000Z'
      },
      {
        id: 'task-5',
        name: 'Client presentation preparation',
        description: 'Prepare quarterly performance presentation for RetailCorp',
        status: { status: 'to do', color: '#d3d3d3' },
        priority: { priority: 'high', color: '#f50000' },
        assignees: [
          {
            id: 'user-5',
            username: 'lisa.martinez',
            email: 'lisa@agency.com',
            profilePicture: undefined
          }
        ],
        dueDate: '2024-02-20',
        tags: [
          { name: 'Presentation', tagFg: '#ffffff', tagBg: '#3F51B5' },
          { name: 'Reporting', tagFg: '#ffffff', tagBg: '#FF9800' }
        ],
        list: { id: 'list-5', name: 'Client Tasks' },
        folder: { id: 'folder-5', name: 'RetailCorp' },
        space: { id: 'space-1', name: 'Marketing Agency' },
        url: 'https://app.clickup.com/t/task-5',
        timeEstimate: 18000000,
        timeSpent: 0,
        dateCreated: '2024-02-10T09:00:00.000Z',
        dateUpdated: '2024-02-10T09:00:00.000Z'
      },
      {
        id: 'task-6',
        name: 'SEO audit completion',
        description: 'Complete comprehensive SEO audit and recommendations',
        status: { status: 'active', color: '#4194f6' },
        priority: { priority: 'medium', color: '#ffcc00' },
        assignees: [
          {
            id: 'user-6',
            username: 'john.davis',
            email: 'john@agency.com',
            profilePicture: undefined
          }
        ],
        dueDate: '2024-02-18',
        tags: [
          { name: 'SEO', tagFg: '#ffffff', tagBg: '#607D8B' },
          { name: 'Audit', tagFg: '#ffffff', tagBg: '#795548' }
        ],
        list: { id: 'list-6', name: 'SEO Tasks' },
        folder: { id: 'folder-6', name: 'Local Business' },
        space: { id: 'space-2', name: 'Client Projects' },
        url: 'https://app.clickup.com/t/task-6',
        timeEstimate: 21600000,
        timeSpent: 7200000,
        dateCreated: '2024-02-08T10:00:00.000Z',
        dateUpdated: '2024-02-12T15:30:00.000Z'
      }
    ];

    setTimeout(() => {
      setSpaces(mockSpaces);
      setTasks(mockTasks);
      setSelectedSpace('space-1');
      setLoading(false);
      setLastSync(new Date());
    }, 1000);
  }, []);

  const syncWithClickUp = async () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date());
    }, 2000);
  };

  const getUniqueStatuses = () => {
    const statuses = new Set<string>();
    tasks.forEach(task => statuses.add(task.status.status));
    return Array.from(statuses);
  };

  const getStatusColor = (status: string) => {
    const task = tasks.find(t => t.status.status === status);
    return task?.status.color || '#d3d3d3';
  };

  const getStatusTitle = (status: string) => {
    return status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

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

  const getInitials = (username: string) => {
    return username.split('.').map(n => n[0]).join('').toUpperCase();
  };

  const filteredTasks = selectedSpace
    ? tasks.filter(task => task.space.id === selectedSpace)
    : tasks;

  const formatTimeEstimate = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getProgressPercentage = (timeSpent: number, timeEstimate: number) => {
    if (!timeEstimate) return 0;
    return Math.min((timeSpent / timeEstimate) * 100, 100);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ClickUp tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">ClickUp Integration</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Last sync:</span>
              <span>{lastSync?.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveView('board')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeView === 'board'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Board
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeView === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                List
              </button>
            </div>

            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Spaces</option>
              {spaces.map(space => (
                <option key={space.id} value={space.id}>{space.name}</option>
              ))}
            </select>

            <button
              onClick={syncWithClickUp}
              disabled={syncing}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
            >
              <Sync className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{filteredTasks.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredTasks.filter(t => t.status.status === 'in progress' || t.status.status === 'active').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredTasks.filter(t => t.status.status === 'done' || t.status.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredTasks.filter(t => t.dueDate && isOverdue(t.dueDate)).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {activeView === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {getUniqueStatuses().map((status) => (
            <div key={status} className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStatusColor(status) }}
                  ></div>
                  <h3 className="font-semibold text-gray-900">{getStatusTitle(status)}</h3>
                  <span className="text-sm text-gray-500">
                    ({filteredTasks.filter(task => task.status.status === status).length})
                  </span>
                </div>
                <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>

              <div className="space-y-3">
                {filteredTasks
                  .filter(task => task.status.status === status)
                  .map((task) => (
                    <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 pr-2">{task.name}</h4>
                        <div className="flex items-center space-x-1">
                          {task.priority && getPriorityIcon(task.priority.priority)}
                          <a
                            href={task.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: tag.tagBg,
                              color: tag.tagFg
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>

                      {/* Time Tracking */}
                      {task.timeEstimate && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>
                              {task.timeSpent ? formatTimeEstimate(task.timeSpent) : '0h 0m'} / {formatTimeEstimate(task.timeEstimate)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(task.timeSpent || 0, task.timeEstimate)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className={`${task.dueDate && isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-600'}`}>
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {task.assignees.map((assignee, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                                {getInitials(assignee.username)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          <span>{task.space.name}</span>
                          <span className="mx-1">•</span>
                          <span>{task.folder.name}</span>
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
                  <th className="text-left p-4 font-medium text-gray-900">Progress</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.name}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-1 py-0.5 rounded text-xs font-medium"
                              style={{
                                backgroundColor: tag.tagBg,
                                color: tag.tagFg
                              }}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600">
                        <div>{task.space.name}</div>
                        <div className="text-xs text-gray-500">{task.folder.name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {task.assignees.map((assignee, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                              {getInitials(assignee.username)}
                            </div>
                            <span className="text-sm text-gray-600">{assignee.username}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      {task.priority && (
                        <span className={`text-sm font-medium ${getPriorityColor(task.priority.priority)}`}>
                          {task.priority.priority.charAt(0).toUpperCase() + task.priority.priority.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: task.status.color }}
                      >
                        {getStatusTitle(task.status.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${task.dueDate && isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-600'}`}>
                        {task.dueDate}
                      </span>
                    </td>
                    <td className="p-4">
                      {task.timeEstimate && (
                        <div className="w-20">
                          <div className="text-xs text-gray-600 mb-1">
                            {task.timeSpent ? formatTimeEstimate(task.timeSpent) : '0h 0m'} / {formatTimeEstimate(task.timeEstimate)}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-600 h-1 rounded-full"
                              style={{ width: `${getProgressPercentage(task.timeSpent || 0, task.timeEstimate)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <a
                        href={task.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No tasks found in the selected space</p>
        </div>
      )}
    </div>
  );
};

export default ClickUpIntegration;