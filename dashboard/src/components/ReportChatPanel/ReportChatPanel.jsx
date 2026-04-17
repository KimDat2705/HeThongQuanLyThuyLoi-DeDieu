/* ============================================
   REPORT CHAT PANEL — Chat AI thật (Gemini)
   Phân tích & trả cứu báo cáo PCTT
   ============================================ */
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ReportChatPanel.module.css';
import { FiPaperclip, FiSend, FiTrendingUp, FiFileText, FiBarChart2 } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import {
  reportMeta, stormData, rainfallData, waterLevelData,
  reservoirData, pumpData, infrastructureData, damageData,
} from '../../data/reportData';
import { sendMessage, buildReportContext } from '../../services/geminiService';

/* Dữ liệu báo cáo gộp để truyền context cho AI */
const currentReport = {
  reportMeta, stormData, rainfallData, waterLevelData,
  reservoirData, pumpData, infrastructureData, damageData,
};
const reportContext = buildReportContext(currentReport);

/* Gợi ý mẫu */
const SUGGESTIONS = [
  { icon: <FiBarChart2 />, text: 'So sánh mực nước với đợt bão số 3?' },
  { icon: <FiFileText />, text: 'Tổng thiệt hại ước tính của đợt mưa lũ này?' },
  { icon: <FiTrendingUp />, text: 'Dự báo mực nước sông Cầu 24h tới?' },
];

/* Tin nhắn chào mặc định từ AI */
const WELCOME_MSG = {
  role: 'ai',
  text: `Xin chào đồng chí! Tôi là Trợ lý AI chuyên phân tích báo cáo PCTT tỉnh Bắc Ninh.\n\nHiện tôi đã nạp dữ liệu từ **Báo cáo nhanh ngày ${reportMeta.ngay}** — Bão số 11. Đồng chí có thể hỏi tôi bất kỳ thông tin nào trong báo cáo.`,
  time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
};

/* ==== Render markdown đơn giản (bold) ==== */
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ReportChatPanel() {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto scroll xuống cuối khi có tin mới */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Chuyển đổi messages sang format Gemini API */
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

    /* Thêm tin nhắn user */
    const userMsg = { role: 'user', text: userText, time: now };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      /* Chuẩn bị history cho Gemini */
      const allMessages = [...messages, userMsg];
      const history = toGeminiHistory(allMessages);

      /* Gọi Gemini API */
      const aiResponse = await sendMessage(history, reportContext);
      const aiTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

      setMessages(prev => [...prev, {
        role: 'ai',
        text: aiResponse,
        time: aiTime,
      }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: `⚠️ Xin lỗi, tôi gặp lỗi khi xử lý: ${error.message}`,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, toGeminiHistory]);

  /* Enter để gửi */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* Click gợi ý */
  const handleSuggestion = (text) => {
    handleSend(text);
  };

  return (
    <aside className={styles.chatPanel} id="report-chat-panel">
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderIcon}>
          <BsRobot />
        </div>
        <div className={styles.chatHeaderInfo}>
          <h3>Trợ lý AI — Báo cáo</h3>
          <div className={styles.chatHeaderStatus}>
            <span className={`${styles.chatHeaderDot} ${isLoading ? styles.dotThinking : ''}`}></span>
            {isLoading ? 'Đang phân tích...' : 'Phân tích & trả cứu báo cáo PCTT'}
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
                  {msg.text.split('\n\n').map((para, pi) => (
                    <p key={pi} dangerouslySetInnerHTML={{
                      __html: renderMarkdown(para)
                    }} />
                  ))}
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

      {/* Suggestions — chỉ hiện khi chưa có nhiều tin nhắn */}
      {messages.length <= 2 && !isLoading && (
        <div className={styles.chatSuggestions}>
          <div className={styles.suggestionsLabel}>GỢI Ý HỎI THÊM</div>
          {SUGGESTIONS.map((s, i) => (
            <div
              className={styles.suggestionItem}
              key={i}
              onClick={() => handleSuggestion(s.text)}
              role="button"
              tabIndex={0}
            >
              <span className={styles.suggestionIcon}>{s.icon}</span>
              {s.text}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={styles.chatInput}>
        <button className={styles.chatAttachBtn} title="Đính kèm">
          <FiPaperclip />
        </button>
        <input
          ref={inputRef}
          type="text"
          className={styles.chatInputField}
          placeholder="Hỏi thêm về báo cáo..."
          id="report-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className={styles.chatSendBtn}
          id="btn-report-send"
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
