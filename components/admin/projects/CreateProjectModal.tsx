'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Calendar, 
  DollarSign, 
  Users, 
  Tag,
  FileText,
  Clock,
  Star,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { Project, User, Client } from '@/lib/types/admin';
import { mockTeamMembers, mockClients } from '@/lib/data/projects';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Partial<Project>) => void;
  editProject?: Project | null;
}

export default function CreateProjectModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editProject 
}: CreateProjectModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    client: undefined,
    assignedTeam: [],
    serviceType: 'video-editing',
    status: 'not-started',
    priority: 'medium',
    budget: 0,
    estimatedHours: 0,
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    tags: [],
    clientNotes: '',
    internalNotes: ''
  });

  const [selectedTeamMembers, setSelectedTeamMembers] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  // Pre-fill form when editing
  useEffect(() => {
    if (editProject) {
      setFormData({
        title: editProject.title,
        description: editProject.description,
        client: editProject.client,
        assignedTeam: editProject.assignedTeam,
        serviceType: editProject.serviceType,
        status: editProject.status,
        priority: editProject.priority,
        budget: editProject.budget,
        estimatedHours: editProject.estimatedHours,
        startDate: editProject.startDate,
        dueDate: editProject.dueDate,
        tags: editProject.tags,
        clientNotes: editProject.clientNotes,
        internalNotes: editProject.internalNotes
      });
      setSelectedTeamMembers(editProject.assignedTeam);
      setSelectedClient(editProject.client);
    }
  }, [editProject]);

  const handleInputChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamMemberToggle = (member: User) => {
    const isSelected = selectedTeamMembers.some(m => m.id === member.id);
    
    if (isSelected) {
      setSelectedTeamMembers(prev => prev.filter(m => m.id !== member.id));
    } else {
      setSelectedTeamMembers(prev => [...prev, member]);
    }
  };

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    handleInputChange('client', client);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      const updatedTags = [...(formData.tags || []), newTag.trim()];
      handleInputChange('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = formData.tags?.filter(tag => tag !== tagToRemove) || [];
    handleInputChange('tags', updatedTags);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!selectedClient) {
      newErrors.client = 'Please select a client';
    }

    if (selectedTeamMembers.length === 0) {
      newErrors.assignedTeam = 'Please assign at least one team member';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if ((formData.budget || 0) <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }

    if ((formData.estimatedHours || 0) <= 0) {
      newErrors.estimatedHours = 'Estimated hours must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const projectData: Partial<Project> = {
      ...formData,
      assignedTeam: selectedTeamMembers,
      client: selectedClient!,
      progress: editProject ? editProject.progress : 0,
      actualHours: editProject ? editProject.actualHours : 0,
      deliverables: editProject ? editProject.deliverables : [],
      revisions: editProject ? editProject.revisions : [],
      createdAt: editProject ? editProject.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '1' // Current user ID
    };

    onSubmit(projectData);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate basic info before proceeding
      const basicErrors: Record<string, string> = {};
      if (!formData.title?.trim()) basicErrors.title = 'Required';
      if (!formData.description?.trim()) basicErrors.description = 'Required';
      if (!selectedClient) basicErrors.client = 'Required';
      
      if (Object.keys(basicErrors).length > 0) {
        setErrors(basicErrors);
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {editProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-slate-400 mt-1">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Basic Information' :
                currentStep === 2 ? 'Team & Timeline' : 'Additional Details'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-slate-800/50">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    step < currentStep ? 'bg-blue-600' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title..."
                    className={`w-full px-4 py-3 bg-slate-800 border ${
                      errors.title ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the project requirements, goals, and deliverables..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-slate-800 border ${
                      errors.description ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Client *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockClients.map((client) => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => handleClientSelect(client)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedClient?.id === client.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={client.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format'}
                            alt={client.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-white">{client.name}</p>
                            <p className="text-sm text-slate-400">{client.company}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.client && <p className="text-red-400 text-sm mt-1">{errors.client}</p>}
                </div>

                {/* Service Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Service Type
                    </label>
                    <select
                      value={formData.serviceType || 'video-editing'}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="video-editing">Video Editing</option>
                      <option value="short-form">Short Form Content</option>
                      <option value="design">Design</option>
                      <option value="web-development">Web Development</option>
                      <option value="ai-automation">AI Automation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority || 'medium'}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Team & Timeline */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Team Assignment */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Assign Team Members *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockTeamMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => handleTeamMemberToggle(member)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedTeamMembers.some(m => m.id === member.id)
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-white">{member.name}</p>
                              <p className="text-sm text-slate-400">{member.role}</p>
                            </div>
                          </div>
                          {selectedTeamMembers.some(m => m.id === member.id) && (
                            <Check className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {member.skills.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.skills.length > 2 && (
                              <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                                +{member.skills.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.assignedTeam && <p className="text-red-400 text-sm mt-1">{errors.assignedTeam}</p>}
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate || ''}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate || ''}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-800 border ${
                        errors.dueDate ? 'border-red-500' : 'border-slate-600'
                      } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.dueDate && <p className="text-red-400 text-sm mt-1">{errors.dueDate}</p>}
                  </div>
                </div>

                {/* Budget & Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Budget (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.budget || ''}
                        onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className={`w-full pl-10 pr-4 py-3 bg-slate-800 border ${
                          errors.budget ? 'border-red-500' : 'border-slate-600'
                        } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {errors.budget && <p className="text-red-400 text-sm mt-1">{errors.budget}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Estimated Hours *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.estimatedHours || ''}
                        onChange={(e) => handleInputChange('estimatedHours', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className={`w-full pl-10 pr-4 py-3 bg-slate-800 border ${
                          errors.estimatedHours ? 'border-red-500' : 'border-slate-600'
                        } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {errors.estimatedHours && <p className="text-red-400 text-sm mt-1">{errors.estimatedHours}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-blue-700 rounded-full p-1 transition-colors duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Client Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Client Notes
                  </label>
                  <textarea
                    value={formData.clientNotes || ''}
                    onChange={(e) => handleInputChange('clientNotes', e.target.value)}
                    placeholder="Any specific client requirements or feedback..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Internal Notes
                  </label>
                  <textarea
                    value={formData.internalNotes || ''}
                    onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                    placeholder="Internal team notes, technical requirements, etc..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Project Status (only when editing) */}
                {editProject && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Status
                    </label>
                    <select
                      value={formData.status || 'not-started'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="in-review">In Review</option>
                      <option value="revision">Revision</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-700">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
              >
                Cancel
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {editProject ? 'Update Project' : 'Create Project'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}