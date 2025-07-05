import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPlus, FaTimes, FaEdit } from 'react-icons/fa';
import './RentalPage.css';

const getToday = () => new Date().toISOString().slice(0, 10);

function RentalModal({ open, selected, onClose, onSubmit }) {
  const [quantity, setQuantity] = useState(selected?.quantity || 1);
  const [dateStart, setDateStart] = useState(selected?.dateStart || getToday());
  const [dateEnd, setDateEnd] = useState(selected?.dateEnd || '');

  useEffect(() => {
    if (selected) {
      setQuantity(selected.quantity || 1);
      setDateStart(selected.dateStart || getToday());
      setDateEnd(selected.dateEnd || '');
    }
  }, [selected]);

  if (!open) return null;
//s
  const handleSubmit = () => {
    const newData = {
      ...selected,
      quantity,
      dateStart,
      dateEnd
    };

    if (!selected.isEdit) {
      newData.id = Date.now(); // уникальный id
    }

    onSubmit(newData);
  };

  return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose} className="modal-close"><FaTimes /></button>
          <h3>{selected.isEdit ? 'Редактировать клиента' : 'Добавить клиента'}</h3>

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
        client: { avatar: 'https://placehold.co/400', name: 'Иванов Иван', phone: '+998 90 123 45 67' },
        title: 'Canon EOS R5',
        category: { name: 'Фотоаппараты' },
        status: 'available',
        quantity: 1
      },
      {
        id: 2,
        client: { avatar: 'https://placehold.co/400', name: 'Петров Петр', phone: '+998 91 987 65 43' },
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
        />
      </div>
  );
};

export default RentalPage;
