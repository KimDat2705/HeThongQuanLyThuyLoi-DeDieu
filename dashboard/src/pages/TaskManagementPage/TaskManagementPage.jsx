import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiBell, FiPlus, FiX } from 'react-icons/fi';
import styles from './TaskManagementPage.module.css';
import GanttChart from '../../components/GanttChart/GanttChart';
import { summaryData, GLOBAL_CHART_START, GLOBAL_CHART_END } from '../../data/mockTaskData';
import { subscribeToProjects, saveProjectsToCloud } from '../../services/taskService';
import { getAllUsers } from '../../services/userService';
import { diffDays } from '../../utils/dateUtils';

export default function TaskManagementPage() {
  const location = useLocation();
  const isCompletedTab = location.pathname.includes('da-hoan-thanh');

  const [projects, setProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((liveData) => {
      setProjects(liveData);
    });
    
    // Fetch users for assignment dropdown
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users.filter(u => u.role !== 'admin')); // Không giao việc cho admin
      } catch (err) {
        console.error("Lỗi khi tải danh sách người dùng:", err);
      }
    };
    fetchUsers();

    return () => unsubscribe();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [isCustomProject, setIsCustomProject] = useState(false);
  const [selectedProjectIdForModal, setSelectedProjectIdForModal] = useState(null);

  const [reviewModal, setReviewModal] = useState({ isOpen: false, task: null, feedback: '' });

  const openAssignModal = (projectId = null) => {
    setSelectedProjectIdForModal(projectId);
    setShowModal(true);
  };

  const openReviewModal = (task) => {
    setReviewModal({ isOpen: true, task, feedback: '' });
  };

  const closeReviewModal = () => {
    setReviewModal({ isOpen: false, task: null, feedback: '' });
  };

  const handleApproveTask = () => {
    if (!reviewModal.task) return;
    const { task, feedback } = reviewModal;
    const newProjects = projects.map(p => {
      if (p.id === task.projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === task.id ? { ...t, status: 'Đã hoàn thành', progress: 100, approveReason: feedback } : t)
        };
      }
      return p;
    });
    setProjects(newProjects);
    saveProjectsToCloud(newProjects);
    closeReviewModal();
  };

  const handleRejectTask = () => {
    if (!reviewModal.task || !reviewModal.feedback.trim()) return;
    const { task, feedback } = reviewModal;
    const newProjects = projects.map(p => {
      if (p.id === task.projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === task.id ? { ...t, status: 'Yêu cầu làm lại', progress: 75, rejectReason: feedback } : t)
        };
      }
      return p;
    });
    setProjects(newProjects);
    saveProjectsToCloud(newProjects);
    closeReviewModal();
  };

  // Sync back to localstorage when changes
  const handleAssignTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let projectId = formData.get('project');
    let projectName = formData.get('customProjectName');
    
    const newTask = {
      id: 't' + Date.now(),
      name: formData.get('taskName'),
      progress: 0,
      duration: diffDays(formData.get('start'), formData.get('end')) + ' ngày',
      assignee: formData.get('assignee'),
      avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
      status: 'Mới giao',
      startDate: formData.get('start'),
      endDate: formData.get('end'),
      isDelayed: false,
      lastNote: '',
      rejectReason: ''
    };

    let newProjects = [...projects];

    if (isCustomProject) {
      // Create new project
      projectId = 'p' + Date.now();
      newProjects.push({
        id: projectId,
        name: projectName,
        tasks: [newTask]
      });
    } else {
      // Add to existing project
      newProjects = newProjects.map(p => {
        if (p.id === projectId) {
          return { ...p, tasks: [...p.tasks, newTask] };
        }
        return p;
      });
    }

    setProjects(newProjects);
    saveProjectsToCloud(newProjects);
    setShowModal(false);
    setIsCustomProject(false); // reset
  };
  
  // Pass projectId to child tasks so review logic can locate them easily
  const projectsWithTaskProjectIds = projects.map(p => ({
     ...p, 
     tasks: p.tasks.map(t => ({ ...t, projectId: p.id }))
  }));

  const filteredProjects = projectsWithTaskProjectIds.map(p => {
    return {
      ...p,
      tasks: p.tasks.filter(t => {
        const isCompleted = t.status === 'Đã hoàn thành' || (t.status === 'Kịp tiến độ' && t.progress === 100);
        return isCompletedTab ? isCompleted : !isCompleted;
      })
    };
  }).filter(p => p.tasks.length > 0);

  return (
    <div className={styles.pageContainer}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <h1 className={styles.pageTitle}>Tiến độ Công việc (Admin) {isCompletedTab ? '- Đã Hoàn Thành' : ''}</h1>
        
        {!isCompletedTab && (
          <button className={styles.assignTaskBtn} onClick={() => openAssignModal(null)}>
            <FiPlus /> Giao công việc
          </button>
        )}
      </div>

      {/* Gantt Chart Component */}
      <GanttChart projects={filteredProjects} onOpenAddModal={openAssignModal} onOpenReviewModal={openReviewModal} isCompletedTab={isCompletedTab} />

      {/* Summary Cards */}
      <div className={styles.summaryContainer}>
        {/* On Track Card */}
        <div className={`${styles.summaryCard} ${styles.onTrackCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardInfo}>
              <h2 className={styles.cardValue}>
                <span className={styles.highlightTrack}>{summaryData.onTrack.count}</span> {summaryData.onTrack.label}
              </h2>
              <p className={styles.cardDesc}>{summaryData.onTrack.desc}</p>
            </div>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span className={styles.progressValue}>{summaryData.onTrack.progress}%</span>
              <span className={styles.progressText}>Progress</span>
            </div>
            <div className={styles.miniChart}>
              {[80, 100, 60, 90, 70, 100, 50, 85].map((val, i) => (
                <div key={i} className={styles.chartBarWrapper}>
                  <div className={styles.chartBarBgTrack} />
                  <div className={styles.chartBarFillTrack} style={{ height: `${val}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delayed Card */}
        <div className={`${styles.summaryCard} ${styles.delayedCard}`}>
           <div className={styles.cardHeader}>
            <div className={styles.cardInfo}>
              <h2 className={styles.cardValueDelayed}>
                <span className={styles.highlightDelayed}>{summaryData.delayed.count}</span> {summaryData.delayed.label}
              </h2>
              <p className={styles.cardDesc}>{summaryData.delayed.desc}</p>
            </div>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span className={styles.progressValueDelayed}>{summaryData.delayed.progress}%</span>
              <span className={styles.progressText}>Progress</span>
            </div>
            <div className={styles.miniChart}>
              {[40, 20, 50, 30, 45, 10, 60, 35].map((val, i) => (
                <div key={i} className={styles.chartBarWrapper}>
                  <div className={styles.chartBarBgDelayed} />
                  <div className={styles.chartBarFillDelayed} style={{ height: `${val}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className={`${styles.summaryCard} ${styles.completionCard}`}>
          <div className={styles.completionInfo}>
            <p className={styles.completionLabel}>{summaryData.completion.label}</p>
            <h2 className={styles.completionValue}>{summaryData.completion.rate}%</h2>
            <p className={styles.completionDesc}>{summaryData.completion.desc}</p>
          </div>
          
          {/* Circular Progress using SVG */}
          <div className={styles.circularProgress}>
             <svg viewBox="0 0 36 36" className={styles.circularSvg}>
              <path
                className={styles.circleBg}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.circleFill}
                strokeDasharray={`${summaryData.completion.rate}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* MODAL GIAO VIỆC */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Giao công việc mới</h2>
              <button 
                className={styles.closeBtn} 
                onClick={() => {
                  setShowModal(false);
                  setIsCustomProject(false);
                }}
              >
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleAssignTask} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Tiêu đề dự án / Nhóm việc</label>
                {!isCustomProject ? (
                  <select 
                    key={selectedProjectIdForModal}
                    name="project" 
                    className={styles.inputField} 
                    required 
                    defaultValue={selectedProjectIdForModal || ""}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomProject(true);
                      }
                    }}
                  >
                    <option value="" disabled>-- Chọn dự án --</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                    <option value="custom">➕ Nhập dự án khác...</option>
                  </select>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                     <input 
                       name="customProjectName" 
                       type="text" 
                       className={styles.inputField} 
                       style={{ flex: 1 }}
                       required 
                       placeholder="Nhập tên dự án mới..." 
                       autoFocus
                     />
                     <button type="button" onClick={() => setIsCustomProject(false)} className={styles.closeBtn} style={{ fontSize: '1.2rem' }}>
                       <FiX />
                     </button>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Tiêu đề nhiệm vụ chi tiết</label>
                <input name="taskName" type="text" className={styles.inputField} required placeholder="Ví dụ: Rà soát đê tả Đuống..." />
              </div>

              <div className={styles.formGroup}>
                <label>Giao cho (Người phụ trách)</label>
                <select name="assignee" className={styles.inputField} required>
                  <option value="">-- Chọn cán bộ/ phòng ban --</option>
                  {allUsers.map((u) => (
                    <option key={u.id} value={u.fullName}>
                      {u.fullName} ({u.title})
                    </option>
                  ))}
                  {/* Dự phòng option cũ nếu chưa load kịp */}
                  {allUsers.length === 0 && (
                    <>
                      <option value="Trưởng phòng Quản lý đê điều">Trưởng phòng Quản lý đê điều</option>
                      <option value="Trưởng phòng QLDA ĐTXD">Trưởng phòng QLDA ĐTXD</option>
                      <option value="Phó phòng Hành chính">Phó phòng Hành chính</option>
                    </>
                  )}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Ngày bắt đầu</label>
                  <input name="start" type="date" defaultValue="2026-04-14" className={styles.inputField} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Ngày kết thúc</label>
                  <input name="end" type="date" defaultValue="2026-04-20" className={styles.inputField} required />
                </div>
              </div>

              <button type="submit" className={styles.submitModalBtn}>Xác nhận Giao việc</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DUYỆT (ADMIN REVIEW) */}
      {reviewModal.isOpen && (
         <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
               <div className={styles.modalHeader}>
                 <h2>Nghiệm thu Công việc</h2>
                 <button className={styles.closeBtn} onClick={closeReviewModal}><FiX /></button>
               </div>
               
               <div style={{ marginBottom: '16px' }}>
                 <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Nhiệm vụ: <strong>{reviewModal.task?.name}</strong></p>
                 <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b' }}>Cán bộ: {reviewModal.task?.assignee}</p>
                 <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '0.85rem' }}>Nội dung báo cáo tiến độ:</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{reviewModal.task?.lastNote || 'Không có ghi chú'}</p>
                 </div>
               </div>

               <div style={{ marginBottom: '24px' }}>
                 <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Nội dung nhận xét / Lý do từ chối:</label>
                 <textarea 
                   style={{ width: '100%', minHeight: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                   placeholder="Nhập nhận xét phê duyệt hoặc lý do yêu cầu làm lại..."
                   value={reviewModal.feedback}
                   onChange={(e) => setReviewModal({...reviewModal, feedback: e.target.value})}
                 ></textarea>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button 
                     onClick={handleRejectTask}
                     disabled={!reviewModal.feedback.trim()}
                     style={{ 
                       padding: '8px 16px', background: reviewModal.feedback.trim() ? '#ef4444' : '#fecaca', 
                       color: 'white', border: 'none', borderRadius: '6px', cursor: reviewModal.feedback.trim() ? 'pointer' : 'not-allowed', fontWeight: 'bold' 
                     }}
                  >
                     Từ chối & Yêu cầu sửa
                  </button>
                  <button 
                     onClick={handleApproveTask}
                     style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                     Phê duyệt Hoàn thành
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
