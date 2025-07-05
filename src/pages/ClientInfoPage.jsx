import React, { useEffect, useState } from 'react';
import './ClientInfoPage.css';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const ClientInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock clients data
    const mockClients = [
      {
        id: '1',
        full_name: 'Улугбек Абдусаматов',
        phone: '+998901234567',
        birth_date: '2005-07-05',
        passport_number: 'AA1234567',
        trusted_person_name: 'Отабек Абдусаматов',
        trusted_person_phone: '+998901112233',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        id: '2',
        full_name: 'Иван Иванов',
        phone: '+998901112233',
        birth_date: '1990-01-01',
        passport_number: 'BB9876543',
        trusted_person_name: 'Петр Петров',
        trusted_person_phone: '+998909876543',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
    ];

    const foundClient = mockClients.find(c => c.id === id);
    setClient(foundClient);
    setLoading(false);
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!client) return <div>Клиент не найден</div>;

  return (
      <div className="client-info-page">
        <div className="back-row" onClick={() => navigate(-1)}>
          <button className="back-icon-btn"><FaChevronLeft /></button>
          <span className="back-text">Назад</span>
        </div>
        <div className="client-info-card">
          <div className="client-info-header">
            <div className="client-avatar-wrap">
              <img src={client.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="avatar" className="client-avatar" />
            </div>
            <div className="client-info-main">
              <h2 className="client-info-name">{client.full_name || '-'}</h2>
              <button className="passport-btn">Паспорт</button>
            </div>
            <button className="edit-btn">Редактировать</button>
          </div>
          <div className="client-info-fields">
            <div className="client-info-field">
              <label>Клиент</label>
              <input value={client.full_name || '-'} readOnly />
            </div>
            <div className="client-info-field">
              <label>Телефон</label>
              <input value={client.phone || '-'} readOnly />
            </div>
            <div className="client-info-field">
              <label>Дата рождения</label>
              <input value={client.birth_date || '-'} readOnly />
            </div>
            <div className="client-info-field">
              <label>Серия паспорта</label>
              <input value={client.passport_number || '-'} readOnly />
            </div>
            <div className="client-info-field">
              <label>Доверенное лицо</label>
              <input value={client.trusted_person_name || '-'} readOnly />
            </div>
            <div className="client-info-field">
              <label>Телефон доверенного лица</label>
              <input value={client.trusted_person_phone || '-'} readOnly />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ClientInfoPage;
