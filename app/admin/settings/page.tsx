'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Users,
  Shield,
  Key,
  Palette,
  Globe,
  Mail,
  Bell,
  Database,
  Link,
  Save,
  Upload,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  AlertTriangle,
  Info,
  Zap
} from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  description: string;
  userCount: number;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  service: string;
  status: 'active' | 'inactive';
  lastUsed: string;
  createdAt: string;
}

interface BrandSettings {
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  siteName: string;
  tagline: string;
}

interface NotificationSettings {
  email: boolean;
  browser: boolean;
  newProjects: boolean;
  projectUpdates: boolean;
  clientMessages: boolean;
  deadlineReminders: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    logo: '/farvue-logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#123456',
    secondaryColor: '#789ABC',
    accentColor: '#e53e3e',
    siteName: 'FARVUE Media',
    tagline: 'Creative Excellence, Delivered'
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    browser: true,
    newProjects: true,
    projectUpdates: true,
    clientMessages: true,
    deadlineReminders: true
  });
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState({ name: '', service: '' });
  const [showNewApiForm, setShowNewApiForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock data
  useEffect(() => {
    const mockRoles: UserRole[] = [
      {
        id: '1',
        name: 'Admin',
        permissions: ['create', 'read', 'update', 'delete', 'manage_users', 'manage_settings'],
        description: 'Full access to all features and settings',
        userCount: 2
      },
      {
        id: '2',
        name: 'Editor',
        permissions: ['create', 'read', 'update', 'manage_projects'],
        description: 'Can manage projects and content but not system settings',
        userCount: 5
      },
      {
        id: '3',
        name: 'Designer',
        permissions: ['read', 'update', 'upload_assets'],
        description: 'Can view and update projects, upload design assets',
        userCount: 3
      },
      {
        id: '4',
        name: 'Viewer',
        permissions: ['read'],
        description: 'Read-only access to projects and reports',
        userCount: 8
      }
    ];

    const mockApiKeys: APIKey[] = [
      {
        id: '1',
        name: 'Calendly Integration',
        key: 'cal_live_***************vR2J',
        service: 'Calendly',
        status: 'active',
        lastUsed: '2024-01-20',
        createdAt: '2023-12-15'
      },
      {
        id: '2',
        name: 'Stripe Payments',
        key: 'sk_live_***************8K9M',
        service: 'Stripe',
        status: 'active',
        lastUsed: '2024-01-19',
        createdAt: '2023-11-20'
      },
      {
        id: '3',
        name: 'Notion Database',
        key: 'secret_***************7L3N',
        service: 'Notion',
        status: 'inactive',
        lastUsed: '2024-01-10',
        createdAt: '2023-10-05'
      }
    ];

    setUserRoles(mockRoles);
    setApiKeys(mockApiKeys);
  }, []);

  const saveSettings = async () => {
    setIsSaving(true);
    // Mock save operation
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
    }, 1500);
  };

  const addApiKey = () => {
    if (newApiKey.name && newApiKey.service) {
      const newKey: APIKey = {
        id: Date.now().toString(),
        name: newApiKey.name,
        key: `sk_live_${Math.random().toString(36).substring(2, 15)}***************`,
        service: newApiKey.service,
        status: 'active',
        lastUsed: 'Never',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setApiKeys([...apiKeys, newKey]);
      setNewApiKey({ name: '', service: '' });
      setShowNewApiForm(false);
    }
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const toggleApiKeyStatus = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'users', label: 'User Roles', icon: Users },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Link }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage system settings, user roles, and integrations.</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-lg shadow-accent-500/20 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                        : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="border-b border-dark-700 pb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">General Settings</h2>
                  <p className="text-gray-400">Basic configuration for your admin panel.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Admin Panel Name
                    </label>
                    <input
                      type="text"
                      defaultValue="FARVUE Media Admin"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date Format
                    </label>
                    <select className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-dark-800 rounded-lg border border-dark-600">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-accent-500 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium mb-1">System Information</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p>Version: 2.1.0</p>
                        <p>Last Updated: January 20, 2024</p>
                        <p>Environment: Production</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Roles */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="border-b border-dark-700 pb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">User Roles & Permissions</h2>
                  <p className="text-gray-400">Manage user roles and their access permissions.</p>
                </div>

                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div key={role.id} className="bg-dark-800 border border-dark-600 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                          <p className="text-gray-400 text-sm">{role.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-400">{role.userCount} users</span>
                          <button className="p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {role.name !== 'Admin' && (
                            <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-3 py-1 bg-accent-600 text-white text-xs rounded-full"
                            >
                              {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full p-4 border-2 border-dashed border-dark-600 rounded-lg text-gray-400 hover:border-accent-500 hover:text-accent-500 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Role</span>
                </button>
              </div>
            )}

            {/* API Keys */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="border-b border-dark-700 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-2">API Keys</h2>
                      <p className="text-gray-400">Manage API keys for external service integrations.</p>
                    </div>
                    <button
                      onClick={() => setShowNewApiForm(true)}
                      className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add API Key</span>
                    </button>
                  </div>
                </div>

                {showNewApiForm && (
                  <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Add New API Key</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Key Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., OpenAI API"
                          value={newApiKey.name}
                          onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Service
                        </label>
                        <select
                          value={newApiKey.service}
                          onChange={(e) => setNewApiKey({ ...newApiKey, service: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                        >
                          <option value="">Select service</option>
                          <option value="OpenAI">OpenAI</option>
                          <option value="Stripe">Stripe</option>
                          <option value="Calendly">Calendly</option>
                          <option value="Notion">Notion</option>
                          <option value="Zapier">Zapier</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={addApiKey}
                        className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200"
                      >
                        Add Key
                      </button>
                      <button
                        onClick={() => setShowNewApiForm(false)}
                        className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="bg-dark-800 border border-dark-600 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                          <p className="text-gray-400 text-sm">{apiKey.service}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            apiKey.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {apiKey.status}
                          </span>
                          <button
                            onClick={() => toggleApiKeyStatus(apiKey.id)}
                            className="p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                          >
                            {apiKey.status === 'active' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => deleteApiKey(apiKey.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type={showApiKey === apiKey.id ? 'text' : 'password'}
                              value={apiKey.key}
                              readOnly
                              className="flex-1 px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white"
                            />
                            <button
                              onClick={() => setShowApiKey(showApiKey === apiKey.id ? null : apiKey.id)}
                              className="p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                            >
                              {showApiKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Created:</span>
                            <span className="text-white ml-2">{apiKey.createdAt}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Last Used:</span>
                            <span className="text-white ml-2">{apiKey.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Branding */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className="border-b border-dark-700 pb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Branding & Appearance</h2>
                  <p className="text-gray-400">Customize the look and feel of your admin panel.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={brandSettings.siteName}
                        onChange={(e) => setBrandSettings({ ...brandSettings, siteName: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={brandSettings.tagline}
                        onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={brandSettings.primaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                          className="w-12 h-12 rounded-lg border border-dark-600 bg-dark-800"
                        />
                        <input
                          type="text"
                          value={brandSettings.primaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                          className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={brandSettings.secondaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                          className="w-12 h-12 rounded-lg border border-dark-600 bg-dark-800"
                        />
                        <input
                          type="text"
                          value={brandSettings.secondaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                          className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={brandSettings.accentColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                          className="w-12 h-12 rounded-lg border border-dark-600 bg-dark-800"
                        />
                        <input
                          type="text"
                          value={brandSettings.accentColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                          className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Logo Upload
                      </label>
                      <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-accent-500 transition-colors duration-200">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm mb-2">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-xs">PNG, JPG up to 2MB</p>
                        <input type="file" className="hidden" accept="image/*" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Favicon Upload
                      </label>
                      <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-accent-500 transition-colors duration-200">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm mb-2">Upload favicon</p>
                        <p className="text-gray-500 text-xs">ICO, PNG 32x32</p>
                        <input type="file" className="hidden" accept=".ico,.png" />
                      </div>
                    </div>

                    <div className="p-4 bg-dark-800 rounded-lg border border-dark-600">
                      <h4 className="text-white font-medium mb-2">Preview</h4>
                      <div className="bg-dark-900 border border-dark-700 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: `linear-gradient(to br, ${brandSettings.primaryColor}, ${brandSettings.accentColor})` }}
                          >
                            F
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{brandSettings.siteName}</h3>
                            <p className="text-gray-400 text-xs">{brandSettings.tagline}</p>
                          </div>
                        </div>
                        <button 
                          className="w-full py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200"
                          style={{ backgroundColor: brandSettings.accentColor }}
                        >
                          Sample Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="border-b border-dark-700 pb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Notification Settings</h2>
                  <p className="text-gray-400">Configure how and when you receive notifications.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="text-white font-medium">Email Notifications</h4>
                            <p className="text-gray-400 text-sm">Receive notifications via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="text-white font-medium">Browser Notifications</h4>
                            <p className="text-gray-400 text-sm">Show notifications in your browser</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.browser}
                            onChange={(e) => setNotifications({ ...notifications, browser: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'newProjects', label: 'New Projects', description: 'When new projects are created' },
                        { key: 'projectUpdates', label: 'Project Updates', description: 'When projects are updated or completed' },
                        { key: 'clientMessages', label: 'Client Messages', description: 'When clients send messages' },
                        { key: 'deadlineReminders', label: 'Deadline Reminders', description: 'Reminders for upcoming deadlines' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">{item.label}</h4>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof NotificationSettings]}
                              onChange={(e) => setNotifications({ 
                                ...notifications, 
                                [item.key]: e.target.checked 
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="border-b border-dark-700 pb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Integrations</h2>
                  <p className="text-gray-400">Connect with external services to enhance functionality.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Calendly',
                      description: 'Schedule meetings and consultations',
                      icon: Calendar,
                      status: 'connected',
                      color: 'bg-accent-500'
                    },
                    {
                      name: 'Stripe',
                      description: 'Process payments and subscriptions',
                      icon: DollarSign,
                      status: 'connected',
                      color: 'bg-primary-500'
                    },
                    {
                      name: 'Notion',
                      description: 'Sync project data and documentation',
                      icon: Database,
                      status: 'disconnected',
                      color: 'bg-secondary-500'
                    },
                    {
                      name: 'Zapier',
                      description: 'Automate workflows and processes',
                      icon: Zap,
                      status: 'available',
                      color: 'bg-primary-700'
                    },
                    {
                      name: 'Google Analytics',
                      description: 'Track website performance and metrics',
                      icon: BarChart3,
                      status: 'available',
                      color: 'bg-accent-600'
                    },
                    {
                      name: 'Slack',
                      description: 'Team communication and notifications',
                      icon: Bell,
                      status: 'available',
                      color: 'bg-secondary-600'
                    }
                  ].map((integration) => {
                    const Icon = integration.icon;
                    return (
                      <div key={integration.name} className="bg-dark-800 border border-dark-600 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                              <p className="text-gray-400 text-sm">{integration.description}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            integration.status === 'connected' ? 'bg-green-100 text-green-800' :
                            integration.status === 'disconnected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {integration.status}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          {integration.status === 'connected' ? (
                            <>
                              <button className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200">
                                Configure
                              </button>
                              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                                Disconnect
                              </button>
                            </>
                          ) : integration.status === 'disconnected' ? (
                            <button className="w-full px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200">
                              Reconnect
                            </button>
                          ) : (
                            <button className="w-full px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200">
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}