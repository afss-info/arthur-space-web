'use client';

import React, { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { ShieldCheck, Mail, Key, Edit, PlusCircle, Trash2, LogOut, RadioTower } from 'lucide-react';

export default function MediaPortal() {
  const { isRTL } = useLang();
  
  // States for authentication and UI
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setError(isRTL ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      }
    } catch (err) {
      setError(isRTL ? 'حدث خطأ في الاتصال بالسيرفر' : 'Server connection error');
    }
    setLoading(false);
  };

  // ----------------------------------------------------
  // 1. واجهة تسجيل الدخول (Login UI)
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="page-section min-h-screen py-20 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="glass-card border border-blue-500/30 p-8 rounded-3xl w-full max-w-md bg-slate-950/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <RadioTower size={100} className="text-blue-500" />
          </div>
          
          <div className="text-center mb-8 relative z-10">
            <ShieldCheck size={48} className="text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">{isRTL ? 'بوابة فريق الإعلام' : 'Media Team Portal'}</h1>
            <p className="text-gray-400 text-sm">
              {isRTL ? 'منطقة محظورة: يرجى إدخال بيانات الاعتماد للوصول.' : 'Restricted Area: Please enter credentials to access.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <div className="relative">
                <Mail className="absolute top-3 right-3 text-gray-500" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-right"
                  required
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Key className="absolute top-3 right-3 text-gray-500" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRTL ? 'كلمة المرور' : 'Password'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-right"
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? (isRTL ? 'جاري التحقق...' : 'Authenticating...') : (isRTL ? 'دخول آمن' : 'Secure Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. واجهة لوحة التحكم بعد الدخول (Dashboard UI)
  // ----------------------------------------------------
  return (
    <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/60 border border-blue-500/30 p-6 rounded-2xl mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <ShieldCheck size={40} className="text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">{isRTL ? 'لوحة تحكم المدونة' : 'Blog Control Panel'}</h1>
              <p className="text-green-400 text-sm">{isRTL ? 'متصل كـ: فريق الإعلام' : 'Logged in as: Media Team'}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            {isRTL ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <button className="flex flex-col items-center justify-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 p-8 rounded-2xl transition-all hover:scale-105">
            <PlusCircle size={40} className="text-blue-400" />
            <span className="text-lg font-bold text-blue-100">{isRTL ? 'إضافة منشور جديد' : 'Add New Post'}</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 p-8 rounded-2xl transition-all hover:scale-105">
            <Edit size={40} className="text-purple-400" />
            <span className="text-lg font-bold text-purple-100">{isRTL ? 'تعديل المنشورات' : 'Edit Posts'}</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 p-8 rounded-2xl transition-all hover:scale-105">
            <Trash2 size={40} className="text-red-400" />
            <span className="text-lg font-bold text-red-100">{isRTL ? 'حذف المنشورات' : 'Delete Posts'}</span>
          </button>
        </div>

        {/* Database Notice */}
        <div className="text-center p-8 border border-dashed border-gray-600 rounded-2xl bg-white/5">
          <p className="text-gray-400">
            {isRTL 
              ? 'مرحباً بفريق الإعلام! سيتم قريباً ربط هذه الأزرار بقاعدة البيانات لتمكين النشر الفعلي.' 
              : 'Welcome Media Team! These buttons will soon be connected to the database to enable real publishing.'}
          </p>
        </div>

      </div>
    </div>
  );
}
