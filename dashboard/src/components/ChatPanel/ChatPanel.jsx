/* ============================================
   CHAT PANEL — AI Chat TOÀN CỤC (Gemini 3 Flash)
   Trợ lý AI duy nhất cho toàn hệ thống
   Có context đầy đủ: báo cáo + trạm bơm + đê điều
   ============================================ */
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ChatPanel.module.css';
import { FiPaperclip, FiSend, FiMapPin, FiTrendingUp, FiFileText, FiExternalLink } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { sendMessage, buildReportContext } from '../../services/geminiService';

/* Gợi ý mẫu */
const SUGGESTIONS = [
  { icon: <FiTrendingUp />, text: 'Dự báo lượng mưa đêm nay tại Bắc Ninh?' },
  { icon: <FiMapPin />, text: 'Kiểm tra an toàn đê hữu Đuống đoạn Tiên Du?' },
  { icon: <FiFileText />, text: 'Tóm tắt báo cáo nhanh bão số 11?' },
];

/* Tin nhắn chào */
const WELCOME_MSG = {
  role: 'ai',
  text: 'Xin chào đồng chí! Tôi là **Trợ lý AI** của Hệ thống Giám sát Thủy lợi & Đê điều tỉnh Bắc Ninh.\n\nTôi có thể hỗ trợ:\n• Giám sát trạm bơm & đê điều\n• Phân tích mực nước sông, hồ chứa\n• Dự báo thời tiết & ngập lụt\n• Phân tích & trích xuất báo cáo PCTT\n\nĐồng chí cần hỏi gì ạ?',
  time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
};

/* Render markdown đơn giản */
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatPanel() {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  /* Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Chuyển messages sang format Gemini */
  const toGeminiHistory = useCallback((msgs) => {
    return msgs
      .filter(m => m.role === 'user' || m.role === 'ai')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));
  }, []);

  /* Gửi tin nhắn */
  const handleSend = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;

    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', text: userText, time: now };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      /* Truyền TOÀN BỘ context hệ thống TRỰC TIẾP TỪ FIREBASE */
      const snapshot = await getDocs(collection(db, 'reports_v2'));
      const activeReports = [];
      snapshot.forEach(doc => {
        activeReports.push({ id: doc.id, ...doc.data() });
      });
      const dynamicSystemContext = buildReportContext(activeReports);

      const allMessages = [...messages, userMsg];
      const history = toGeminiHistory(allMessages);
      const aiResponse = await sendMessage(history, dynamicSystemContext);
      const aiTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

      let finalAiResponse = aiResponse;
      const match = finalAiResponse.match(/\[OPEN_REPORT:\s*(.*?)\]/);
      if (match) {
         const id = match[1].trim();
         // Strip from the response so no future matches can occur if we restore it
         finalAiResponse = finalAiResponse.replace(/\[OPEN_REPORT:\s*(.*?)\]/g, '');
         navigate('/bao-cao/' + id);
      }

      setMessages(prev => [...prev, {
        role: 'ai', text: finalAiResponse, time: aiTime,
      }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: `⚠️ Xin lỗi, tôi gặp lỗi: ${error.message}`,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, toGeminiHistory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside className={styles.chatPanel} id="chat-panel">
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderIcon}>
          <BsRobot />
        </div>
        <div className={styles.chatHeaderInfo}>
          <h3>Trợ lý AI</h3>
          <div className={styles.chatHeaderStatus}>
            <span className={`${styles.chatHeaderDot} ${isLoading ? styles.dotThinking : ''}`}></span>
            {isLoading ? 'Đang xử lý...' : 'Hỗ trợ kỹ thuật trực tuyến 24/7'}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.chatMessages}>
        {messages.map((msg, i) => (
          msg.role === 'user' ? (
            <div className={styles.messageUser} key={i}>
              <div className={styles.messageUserBubble}>{msg.text}</div>
              <div className={styles.messageTime}>{msg.time}</div>
            </div>
          ) : (
            <div className={styles.messageAI} key={i}>
              <div className={styles.messageAIAvatar}>
                <BsRobot />
              </div>
              <div>
                <div className={styles.messageAIBubble}>
                  {msg.text.split('\n').map((para, pi) => {
                    let text = para.replace(/\[OPEN_REPORT:\s*(.*?)\]/g, '');
                    if (!text.trim()) return null;
                    return <p key={pi} dangerouslySetInnerHTML={{
                      __html: renderMarkdown(text)
                    }} />
                  })}
                </div>
                <div className={styles.messageTimeLeft}>{msg.time}</div>
              </div>
            </div>
          )
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className={styles.messageAI}>
            <div className={styles.messageAIAvatar}>
              <BsRobot />
            </div>
            <div className={styles.messageAIBubble}>
              <div className={styles.typingIndicator}>
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.chatInput}>
        <button className={styles.chatAttachBtn} title="Đính kèm">
          <FiPaperclip />
        </button>
        <input
          type="text"
          className={styles.chatInputField}
          placeholder="Nhập câu hỏi của bạn..."
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className={styles.chatSendBtn}
          id="btn-send"
          title="Gửi"
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
        >
          <FiSend />
        </button>
      </div>
    </aside>
  );
}
