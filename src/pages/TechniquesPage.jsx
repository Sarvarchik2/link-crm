import React, { useState, useEffect, useRef } from 'react';
import './TechniquesPage.css';
import { FaPlus, FaEdit, FaTimes, FaImage, FaSearch, FaFilter } from 'react-icons/fa';
import cameraImg from '../assets/camera.png';

function TechniquesPage() {
  const [equipment, setEquipment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price_per_day: '',
    photo: '',
    status: 'available',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const mockCategories = [
      { id: 1, name: 'Фотоаппараты' },
      { id: 2, name: 'Объективы' },
    ];
    const mockEquipment = [
      { id: 1, title: 'Canon EOS R5', description: 'Полноформатная камера', category_id: 1, price_per_day: 500000, photos: '', status: 'available' },
      { id: 2, title: 'Sony A7 III', description: 'Беззеркальная камера', category_id: 1, price_per_day: 400000, photos: '', status: 'rented' },
    ];
    setCategories(mockCategories);
    setEquipment(mockEquipment);
    setLoading(false);
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Неизвестно';
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      available: { text: 'ДОСТУПНО', color: '#28a745' },
      rented: { text: 'В АРЕНДЕ', color: '#007bff' },
      maintenance: { text: 'ОБСЛУЖИВАНИЕ', color: '#fd7e14' },
    };
    return (
        <span style={{
          background: statusMap[status].color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
        }}>
        {statusMap[status].text}
      </span>
    );
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        category_id: item.category_id,
        price_per_day: item.price_per_day,
        photo: '',
        status: item.status,
      });
      setPhotoPreview(item.photos || null);
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', category_id: '', price_per_day: '', photo: '', status: 'available' });
      setPhotoPreview(null);
    }
    setModalOpen(true);
  };

  const handlePhotoClick = () => fileInputRef.current && fileInputRef.current.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      const updated = equipment.map(item =>
          item.id === editingItem.id
              ? { ...item, ...formData, photos: photoPreview, category_id: parseInt(formData.category_id) }
              : item
      );
      setEquipment(updated);
    } else {
      const newTech = {
        id: Date.now(),
        ...formData,
        category_id: parseInt(formData.category_id),
        photos: photoPreview,
      };
      setEquipment(prev => [...prev, newTech]);
    }
    setModalOpen(false);
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
    return matchesSearch && matchesStatus;
  });

  return (
      <div className="techniques-page">
        <div className="techniques-header">
          <h1 className="techniques-title">Техника <span className="techniques-count">({filteredEquipment.length})</span></h1>
          <div className="techniques-controls">
            <div className="techniques-search">
              <FaSearch />
              <input type="text" placeholder="Поиск" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div style={{ position: 'relative' }}>
              <button className="techniques-filter" onClick={() => setFilterOpen(v => !v)}><FaFilter /></button>
              {filterOpen && (
                  <div className="filter-dropdown">
                    {['available','rented','maintenance'].map(status => (
                        <label key={status}>
                          <input
                              type="checkbox"
                              checked={selectedStatuses.includes(status)}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedStatuses(prev => [...prev, status]);
                                else setSelectedStatuses(prev => prev.filter(s => s !== status));
                              }}
                          /> {getStatusBadge(status)}
                        </label>
                    ))}
                  </div>
              )}
            </div>
            <button className="add-technique-btn" onClick={() => handleOpenModal()}>
              <FaPlus /> <span>Добавить технику</span>
            </button>
          </div>
        </div>

        {loading ? (
            <div>Загрузка...</div>
        ) : (
            <div className="techniques-grid">
              {filteredEquipment.map(tech => (
                  <div className="technique-card" key={tech.id}>
                    <img src={tech.photos || cameraImg} alt={tech.title} style={{ width: '100%', borderRadius: '8px' }} />
                    <div style={{ marginTop: '8px' }}>{getStatusBadge(tech.status)}</div>
                    <h4>{tech.title}</h4>
                    <p>{tech.description}</p>
                    <p>Категория: {getCategoryName(tech.category_id)}</p>
                    <p>Цена: {tech.price_per_day.toLocaleString()} сум/день</p>
                    <button onClick={() => handleOpenModal(tech)} className="edit-technique-btn">
                      <FaEdit /> Редактировать
                    </button>
                  </div>
              ))}
            </div>
        )}

        {modalOpen && (
            <div className="modal-backdrop">
              <div className="add-technique-modal">
                <button className="modal-close-btn" onClick={() => setModalOpen(false)}><FaTimes /></button>
                <div className="add-technique-modal-content">
                  <h2 className="modal-title">{editingItem ? 'Редактировать технику' : 'Добавить технику'}</h2>
                  <form onSubmit={handleSubmit} className="add-technique-form">
                    <input type="text" placeholder="Название" required value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} className="modal-input" />
                    <textarea placeholder="Описание" required value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} className="modal-input" />
                    <select required value={formData.category_id} onChange={e => setFormData(prev => ({ ...prev, category_id: e.target.value }))} className="modal-input">
                      <option value="">Выберите категорию</option>
                      {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <input type="number" placeholder="Цена за день (сум)" required value={formData.price_per_day} onChange={e => setFormData(prev => ({ ...prev, price_per_day: e.target.value }))} className="modal-input" />
                    <div className="modal-photo-drop" onClick={handlePhotoClick}>
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} />
                      {photoPreview ? (
                          <img src={photoPreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }} />
                      ) : (
                          <>
                            <FaImage className="modal-photo-icon" />
                            <div className="modal-photo-text">Перетащите фото или нажмите</div>
                          </>
                      )}
                    </div>
                    <select value={formData.status} onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))} className="modal-input">
                      <option value="available">Доступно</option>
                      <option value="rented">В аренде</option>
                      <option value="maintenance">Обслуживание</option>
                    </select>
                    <button type="submit" className="modal-submit-btn">{editingItem ? 'Сохранить изменения' : 'Добавить'}</button>
                  </form>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default TechniquesPage;
