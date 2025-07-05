export async function fetchDashboardData() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch('/dashboard/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch dashboard data');
  }

  return await response.json();
}

export async function fetchRentalHistory(limit = 10) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/rentals/?limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch rental history');
  }

  return await response.json();
} 