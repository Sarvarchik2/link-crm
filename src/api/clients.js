// Получить список клиентов
export async function fetchClients() {
  const token = localStorage.getItem('token');
  const res = await fetch('/clients/', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Ошибка загрузки клиентов');
  return await res.json();
}

// Получить информацию о клиенте по id
export async function fetchClientById(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/clients/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Ошибка загрузки клиента');
  return await res.json();
}

// Добавить клиента
export async function addClient(data) {
  const token = localStorage.getItem('token');
  const res = await fetch('/clients/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Ошибка добавления клиента');
  return await res.json();
} 