// src/pages/HomePage.jsx
import React from 'react';
import { FaCalendarAlt, FaKey, FaLockOpen, FaShieldAlt } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './HomePage.css';
import './TechniquesPage.css';

const statusColors = {
  green: '#4cd964',
  blue: '#397DFF',
  red: '#ff7675',
  yellow: '#FFD600',
};

// 🗂️ MOCK static data
const dashboardData = {
  equipment: {
    in_rent: 5,
    busy: 3,
    available: 7,
  },
  rentals_today: 4,
  equipment_rented_today: 2,
  total_amount_today: 1200000,
  history: [
    {
      id: 1,
      client: { full_name: 'Иван Иванов' },
      date_start: '2025-07-01',
      date_end: '2025-07-05',
      admin: { full_name: 'Админ 1' },
      total_amount: 250000,
      status: 'active',
    },
    {
      id: 2,
      client: { full_name: 'Петр Петров' },
      date_start: '2025-07-02',
      date_end: '2025-07-06',
      admin: { full_name: 'Админ 2' },
      total_amount: 320000,
      status: 'completed',
    },
  ],
};

// Подготовка данных для карточек
const cards = [
  {
    icon: <FaCalendarAlt size={36} color="#397DFF" />,
    title: 'В аренде',
    value: dashboardData.equipment.in_rent || 0,
    color: '#397DFF',
  },
  {
    icon: <FaShieldAlt size={36} color="#FFD600" />,
    title: 'Забронирована',
    value: dashboardData.equipment.busy || 0,
    color: '#FFD600',
  },
  {
    icon: <FaKey size={36} color="#FF3B30" />,
    title: 'Занято',
    value: dashboardData.equipment.busy || 0,
    color: '#FF3B30',
  },
  {
    icon: <FaLockOpen size={36} color="#00C853" />,
    title: 'Свободно',
    value: dashboardData.equipment.available || 0,
    color: '#00C853',
  },
];

// Подготовка данных для круговой диаграммы
const pieData = [
  { name: 'Забронировано', value: dashboardData.equipment.busy || 0, color: '#397DFF' },
  { name: 'В аренде', value: dashboardData.equipment.in_rent || 0, color: '#00C853' },
  { name: 'Свободно', value: dashboardData.equipment.available || 0, color: '#FFD600' },
  { name: 'Занято', value: dashboardData.equipment.busy || 0, color: '#FF3B30' },
];

// Функция для получения инициалов пользователя
const getUserInitials = (fullName) => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  return names[0].charAt(0) + (names[1]?.charAt(0) || '');
};

// Функция для форматирования даты
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Функция для получения цвета статуса
const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'booked':
      return 'blue';
    case 'completed':
      return 'yellow';
    case 'cancelled':
    case 'overdue':
      return 'red';
    default:
      return 'gray';
  }
};

// Функция для перевода статуса
const getStatusText = (status) => {
  switch (status) {
    case 'active':
      return 'Активна';
    case 'booked':
      return 'Забронирована';
    case 'completed':
      return 'Завершена';
    case 'cancelled':
      return 'Отменена';
    case 'overdue':
      return 'Просрочена';
    default:
      return status;
  }
};

const HomePage = () => {
  const user = { full_name: 'Улугбек Абдусаматов' };

  return (
      <div className="home-page">
        <h2 className="greeting">Здравствуйте, {user?.full_name || 'Пользователь'}!</h2>
        <h1 className="main-title">Дэшборд</h1>

        {/* Статистика за сегодня */}
        <div className="today-stats" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Аренд сегодня</h3>
            <div style={cardValueStyleBlue}>
              {dashboardData.rentals_today || 0}
            </div>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Техники выдано</h3>
            <div style={cardValueStyleGreen}>
              {dashboardData.equipment_rented_today || 0}
            </div>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Доход сегодня</h3>
            <div style={cardValueStyleYellow}>
              {dashboardData.total_amount_today?.toLocaleString() || 0} сум
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="cards-section">
            <div className="cards-grid">
              {cards.map((card, idx) => (
                  <div className="dashboard-card" key={idx}>
                    <div className="card-icon">{card.icon}</div>
                    <div className="card-title">{card.title}</div>
                    <div className="card-value">{card.value.toLocaleString()} техники</div>
                  </div>
              ))}
            </div>
          </div>
          <div className="pie-section">
            <div className="pie-card">
              <h3 className="pie-title">Статистика техники</h3>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      label={({ value }) => value}
                  >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend-list">
                {pieData.map((item, idx) => (
                    <div className="pie-legend-item" key={idx}>
                      <span className="pie-legend-color" style={{ background: item.color }}></span>
                      <span>{item.name}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* История аренд */}
        <div className="history-section">
          <div className="history-header">
            <h2>История аренд</h2>
          </div>
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
              <tr>
                <th>Клиент</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Админ</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
              </thead>
              <tbody>
              {dashboardData.history && dashboardData.history.length > 0 ? (
                  dashboardData.history.map((rental, idx) => (
                      <tr key={rental.id || idx}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={userInitialsStyle}>
                              {getUserInitials(rental.client?.full_name || 'Клиент')}
                            </div>
                            <span>{rental.client?.full_name || 'Клиент'}</span>
                          </div>
                        </td>
                        <td>{formatDate(rental.date_start)}</td>
                        <td>{formatDate(rental.date_end)}</td>
                        <td>{rental.admin?.full_name || 'Админ'}</td>
                        <td>{rental.total_amount?.toLocaleString() || 0} сум</td>
                        <td>
                      <span className={`history-status-badge status-${getStatusColor(rental.status)}`}>
                        {getStatusText(rental.status)}
                      </span>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                      Нет данных об арендах
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

// 🎨 Styles
const cardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const cardTitleStyle = { margin: '0 0 10px 0', color: '#666', fontSize: '14px' };
const cardValueStyleBlue = { fontSize: '24px', fontWeight: 'bold', color: '#397DFF' };
const cardValueStyleGreen = { fontSize: '24px', fontWeight: 'bold', color: '#00C853' };
const cardValueStyleYellow = { fontSize: '24px', fontWeight: 'bold', color: '#FFD600' };

const userInitialsStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#e6f0ff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#397DFF',
  fontSize: '12px',
  fontWeight: 'bold',
  border: '2px solid #397DFF'
};

export default HomePage;
