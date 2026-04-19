import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import styles from './GanttChart.module.css';
import { ZOOM_LEVELS, generateTimelineData, getPixelsPerDay, diffDays } from '../../utils/dateUtils';
import { GLOBAL_CHART_START, GLOBAL_CHART_END } from '../../data/mockTaskData';

export default function GanttChart({ projects, onOpenAddModal, onOpenReviewModal, isCompletedTab }) {

  const [zoomLevel, setZoomLevel] = useState(ZOOM_LEVELS.DAY);
  const scrollContainerRef = useRef(null);

  const { headers, totalWidth, totalDays, actualStartDate } = useMemo(() => {
    return generateTimelineData(GLOBAL_CHART_START, GLOBAL_CHART_END, zoomLevel);
  }, [zoomLevel]);

  const pixelsPerDay = getPixelsPerDay(zoomLevel);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const today = new Date();
      const start = new Date(actualStartDate);
      let daysPassed = diffDays(start, today);
      if (today < start) daysPassed = 0;
      const targetScroll = (daysPassed * pixelsPerDay) - 150;
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [zoomLevel, pixelsPerDay]);

  const todayPosition = diffDays(actualStartDate, new Date()) * pixelsPerDay;

  return (
    <div className={styles.ganttWrapper}>
      <div className={styles.headerLegend}>
        <h3 className={styles.chartTitle}>Biểu đồ Tiến độ Dự án</h3>
        <div className={styles.legendWrapper}>
          <div className={styles.legendItem}>
            <span className={styles.legendDotTrack}></span> Kịp tiến độ
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDotDelay}></span> Trễ tiến độ
          </div>
        </div>
      </div>


      <div className={styles.ganttContainer} ref={scrollContainerRef}>
        {/* Header Row */}
        <div className={styles.ganttHeader}>
          <div className={styles.ganttTaskHeaderSpacer}></div>
          <div className={styles.ganttTaskHeader}>Tên công việc / Nhiệm vụ</div>
          <div className={styles.ganttTimelineHeader}>
            <div className={styles.monthsRow}>
              {headers.map((head, i) => (
                <div 
                  key={i} 
                  className={styles.monthCell} 
                  style={{ 
                    width: head.cols * pixelsPerDay, 
                    minWidth: head.cols * pixelsPerDay,
                    textAlign: head.alignLeft ? 'left' : 'center',
                    paddingLeft: head.alignLeft ? '12px' : '6px'
                  }}
                >
                  {head.label}
                </div>
              ))}
            </div>
            <div className={styles.daysRow}>
                {headers.flatMap((th, i) =>
                  th.subCols.map((sub, j) => (
                    <div 
                      key={`${i}-${j}`} 
                      className={styles.dayCell} 
                      style={{ 
                         width: pixelsPerDay * (th.cols / th.subCols.length), // Account for grouped widths in Month
                         minWidth: pixelsPerDay * (th.cols / th.subCols.length),
                         textAlign: th.alignLeftSubCols ? 'left' : 'center',
                         paddingLeft: th.alignLeftSubCols ? '12px' : '2px'
                      }}
                    >
                      {sub}
                    </div>
                  ))
                )}
              </div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.ganttBody}>
          {projects.map((project, pIndex) => (
            <div key={project.id} className={styles.projectGroup}>
              {/* Vertical Side Header */}
              <div className={styles.projectSidebar}>
                <div className={styles.projectSidebarTextWrapper}>
                  <span className={styles.projectSidebarText}>{project.name}</span>
                </div>
              </div>

              {/* Tasks List */}
              <div className={styles.projectTasksWrapper}>
                {project.tasks.map(task => {
                  const isWaiting = task.status === 'Chờ nghiệm thu';
                  const isRejected = task.status === 'Yêu cầu làm lại';
                  
                  return (
                  <div key={task.id} className={styles.taskRow}>
                    {/* Left Info Panel */}
                    <div className={styles.taskInfo}>
                      <div className={styles.taskDetails}>
                        <span className={styles.taskName}>{task.name}</span>
                        <span className={styles.taskMeta}>{task.progress}% - {task.duration} - {task.assignee}</span>
                        {task.lastNote && (
                           <div className={styles.inlineNote}>
                              📝 {task.lastNote}
                           </div>
                        )}
                        {isWaiting && (
                           <button className={styles.reviewBtnInline} onClick={() => onOpenReviewModal && onOpenReviewModal(task)}>
                              Duyệt ngay
                           </button>
                        )}
                        {isRejected && (
                           <span className={styles.rejectedLabel}>Đã từ chối</span>
                        )}
                      </div>
                      <img src={task.avatar} alt={task.assignee} className={styles.taskAvatar} />
                    </div>

                    {/* Right Timeline Panel */}
                    <div className={styles.timelineArea} style={{ width: totalWidth, minWidth: totalWidth }}>
                      {/* Background Grid */}
                      <div className={styles.gridLines} style={{ width: totalWidth, minWidth: totalWidth }}>
                        {headers.flatMap((th, idx) => 
                          th.subCols.map((sub, j) => (
                            <div 
                              key={`${idx}-${j}`} 
                              className={styles.gridLine} 
                              style={{ 
                                width: pixelsPerDay * (th.cols / th.subCols.length), 
                                minWidth: pixelsPerDay * (th.cols / th.subCols.length) 
                              }} 
                            />
                          ))
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div 
                        className={`${styles.taskBarContainer} ${isWaiting ? styles.waiting : isRejected ? styles.rejected : task.isDelayed ? styles.delayed : styles.onTrack}`}
                        style={{ 
                          left: `${diffDays(actualStartDate, task.startDate) * pixelsPerDay}px`, 
                          width: `${diffDays(task.startDate, task.endDate) * pixelsPerDay}px` 
                        }}
                      >
                        <div 
                          className={styles.taskBarProgress} 
                          style={{ width: `${task.progress}%` }}
                        >
                          <span className={styles.progressText}>{task.progress}%</span>
                        </div>
                        <span className={styles.statusLabel}>{task.status}</span>
                      </div>
                    </div>
                  </div>
                )})}
                
                {/* Add Quick Task Row - Only visible for active tasks */}
                {!isCompletedTab && (
                  <div className={`${styles.taskRow} ${styles.addTaskWrapperRow}`} style={{ borderBottom: 'none' }}>
                    <div 
                       className={`${styles.taskInfo} ${styles.addTaskRow}`} 
                       onClick={() => onOpenAddModal && onOpenAddModal(project.id)}
                    >
                       <span className={styles.addTaskBtnText}>+ Giao thêm công việc</span>
                    </div>
                    {/* Empty grey timeline area for this row */}
                    <div className={styles.timelineArea} style={{ width: totalWidth, minWidth: totalWidth, backgroundColor: '#f8fafc' }}>
                        {/* Optional Grid Lines - Kept empty to separate from real tasks */}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Zoom Controls Overlay (MS Project Style) */}
      <div className={styles.zoomControls}>
        <div className={styles.zoomControlsInner}>
          <button 
            className={styles.zoomBtn} 
            onClick={() => setZoomLevel(Math.max(1, zoomLevel - 1))}
            disabled={zoomLevel === ZOOM_LEVELS.DAY}
          >
            <FiZoomIn />
          </button>
          
          <div className={styles.zoomSliderContainer}>
             <input 
                type="range" 
                min="1" 
                max="3" 
                step="1" 
                className={styles.zoomSlider}
                value={zoomLevel} 
                onChange={(e) => setZoomLevel(parseInt(e.target.value))}
             />
          </div>

          <button 
            className={styles.zoomBtn} 
            onClick={() => setZoomLevel(Math.min(3, zoomLevel + 1))}
            disabled={zoomLevel === ZOOM_LEVELS.MONTH}
          >
             <FiZoomOut />
          </button>
        </div>
      </div>
    </div>
  );
}
