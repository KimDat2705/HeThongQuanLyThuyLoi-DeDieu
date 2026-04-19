// Utilities handling dynamic Gantt Chart zoom levels

export const ZOOM_LEVELS = {
  DAY: 1, // 1 day = 30px
  WEEK: 2, // 1 week = 60px (Approx 8.5px/day)
  MONTH: 3  // 1 month = 100px (Approx 3.3px/day)
};

export const getPixelsPerDay = (zoomLevel) => {
  switch (zoomLevel) {
    case ZOOM_LEVELS.DAY: return 35;
    case ZOOM_LEVELS.WEEK: return 140 / 7; // 20px per day
    case ZOOM_LEVELS.MONTH: return 180 / 30; // 6px per day
    default: return 30;
  }
};

export const diffDays = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const addDays = (dateStr, days) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const getDayName = (dateStr) => {
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return days[new Date(dateStr).getDay()];
};

export const getViMonth = (dateObj) => {
  return `Tháng ${dateObj.getMonth() + 1}`;
};

// Generates the timeline headers dynamically based on global start/end and zoom
export const generateTimelineData = (startDate, endDate, zoomLevel) => {
  const pixelsPerDay = getPixelsPerDay(zoomLevel);
  const start = new Date(startDate);
  
  const headers = [];
  let actualStartDate = new Date(startDate); // The true start date of the timeline rendering

  // Calculate actual start date based on zoom level limits
  if (zoomLevel === ZOOM_LEVELS.WEEK) {
    let dayOfWeek = start.getDay();
    let diff = start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    actualStartDate = new Date(new Date(start).setDate(diff));
  } else if (zoomLevel === ZOOM_LEVELS.MONTH) {
    actualStartDate = new Date(start);
    actualStartDate.setDate(1);
  }

  if (zoomLevel === ZOOM_LEVELS.DAY) {
    let currentBlock = [];
    let blockStartDate = new Date(actualStartDate);
    const renderDays = diffDays(actualStartDate, endDate) + 1;

    for (let i = 0; i < renderDays; i++) {
       const cd = new Date(actualStartDate);
       cd.setDate(actualStartDate.getDate() + i);
       
       currentBlock.push(getDayName(cd.toISOString()));

       if (cd.getDay() === 0 || i === renderDays - 1) { 
          headers.push({
            label: `${blockStartDate.getDate()} ${getViMonth(blockStartDate)} '${blockStartDate.getFullYear().toString().substr(-2)}`,
            cols: currentBlock.length,
            subCols: [...currentBlock],
            alignLeft: true
          });
          
          if (i < renderDays - 1) {
             blockStartDate = new Date(cd);
             blockStartDate.setDate(cd.getDate() + 1);
             currentBlock = [];
          }
       }
    }
  } else if (zoomLevel === ZOOM_LEVELS.WEEK) {
    let currentMonth = actualStartDate.getMonth();
    let currentLabel = `${getViMonth(actualStartDate)} '${actualStartDate.getFullYear().toString().substr(-2)}`;
    let currentBlock = [];
    
    // Iterate week by week
    let d = new Date(actualStartDate);
    while(d <= new Date(endDate)) {
        // Find Monday of the week
        let dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday
        let diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        let monday = new Date(d.setDate(diff));
        
        currentBlock.push(`${monday.getDate()} Thg ${monday.getMonth() + 1}`);
        
        let nextWeek = new Date(monday);
        nextWeek.setDate(monday.getDate() + 7);

        if (nextWeek.getMonth() !== currentMonth || nextWeek > new Date(endDate)) {
            headers.push({
                label: currentLabel,
                cols: currentBlock.length * 7, // Logical width in days
                subCols: [...currentBlock],
                alignLeftSubCols: true
            });
            currentMonth = nextWeek.getMonth();
            currentLabel = `${getViMonth(nextWeek)} '${nextWeek.getFullYear().toString().substr(-2)}`;
            currentBlock = [];
        }
        d = nextWeek;
    }
  } else if (zoomLevel === ZOOM_LEVELS.MONTH) {
    let currentYear = actualStartDate.getFullYear();
    let currentLabel = currentYear.toString();
    let currentBlock = [];

    let d = new Date(actualStartDate);

    while(d <= new Date(endDate)) {
        let monthDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        currentBlock.push({ name: `Tháng ${d.getMonth() + 1}`, days: monthDays });

        let nextMonth = new Date(d);
        nextMonth.setMonth(d.getMonth() + 1);

        if (nextMonth.getFullYear() !== currentYear || nextMonth > new Date(endDate)) {
            let totalDaysInGroup = currentBlock.reduce((acc, mb) => acc + mb.days, 0);
            headers.push({
                label: currentLabel,
                cols: totalDaysInGroup, // Width in days for this year
                subCols: currentBlock.map(m => m.name) // ['Tháng 4', 'Tháng 5']
            });
            currentYear = nextMonth.getFullYear();
            currentLabel = currentYear.toString();
            currentBlock = [];
        }
        d = nextMonth;
    }
  }

  // Calculate true total width from the headers generated
  const totalDays = headers.reduce((acc, h) => acc + h.cols, 0);
  const totalWidth = totalDays * pixelsPerDay;

  return { headers, totalWidth, totalDays, actualStartDate };
};
