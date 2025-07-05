import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaPlus } from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = () => {
    // ✅ MOCK static user data
    const [user, setUser] = useState({
        id: 1,
        full_name: 'Улугбек Абдусаматов',
        email: 'ulugbek@example.com',
        role: 'admin',
        is_active: true,
    });

    const [editedUser, setEditedUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('team');
    const [isLoading, setIsLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamLoading, setTeamLoading] = useState(false);

    useEffect(() => {
        if (user) setEditedUser({ ...user });
    }, [user]);

    useEffect(() => {
        if (activeTab === 'team' && teamMembers.length === 0) {
            loadTeamMembers();
        }
    }, [activeTab]);

    const loadTeamMembers = () => {
        setTeamLoading(true);
        // ✅ MOCK static team data
        const team = [
            { id: 2, full_name: 'Иван Иванов', role: 'staff' },
            { id: 3, full_name: 'Петр Петров', role: 'admin' },
        ];
        setTeamMembers(team);
        setTeamLoading(false);
    };

    const getLevelTagClass = (level) => {
        switch (level.toLowerCase()) {
            case 'admin':
            case 'superadmin':
                return 'level-tag admin';
            case 'middle':
            case 'staff':
                return 'level-tag middle';
            default:
                return 'level-tag default';
        }
    };

    const handleToggleEditSave = () => {
        if (isEditing) {
            setIsLoading(true);
            setSaveStatus('Сохранение...');
            // ✅ Simulate save delay
            setTimeout(() => {
                setUser({ ...editedUser });
                setIsEditing(false);
                setIsLoading(false);
                setSaveStatus('Сохранено!');
                setTimeout(() => setSaveStatus(''), 2000);
            }, 1000);
        } else {
            setIsEditing(true);
            setSaveStatus('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getUserInitials = (fullName) => {
        if (!fullName) return '';
        const names = fullName.split(' ');
        return names[0].charAt(0) + (names[1]?.charAt(0) || '');
    };

    if (!user) {
        return <div className="loading">Загрузка профиля...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-header">
                    <div className="avatar-container">
                        <div className="user-avatar">{getUserInitials(user.full_name)}</div>
                    </div>
                    <div className="user-info">
                        <div className="name-edit-container">
                            <h1 className="user-name">{user.full_name || 'Без имени'}</h1>
                            <button
                                onClick={handleToggleEditSave}
                                className="edit-save-btn"
                                disabled={isLoading}
                                title={isEditing ? 'Сохранить изменения' : 'Редактировать профиль'}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner"></div> {saveStatus}
                                    </>
                                ) : isEditing ? (
                                    <>
                                        <FaCheck size={16} /> Сохранить
                                    </>
                                ) : (
                                    <>
                                        <FaEdit size={16} /> Редактировать
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="user-role">{user.role}</div>
                        {saveStatus && (
                            <div className={`save-status ${saveStatus.includes('Ошибка') ? 'error' : 'success'}`}>
                                {saveStatus}
                            </div>
                        )}
                        <div className="info-section">
                            <h4 className="info-title">Информация</h4>
                            <div className="info-field">
                                <div className="field-label">ФИО</div>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={isEditing ? editedUser.full_name || '' : user.full_name || ''}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`info-input ${isEditing ? 'editing' : ''}`}
                                />
                            </div>
                            <div className="info-field">
                                <div className="field-label">Email</div>
                                <input
                                    type="email"
                                    name="email"
                                    value={isEditing ? editedUser.email || '' : user.email || ''}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`info-input ${isEditing ? 'editing' : ''}`}
                                />
                            </div>
                            <div className="info-field">
                                <div className="field-label">Роль</div>
                                <input
                                    type="text"
                                    value={user.role || ''}
                                    readOnly
                                    className="info-input"
                                    style={{ backgroundColor: '#f5f5f5', color: '#666' }}
                                />
                            </div>
                            <div className="info-field">
                                <div className="field-label">Статус</div>
                                <input
                                    type="text"
                                    value={user.is_active ? 'Активен' : 'Неактивен'}
                                    readOnly
                                    className="info-input"
                                    style={{
                                        backgroundColor: user.is_active ? '#e8f9ef' : '#ffeaea',
                                        color: user.is_active ? '#4CAF50' : '#ff3b30',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tabs-container">
                    <div className="tabs-wrapper">
                        <button
                            onClick={() => setActiveTab('team')}
                            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
                        >
                            Команда
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        >
                            История
                        </button>
                    </div>
                    <button className="add-user-btn" title="Добавить нового пользователя">
                        <FaPlus size={14} style={{ marginRight: '8px' }} /> Пользователь
                    </button>
                </div>

                <div className="content-area">
                    {activeTab === 'team' && (
                        <div>
                            <h3 className="section-title">Члены команды</h3>
                            {teamLoading ? (
                                <div className="loading">Загрузка команды...</div>
                            ) : teamMembers.length > 0 ? (
                                <div className="team-grid">
                                    {teamMembers.map((member) => (
                                        <div key={member.id} className="team-member-card">
                                            <div className="member-avatar">{getUserInitials(member.full_name)}</div>
                                            <h5 className="member-name">{member.full_name || 'Без имени'}</h5>
                                            <div className="member-role">{member.role}</div>
                                            <span className={getLevelTagClass(member.role)}>{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="loading">Нет данных о команде</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div style={{ color: '#555' }}>
                            <h3 className="section-title">История активности</h3>
                            <ul className="history-list">
                                <li className="history-item role-change">
                                    <strong className="history-title">Изменение роли:</strong> Роль изменена с 'Сотрудник' на 'Админ' -{' '}
                                    <span className="history-time">10.06.2024, 14:30</span>
                                </li>
                                <li className="history-item login">
                                    <strong className="history-title">Вход в систему:</strong> Успешный вход -{' '}
                                    <span className="history-time">09.06.2024, 09:15</span>
                                </li>
                                <li className="history-item profile-update">
                                    <strong className="history-title">Обновление профиля:</strong> Обновлен email -{' '}
                                    <span className="history-time">08.06.2024, 18:00</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
