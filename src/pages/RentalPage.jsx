import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPlus, FaTimes, FaEdit } from 'react-icons/fa';
import './RentalPage.css';

const getToday = () => new Date().toISOString().slice(0, 10);

// Примерные массивы клиентов и техники
const clientsList = [
  { id: 1, avatar: 'https://placehold.co/400', name: 'Иванов Иван', phone: '+998 90 123 45 67' },
  { id: 2, avatar: 'https://placehold.co/400', name: 'Петров Петр', phone: '+998 91 987 65 43' },
  { id: 3, avatar: 'https://placehold.co/400', name: 'Сидоров Сидор', phone: '+998 93 555 55 55' },
];
const equipmentList = [
  { id: 1, title: 'Canon EOS R5', category: { name: 'Фотоаппараты' } },
  { id: 2, title: 'Sony A7 III', category: { name: 'Фотоаппараты' } },
  { id: 3, title: 'Sigma 24-70mm', category: { name: 'Объективы' } },
];

function RentalModal({ open, selected, onClose, onSubmit, clients, equipmentList }) {
  const [quantity, setQuantity] = useState(selected?.quantity || 1);
  const [dateStart, setDateStart] = useState(selected?.dateStart || getToday());
  const [dateEnd, setDateEnd] = useState(selected?.dateEnd || '');
  const [status, setStatus] = useState(selected?.status || 'available');

  // Для поиска и выбора пользователя
  const [userSearch, setUserSearch] = useState('');
  const [userDropdown, setUserDropdown] = useState(false);
  const [user, setUser] = useState(selected?.client || null);

  // Для поиска и выбора техники
  const [equipmentSearch, setEquipmentSearch] = useState('');
  const [equipmentDropdown, setEquipmentDropdown] = useState(false);
  const [equipment, setEquipment] = useState(selected?.title ? { title: selected.title, category: selected.category } : null);

  useEffect(() => {
    if (selected) {
      setQuantity(selected.quantity || 1);
      setDateStart(selected.dateStart || getToday());
      setDateEnd(selected.dateEnd || '');
      setStatus(selected.status || 'available');
      setUser(selected.client || null);
      setEquipment(selected.title ? { title: selected.title, category: selected.category } : null);
      setUserSearch('');
      setEquipmentSearch('');
    }
  }, [selected]);

  if (!open) return null;

  const handleSubmit = () => {
    const newData = {
      ...selected,
      quantity,
      dateStart,
      dateEnd,
      status,
      client: user || selected?.client,
      title: equipment?.title || selected?.title,
      category: equipment?.category || selected?.category,
    };
    if (!selected.isEdit) {
      newData.id = Date.now();
    }
    onSubmit(newData);
  };

  // Фильтрация пользователей и техники по поиску
  const filteredUsers = clients.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.phone.includes(userSearch)
  );
  const filteredEquipment = equipmentList.filter(eq =>
    eq.title.toLowerCase().includes(equipmentSearch.toLowerCase())
  );

  return (
    <div className={`modal-overlay${open ? ' show' : ''}`}>
      <div className="modal-content">
        <button onClick={onClose} className="modal-close"><FaTimes /></button>
        <h3>{selected.isEdit ? 'Редактировать аренду' : 'Добавить аренду'}</h3>

        {/* Выбор пользователя */}
        <div className="modal-field">
          <label>Пользователь</label>
          <input
            type="text"
            placeholder="Поиск пользователя..."
            value={user ? user.name : userSearch}
            onChange={e => {
              setUserSearch(e.target.value);
              setUser(null);
              setUserDropdown(true);
            }}
            onFocus={() => setUserDropdown(true)}
            autoComplete="off"
          />
          {userDropdown && !user && filteredUsers.length > 0 && (
            <div className="dropdown-list" style={{border: '1px solid #eee', borderRadius: 8, background: '#fff', position: 'absolute', zIndex: 1001, width: '90%', maxHeight: 150, overflowY: 'auto'}}>
              {filteredUsers.map(u => (
                <div
                  key={u.id}
                  style={{padding: 8, cursor: 'pointer'}}
                  onClick={() => {
                    setUser(u);
                    setUserDropdown(false);
                  }}
                >
                  <img src={u.avatar} alt="avatar" style={{width: 24, height: 24, borderRadius: '50%', marginRight: 8, verticalAlign: 'middle'}} />
                  {u.name} <span style={{color: '#888', fontSize: 12}}>{u.phone}</span>
                </div>
              ))}
            </div>
          )}
          {user && (
            <div style={{marginTop: 6, display: 'flex', alignItems: 'center', gap: 8}}>
              <img src={user.avatar} alt="avatar" style={{width: 28, height: 28, borderRadius: '50%'}} />
              <span>{user.name}</span>
              <span style={{color: '#888', fontSize: 13}}>{user.phone}</span>
              <button style={{marginLeft: 8, background: 'none', border: 'none', color: '#888', cursor: 'pointer'}} onClick={() => { setUser(null); setUserSearch(''); }}>×</button>
            </div>
          )}
        </div>

        {/* Выбор техники */}
        <div className="modal-field">
          <label>Техника</label>
          <input
            type="text"
            placeholder="Поиск техники..."
            value={equipment ? equipment.title : equipmentSearch}
            onChange={e => {
              setEquipmentSearch(e.target.value);
              setEquipment(null);
              setEquipmentDropdown(true);
            }}
            onFocus={() => setEquipmentDropdown(true)}
            autoComplete="off"
          />
          {equipmentDropdown && !equipment && filteredEquipment.length > 0 && (
            <div className="dropdown-list" style={{border: '1px solid #eee', borderRadius: 8, background: '#fff', position: 'absolute', zIndex: 1001, width: '90%', maxHeight: 150, overflowY: 'auto'}}>
              {filteredEquipment.map(eq => (
                <div
                  key={eq.id}
                  style={{padding: 8, cursor: 'pointer'}}
                  onClick={() => {
                    setEquipment(eq);
                    setEquipmentDropdown(false);
                  }}
                >
                  {eq.title} <span style={{color: '#888', fontSize: 12}}>{eq.category?.name}</span>
                </div>
              ))}
            </div>
          )}
          {equipment && (
            <div style={{marginTop: 6, display: 'flex', alignItems: 'center', gap: 8}}>
              <span>{equipment.title}</span>
              <span style={{color: '#888', fontSize: 13}}>{equipment.category?.name}</span>
              <button style={{marginLeft: 8, background: 'none', border: 'none', color: '#888', cursor: 'pointer'}} onClick={() => { setEquipment(null); setEquipmentSearch(''); }}>×</button>
            </div>
          )}
        </div>

        {/* Выбор статуса */}
        <div className="modal-field">
          <label>Статус</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="available">Свободно</option>
            <option value="busy">Занято</option>
          </select>
        </div>

        <div className="modal-field">
          <label>Количество</label>
          <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        </div>

        <div className="modal-field">
          <label>Дата начала</label>
          <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} />
        </div>

        <div className="modal-field">
          <label>Дата конца</label>
          <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
        </div>

        <button className="modal-submit-btn" onClick={handleSubmit}>
          {selected.isEdit ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

const RentalPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setEquipment([
      {
        id: 1,
        client: clientsList[0],
        title: 'Canon EOS R5',
        category: { name: 'Фотоаппараты' },
        status: 'available',
        quantity: 1
      },
      {
        id: 2,
        client: clientsList[1],
        title: 'Sony A7 III',
        category: { name: 'Фотоаппараты' },
        status: 'busy',
        quantity: 1
      },
    ]);
  }, []);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.client.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.client.phone.includes(searchQuery);
    const matchesCategory = categoryFilter ? item.category?.name === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddRental = () => {
    setSelected({
      isEdit: false,
      client: { avatar: 'https://placehold.co/400', name: 'Новый клиент', phone: '+998 90 000 00 00' },
      title: 'Новая техника',
      category: { name: 'Фотоаппараты' },
      status: 'available',
      quantity: 1,
    });
    setModalOpen(true);
  };

  const handleEditRental = (item) => {
    setSelected({ ...item, isEdit: true });
    setModalOpen(true);
  };

  const handleCreateRental = (data) => {
    if (data.isEdit) {
      setEquipment(prev => prev.map(i => i.id === data.id ? data : i));
    } else {
      setEquipment(prev => [...prev, data]);
    }
    setModalOpen(false);
  };

  return (
      <div className="rental-page">
        <div className="rental-header">
          <h1 className="rental-title">Аренда ({filteredEquipment.length})</h1>
          <div className="rental-controls">
            <div className="rental-search">
              <span className="rental-search-icon"><FaSearch /></span>
              <input
                  type="text"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button className="rental-filter-btn" onClick={() => setFilterOpen(!filterOpen)}><FaFilter /></button>
              {filterOpen && (
                  <div className="filter-dropdown">
                    <select onChange={e => setCategoryFilter(e.target.value)}>
                      <option value="">Все категории</option>
                      <option value="Фотоаппараты">Фотоаппараты</option>
                      <option value="Объективы">Объективы</option>
                    </select>
                  </div>
              )}
            </div>
            <button className="add-rental-btn" onClick={handleAddRental}><FaPlus /> Добавить</button>
          </div>
        </div>

        <div className="clients-table-wrapper">
          <table className="clients-table">
            <thead>
            <tr>
              <th>Фото</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Техника</th>
              <th>Категория</th>
              <th>Статус</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {filteredEquipment.map(item => (
                <tr key={item.id}>
                  <td><img src={item.client.avatar} alt="avatar" className="client-avatar" /></td>
                  <td>{item.client.name}</td>
                  <td>{item.client.phone}</td>
                  <td>{item.title}</td>
                  <td>{item.category?.name}</td>
                  <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'available' ? 'Свободно' : 'Занято'}
                  </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditRental(item)}><FaEdit /> Ред.</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <RentalModal
            open={modalOpen}
            selected={selected}
            onClose={() => setModalOpen(false)}
            onSubmit={handleCreateRental}
            clients={clientsList}
            equipmentList={equipmentList}
        />
      </div>
  );
};

export default RentalPage;
