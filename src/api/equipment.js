// API functions for equipment management
export async function fetchEquipment(skip = 0, limit = 100) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/equipment/?skip=${skip}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch equipment');
  }

  return await response.json();
}

export async function fetchEquipmentById(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/equipment/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch equipment');
  }

  return await response.json();
}

export async function createEquipment(equipmentData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch('/equipment/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipmentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create equipment');
  }

  return await response.json();
}

export async function updateEquipment(id, equipmentData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/equipment/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipmentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update equipment');
  }

  return await response.json();
}

export async function deleteEquipment(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/equipment/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to delete equipment');
  }

  return await response.json();
}

// API functions for categories
export async function fetchCategories() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch('/categories/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch categories');
  }

  return await response.json();
}

export async function createCategory(categoryData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch('/categories/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create category');
  }

  return await response.json();
} 