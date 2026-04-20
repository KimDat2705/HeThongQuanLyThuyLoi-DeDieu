export const mockProjects = [];

export const getProjects = () => {
  const saved = localStorage.getItem('demoProjectsWorkflowV5');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('demoProjectsWorkflowV5', JSON.stringify(mockProjects));
  return mockProjects;
};

export const saveProjects = (projects) => {
  localStorage.setItem('demoProjectsWorkflowV5', JSON.stringify(projects));
};

export const GLOBAL_CHART_START = '2026-04-01';
export const GLOBAL_CHART_END = '2026-07-31';

export const summaryData = {
  onTrack: { count: '08', label: 'Kịp tiến độ', desc: '8 dự án/công việc đang đúng tiến độ', progress: 90.5 },
  delayed: { count: '03', label: 'Trễ tiến độ', desc: '3 dự án/công việc đang bị trễ', progress: 18.2 },
  completion: { rate: 65, label: 'Tỷ lệ Hoàn thành', desc: 'Tổng quan dự án' }
};
