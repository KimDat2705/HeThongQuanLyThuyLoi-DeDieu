import styles from './ChatPanel.module.css';
import { FiPaperclip, FiSend, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';

export default function ChatPanel() {
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
            <span className={styles.chatHeaderDot}></span>
            Hỗ trợ kỹ thuật trực tuyến 24/7
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.chatMessages}>
        {/* User message */}
        <div className={styles.messageUser}>
          <div className={styles.messageUserBubble}>
            Tình hình trạm bơm huyện Gia Bình?
          </div>
          <div className={styles.messageTime}>10:42 AM</div>
        </div>

        {/* AI message */}
        <div className={styles.messageAI}>
          <div className={styles.messageAIAvatar}>
            <BsRobot />
          </div>
          <div>
            <div className={styles.messageAIBubble}>
              <div>
                Huyện <strong>Gia Bình</strong> hiện có <strong>45 trạm bơm</strong> đang
                trong trạng thái sẵn sàng.
              </div>
              <div className={styles.messageWarning}>
                Cảnh báo: 2 trạm (Vạn Ninh 1, Vạn Ninh 2) đang có mực nước cao vượt mức báo động I.
              </div>
              <div className={styles.messageActions}>
                <button className={styles.messageActionBtn}>
                  Xem chi tiết Vạn Ninh
                </button>
                <button className={styles.messageActionBtn}>
                  Lịch sử vận hành
                </button>
              </div>
            </div>
            <div className={styles.messageTimeLeft}>10:42 AM</div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className={styles.chatSuggestions}>
        <div className={styles.suggestionsLabel}>GỢI Ý HỎI AI</div>
        <div className={styles.suggestionItem}>
          <FiTrendingUp className={styles.suggestionIcon} />
          Dự báo lượng mưa đêm nay tại Bắc Ninh?
        </div>
        <div className={styles.suggestionItem}>
          <FiMapPin className={styles.suggestionIcon} />
          Kiểm tra an toàn đê hữu Đuống đoạn Tiên Du?
        </div>
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
        />
        <button className={styles.chatSendBtn} id="btn-send" title="Gửi">
          <FiSend />
        </button>
      </div>
    </aside>
  );
}
