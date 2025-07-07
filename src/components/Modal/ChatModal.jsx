import React, { useRef, useState, useEffect } from 'react';
import './Modal.css';

const ADMIN = { name: 'Support', avatar: '/support.png' };
const USER = { name: 'Вы', avatar: '/avatar.png' };

function ChatModal({ show, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: ADMIN, type: 'text', content: 'Здравствуйте! Чем можем помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [lightbox, setLightbox] = useState(null); // {src, alt}
  const fileInputRef = useRef();
  const chatEndRef = useRef();

  // Прокрутка вниз при новом сообщении
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, show]);

  // Закрытие по Esc
  useEffect(() => {
    if (!show && !lightbox) return;
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, lightbox, onClose]);

  if (!show) return null;

  const handleSend = () => {
    if (input.trim() === '' && !file) return;
    if (input.trim()) {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: USER, type: 'text', content: input }
      ]);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: USER,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          content: url,
          fileName: file.name
        }
      ]);
      setFile(null);
    }
    setInput('');
  };

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  // Lightbox overlay
  const renderLightbox = () => (
    <div className="modal-overlay show" style={{zIndex: 3000, background: 'rgba(0,0,0,0.85)'}} onClick={() => setLightbox(null)}>
      <div
        className="modal-content"
        style={{background: 'none', boxShadow: 'none', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, borderRadius: 16, position: 'relative'}}
        onClick={e => e.stopPropagation()}
      >
        <img src={lightbox.src} alt={lightbox.alt} style={{maxWidth: '80vw', maxHeight: '80vh', borderRadius: 16, boxShadow: '0 8px 32px #0007'}} />
        <button className="modal-close" style={{position: 'absolute', top: 12, right: 12, background: '#fff', color: '#333'}} onClick={() => setLightbox(null)}>&times;</button>
      </div>
    </div>
  );

  return (
    <>
      {lightbox && renderLightbox()}
      <div className="modal-overlay show" style={{zIndex: 2000}} onClick={onClose}>
        <div
          className="modal-content"
          style={{maxWidth: 400, width: '95%', padding: 0, display: 'flex', flexDirection: 'column', height: 600, position: 'relative', borderRadius: 16, fontFamily: 'Manrope, sans-serif'}}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header" style={{padding: '20px 24px 0 24px', borderBottom: '1px solid #eee', marginBottom: 0}}>
            <img src="/support.png" alt="support" style={{width: 32, height: 32, borderRadius: '50%', marginRight: 10}} />
            <span style={{fontWeight: 600, fontSize: 18, color: '#222'}}>Чат с поддержкой</span>
            <button className="modal-close" onClick={onClose} style={{marginLeft: 'auto'}}>&times;</button>
          </div>
          <div className="modal-body" style={{flex: 1, overflowY: 'auto', padding: 16, background: '#f8f8f8'}}>
            {messages.map(msg => (
              <div key={msg.id} style={{display: 'flex', alignItems: 'flex-end', marginBottom: 14, flexDirection: msg.sender === USER ? 'row-reverse' : 'row'}}>
                <img src={msg.sender.avatar} alt="avatar" style={{width: 28, height: 28, borderRadius: '50%', margin: msg.sender === USER ? '0 0 0 8px' : '0 8px 0 0'}} />
                <div style={{maxWidth: 220, background: msg.sender === USER ? '#53bb8c' : '#fff', color: msg.sender === USER ? '#fff' : '#222', borderRadius: 12, padding: '8px 12px', wordBreak: 'break-word', fontSize: 15, boxShadow: '0 2px 8px #0001', fontFamily: 'Manrope, sans-serif'}}>
                  {msg.type === 'text' && msg.content}
                  {msg.type === 'image' && (
                    <img
                      src={msg.content}
                      alt="img"
                      style={{maxWidth: 180, maxHeight: 180, borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px #0002'}}
                      onClick={() => setLightbox({src: msg.content, alt: 'Фото'})}
                    />
                  )}
                  {msg.type === 'file' && <a href={msg.content} download={msg.fileName} style={{color: '#fff', textDecoration: 'underline'}}>{msg.fileName}</a>}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="modal-footer" style={{padding: 12, borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 8, background: '#fff'}}>
            <input
              type="text"
              className="chat-input"
              placeholder="Введите сообщение..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{flex: 1, borderRadius: 8, border: '1px solid #ddd', padding: '8px 12px', fontSize: 15, fontFamily: 'Manrope, sans-serif'}}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <input
              type="file"
              style={{display: 'none'}}
              ref={fileInputRef}
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.txt"
              onChange={handleFileChange}
            />
            <button
              className="chat-attach-btn"
              style={{background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#53bb8c', borderRadius: 8, padding: 4}}
              onClick={() => fileInputRef.current.click()}
              title="Прикрепить файл или фото"
            >
              📎
            </button>
            <button
              className="chat-send-btn"
              style={{background: '#53bb8c', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 500, fontSize: 15, cursor: 'pointer', fontFamily: 'Manrope, sans-serif'}}
              onClick={handleSend}
            >
              Отправить
            </button>
          </div>
          {file && (
            <div style={{padding: 8, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 8}}>
              <span style={{fontSize: 14}}>Файл: {file.name}</span>
              <button style={{background: 'none', border: 'none', color: '#888', cursor: 'pointer'}} onClick={() => setFile(null)}>×</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatModal; 