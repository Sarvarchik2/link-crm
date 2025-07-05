import React, { useState } from 'react';
import { FaSearch, FaFilter, FaPlus, FaTimes, FaImage } from 'react-icons/fa';
import './clients.css';
import { useNavigate } from 'react-router-dom';

function AddClientModal({ open, onClose, onClientAdded }) {
  // 🔧 Все хуки объявлены до условий return
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);

  const frontInputRef = React.useRef();
  const backInputRef = React.useRef();

  if (!open) return null;

  const handlePhoto = (setter, ref) => () => ref.current && ref.current.click();
  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      full_name: fullName,
      phone,
      birth_date: birthDate,
      passport_number: passportNumber,
      is_active: true,
      email: `${Date.now()}@example.com`,
      country: 'Uzbekistan',
    };
    onClientAdded(newClient);
    setFullName('');
    setPhone('');
    setBirthDate('');
    setPassportNumber('');
    setFrontPhoto(null);
    setBackPhoto(null);
    onClose();
  };

  return (
      <div className="modal-backdrop">
        <div className="add-client-modal">
          <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
          <div className="add-client-modal-content">
            <h2 className="modal-title">Добавить клиента</h2>
            <form className="add-client-form" onSubmit={handleSubmit}>
              <input className="modal-input" type="text" placeholder="ФИО" value={fullName} onChange={e => setFullName(e.target.value)} required />
              <input className="modal-input" type="tel" placeholder="+998 (99) 123 45 67" value={phone} onChange={e => setPhone(e.target.value)} required />
              <input className="modal-input" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
              <input className="modal-input" type="text" placeholder="AE1234567891234" value={passportNumber} onChange={e => setPassportNumber(e.target.value)} required />
              <div className="modal-label">Фото паспорта (передняя сторона)
                <div className="modal-photo-drop" onClick={handlePhoto(setFrontPhoto, frontInputRef)}>
                  <input type="file" accept="image/*" style={{ display: 'none' }} ref={frontInputRef} onChange={handleFileChange(setFrontPhoto)} />
                  {frontPhoto ? (
                      <img src={frontPhoto} alt="front" style={{ maxWidth: '100%', maxHeight: 60, borderRadius: 6 }} />
                  ) : (
                      <>
                        <FaImage className="modal-photo-icon" />
                        <div className="modal-photo-text">Перетащите фото или нажмите</div>
                      </>
                  )}
                </div>
              </div>
              <div className="modal-label">Фото паспорта (задняя сторона)
                <div className="modal-photo-drop" onClick={handlePhoto(setBackPhoto, backInputRef)}>
                  <input type="file" accept="image/*" style={{ display: 'none' }} ref={backInputRef} onChange={handleFileChange(setBackPhoto)} />
                  {backPhoto ? (
                      <img src={backPhoto} alt="back" style={{ maxWidth: '100%', maxHeight: 60, borderRadius: 6 }} />
                  ) : (
                      <>
                        <FaImage className="modal-photo-icon" />
                        <div className="modal-photo-text">Перетащите фото или нажмите</div>
                      </>
                  )}
                </div>
              </div>
              <button className="modal-submit-btn" type="submit">Добавить</button>
            </form>
          </div>
        </div>
      </div>
  );
}

const ClientsPage = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Инициализация mock данных напрямую в useState без useEffect
  const [clients, setClients] = useState(() => [
    { id: 1, full_name: 'Улугбек Абдусаматов', phone: '+998901234567', email: 'ulug@example.com', country: 'Uzbekistan', is_active: true },
    { id: 2, full_name: 'Иван Иванов', phone: '+998901112233', email: 'ivan@example.com', country: 'Uzbekistan', is_active: false },
  ]);

  const handleClientAdded = (newClient) => {
    setClients(prev => [...prev, newClient]);
  };

  return (
      <div className="clients-page">
        <div className="clients-header">
          <h1 className="clients-title">Клиенты <span className="clients-count">({clients.length})</span></h1>
          <div className="clients-controls">
            <div className="clients-search">
              <span className="search-icon"><FaSearch /></span>
              <input type="text" placeholder="Поиск" />
            </div>
            <div style={{ position: 'relative' }}>
              <button className="clients-filter" onClick={() => setFilterOpen(v => !v)}><FaFilter /></button>
              {filterOpen && (
                  <div className="filter-dropdown">
                    <label><input type="checkbox" /> Активные</label>
                    <label><input type="checkbox" /> Неактивные</label>
                  </div>
              )}
            </div>
            <button className="add-client-btn" onClick={() => setModalOpen(true)}>
              <FaPlus />
              <span className="add-client-text">Добавить клиент</span>
            </button>
          </div>
        </div>

        <div className="clients-table-wrapper">
          <table className="clients-table">
            <thead>
            <tr>
              <th>Имя пользователя</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Страна</th>
              <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {clients.map((client) => (
                <tr
                    key={client.id}
                    className="clients-row-hover"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/clients/${client.id}`)}
                >
                  <td>{client.full_name}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>{client.country}</td>
                  <td>
                  <span className={`client-status-badge ${client.is_active ? 'active' : 'inactive'}`}>
                    {client.is_active ? 'Активен' : 'Неактивен'}
                  </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <AddClientModal open={modalOpen} onClose={() => setModalOpen(false)} onClientAdded={handleClientAdded} />
      </div>
  );
};

export default ClientsPage;
