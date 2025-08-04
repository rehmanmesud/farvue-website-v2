'use client';

import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Filter, 
  Search,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';
import { Project, ProjectFilter } from '@/lib/types/admin';
import { mockProjectStats } from '@/lib/data/projects';

interface ProjectsHeaderProps {
  onCreateProject: () => void;
  onExportProjects: () => void;
  onFilterChange: (filters: ProjectFilter) => void;
  onSearchChange: (search: string) => void;
  totalProjects: number;
}

export default function ProjectsHeader({ 
  onCreateProject, 
  onExportProjects, 
  onFilterChange,
  onSearchChange,
  totalProjects 
}: ProjectsHeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProjectFilter>({});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleFilterChange = (key: keyof ProjectFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-white">{mockProjectStats.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">+12% from last month</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Projects</p>
              <p className="text-2xl font-bold text-white">{mockProjectStats.activeProjects}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">+8% from last week</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Overdue</p>
              <p className="text-2xl font-bold text-white">{mockProjectStats.overdueProjects}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-red-400 text-xs mt-2">Needs attention</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${mockProjectStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">+23% from last month</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Management</h1>
          <p className="text-slate-400 mt-1">
            Manage all your client projects, track progress, and collaborate with your team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportProjects}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={onCreateProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects, clients, or team members..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors duration-200 ${
              showFilters || activeFiltersCount > 0
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <select
                onChange={(e) => handleFilterChange('status', e.target.value ? [e.target.value] : undefined)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="revision">Revision</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Service Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Service Type
              </label>
              <select
                onChange={(e) => handleFilterChange('serviceType', e.target.value ? [e.target.value] : undefined)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Services</option>
                <option value="video-editing">Video Editing</option>
                <option value="short-form">Short Form</option>
                <option value="design">Design</option>
                <option value="web-development">Web Development</option>
                <option value="ai-automation">AI Automation</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <select
                onChange={(e) => handleFilterChange('priority', e.target.value ? [e.target.value] : undefined)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Due Date
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    const today = new Date();
                    let endDate = new Date();
                    
                    switch (e.target.value) {
                      case 'week':
                        endDate.setDate(today.getDate() + 7);
                        break;
                      case 'month':
                        endDate.setMonth(today.getMonth() + 1);
                        break;
                      case 'overdue':
                        endDate = today;
                        break;
                    }
                    
                    handleFilterChange('dateRange', {
                      start: today.toISOString().split('T')[0],
                      end: endDate.toISOString().split('T')[0]
                    });
                  } else {
                    handleFilterChange('dateRange', undefined);
                  }
                }}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Dates</option>
                <option value="week">Due This Week</option>
                <option value="month">Due This Month</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          {activeFiltersCount > 0 && (
            <div className="flex justify-end mt-4 pt-4 border-t border-slate-700">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}