// API functions for rental management
export async function fetchRentals(skip = 0, limit = 100) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch(`/rental/?skip=${skip}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch rentals');
  }

  return await response.json();
}

export async function createRental(rentalData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const response = await fetch('/rental/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rentalData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create rental');
  }

  return await response.json();
} 