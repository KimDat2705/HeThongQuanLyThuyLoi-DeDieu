import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Hàm lưu Báo cáo nhanh lên Firebase Firestore
 * @param {Object} formData Dữ liệu form báo cáo nhanh
 */
export const submitQuickReport = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'reports'), {
      ...formData,
      type: 'BaoCaoNhanh',
      status: 'Chờ duyệt',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Lỗi khi lưu báo cáo: ', error);
    throw error;
  }
};
