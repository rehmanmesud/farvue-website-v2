'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  Upload,
  Settings,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Download
} from 'lucide-react';
import { TeamMember, TeamSettings } from '@/lib/types/admin';
import { 
  getAllTeamMembers,
  getTeamSettings,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberVisibility,
  updateTeamMemberOrder,
  updateTeamSettings,
  getTeamStats,
  exportTeamData,
  importTeamData
} from '@/lib/data/cms-team';

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(getAllTeamMembers());
  const [teamSettings, setTeamSettings] = useState<TeamSettings>(getTeamSettings());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Refresh team data
  const refreshTeam = () => {
    setTeamMembers(getAllTeamMembers());
    setTeamSettings(getTeamSettings());
    console.log('🔄 Admin team data refreshed');
  };

  // Handle member creation
  const handleCreateMember = (memberData: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMember = addTeamMember(memberData);
    refreshTeam();
    setShowCreateModal(false);
    console.log('Team member created:', newMember.name);
  };

  // Handle member update
  const handleUpdateMember = (id: string, updatedData: Partial<TeamMember>) => {
    updateTeamMember(id, updatedData);
    refreshTeam();
    setEditingMember(null);
    console.log('Team member updated');
  };

  // Handle member deletion
  const handleDeleteMember = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (window.confirm(`Are you sure you want to delete "${member?.name}"? This action cannot be undone.`)) {
      deleteTeamMember(id);
      refreshTeam();
      console.log('Team member deleted');
    }
  };

  // Handle visibility toggle
  const handleToggleVisibility = (id: string) => {
    toggleTeamMemberVisibility(id);
    refreshTeam();
  };

  // Handle order change
  const handleOrderChange = (id: string, direction: 'up' | 'down') => {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;

    const newOrder = direction === 'up' ? member.order - 1 : member.order + 1;
    updateTeamMemberOrder(id, newOrder);
    refreshTeam();
  };

  // Handle settings update
  const handleUpdateSettings = (newSettings: Partial<TeamSettings>) => {
    updateTeamSettings(newSettings);
    setTeamSettings(getTeamSettings());
    setShowSettingsModal(false);
    console.log('Team settings updated');
  };

  // Export team data
  const handleExport = () => {
    const data = exportTeamData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farvue-team-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = getTeamStats();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-accent-500" />
            Team Management
          </h1>
          <p className="text-gray-400 mt-1">Manage your team members and section settings</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={refreshTeam}
            className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors duration-200 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white">{stats.totalMembers}</p>
            </div>
            <div className="p-3 bg-primary-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Visible Members</p>
              <p className="text-2xl font-bold text-white">{stats.visibleMembers}</p>
            </div>
            <div className="p-3 bg-secondary-500 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hidden Members</p>
              <p className="text-2xl font-bold text-white">{stats.hiddenMembers}</p>
            </div>
            <div className="p-3 bg-accent-500 rounded-lg">
              <EyeOff className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Team Members</h2>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          {teamMembers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No team members yet</h3>
              <p className="text-gray-500 mb-6">Add your first team member to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200"
              >
                Add Team Member
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-dark-800">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Order</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Member</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Role</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Skills</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.sort((a, b) => a.order - b.order).map((member) => (
                  <tr key={member.id} className="border-b border-dark-700 hover:bg-dark-800 transition-colors duration-200">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{member.order}</span>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => handleOrderChange(member.id, 'up')}
                            className="p-1 text-gray-400 hover:text-white"
                            disabled={member.order === 1}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleOrderChange(member.id, 'down')}
                            className="p-1 text-gray-400 hover:text-white"
                            disabled={member.order === teamMembers.length}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-gray-400 text-sm truncate max-w-xs">{member.bio}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-300">{member.role}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {member.skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 2 && (
                          <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded">
                            +{member.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleVisibility(member.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          member.isVisible
                            ? 'bg-secondary-600 hover:bg-secondary-700 text-white'
                            : 'bg-dark-700 hover:bg-dark-600 text-gray-400'
                        }`}
                      >
                        {member.isVisible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
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
          )}
        </div>
      </div>

      {/* Create/Edit Member Modal */}
      {(showCreateModal || editingMember) && (
        <TeamMemberModal
          member={editingMember}
          onSave={editingMember ? 
            (data) => handleUpdateMember(editingMember.id, data) : 
            handleCreateMember
          }
          onClose={() => {
            setShowCreateModal(false);
            setEditingMember(null);
          }}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <TeamSettingsModal
          settings={teamSettings}
          onSave={handleUpdateSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}

// Team Member Modal Component
function TeamMemberModal({
  member,
  onSave,
  onClose
}: {
  member?: TeamMember | null;
  onSave: (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> | Partial<TeamMember>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    role: member?.role || '',
    image: member?.image || '',
    bio: member?.bio || '',
    skills: member?.skills || [''],
    social: {
      linkedin: member?.social.linkedin || '',
      twitter: member?.social.twitter || '',
      instagram: member?.social.instagram || '',
      github: member?.social.github || '',
      website: member?.social.website || ''
    },
    order: member?.order || 1,
    isVisible: member?.isVisible ?? true
  });

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSave = () => {
    const skillsFiltered = formData.skills.filter(skill => skill.trim() !== '');
    onSave({
      ...formData,
      skills: skillsFiltered
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 border border-dark-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {member ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter member name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter role/position"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-20 h-20 rounded-lg object-cover" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Brief description about the team member"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
            <div className="space-y-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder="Enter skill"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addSkill}
                className="text-accent-400 hover:text-accent-300 text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">Social Links</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.social).map(([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm text-gray-400 mb-1 capitalize">{platform}</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setFormData({
                      ...formData,
                      social: { ...formData.social, [platform]: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder={`${platform} URL`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Visibility</label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-300">Show on website</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-dark-700 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
}

// Team Settings Modal Component
function TeamSettingsModal({
  settings,
  onSave,
  onClose
}: {
  settings: TeamSettings;
  onSave: (data: Partial<TeamSettings>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    sectionLabel: settings.sectionLabel,
    heading: settings.heading,
    description: settings.description,
    buttonText: settings.buttonText,
    buttonUrl: settings.buttonUrl,
    showStats: settings.showStats,
    isVisible: settings.isVisible
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 border border-dark-700 rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Team Section Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Section Label</label>
            <input
              type="text"
              value={formData.sectionLabel}
              onChange={(e) => setFormData({ ...formData, sectionLabel: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="DUO"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Main Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Meet the incredible duo."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Section description text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Book a 30-min call →"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Button URL</label>
              <input
                type="text"
                value={formData.buttonUrl}
                onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="https://calendly.com/farvuemedia"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showStats}
                  onChange={(e) => setFormData({ ...formData, showStats: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-300">Show Statistics Section</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-300">Show Team Section</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-dark-700 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}