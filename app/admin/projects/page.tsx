'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Grid,
  List,
  Download,
  FileText,
  AlertCircle,
  X
} from 'lucide-react';
import { Project, ProjectFilter } from '@/lib/types/admin';
import { mockProjects, exportProjectsToCSV } from '@/lib/data/projects';
import ProjectsHeader from '@/components/admin/projects/ProjectsHeader';
import ProjectCard from '@/components/admin/projects/ProjectCard';
import CreateProjectModal from '@/components/admin/projects/CreateProjectModal';

export default function ProjectsPage() {
  // State Management
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ProjectFilter>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status' | 'progress' | 'budget'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter and Search Logic
  const applyFiltersAndSearch = useMemo(() => {
    let filtered = [...projects];

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.client.name.toLowerCase().includes(search) ||
        project.client.company.toLowerCase().includes(search) ||
        project.assignedTeam.some(member => 
          member.name.toLowerCase().includes(search)
        ) ||
        project.tags.some(tag => 
          tag.toLowerCase().includes(search)
        )
      );
    }

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(project => filters.status!.includes(project.status));
    }

    if (filters.serviceType && filters.serviceType.length > 0) {
      filtered = filtered.filter(project => filters.serviceType!.includes(project.serviceType));
    }

    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter(project => filters.priority!.includes(project.priority));
    }

    if (filters.assignedTeam && filters.assignedTeam.length > 0) {
      filtered = filtered.filter(project =>
        project.assignedTeam.some(member => filters.assignedTeam!.includes(member.id))
      );
    }

    if (filters.client && filters.client.length > 0) {
      filtered = filtered.filter(project => filters.client!.includes(project.client.id));
    }

    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      
      filtered = filtered.filter(project => {
        const dueDate = new Date(project.dueDate);
        return dueDate >= startDate && dueDate <= endDate;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case 'priority':
          const priorityOrder = { low: 1, medium: 2, high: 3, urgent: 4 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'status':
          const statusOrder = { 
            'not-started': 1, 
            'in-progress': 2, 
            'in-review': 3, 
            'revision': 4, 
            'completed': 5, 
            'on-hold': 6, 
            'cancelled': 7 
          };
          aValue = statusOrder[a.status];
          bValue = statusOrder[b.status];
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'budget':
          aValue = a.budget;
          bValue = b.budget;
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [projects, searchTerm, filters, sortBy, sortOrder]);

  // Update filtered projects when dependencies change
  useEffect(() => {
    setFilteredProjects(applyFiltersAndSearch);
  }, [applyFiltersAndSearch]);

  // Project Management Functions
  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      id: (projects.length + 1).toString(),
      progress: 0,
      actualHours: 0,
      deliverables: [],
      revisions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '1',
      ...projectData
    } as Project;

    setProjects(prev => [newProject, ...prev]);
    setShowCreateModal(false);
    
    // Show success notification (you can implement a toast system)
    console.log('Project created successfully:', newProject.title);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowCreateModal(true);
  };

  const handleUpdateProject = (projectData: Partial<Project>) => {
    if (!editingProject) return;

    const updatedProject = {
      ...editingProject,
      ...projectData,
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => 
      prev.map(p => p.id === editingProject.id ? updatedProject : p)
    );

    setEditingProject(null);
    setShowCreateModal(false);
    
    console.log('Project updated successfully:', updatedProject.title);
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      console.log('Project deleted successfully');
    }
  };

  const handleStatusChange = (projectId: string, newStatus: Project['status']) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedProject = {
            ...p,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };

          // Auto-update progress based on status
          if (newStatus === 'completed') {
            updatedProject.progress = 100;
            updatedProject.completedDate = new Date().toISOString();
          } else if (newStatus === 'in-progress' && p.progress === 0) {
            updatedProject.progress = 25;
          } else if (newStatus === 'in-review' && p.progress < 80) {
            updatedProject.progress = 80;
          }

          return updatedProject;
        }
        return p;
      })
    );

    console.log(`Project status updated to: ${newStatus}`);
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleExportProjects = () => {
    const csvContent = exportProjectsToCSV(filteredProjects);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `projects_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    console.log('Projects exported successfully');
  };

  // Generate PDF Export (placeholder for actual implementation)
  const handleExportPDF = async () => {
    // This would integrate with a PDF library like jsPDF or Puppeteer
    console.log('PDF export would be implemented here');
    
    // For now, show an alert
    alert('PDF export feature would be implemented with a library like jsPDF or react-pdf');
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleFilterChange = (newFilters: ProjectFilter) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header Component */}
      <ProjectsHeader
        onCreateProject={() => setShowCreateModal(true)}
        onExportProjects={handleExportProjects}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        totalProjects={projects.length}
      />

      {/* View Controls & Sorting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          
          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 bg-slate-800 border border-slate-600 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="progress">Progress</option>
              <option value="budget">Budget</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-2 py-1 bg-slate-800 border border-slate-600 rounded text-sm text-white hover:bg-slate-700 transition-colors duration-200"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Export Options */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportProjects}
              className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm rounded border border-slate-600 transition-colors duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>CSV</span>
            </button>
            
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm rounded border border-slate-600 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800 border border-slate-600 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            {searchTerm || Object.values(filters).some(Boolean)
              ? 'No projects match your current search and filter criteria. Try adjusting your filters or search terms.'
              : 'Get started by creating your first project.'
            }
          </p>
          <div className="flex justify-center space-x-3">
            {(searchTerm || Object.values(filters).some(Boolean)) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({});
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Create Project
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingProject(null);
          }}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          editProject={editingProject}
        />
      )}

      {/* Project Details Modal - Placeholder for future implementation */}
      {showDetailsModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-400">
                Detailed project view would be implemented here with:
              </p>
              <ul className="mt-4 space-y-2 text-slate-300">
                <li>• Full project timeline and milestones</li>
                <li>• Deliverable management with upload/download</li>
                <li>• Revision history and client feedback</li>
                <li>• Team communication and notes</li>
                <li>• Time tracking and budget analysis</li>
                <li>• Client approval workflow</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}