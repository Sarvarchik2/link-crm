export async function fetchMe() {
  const token = localStorage.getItem('token');
  console.log('fetchMe token:', token);
  if (!token) return null;
  const res = await fetch('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function updateProfile(userId, userData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update profile');
  }

  return await response.json();
}

export async function fetchTeam() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch('/users/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch team');
  }

  return await response.json();
} 