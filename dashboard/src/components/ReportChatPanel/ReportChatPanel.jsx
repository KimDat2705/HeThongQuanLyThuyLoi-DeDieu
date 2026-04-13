/* ============================================
   REPORT CHAT PANEL — Chat AI chuyên báo cáo
   ============================================ */
import styles from './ReportChatPanel.module.css';
import { FiPaperclip, FiSend, FiTrendingUp, FiFileText, FiBarChart2 } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import { chatMessages, chatSuggestions } from '../../data/reportData';

const suggestionIcons = {
  compare: <FiBarChart2 />,
  damage: <FiFileText />,
  forecast: <FiTrendingUp />,
};

export default function ReportChatPanel() {
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
            <span className={styles.chatHeaderDot}></span>
            Phân tích & trả cứu báo cáo PCTT
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.chatMessages}>
        {chatMessages.map((msg, i) => (
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
                      __html: para
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                  {msg.actions && (
                    <div className={styles.messageActions}>
                      {msg.actions.map((action, ai) => (
                        <button className={styles.messageActionBtn} key={ai}>
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.messageTimeLeft}>{msg.time}</div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Suggestions */}
      <div className={styles.chatSuggestions}>
        <div className={styles.suggestionsLabel}>GỢI Ý HỎI THÊM</div>
        {chatSuggestions.map((s, i) => (
          <div className={styles.suggestionItem} key={i}>
            <span className={styles.suggestionIcon}>{suggestionIcons[s.icon]}</span>
            {s.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={styles.chatInput}>
        <button className={styles.chatAttachBtn} title="Đính kèm">
          <FiPaperclip />
        </button>
        <input
          type="text"
          className={styles.chatInputField}
          placeholder="Hỏi thêm về báo cáo..."
          id="report-chat-input"
        />
        <button className={styles.chatSendBtn} id="btn-report-send" title="Gửi">
          <FiSend />
        </button>
      </div>
    </aside>
  );
}
