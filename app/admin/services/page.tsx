'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  Download,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  Image as ImageIcon,
  Save,
  X,
  Check
} from 'lucide-react';
import { Service } from '@/lib/types/admin';
import { 
  servicesData, 
  updateService, 
  addService, 
  deleteService, 
  toggleServiceVisibility,
  getServiceStats,
  exportServicesData,
  importServicesData 
} from '@/lib/data/cms-services';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>(servicesData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterVisibility, setFilterVisibility] = useState<string>('all');

  // Refresh services data
  const refreshServices = () => {
    setServices([...servicesData]);
  };

  // Handle service creation
  const handleCreateService = (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newService = addService(serviceData);
    refreshServices();
    setShowCreateModal(false);
    console.log('Service created:', newService.name);
  };

  // Handle service update
  const handleUpdateService = (id: string, updatedData: Partial<Service>) => {
    updateService(id, updatedData);
    refreshServices();
    setEditingService(null);
    console.log('Service updated');
  };

  // Handle service deletion
  const handleDeleteService = (id: string) => {
    const service = services.find(s => s.id === id);
    if (window.confirm(`Are you sure you want to delete "${service?.name}"? This action cannot be undone.`)) {
      deleteService(id);
      refreshServices();
      console.log('Service deleted');
    }
  };

  // Handle visibility toggle
  const handleToggleVisibility = (id: string) => {
    toggleServiceVisibility(id);
    refreshServices();
  };

  // Handle image upload (placeholder for actual upload)
  const handleImageUpload = (serviceId: string, imageType: 'iconUrl' | 'imageUrl') => {
    // In a real implementation, this would handle file upload to a service like Cloudinary
    const dummyImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop&auto=format`;
    updateService(serviceId, { [imageType]: dummyImageUrl });
    refreshServices();
    console.log(`${imageType} uploaded for service ${serviceId}`);
  };

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesVisibility = filterVisibility === 'all' || 
                             (filterVisibility === 'visible' && service.isVisible) ||
                             (filterVisibility === 'hidden' && !service.isVisible);
    
    return matchesSearch && matchesCategory && matchesVisibility;
  });

  const stats = getServiceStats();

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Services</p>
              <p className="text-2xl font-bold text-white">{stats.totalServices}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">All services</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Live Services</p>
              <p className="text-2xl font-bold text-white">{stats.visibleServices}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">Visible on website</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Avg Demand</p>
              <p className="text-2xl font-bold text-white">{stats.averageDemand}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">Client interest</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-green-400 text-xs mt-2">Pro tier pricing</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Services Management</h1>
          <p className="text-slate-400 mt-1">
            Manage your website services, pricing, and visibility. Changes appear instantly on the public site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const dataStr = exportServicesData();
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `services-backup-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="editing">Video Editing</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="automation">Automation</option>
          </select>

          <select
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Services</option>
            <option value="visible">Live Only</option>
            <option value="hidden">Hidden Only</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={() => setEditingService(service)}
            onDelete={() => handleDeleteService(service.id)}
            onToggleVisibility={() => handleToggleVisibility(service.id)}
            onImageUpload={handleImageUpload}
            onViewDetails={() => setSelectedService(service)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Services Found</h3>
          <p className="text-slate-400 mb-6">
            {searchTerm || filterCategory !== 'all' || filterVisibility !== 'all'
              ? 'No services match your current filters.'
              : 'Create your first service to get started.'
            }
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Create Service
          </button>
        </div>
      )}

      {/* Create/Edit Service Modal */}
      {(showCreateModal || editingService) && (
        <ServiceModal
          isOpen={true}
          onClose={() => {
            setShowCreateModal(false);
            setEditingService(null);
          }}
          onSubmit={editingService ? 
            (data) => handleUpdateService(editingService.id, data) :
            handleCreateService
          }
          editService={editingService}
        />
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onEdit={() => {
            setEditingService(selectedService);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
}

// Service Card Component
function ServiceCard({ 
  service, 
  onEdit, 
  onDelete, 
  onToggleVisibility, 
  onImageUpload,
  onViewDetails 
}: {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  onImageUpload: (serviceId: string, imageType: 'iconUrl' | 'imageUrl') => void;
  onViewDetails: () => void;
}) {
  const getCategoryColor = (category: string) => {
    const colors = {
      editing: 'bg-blue-500',
      design: 'bg-purple-500',
      development: 'bg-green-500',
      automation: 'bg-orange-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200">
      {/* Service Image */}
      <div className="relative h-48 bg-slate-800">
        {service.imageUrl ? (
          <img 
            src={service.imageUrl} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-slate-600" />
          </div>
        )}
        <button
          onClick={() => onImageUpload(service.id, 'imageUrl')}
          className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors duration-200"
          title="Upload Service Image"
        >
          <Upload className="w-4 h-4" />
        </button>
        
        {/* Visibility Toggle */}
        <button
          onClick={onToggleVisibility}
          className={`absolute top-3 left-3 p-2 rounded-lg transition-colors duration-200 ${
            service.isVisible 
              ? 'bg-green-500/80 hover:bg-green-500 text-white' 
              : 'bg-red-500/80 hover:bg-red-500 text-white'
          }`}
          title={service.isVisible ? 'Hide from website' : 'Show on website'}
        >
          {service.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Service Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(service.category)}`}>
              {service.iconUrl ? (
                <img src={service.iconUrl} alt="" className="w-6 h-6 rounded" />
              ) : (
                <Settings className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{service.name}</h3>
              <p className="text-sm text-slate-400 capitalize">{service.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white">{service.averageRating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Pricing */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-slate-800 rounded">
            <p className="text-xs text-slate-400">Starter</p>
            <p className="font-semibold text-white">${service.pricing.starter}</p>
          </div>
          <div className="text-center p-2 bg-blue-600 rounded">
            <p className="text-xs text-blue-100">Pro</p>
            <p className="font-semibold text-white">${service.pricing.pro}</p>
          </div>
          <div className="text-center p-2 bg-slate-800 rounded">
            <p className="text-xs text-slate-400">Custom</p>
            <p className="font-semibold text-white">${service.pricing.custom || '---'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm mb-4">
          <div>
            <p className="text-slate-400">Demand</p>
            <p className="font-semibold text-white">{service.demand}%</p>
          </div>
          <div>
            <p className="text-slate-400">Completion</p>
            <p className="font-semibold text-white">{service.completionRate}%</p>
          </div>
          <div>
            <p className="text-slate-400">Features</p>
            <p className="font-semibold text-white">{service.features.length}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onViewDetails}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded transition-colors duration-200"
          >
            View Details
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
              title="Edit Service"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200"
              title="Delete Service"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Service Modal Component (Create/Edit)
function ServiceModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editService 
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: any) => void;
  editService?: Service | null;
}) {
  const [formData, setFormData] = useState({
    name: editService?.name || '',
    description: editService?.description || '',
    category: editService?.category || 'editing',
    pricing: {
      starter: editService?.pricing.starter || 500,
      pro: editService?.pricing.pro || 1200,
      custom: editService?.pricing.custom || undefined
    },
    features: editService?.features || [''],
    isVisible: editService?.isVisible ?? true,
    demand: editService?.demand || 50,
    completionRate: editService?.completionRate || 90,
    averageRating: editService?.averageRating || 4.5,
    subServices: editService?.subServices || ['']
  });

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubServiceChange = (index: number, value: string) => {
    const newSubServices = [...(formData.subServices || [])];
    newSubServices[index] = value;
    setFormData({ ...formData, subServices: newSubServices });
  };

  const addSubService = () => {
    setFormData({ ...formData, subServices: [...(formData.subServices || []), ''] });
  };

  const removeSubService = (index: number) => {
    const newSubServices = (formData.subServices || []).filter((_, i) => i !== index);
    setFormData({ ...formData, subServices: newSubServices });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty features and subservices
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      subServices: (formData.subServices || []).filter(s => s.trim() !== '')
    };
    
    onSubmit(cleanedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">
            {editService ? 'Edit Service' : 'Create New Service'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Service Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="editing">Video Editing</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="automation">Automation</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Pricing Tiers</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Starter ($)</label>
                <input
                  type="number"
                  value={formData.pricing.starter}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    pricing: { ...formData.pricing, starter: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Pro ($)</label>
                <input
                  type="number"
                  value={formData.pricing.pro}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    pricing: { ...formData.pricing, pro: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Custom ($)</label>
                <input
                  type="number"
                  value={formData.pricing.custom || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    pricing: { ...formData.pricing, custom: parseInt(e.target.value) || undefined }
                  })}
                  placeholder="Optional"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Add Feature
              </button>
            </div>
          </div>

          {/* Sub Services */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Sub Services</label>
            <div className="space-y-2">
              {(formData.subServices || []).map((subService, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={subService}
                    onChange={(e) => handleSubServiceChange(index, e.target.value)}
                    placeholder={`Sub Service ${index + 1}`}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubService(index)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubService}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Add Sub Service
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Demand (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.demand}
                onChange={(e) => setFormData({ ...formData, demand: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Completion Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.completionRate}
                onChange={(e) => setFormData({ ...formData, completionRate: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Average Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.averageRating}
                onChange={(e) => setFormData({ ...formData, averageRating: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>Visible on website</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Service Details Modal
function ServiceDetailsModal({ 
  service, 
  onClose, 
  onEdit 
}: {
  service: Service;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{service.name}</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Edit Service
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Service Image */}
          {service.imageUrl && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src={service.imageUrl} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-slate-300">{service.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub Services */}
          {service.subServices && service.subServices.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Sub Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {service.subServices.map((subService, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-300">{subService}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Pricing Tiers</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-slate-800 rounded-lg">
                  <span className="text-slate-300">Starter</span>
                  <span className="font-semibold text-white">${service.pricing.starter}</span>
                </div>
                <div className="flex justify-between p-3 bg-blue-600 rounded-lg">
                  <span className="text-blue-100">Pro</span>
                  <span className="font-semibold text-white">${service.pricing.pro}</span>
                </div>
                {service.pricing.custom && (
                  <div className="flex justify-between p-3 bg-slate-800 rounded-lg">
                    <span className="text-slate-300">Custom</span>
                    <span className="font-semibold text-white">${service.pricing.custom}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Performance Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Demand</span>
                  <span className="text-white">{service.demand}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completion Rate</span>
                  <span className="text-white">{service.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">{service.averageRating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    service.isVisible 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isVisible ? 'Live on Website' : 'Hidden'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Created:</span>
                <span className="ml-2 text-slate-300">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Last Updated:</span>
                <span className="ml-2 text-slate-300">
                  {new Date(service.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}