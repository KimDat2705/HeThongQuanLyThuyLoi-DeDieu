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
      callback(docSnap.data().projects || []);
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
