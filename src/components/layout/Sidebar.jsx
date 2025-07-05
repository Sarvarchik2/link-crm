// src/components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import Logo from "../../assets/logo.png"
// Import useState
import './Sidebar.css';
import {
  FaThLarge,
  FaRegFileAlt,
  FaUsers,
  FaSignOutAlt,
  FaQuestionCircle,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // Import the new Modal component

const Sidebar = ({ isDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal visibility

  const handleLogoutConfirm = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
    
    // Close modal
    setShowLogoutModal(false);
  };

  const handleLogoutClick = () => {
    console.log('Logout button clicked, setting modal to true');
    setShowLogoutModal(true);
  };

  console.log('Modal state:', showLogoutModal); // Debug log

  if (isDrawer) {
    return (
      <aside className="sidebar-menu">
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">
              <FaThLarge className="menu-icon" />
              Дэшборд
            </Link>
          </li>
          <li className={location.pathname === '/techniques' ? 'active' : ''}>
            <Link to="/techniques">
              <FaRegFileAlt className="menu-icon" />
              Техники
            </Link>
          </li>
          <li className={location.pathname.startsWith('/clients') ? 'active' : ''}>
            <Link to="/clients">
              <FaUsers className="menu-icon" />
              Клиенты
            </Link>
          </li>
          <li className={location.pathname.startsWith('/rental') ? 'active' : ''}>
            <Link to="/rental">
              <FaRegCalendarAlt className="menu-icon" />
              Аренда
            </Link>
          </li>
        </ul>
      </aside>
    );
  }

  return (
    <>
      <aside className={`sidebar${isDrawer ? ' drawer-sidebar' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {/* Замените на свой логотип */}
              <img src={Logo} alt="logo"/>
          </div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li className={location.pathname === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard">
                <FaThLarge className="menu-icon" />
                <span>Дэшборд</span>
              </Link>
            </li>
            <li className={location.pathname === '/techniques' ? 'active' : ''}>
              <Link to="/techniques">
                <FaRegFileAlt className="menu-icon" />
                <span>Техники</span>
              </Link>
            </li>
            <li className={location.pathname.startsWith('/clients') ? 'active' : ''}>
              <Link to="/clients">
                <FaUsers className="menu-icon" />
                <span>Клиенты</span>
              </Link>
            </li>
            <li className={location.pathname.startsWith('/rental') ? 'active' : ''}>
              <Link to="/rental">
                <FaRegCalendarAlt className="menu-icon" />
                <span>Аренда</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-bottom">
          <div className="support-section">
            <button className="support-button">
              <FaQuestionCircle className="button-icon" />
              <span>Support</span>
            </button>
          </div>
          <div className="logout-section">
            {/* Change a tag to a button or div for onClick handler */}
            <button
              onClick={handleLogoutClick} // Open modal on click
              className="logout-button-style" // Custom class for styling consistency
            >
              <FaSignOutAlt className="logout-icon" />
              <span>Выйти</span>
            </button>
            {/* Temporary test button */}
            <button
              onClick={() => {
                console.log('Test button clicked');
                setShowLogoutModal(true);
              }}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Test Modal
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Подтверждение выхода"
        message="Вы уверены, что хотите выйти из аккаунта?"
        confirmText="Выйти"
        cancelText="Отмена"
      />
    </>
  );
};

export default Sidebar;