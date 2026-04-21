import { collection, getDocs, doc, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';

export const PERMISSIONS = {
  OVERVIEW: 'Tổng quan',
  TASKS: 'Công việc',
  DATA_ENTRY: 'Nhập liệu',
  REPORT: 'Báo cáo',
  WEATHER: 'Dự báo thời tiết',
  FLOOD: 'Tình hình ngập lụt',
  PUMP_MAP: 'Bản đồ trạm bơm',
  DIKE: 'Quản lý đê điều',
  WATER_LEVEL: 'Biểu đồ mực nước',
  PROJECTS: 'Danh mục dự án',
  DISBURSEMENT: 'Tiến độ & Giải ngân',
  CONTRACTORS: 'Hồ sơ & Nhà thầu'
};

const INITIAL_USERS = [
  {
    username: 'admin',
    password: 'admin@123',
    role: 'admin',
    fullName: 'Admin',
    title: 'Giám đốc Sở',
    permissions: Object.keys(PERMISSIONS)
  },
  {
    username: 'user',
    password: 'user@123',
    role: 'leader',
    fullName: 'Nguyễn Văn A',
    title: 'Trưởng phòng Quản lý đê điều',
    permissions: ['OVERVIEW', 'TASKS', 'WEATHER', 'FLOOD', 'PUMP_MAP', 'DIKE', 'WATER_LEVEL', 'REPORT']
  },
  {
    username: 'phogiamdoc',
    password: 'pgd@123',
    role: 'leader',
    fullName: 'Lê Văn Phó',
    title: 'Phó Giám đốc Sở',
    permissions: ['OVERVIEW', 'TASKS', 'WEATHER', 'FLOOD', 'PUMP_MAP', 'DIKE', 'WATER_LEVEL', 'PROJECTS', 'DISBURSEMENT', 'CONTRACTORS', 'REPORT']
  },
  {
    username: 'truongphongda',
    password: 'tpda@123',
    role: 'leader',
    fullName: 'Trần Văn Dự Án',
    title: 'Trưởng phòng QLDA ĐTXD',
    permissions: ['OVERVIEW', 'TASKS', 'PROJECTS', 'DISBURSEMENT', 'CONTRACTORS', 'REPORT']
  },
  {
    username: 'phophonghc',
    password: 'pphc@123',
    role: 'leader',
    fullName: 'Nguyễn Thị Hành Chính',
    title: 'Phó phòng Hành chính',
    permissions: ['OVERVIEW', 'TASKS', 'REPORT']
  },
  {
    username: 'canboxa1',
    password: 'xa1@123',
    role: 'user',
    fullName: 'Nguyễn Văn Xã Một',
    title: 'Cán bộ Xã',
    permissions: ['OVERVIEW', 'TASKS', 'DATA_ENTRY']
  },
  {
    username: 'canboxa2',
    password: 'xa2@123',
    role: 'user',
    fullName: 'Trần Thị Xã Hai',
    title: 'Cán bộ Xã',
    permissions: ['OVERVIEW', 'TASKS', 'DATA_ENTRY']
  }
];

export const loginWithFirebase = async (username, password) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('username', '==', username), where('password', '==', password));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Fallback: Nếu Firebase hoàn toàn trắng, tài khoản admin mặc định vẫn có thể đăng nhập để khởi tạo data.
      if (username === 'admin' && password === 'admin@123') {
        return INITIAL_USERS.find(u => u.username === 'admin');
      }
      return null;
    }
    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Lỗi khi kết nối Firebase Login:", error);
    // Fallback: Tránh trường hợp rule Firebase chặn chưa cho đọc
    if (username === 'admin' && password === 'admin@123') {
      return INITIAL_USERS.find(u => u.username === 'admin');
    }
    throw error;
  }
};

export const getAllUsers = async () => {
  const usersRef = collection(db, USERS_COLLECTION);
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addUser = async (userData) => {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where('username', '==', userData.username));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) throw new Error("Tên đăng nhập đã tồn tại");
  
  const docRef = await addDoc(usersRef, userData);
  return { id: docRef.id, ...userData };
};

export const updateUser = async (userId, userData) => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, userData);
};

export const deleteUser = async (userId) => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await deleteDoc(userRef);
};
