
// API utility functions for making requests to our Next.js API routes

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
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
}

// Authentication APIs
export const authApi = {
  register: (data: any) => fetchWithAuth('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data: any) => fetchWithAuth('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getCurrentUser: () => fetchWithAuth('/api/user/me'),
};

// Pickups APIs
export const pickupsApi = {
  getAll: () => fetchWithAuth('/api/pickups'),
  
  getById: (id: number) => fetchWithAuth(`/api/pickups/${id}`),
  
  create: (data: any) => fetchWithAuth('/api/pickups', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: number, data: any) => fetchWithAuth(`/api/pickups/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
};

// Materials APIs
export const materialsApi = {
  getAll: () => fetchWithAuth('/api/materials'),
};

// Staff APIs
export const staffApi = {
  getAll: () => fetchWithAuth('/api/staff'),
};

// Dashboard APIs
export const dashboardApi = {
  getData: () => fetchWithAuth('/api/dashboard'),
};
