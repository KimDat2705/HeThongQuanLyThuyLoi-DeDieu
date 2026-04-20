import { db } from '../config/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const DOC_REF = doc(db, 'taskSystem', 'mainProjects');

/**
 * Mở kết nối Real-time với Firebase Firestore.
 * Callback sẽ được gọi với mảng projects hiện tại mỗi khi có bất kỳ thay đổi nào (thêm mới, cập nhật).
 */
export const subscribeToProjects = (callback) => {
  return onSnapshot(DOC_REF, (docSnap) => {
    if (docSnap.exists()) {
      const projects = docSnap.data().projects || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Auto-calculate isDelayed and override status if delayed
      const processedProjects = projects.map(p => ({
        ...p,
        tasks: p.tasks.map(t => {
          const endDate = new Date(t.endDate);
          endDate.setHours(0, 0, 0, 0);
          
          const isActive = t.status !== 'Đã hoàn thành' && t.status !== 'Chờ nghiệm thu';
          const isDelayedObj = isActive && (today > endDate);
          
          return {
            ...t,
            isDelayed: isDelayedObj,
            // Cập nhật nhãn label hiển thị nếu thực sự bị trễ
            status: (isDelayedObj && (t.status === 'Đang thực hiện' || t.status === 'Mới giao')) ? 'Trễ tiến độ' : t.status 
          };
        })
      }));

      callback(processedProjects);
    } else {
      callback([]); // Dữ liệu trống nếu document chưa được tạo
    }
  });
};

/**
 * Lưu mảng projects mới lên Firebase. Sẽ kích hoạt onSnapshot update trên toàn bộ các client.
 */
export const saveProjectsToCloud = async (projects) => {
  try {
    await setDoc(DOC_REF, { projects });
  } catch (error) {
    console.error('Lỗi khi đồng bộ công việc lên Firebase: ', error);
  }
};
