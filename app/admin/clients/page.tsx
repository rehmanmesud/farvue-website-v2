'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Mail,
  Phone,
  Calendar,
  Star,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  phone: string;
  joinDate: string;
  totalProjects: number;
  totalRevenue: number;
  status: 'Active' | 'Inactive' | 'Prospect';
  rating: number;
  lastContact: string;
  preferredPlatforms: string[];
  notes: string;
  projects: {
    id: string;
    name: string;
    status: string;
    budget: number;
  }[];
  communications: {
    id: string;
    type: 'email' | 'call' | 'meeting';
    date: string;
    subject: string;
    content: string;
  }[];
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data
  useEffect(() => {
    const mockClients: Client[] = [
      {
        id: '1',
        name: 'Alex Thompson',
        email: 'alex@techcreator.com',
        company: 'TechCreator Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
        phone: '+1 (555) 123-4567',
        joinDate: '2024-01-15',
        totalProjects: 8,
        totalRevenue: 24500,
        status: 'Active',
        rating: 5,
        lastContact: '2024-01-20',
        preferredPlatforms: ['YouTube', 'Instagram'],
        notes: 'High-value client, prefers quick turnaround times.',
        projects: [
          { id: 'p1', name: 'YouTube Channel Rebrand', status: 'In Progress', budget: 5000 },
          { id: 'p2', name: 'Instagram Content Package', status: 'Completed', budget: 3000 }
        ],
        communications: [
          { id: 'c1', type: 'email', date: '2024-01-20', subject: 'Project Update', content: 'Quick check on the YouTube rebrand progress...' },
          { id: 'c2', type: 'call', date: '2024-01-18', subject: 'Strategy Discussion', content: 'Discussed new content strategy for Q1...' }
        ]
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@fitnessinfluencer.com',
        company: 'FitnessInfluencer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face&auto=format',
        phone: '+1 (555) 987-6543',
        joinDate: '2023-11-20',
        totalProjects: 12,
        totalRevenue: 36000,
        status: 'Active',
        rating: 5,
        lastContact: '2024-01-19',
        preferredPlatforms: ['TikTok', 'Instagram', 'YouTube Shorts'],
        notes: 'Fitness content specialist, very collaborative and responsive.',
        projects: [
          { id: 'p3', name: 'TikTok Content Series', status: 'In Progress', budget: 4000 },
          { id: 'p4', name: 'Fitness App Promo Videos', status: 'Review', budget: 6000 }
        ],
        communications: [
          { id: 'c3', type: 'meeting', date: '2024-01-19', subject: 'Monthly Review', content: 'Reviewed performance metrics and planned next month...' }
        ]
      },
      {
        id: '3',
        name: 'Marcus Chen',
        email: 'marcus@businesschannel.com',
        company: 'Business Growth Channel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
        phone: '+1 (555) 456-7890',
        joinDate: '2023-09-10',
        totalProjects: 15,
        totalRevenue: 42000,
        status: 'Active',
        rating: 4,
        lastContact: '2024-01-17',
        preferredPlatforms: ['YouTube', 'LinkedIn'],
        notes: 'Business content focus, prefers data-driven approach.',
        projects: [
          { id: 'p5', name: 'LinkedIn Video Series', status: 'Completed', budget: 3500 },
          { id: 'p6', name: 'YouTube Thumbnails Package', status: 'In Progress', budget: 2000 }
        ],
        communications: [
          { id: 'c4', type: 'email', date: '2024-01-17', subject: 'Thumbnail Feedback', content: 'Provided feedback on the latest thumbnail designs...' }
        ]
      },
      {
        id: '4',
        name: 'Emma Rodriguez',
        email: 'emma@lifestyle.com',
        company: 'Lifestyle Content Co',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
        phone: '+1 (555) 321-0987',
        joinDate: '2024-01-05',
        totalProjects: 3,
        totalRevenue: 8500,
        status: 'Prospect',
        rating: 4,
        lastContact: '2024-01-15',
        preferredPlatforms: ['Instagram', 'Pinterest'],
        notes: 'New client, lifestyle and beauty content focus.',
        projects: [
          { id: 'p7', name: 'Instagram Story Templates', status: 'In Progress', budget: 2500 }
        ],
        communications: [
          { id: 'c5', type: 'call', date: '2024-01-15', subject: 'Onboarding Call', content: 'Initial discussion about project requirements...' }
        ]
      }
    ];
    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  // Filter clients based on search and status
  useEffect(() => {
    let filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status.toLowerCase() === statusFilter);
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Prospect': return 'bg-accent-100 text-accent-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Company,Status,Total Projects,Total Revenue,Last Contact\n" +
      filteredClients.map(client => 
        `${client.name},${client.email},${client.company},${client.status},${client.totalProjects},$${client.totalRevenue},${client.lastContact}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.totalRevenue, 0);
  const averageRating = filteredClients.reduce((sum, client) => sum + client.rating, 0) / filteredClients.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Management</h1>
          <p className="text-gray-400 mt-1">Manage client relationships, track communications, and monitor project history.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-lg shadow-accent-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Clients</p>
            <p className="text-2xl font-bold text-white mt-1">{filteredClients.length}</p>
            <p className="text-green-400 text-xs mt-2">+12% from last month</p>
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</p>
            <p className="text-green-400 text-xs mt-2">+18% from last month</p>
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Average Rating</p>
            <p className="text-2xl font-bold text-white mt-1">{averageRating.toFixed(1)}</p>
            <p className="text-green-400 text-xs mt-2">+0.2 from last month</p>
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Active Projects</p>
            <p className="text-2xl font-bold text-white mt-1">
              {filteredClients.reduce((sum, client) => sum + client.totalProjects, 0)}
            </p>
            <p className="text-green-400 text-xs mt-2">+5 this week</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients by name, email, or company..."
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </select>

            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white hover:bg-dark-700 transition-colors duration-200"
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Clients Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full border-2 border-dark-600"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors duration-200">
                      {client.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{client.company}</p>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => alert(`More actions for ${client.name}`)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Projects</span>
                  <span className="text-white font-medium">{client.totalProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Revenue</span>
                  <span className="text-white font-medium">${client.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Rating</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setShowDetailModal(true);
                  }}
                  className="flex-1 px-3 py-2 bg-accent-600 hover:bg-accent-700 text-white text-sm rounded-lg transition-colors duration-200"
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  View Details
                </button>
                <button 
                  onClick={() => alert(`Edit ${client.name}`)}
                  className="px-3 py-2 bg-dark-800 hover:bg-dark-700 text-white text-sm rounded-lg transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert(`Delete ${client.name}?`)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800 border-b border-dark-700">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Client</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Company</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Projects</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Revenue</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rating</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Last Contact</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr key={client.id} className={index % 2 === 0 ? 'bg-dark-900' : 'bg-dark-800'}>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="w-10 h-10 rounded-full border-2 border-dark-600"
                        />
                        <div>
                          <p className="text-white font-medium">{client.name}</p>
                          <p className="text-gray-400 text-sm">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{client.company}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{client.totalProjects}</td>
                    <td className="py-4 px-6 text-gray-300">${client.totalRevenue.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{client.lastContact}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedClient(client);
                            setShowDetailModal(true);
                          }}
                          className="p-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => alert(`Edit ${client.name}`)}
                          className="p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => alert(`Delete ${client.name}?`)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {showDetailModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-900 border border-dark-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-dark-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedClient.avatar}
                    alt={selectedClient.name}
                    className="w-16 h-16 rounded-full border-2 border-dark-600"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                    <p className="text-gray-400">{selectedClient.company}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedClient.status)}`}>
                        {selectedClient.status}
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < selectedClient.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">Joined {selectedClient.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Preferred Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.preferredPlatforms.map((platform, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent-600 text-white text-sm rounded-full"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                    <p className="text-gray-300 bg-dark-800 p-4 rounded-lg">{selectedClient.notes}</p>
                  </div>
                </div>

                {/* Projects and Communications */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
                    <div className="space-y-3">
                      {selectedClient.projects.map((project) => (
                        <div key={project.id} className="bg-dark-800 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{project.name}</h4>
                            <span className="text-sm text-gray-400">${project.budget.toLocaleString()}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            project.status === 'In Progress' ? 'bg-accent-100 text-accent-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Communications</h3>
                    <div className="space-y-3">
                      {selectedClient.communications.map((comm) => (
                        <div key={comm.id} className="bg-dark-800 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {comm.type === 'email' && <Mail className="w-4 h-4 text-gray-400" />}
                              {comm.type === 'call' && <Phone className="w-4 h-4 text-gray-400" />}
                              {comm.type === 'meeting' && <Calendar className="w-4 h-4 text-gray-400" />}
                              <h4 className="text-white font-medium">{comm.subject}</h4>
                            </div>
                            <span className="text-sm text-gray-400">{comm.date}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{comm.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-dark-700">
              <div className="flex gap-4">
                <button 
                  onClick={() => alert(`Send message to ${selectedClient.name}`)}
                  className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200"
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Send Message
                </button>
                <button 
                  onClick={() => alert(`Create new project for ${selectedClient.name}`)}
                  className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  New Project
                </button>
                <button 
                  onClick={() => alert(`Edit ${selectedClient.name} details`)}
                  className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}