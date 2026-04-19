import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiCheckSquare, FiAlertCircle, FiEdit2 } from 'react-icons/fi';
import styles from './UserTaskPage.module.css';
import { getProjects, saveProjects } from '../../data/mockTaskData';
import ChatPanel from '../../components/ChatPanel/ChatPanel';

export default function UserTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [updateModal, setUpdateModal] = useState({ isOpen: false, task: null, newProgress: 0, newNote: '' });
  const userTitle = localStorage.getItem('userTitle') || 'Trưởng phòng Quản lý đê điều';
  const location = useLocation();
  const isCompletedTab = location.pathname.includes('da-hoan-thanh');
  
  useEffect(() => {
    loadMyTasks();
  }, []);

  const loadMyTasks = () => {
    const allProjects = getProjects();
    const myTasks = [];
    allProjects.forEach(project => {
      project.tasks.forEach(task => {
        if (task.assignee === userTitle) {
          myTasks.push({ ...task, projectName: project.name, projectId: project.id });
        }
      });
    });
    setTasks(myTasks);
  };

  const openUpdateModal = (task) => {
    setUpdateModal({
      isOpen: true,
      task: task,
      newProgress: task.progress || 0,
      newNote: task.lastNote || ''
    });
  };

  const closeUpdateModal = () => {
    setUpdateModal({ isOpen: false, task: null, newProgress: 0, newNote: '' });
  };

  const handleUpdateSubmit = () => {
    const { task, newProgress, newNote } = updateModal;
    const allProjects = getProjects();
    
    // Determine status logic
    let newStatus = task.status;
    if (newProgress === 100) {
      newStatus = 'Chờ nghiệm thu';
    } else {
      if (newStatus === 'Yêu cầu làm lại' || newStatus === 'Chờ nghiệm thu') {
         newStatus = 'Đang thực hiện'; // Reset to working status
      }
    }

    const updatedProjects = allProjects.map(p => {
      if (p.id === task.projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => {
            if (t.id === task.id) {
              return { 
                ...t, 
                progress: newProgress,
                status: newStatus,
                lastNote: newNote,
                isDelayed: newStatus === 'Đang thực hiện' ? t.isDelayed : false
              };
            }
            return t;
          })
        };
      }
      return p;
    });

    saveProjects(updatedProjects);
    loadMyTasks();
    closeUpdateModal();
  };

  const activeTasks = tasks.filter(t => !(t.status === 'Đã hoàn thành' || (t.status === 'Kịp tiến độ' && t.progress === 100)));
  const completedTasks = tasks.filter(t => (t.status === 'Đã hoàn thành' || (t.status === 'Kịp tiến độ' && t.progress === 100)));

  const renderTaskCard = (task) => {
    const isCompleted = task.status === 'Kịp tiến độ' && task.progress === 100 || task.status === 'Đã hoàn thành';
    const isWaiting = task.status === 'Chờ nghiệm thu';
    const isRejected = task.status === 'Yêu cầu làm lại';

    return (
      <div key={task.id} className={`${styles.taskCard} ${isCompleted ? styles.completedCard : ''}`}>
        <div className={styles.cardHeader}>
          <span className={styles.badgeProject}>{task.projectName}</span>
          {isCompleted ? (
            <span className={styles.statusDone}><FiCheckCircle /> Đã hoàn thành</span>
          ) : isWaiting ? (
            <span className={styles.statusWaiting}><FiClock /> Đang chờ Lãnh đạo duyệt</span>
          ) : isRejected ? (
            <span className={styles.statusRejected}><FiAlertCircle /> Yêu cầu làm lại ({task.progress}%)</span>
          ) : (
            <span className={task.isDelayed ? styles.statusDelayed : styles.statusPending}>
              <FiClock /> Đang thực hiện ({task.progress}%)
            </span>
          )}
        </div>
        
        <h3 className={styles.taskTitle}>{task.name}</h3>

        {isRejected && task.rejectReason && (
           <div className={styles.rejectionBox}>
             <p>Lãnh đạo từ chối với lý do:</p>
             <span>"{task.rejectReason}"</span>
           </div>
        )}
        {isCompleted && task.approveReason && (
           <div className={styles.approvalBox}>
             <p>Lãnh đạo phê duyệt với nhận xét:</p>
             <span>"{task.approveReason}"</span>
           </div>
        )}
        
        <div className={styles.taskDetails}>
          <p><strong>Thời gian:</strong> {task.duration}</p>
          <p><strong>Thực hiện:</strong> Từ ngày {task.startDate} đến {task.endDate}</p>
        </div>
        
        {!isCompleted && !isWaiting && (
          <button className={styles.completeBtn} onClick={() => openUpdateModal(task)}>
            <FiEdit2 /> Cập nhật Tiến độ
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1>Danh sách Công việc được giao</h1>
        <p>Xin chào, {userTitle}. Dưới đây là các nhiệm vụ cần thực hiện.</p>
      </header>

      <div className={styles.taskGrid}>
        {(isCompletedTab ? completedTasks : activeTasks).length === 0 ? (
          <div className={styles.emptyState}>
            <FiCheckSquare className={styles.emptyIcon} />
            <p>{isCompletedTab ? 'Chưa có công việc nào hoàn thành.' : 'Hiện tại bạn không có công việc nào đang xử lý.'}</p>
          </div>
        ) : (isCompletedTab ? completedTasks : activeTasks).map(renderTaskCard)}
      </div>

      {updateModal.isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Báo cáo Tiến độ</h2>
            <p>Nhiệm vụ: <strong>{updateModal.task?.name}</strong></p>

            <div className={styles.sliderWrapper}>
               <div className={styles.sliderHeader}>
                  <span>Tiến độ hoàn thành:</span>
                  <span style={{ color: updateModal.newProgress === 100 ? '#10b981' : '#3b82f6' }}>
                    {updateModal.newProgress}%
                  </span>
               </div>
               <input 
                 type="range" 
                 min="0" max="100" step="5"
                 className={styles.slider}
                 value={updateModal.newProgress}
                 onChange={(e) => setUpdateModal({...updateModal, newProgress: parseInt(e.target.value)})}
               />
            </div>

            <div className={styles.noteWrapper}>
               <label>Nội dung báo cáo chi tiết {updateModal.newProgress === 100 && '(Bắt buộc)'}</label>
               <textarea 
                  className={styles.noteTextarea}
                  placeholder="Ghi chú các hạng mục thiết yếu đã đạt được..."
                  value={updateModal.newNote}
                  onChange={(e) => setUpdateModal({...updateModal, newNote: e.target.value})}
               ></textarea>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeUpdateModal}>Hủy bỏ</button>
              <button 
                className={updateModal.newProgress === 100 ? styles.submitBtnReview : styles.submitBtn} 
                onClick={handleUpdateSubmit}
                disabled={updateModal.newProgress === 100 && updateModal.newNote.trim() === ''}
                style={{ opacity: (updateModal.newProgress === 100 && updateModal.newNote.trim() === '') ? 0.5 : 1 }}
              >
                {updateModal.newProgress === 100 ? 'Gửi Lãnh đạo Nghiệm thu' : 'Cập nhật %'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
