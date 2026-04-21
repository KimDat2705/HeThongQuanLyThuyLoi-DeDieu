import React, { useState, useEffect } from 'react';
import { getAllUsers, addUser, updateUser, deleteUser, PERMISSIONS } from '../../services/userService';
import styles from './UserManagementPage.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [formData, setFormData] = useState({
    username: '', password: '', fullName: '', title: '', role: 'user', permissions: []
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      // Sort to put admin first, then by role etc, for easier viewing
      data.sort((a, b) => a.role === 'admin' ? -1 : a.username.localeCompare(b.username));
      setUsers(data);
    } catch (e) {
      console.error("Lỗi khi tải DS users", e);
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({ username: '', password: '', fullName: '', title: '', role: 'user', permissions: [] });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setEditingUser(u.id);
    setFormData({ 
      username: u.username || '', 
      password: u.password || '', 
      fullName: u.fullName || '', 
      title: u.title || '', 
      role: u.role || 'user', 
      permissions: u.permissions || [] 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá tài khoản này không?")) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (err) {
        alert("Lỗi khi xoá: " + err.message);
      }
    }
  };

  const handleTogglePermission = (permKey) => {
    setFormData(prev => {
      const current = prev.permissions || [];
      if (current.includes(permKey)) {
        return { ...prev, permissions: current.filter(k => k !== permKey) };
      } else {
        return { ...prev, permissions: [...current, permKey] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser, formData);
      } else {
        await addUser(formData);
      }
      setIsModalOpen(false);
      loadUsers();
    } catch (err) {
      alert("Lỗi khi lưu: " + err.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h2>Danh sách Tài khoản & Phân quyền</h2>
          <p>Quản lý toàn bộ người dùng, quyền truy cập các module chức năng trên màn hình Sidebar</p>
        </div>
        <button className={styles.btnAdd} onClick={handleOpenAdd}>
          <FiPlus /> Thêm tài khoản
        </button>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th style={{width: '90px'}}>Mật khẩu</th>
              <th>Họ Tên</th>
              <th>Chức vụ</th>
              <th style={{width: '100px'}}>Vai trò</th>
              <th>Mục truy cập (Permissions)</th>
              <th style={{width: '90px', textAlign: 'center'}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><strong>{u.username}</strong></td>
                <td style={{color: '#888'}}>{u.password}</td>
                <td>{u.fullName}</td>
                <td>{u.title}</td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[u.role]}`}>
                    {u.role === 'admin' ? 'Q.Trị Viên' : u.role === 'leader' ? 'Lãnh đạo' : 'Cán bộ'}
                  </span>
                </td>
                <td className={styles.permsCell}>
                  {(u.permissions || []).map(p => (
                     <span key={p} className={styles.permPill}>{PERMISSIONS[p]}</span>
                  ))}
                  {(!u.permissions || u.permissions.length === 0) && <span style={{color:'#999', fontSize:'0.85rem'}}>Chưa phân quyền</span>}
                </td>
                <td style={{textAlign: 'center'}}>
                  <button className={styles.actionBtn} onClick={() => handleOpenEdit(u)} title="Sửa"><FiEdit2/></button>
                  {u.username !== 'admin' && (
                    <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => handleDelete(u.id)} title="Xoá"><FiTrash2/></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
           <div className={styles.modalContent}>
              <h3>{editingUser ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản mới'}</h3>
              <form onSubmit={handleSubmit}>
                 <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                       <label>Tên đăng nhập <span className={styles.req}>*</span></label>
                       <input 
                         required 
                         value={formData.username} 
                         disabled={!!editingUser && formData.username === 'admin'}
                         onChange={e => setFormData({...formData, username: e.target.value})} 
                         placeholder="VD: nguyenvanb"
                       />
                    </div>
                    <div className={styles.formGroup}>
                       <label>Mật khẩu <span className={styles.req}>*</span></label>
                       <input required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                 </div>
                 
                 <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                       <label>Họ và Tên <span className={styles.req}>*</span></label>
                       <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                       <label>Chức danh hiển thị <span className={styles.req}>*</span></label>
                       <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="VD: Trưởng phòng Đầu tư" />
                    </div>
                 </div>

                 <div className={styles.formGroup}>
                    <label>Vai trò hệ thống</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                       <option value="user">Người dùng cơ bản (Nhân viên, Cán bộ)</option>
                       <option value="leader">Quản lý (Lãnh đạo, Trưởng phó phòng)</option>
                       <option value="admin">Quản trị viên toàn hệ thống (Admin)</option>
                    </select>
                 </div>
                 
                 <div className={styles.permsSection}>
                    <label className={styles.permsTitle}>Phân quyền hiển thị Menu Sidebar:</label>
                    <div className={styles.permsGrid}>
                       {Object.entries(PERMISSIONS).map(([key, label]) => (
                          <label key={key} className={styles.permCheckbox}>
                             <input 
                                type="checkbox" 
                                checked={(formData.permissions || []).includes(key)}
                                onChange={() => handleTogglePermission(key)}
                             />
                             {label}
                          </label>
                       ))}
                    </div>
                 </div>
                 
                 <div className={styles.modalActions}>
                    <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Huỷ</button>
                    <button type="submit" className={styles.btnSave}>Lưu thông tin</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  )
}
