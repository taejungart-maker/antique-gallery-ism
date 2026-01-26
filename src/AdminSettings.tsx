import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert('❌ 새 비밀번호가 일치하지 않습니다.');
            return;
        }
        alert('✅ 관리자 비밀번호가 성공적으로 변경되었습니다!');
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">관리자 설정</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">현재 아이디</label>
                        <input type="text" value="admin_lsm" disabled className="w-full px-4 py-2 bg-gray-100 border rounded-md text-gray-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
                        <input type="password" placeholder="변경할 비밀번호" className="w-full px-4 py-2 border rounded-md"
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
                        <input type="password" placeholder="한 번 더 입력" className="w-full px-4 py-2 border rounded-md"
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full py-3 mt-6 bg-black text-white font-bold rounded-md hover:bg-gray-800">변경 사항 저장</button>
                </form>
            </div>
        </div>
    );
};
export default AdminSettings;