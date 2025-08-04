'use client';

import { 
  FolderOpen, 
  Star, 
  Calendar,
  Eye,
  MessageSquare,
  Briefcase,
  Users,
  TrendingUp,
  Video,
  Palette,
  Bot,
  Code,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Projects',
      value: '47',
      icon: FolderOpen,
      color: 'bg-primary-500',
      trend: '+12% from last month'
    },
    {
      title: 'Active Clients',
      value: '23',
      icon: Users,
      color: 'bg-secondary-500',
      trend: '+8% from last month'
    },
    {
      title: 'This Month Revenue',
      value: '$28,450',
      icon: TrendingUp,
      color: 'bg-accent-500',
      trend: '+23% from last month'
    },
  ];

  const quickActions = [
    {
      title: 'Manage Projects',
      description: 'Add, edit, or delete project items',
      icon: FolderOpen,
      color: 'bg-primary-600',
      action: () => console.log('Navigate to projects')
    },
    {
      title: 'View Client Communications',
      description: 'Monitor client interactions and messages',
      icon: MessageSquare,
      color: 'bg-secondary-600',
      action: () => console.log('Navigate to communications')
    },
    {
      title: 'Manage Services',
      description: 'Update service offerings and pricing',
      icon: Briefcase,
      color: 'bg-accent-600',
      action: () => console.log('Navigate to services')
    },
    {
      title: 'View Analytics',
      description: 'See how projects perform with visitors',
      icon: Eye,
      color: 'bg-primary-700',
      action: () => console.log('Navigate to analytics')
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'YouTube Video Editing - Tech Channel',
      client: 'TechCreator Pro',
      status: 'In Progress',
      type: 'Video Editing',
      dueDate: '2025-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'Instagram Reels Package',
      client: 'FitnessInfluencer',
      status: 'Review',
      type: 'Short Form',
      dueDate: '2025-01-12',
      progress: 90
    },
    {
      id: 3,
      title: 'Brand Thumbnail Set',
      client: 'BusinessChannel',
      status: 'Completed',
      type: 'Design',
      dueDate: '2025-01-10',
      progress: 100
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
              case 'In Progress': return 'bg-accent-100 text-accent-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here&apos;s what&apos;s happening with your projects.</p>
        </div>
        <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-lg shadow-accent-500/20">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-green-400 text-xs mt-2">{stat.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 hover:bg-dark-800 transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                <p className="text-slate-400 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
          <button className="text-accent-400 hover:text-accent-300 text-sm font-medium">
            View All Projects →
          </button>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Project</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Client</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Type</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Due Date</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className="border-t border-slate-700 hover:bg-slate-800 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-medium">{project.title}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{project.client}</td>
                    <td className="py-4 px-6 text-slate-300">{project.type}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{project.dueDate}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-accent-500 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-300 text-sm">{project.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}