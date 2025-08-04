'use client';

import { useState } from 'react';
import { 
  Calendar,
  DollarSign,
  Clock,
  Users,
  FileText,
  Eye,
  Edit,
  Trash2,
  Star,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  MoreHorizontal,
  MessageSquare,
  Upload,
  Download,
  Tag
} from 'lucide-react';
import { Project } from '@/lib/types/admin';
import { 
  getProjectStatusColor, 
  getPriorityColor, 
  formatCurrency,
  calculateProjectProgress 
} from '@/lib/data/projects';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onViewDetails: (project: Project) => void;
  onStatusChange: (projectId: string, status: Project['status']) => void;
}

export default function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onViewDetails, 
  onStatusChange 
}: ProjectCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [showDeliverables, setShowDeliverables] = useState(false);

  const progress = calculateProjectProgress(project);
  const isOverdue = new Date(project.dueDate) < new Date() && project.status !== 'completed';
  const daysUntilDue = Math.ceil((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getServiceTypeIcon = () => {
    switch (project.serviceType) {
      case 'video-editing':
        return <PlayCircle className="w-5 h-5" />;
      case 'short-form':
        return <PlayCircle className="w-5 h-5" />;
      case 'design':
        return <Star className="w-5 h-5" />;
      case 'web-development':
        return <FileText className="w-5 h-5" />;
      case 'ai-automation':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusIcon = () => {
    switch (project.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <PlayCircle className="w-4 h-4 text-accent-500" />;
      case 'on-hold':
        return <PauseCircle className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const quickStatusActions = [
    { status: 'in-progress' as const, label: 'Start', icon: PlayCircle },
    { status: 'in-review' as const, label: 'Review', icon: Eye },
    { status: 'completed' as const, label: 'Complete', icon: CheckCircle },
    { status: 'on-hold' as const, label: 'Hold', icon: PauseCircle }
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200 group">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              project.priority === 'urgent' ? 'bg-red-500' :
              project.priority === 'high' ? 'bg-orange-500' :
              project.priority === 'medium' ? 'bg-accent-500' : 'bg-green-500'
            }`}>
              {getServiceTypeIcon()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProjectStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
                {isOverdue && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                    OVERDUE
                  </span>
                )}
              </div>
              <p className={`text-xs font-medium mt-1 ${getPriorityColor(project.priority)}`}>
                {project.priority.toUpperCase()} PRIORITY
              </p>
            </div>
          </div>

          {/* Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                <div className="py-2">
                  <button
                    onClick={() => onViewDetails(project)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => onEdit(project)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Project</span>
                  </button>
                  <div className="border-t border-slate-700 my-2"></div>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Project</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors duration-200 line-clamp-2">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Client Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={project.client.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format'}
            alt={project.client.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-white">{project.client.name}</p>
            <p className="text-xs text-slate-400">{project.client.company}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs text-slate-300">{progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              progress === 100 ? 'bg-green-500' :
              progress >= 75 ? 'bg-accent-500' :
              progress >= 50 ? 'bg-yellow-500' : 'bg-slate-500'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="px-6 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Budget</p>
              <p className="text-sm font-medium text-white">{formatCurrency(project.budget)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Hours</p>
              <p className="text-sm font-medium text-white">{project.actualHours}/{project.estimatedHours}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Due Date</p>
              <p className={`text-sm font-medium ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                {new Date(project.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">
              {isOverdue ? 'Overdue by' : 'Due in'}
            </p>
            <p className={`text-sm font-medium ${isOverdue ? 'text-red-400' : 'text-white'}`}>
              {Math.abs(daysUntilDue)} day{Math.abs(daysUntilDue) !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Assigned Team */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Team</span>
          </div>
          <div className="flex -space-x-2">
            {project.assignedTeam.slice(0, 3).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                title={member.name}
                className="w-8 h-8 rounded-full border-2 border-slate-900"
              />
            ))}
            {project.assignedTeam.length > 3 && (
              <div className="w-8 h-8 bg-slate-700 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="text-xs text-slate-300">+{project.assignedTeam.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="px-6 mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-600"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-600">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Deliverables Summary */}
      {project.deliverables.length > 0 && (
        <div className="px-6 mb-4">
          <button
            onClick={() => setShowDeliverables(!showDeliverables)}
            className="flex items-center justify-between w-full p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">
                {project.deliverables.length} Deliverable{project.deliverables.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {project.revisions.length > 0 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {project.revisions.length} Revision{project.revisions.length !== 1 ? 's' : ''}
                </span>
              )}
              {showDeliverables ? (
                <span className="text-slate-400">−</span>
              ) : (
                <span className="text-slate-400">+</span>
              )}
            </div>
          </button>

          {showDeliverables && (
            <div className="mt-3 space-y-2">
              {project.deliverables.map((deliverable) => (
                <div key={deliverable.id} className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
                      {deliverable.type === 'video' && <PlayCircle className="w-3 h-3 text-slate-400" />}
                      {deliverable.type === 'image' && <Star className="w-3 h-3 text-slate-400" />}
                      {deliverable.type === 'document' && <FileText className="w-3 h-3 text-slate-400" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{deliverable.name}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(deliverable.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors duration-200">
                    <Download className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Card Footer - Quick Actions */}
      <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50">
        <div className="flex items-center justify-between">
          {/* Quick Status Actions */}
          <div className="flex items-center space-x-2">
            {quickStatusActions
              .filter(action => action.status !== project.status)
              .slice(0, 2)
              .map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.status}
                    onClick={() => onStatusChange(project.id, action.status)}
                    className="flex items-center space-x-1 px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-xs rounded transition-colors duration-200"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
          </div>

          {/* Additional Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200 group">
              <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200 group">
              <Upload className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
            <button
              onClick={() => onViewDetails(project)}
              className="px-3 py-1 bg-accent-600 hover:bg-accent-700 text-white text-xs rounded transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}