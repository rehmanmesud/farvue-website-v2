// Authentication utilities
export interface AdminUser {
  username: string;
  role: 'Admin' | 'Editor' | 'Designer' | 'Viewer';
  loginTime: string;
}

export const getStoredUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const user = getStoredUser();
  return user !== null;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  }
};

export const hasPermission = (requiredRole: string): boolean => {
  const user = getStoredUser();
  if (!user) return false;

  const roleHierarchy = {
    'Admin': 4,
    'Editor': 3,
    'Designer': 2,
    'Viewer': 1
  };

  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
};