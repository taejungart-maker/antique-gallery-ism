import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`📧 [${email}] 주소로 임시 비밀번호를 발송했습니다.`);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">비밀번호 찾기</h2>
                <p className="text-sm text-gray-500 mb-8">가입 시 등록한 이메일을 입력해주세요.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="email" required placeholder="example@gallery.com"
                        className="w-full px-4 py-2 border rounded-md"
                        onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" className="w-full py-3 font-bold rounded-md bg-black text-white hover:bg-gray-800">임시 비밀번호 발송</button>
                </form>
                <div className="mt-6">
                    <Link to="/" className="text-sm text-gray-500 underline">← 돌아가기</Link>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;