'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  FolderOpen,
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Download,
  RefreshCw,
  Filter,
  Eye,
  Clock,
  Star
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    trend: number;
    monthlyData: { month: string; revenue: number; projects: number }[];
  };
  clients: {
    total: number;
    new: number;
    active: number;
    retention: number;
  };
  projects: {
    total: number;
    completed: number;
    inProgress: number;
    completionRate: number;
    averageValue: number;
  };
  services: {
    name: string;
    revenue: number;
    projects: number;
    growth: number;
  }[];
  performance: {
    topClients: {
      name: string;
      revenue: number;
      projects: number;
      satisfaction: number;
    }[];
    monthlyGrowth: number;
    averageProjectValue: number;
    clientSatisfaction: number;
  };
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockData: AnalyticsData = {
        revenue: {
          current: 127500,
          previous: 98300,
          trend: 29.7,
          monthlyData: [
            { month: 'Jul', revenue: 15200, projects: 8 },
            { month: 'Aug', revenue: 18400, projects: 12 },
            { month: 'Sep', revenue: 21300, projects: 15 },
            { month: 'Oct', revenue: 24100, projects: 18 },
            { month: 'Nov', revenue: 26800, projects: 21 },
            { month: 'Dec', revenue: 29700, projects: 24 }
          ]
        },
        clients: {
          total: 47,
          new: 12,
          active: 35,
          retention: 89.4
        },
        projects: {
          total: 98,
          completed: 78,
          inProgress: 20,
          completionRate: 95.2,
          averageValue: 2650
        },
        services: [
          { name: 'Video Editing', revenue: 48200, projects: 35, growth: 24.5 },
          { name: 'Graphic Design', revenue: 31500, projects: 28, growth: 18.3 },
          { name: 'AI Automation', revenue: 28400, projects: 18, growth: 45.2 },
          { name: 'Web Development', revenue: 19400, projects: 17, growth: 12.8 }
        ],
        performance: {
          topClients: [
            { name: 'TechCreator Pro', revenue: 24500, projects: 8, satisfaction: 5.0 },
            { name: 'FitnessInfluencer', revenue: 22800, projects: 12, satisfaction: 4.9 },
            { name: 'Business Growth Channel', revenue: 18900, projects: 15, satisfaction: 4.7 },
            { name: 'Lifestyle Content Co', revenue: 15200, projects: 6, satisfaction: 4.8 }
          ],
          monthlyGrowth: 24.3,
          averageProjectValue: 2650,
          clientSatisfaction: 4.85
        }
      };
      setAnalyticsData(mockData);
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const exportReport = () => {
    // Mock export functionality
    const reportData = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-accent-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Track performance metrics, revenue trends, and business insights.</p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              analyticsData.revenue.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {analyticsData.revenue.trend > 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(analyticsData.revenue.trend)}%
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${analyticsData.revenue.current.toLocaleString()}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              vs ${analyticsData.revenue.previous.toLocaleString()} last period
            </p>
          </div>
        </div>

        {/* Clients Card */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <TrendingUp className="w-3 h-3 mr-1" />
              {analyticsData.clients.retention}%
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Active Clients</p>
            <p className="text-2xl font-bold text-white mt-1">{analyticsData.clients.active}</p>
            <p className="text-gray-500 text-xs mt-2">
              {analyticsData.clients.new} new this period
            </p>
          </div>
        </div>

        {/* Projects Card */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Target className="w-3 h-3 mr-1" />
              {analyticsData.projects.completionRate}%
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Projects</p>
            <p className="text-2xl font-bold text-white mt-1">{analyticsData.projects.total}</p>
            <p className="text-gray-500 text-xs mt-2">
              {analyticsData.projects.completed} completed
            </p>
          </div>
        </div>

        {/* Average Project Value */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-accent-500/50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
              <Star className="w-3 h-3 mr-1" />
              {analyticsData.performance.clientSatisfaction}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Avg Project Value</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${analyticsData.projects.averageValue.toLocaleString()}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Client satisfaction rating
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {analyticsData.revenue.monthlyData.map((data, index) => (
                <div key={data.month} className="text-center">
                  <div 
                    className="bg-accent-500 rounded-t-lg mb-2 mx-auto"
                    style={{ 
                      height: `${(data.revenue / Math.max(...analyticsData.revenue.monthlyData.map(d => d.revenue))) * 120}px`,
                      width: '24px'
                    }}
                  ></div>
                  <p className="text-xs text-gray-400">{data.month}</p>
                  <p className="text-xs text-white font-medium">${(data.revenue / 1000).toFixed(1)}k</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-dark-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Best Month</p>
                  <p className="text-white font-semibold">
                    ${Math.max(...analyticsData.revenue.monthlyData.map(d => d.revenue)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Growth Rate</p>
                  <p className="text-accent-400 font-semibold">+{analyticsData.revenue.trend}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Service Performance</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.services.map((service, index) => {
              const colors = ['bg-accent-500', 'bg-primary-500', 'bg-secondary-500', 'bg-primary-700'];
              const percentage = (service.revenue / analyticsData.services.reduce((sum, s) => sum + s.revenue, 0)) * 100;
              
              return (
                <div key={service.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                      <span className="text-white font-medium">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${service.revenue.toLocaleString()}</p>
                      <p className={`text-xs ${service.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {service.growth > 0 ? '+' : ''}{service.growth}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colors[index]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{service.projects} projects</span>
                    <span>{percentage.toFixed(1)}% of revenue</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Clients and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Clients</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.performance.topClients.map((client, index) => (
              <div key={client.name} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{client.name}</p>
                    <p className="text-gray-400 text-sm">{client.projects} projects</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${client.revenue.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm">{client.satisfaction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Insights */}
        <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Business Insights</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-dark-800 rounded-lg border-l-4 border-accent-500">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-5 h-5 text-accent-500" />
                <h4 className="text-white font-medium">Revenue Growth</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Your revenue has grown by {analyticsData.performance.monthlyGrowth}% this period. 
                AI Automation services are showing the highest growth rate.
              </p>
            </div>

            <div className="p-4 bg-dark-800 rounded-lg border-l-4 border-primary-500">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-5 h-5 text-primary-500" />
                <h4 className="text-white font-medium">Client Retention</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Your client retention rate of {analyticsData.clients.retention}% is excellent. 
                Consider expanding services for existing high-value clients.
              </p>
            </div>

            <div className="p-4 bg-dark-800 rounded-lg border-l-4 border-secondary-500">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="w-5 h-5 text-secondary-500" />
                <h4 className="text-white font-medium">Project Efficiency</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Your {analyticsData.projects.completionRate}% completion rate is above industry average. 
                Focus on optimizing project timelines for even better results.
              </p>
            </div>

            <div className="p-4 bg-dark-800 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-center space-x-3 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <h4 className="text-white font-medium">Client Satisfaction</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Average satisfaction of {analyticsData.performance.clientSatisfaction}/5.0 indicates 
                strong client relationships. Continue focusing on quality and communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={exportReport}
            className="p-4 bg-dark-800 hover:bg-dark-700 rounded-lg text-left transition-colors duration-200 border border-dark-600 hover:border-accent-500/50"
          >
            <Eye className="w-6 h-6 text-accent-500 mb-2" />
            <h4 className="text-white font-medium mb-1">View Detailed Reports</h4>
            <p className="text-gray-400 text-sm">Access comprehensive analytics</p>
          </button>
          
          <button 
            onClick={() => router.push('/admin/settings')}
            className="p-4 bg-dark-800 hover:bg-dark-700 rounded-lg text-left transition-colors duration-200 border border-dark-600 hover:border-accent-500/50"
          >
            <Calendar className="w-6 h-6 text-primary-500 mb-2" />
            <h4 className="text-white font-medium mb-1">Schedule Review</h4>
            <p className="text-gray-400 text-sm">Plan monthly business review</p>
          </button>
          
          <button 
            onClick={() => router.push('/admin/projects')}
            className="p-4 bg-dark-800 hover:bg-dark-700 rounded-lg text-left transition-colors duration-200 border border-dark-600 hover:border-accent-500/50"
          >
            <Target className="w-6 h-6 text-secondary-500 mb-2" />
            <h4 className="text-white font-medium mb-1">Set Goals</h4>
            <p className="text-gray-400 text-sm">Define targets for next period</p>
          </button>
          
          <button 
            onClick={exportReport}
            className="p-4 bg-dark-800 hover:bg-dark-700 rounded-lg text-left transition-colors duration-200 border border-dark-600 hover:border-accent-500/50"
          >
            <Download className="w-6 h-6 text-primary-700 mb-2" />
            <h4 className="text-white font-medium mb-1">Export Data</h4>
            <p className="text-gray-400 text-sm">Download analytics reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}