
// API utility functions for making requests to API endpoints

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

// Mock implementation of API endpoints for development
const mockApi = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

// Authentication APIs
export const authApi = {
  register: async (data: any) => {
    // This would normally call the API endpoint
    console.log('Registering user:', data);
    return mockApi({ success: true, user: { ...data, id: 1 } });
  },
  
  login: async (data: any) => {
    // This would normally call the API endpoint
    console.log('Logging in user:', data);
    return mockApi({ 
      success: true, 
      user: { 
        id: 1, 
        email: data.email,
        name: data.email.split('@')[0],
        role: data.role || 'seller' 
      } 
    });
  },
  
  getCurrentUser: async () => {
    // This would normally verify the token and return user data
    console.log('Getting current user');
    return mockApi({ 
      id: 1, 
      name: 'John Doe',
      email: 'user@example.com',
      role: 'seller' 
    });
  },
};

// Pickups APIs
export const pickupsApi = {
  getAll: async () => {
    console.log('Fetching all pickups');
    return mockApi([
      { 
        id: 101, 
        date: "2025-05-15", 
        items: "Paper, Plastic",
        weight: "5.2 kg",
        status: "Completed",
        amount: "$12.50"
      },
      { 
        id: 102, 
        date: "2025-05-18", 
        items: "Electronics", 
        weight: "3.1 kg",
        status: "Scheduled",
        amount: "$25.80"
      },
    ]);
  },
  
  getById: async (id: number) => {
    console.log(`Fetching pickup with id ${id}`);
    return mockApi({ 
      id, 
      date: "2025-05-18", 
      items: "Electronics", 
      weight: "3.1 kg",
      status: "Scheduled",
      amount: "$25.80"
    });
  },
  
  create: async (data: any) => {
    console.log('Creating new pickup:', data);
    return mockApi({ 
      id: 103,
      ...data,
      status: "Pending"
    });
  },
  
  update: async (id: number, data: any) => {
    console.log(`Updating pickup ${id}:`, data);
    return mockApi({
      id,
      ...data
    });
  },
};

// Materials APIs
export const materialsApi = {
  getAll: async () => {
    console.log('Fetching all materials');
    return mockApi([
      {
        id: 1,
        name: 'Paper',
        subtypes: [
          { id: 1, name: 'Newspaper', pricePerKg: 0.5 },
          { id: 2, name: 'Cardboard', pricePerKg: 0.3 }
        ],
        icon: 'file-text'
      },
      {
        id: 2,
        name: 'Metal',
        subtypes: [
          { id: 3, name: 'Iron', pricePerKg: 2.0 },
          { id: 4, name: 'Copper', pricePerKg: 5.0 }
        ],
        icon: 'package'
      },
      {
        id: 3,
        name: 'Plastic',
        subtypes: [
          { id: 5, name: 'Bottles', pricePerKg: 0.8 },
          { id: 6, name: 'Containers', pricePerKg: 0.6 }
        ],
        icon: 'package'
      },
      {
        id: 4,
        name: 'Books',
        subtypes: [
          { id: 7, name: 'Textbooks', pricePerKg: 0.7 },
          { id: 8, name: 'Notebooks', pricePerKg: 0.4 }
        ],
        icon: 'file'
      },
      {
        id: 5,
        name: 'Electronics',
        subtypes: [
          { id: 9, name: 'Phones', pricePerKg: 10.0 },
          { id: 10, name: 'Laptops', pricePerKg: 8.0 }
        ],
        icon: 'settings'
      },
      {
        id: 6,
        name: 'Others',
        subtypes: [
          { id: 11, name: 'Rubber', pricePerKg: 1.0 },
          { id: 12, name: 'Batteries', pricePerKg: 3.0 }
        ],
        icon: 'box'
      }
    ]);
  },
};

// Staff APIs
export const staffApi = {
  getAll: async () => {
    console.log('Fetching all staff');
    return mockApi([
      { id: 1, name: 'Jane Smith', email: 'jane@example.com', phone: '555-1234', role: 'staff' },
      { id: 2, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-5678', role: 'staff' }
    ]);
  },
};

// Dashboard APIs
export const dashboardApi = {
  getData: async () => {
    console.log('Fetching dashboard data');
    return mockApi({
      totalPickups: 8,
      pendingPickups: 2,
      totalWeight: "42.5 kg",
      totalEarnings: "$102.75",
      environmentalImpact: {
        co2Saved: "65kg",
        waterConserved: "1250L",
        treesSaved: "3"
      }
    });
  },
};
