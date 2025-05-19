
// API utility functions for making requests to API endpoints

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Include cookies in the request
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Authentication APIs
export const authApi = {
  register: async (data: { name: string, email: string, password: string }) => {
    return fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  login: async (data: { email: string, password: string }) => {
    return fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  logout: async () => {
    return fetchWithAuth('/api/auth/logout', {
      method: 'POST',
    });
  },
  
  getCurrentUser: async () => {
    return fetchWithAuth('/api/user/me');
  },
};

// Pickups APIs
export const pickupsApi = {
  getAll: async () => {
    return fetchWithAuth('/api/pickups');
  },
  
  getById: async (id: number) => {
    return fetchWithAuth(`/api/pickups/${id}`);
  },
  
  create: async (data: any) => {
    return fetchWithAuth('/api/pickups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return fetchWithAuth(`/api/pickups/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return fetchWithAuth(`/api/pickups/${id}`, {
      method: 'DELETE',
    });
  },
};

// Materials APIs
export const materialsApi = {
  getAll: async () => {
    return fetchWithAuth('/api/materials');
  },
};

// Staff APIs
export const staffApi = {
  getAll: async () => {
    return fetchWithAuth('/api/staff');
  },
  
  getById: async (id: number) => {
    return fetchWithAuth(`/api/staff/${id}`);
  },
  
  create: async (data: any) => {
    return fetchWithAuth('/api/staff', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: number, data: any) => {
    return fetchWithAuth(`/api/staff/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: number) => {
    return fetchWithAuth(`/api/staff/${id}`, {
      method: 'DELETE',
    });
  },
};

// Dashboard APIs
export const dashboardApi = {
  getData: async () => {
    return fetchWithAuth('/api/dashboard');
  },
};
