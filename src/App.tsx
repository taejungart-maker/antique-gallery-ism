import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminSettings from './AdminSettings';
import ForgotPassword from './ForgotPassword';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">고미술 갤러리 (Admin)</h1>
      <Link to="/admin/settings" className="w-64 py-4 bg-white shadow-lg rounded-xl text-center font-bold text-gray-800 border hover:bg-gray-50">
        🔒 비밀번호 변경
      </Link>
      <Link to="/forgot-password" className="w-64 py-4 bg-white shadow-lg rounded-xl text-center font-bold text-gray-800 border hover:bg-gray-50">
        📧 비밀번호 찾기
      </Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;