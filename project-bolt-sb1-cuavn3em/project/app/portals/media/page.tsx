'use client';

import React, { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { ShieldCheck, Mail, Key, Edit, PlusCircle, Trash2, LogOut, RadioTower, Image as ImageIcon, Film, Send, ArrowLeft, RefreshCw } from 'lucide-react';

export default function MediaPortal() {
  const { isRTL } = useLang();
  
  // States for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // States for CMS Dashboard
  const [currentView, setCurrentView] = useState<'menu' | 'form' | 'list'>('menu');
  const [listAction, setListAction] = useState<'edit' | 'delete'>('edit');
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const initialPost = { id: null, title_ar: '', title_en: '', content_ar: '', content_en: '', media: '', mediaType: 'none' };
  const [postData, setPostData] = useState(initialPost);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState('');

  // 1. تسجيل الدخول
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });
      if (res.ok) setIsLoggedIn(true);
      else setError(isRTL ? 'بيانات الاعتماد غير صحيحة' : 'Invalid credentials');
    } catch (err) {
      setError(isRTL ? 'خطأ في الاتصال' : 'Connection error');
    }
    setLoading(false);
  };

  // 2. جلب المنشورات للتعديل أو الحذف
  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  // 3. معالج رفع الوسائط (صور وفيديو)
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // تنبيه: السيرفرات تقبل عادة ملفات حتى 4MB للبيانات النصية
      if (file.size > 4 * 1024 * 1024) {
        alert(isRTL ? 'حجم الملف كبير جداً! (الحد الأقصى 4MB)' : 'File too large! (Max 4MB)');
        return;
      }
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData({ ...postData, media: reader.result as string, mediaType: isVideo ? 'video' : 'image' });
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. معالج النشر والتعديل (Save / Update)
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const res = await fetch('/api/posts', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      
      if (res.ok) {
        setPublishStatus(isRTL ? 'تمت العملية بنجاح! 🚀' : 'Success! 🚀');
        setTimeout(() => { 
          setCurrentView('menu'); 
          setPublishStatus(''); 
        }, 2000);
      }
    } catch (err) {
      setPublishStatus(isRTL ? 'حدث خطأ!' : 'Error occurred!');
    }
    setIsPublishing(false);
  };

  // 5. معالج الحذف (Delete)
  const handleDelete = async (id: number) => {
    if (!window.confirm(isRTL ? 'هل أنت متأكد من حذف هذا المنشور نهائياً؟' : 'Are you sure you want to delete this post?')) return;
    
    await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
    fetchPosts(); // تحديث القائمة بعد الحذف
  };

  // ----------------------------------------------------
  // شاشة تسجيل الدخول
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="page-section min-h-screen py-20 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="glass-card border border-blue-500/30 p-8 rounded-3xl w-full max-w-md bg-slate-950/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><RadioTower size={100} className="text-blue-500" /></div>
          <div className="text-center mb-8 relative z-10">
            <ShieldCheck size={48} className="text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">{isRTL ? 'بوابة فريق الإعلام' : 'Media Team Portal'}</h1>
            <p className="text-gray-400 text-sm">{isRTL ? 'منطقة محظورة: يرجى إدخال بيانات الاعتماد للوصول.' : 'Restricted Area: Please enter credentials to access.'}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="relative">
              <Mail className="absolute top-3 right-3 text-gray-500" size={20} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'} className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-right" required />
            </div>
            <div className="relative">
              <Key className="absolute top-3 right-3 text-gray-500" size={20} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isRTL ? 'كلمة المرور' : 'Password'} className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-right" required />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50">
              {loading ? (isRTL ? 'جاري التحقق...' : 'Authenticating...') : (isRTL ? 'دخول آمن' : 'Secure Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // شاشة إضافة / تعديل المنشور (Form)
  // ----------------------------------------------------
  if (currentView === 'form') {
    return (
      <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button onClick={() => setCurrentView('menu')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'عودة للوحة التحكم' : 'Back to Dashboard'}
          </button>
          <div className="glass-card border border-blue-500/30 rounded-3xl p-6 sm:p-10 bg-slate-900/80 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              {isEditMode ? <Edit className="text-purple-400"/> : <PlusCircle className="text-blue-400"/>}
              {isEditMode ? (isRTL ? 'تعديل المنشور' : 'Edit Post') : (isRTL ? 'إنشاء منشور جديد' : 'Create New Post')}
            </h2>
            
            <form onSubmit={handlePublish} className="space-y-6">
              {/* Media Upload (Images & Videos) */}
              <div className="border-2 border-dashed border-blue-500/30 rounded-2xl p-8 text-center hover:bg-blue-500/5 transition-colors relative overflow-hidden group">
                <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {postData.media ? (
                  postData.mediaType === 'video' ? (
                    <video src={postData.media} controls className="max-h-64 mx-auto rounded-lg shadow-lg relative z-0" />
                  ) : (
                    <img src={postData.media} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg relative z-0" />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <div className="flex gap-4">
                      <ImageIcon size={40} className="text-blue-400" />
                      <Film size={40} className="text-purple-400" />
                    </div>
                    <p>{isRTL ? 'اضغط هنا لرفع صورة أو فيديو (أقل من 4MB)' : 'Click to upload image or video (Max 4MB)'}</p>
                  </div>
                )}
              </div>

              {/* Titles */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">{isRTL ? 'العنوان (عربي)' : 'Title (Arabic)'}</label>
                  <input type="text" value={postData.title_ar} onChange={e => setPostData({...postData, title_ar: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-right focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">{isRTL ? 'العنوان (إنجليزي)' : 'Title (English)'}</label>
                  <input type="text" value={postData.title_en} onChange={e => setPostData({...postData, title_en: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-left focus:border-blue-500" required />
                </div>
              </div>

              {/* Content */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">{isRTL ? 'المحتوى (عربي)' : 'Content (Arabic)'}</label>
                  <textarea rows={6} value={postData.content_ar} onChange={e => setPostData({...postData, content_ar: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-right focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">{isRTL ? 'المحتوى (إنجليزي)' : 'Content (English)'}</label>
                  <textarea rows={6} value={postData.content_en} onChange={e => setPostData({...postData, content_en: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-left focus:border-blue-500" required />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <p className="text-green-400 font-bold">{publishStatus}</p>
                <button type="submit" disabled={isPublishing} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all">
                  {isPublishing ? <RefreshCw className="animate-spin" /> : <Send />} 
                  {isEditMode ? (isRTL ? 'حفظ التعديلات' : 'Save Changes') : (isRTL ? 'نشر الآن' : 'Publish Now')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // شاشة عرض قائمة المنشورات (للتعديل أو الحذف)
  // ----------------------------------------------------
  if (currentView === 'list') {
    return (
      <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button onClick={() => setCurrentView('menu')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'عودة' : 'Back'}
          </button>
          <div className="glass-card border border-blue-500/30 rounded-3xl p-6 bg-slate-900/80">
            <h2 className="text-2xl font-bold text-white mb-6">
              {listAction === 'edit' ? (isRTL ? 'اختر منشوراً لتعديله' : 'Select a post to edit') : (isRTL ? 'اختر منشوراً لحذفه' : 'Select a post to delete')}
            </h2>
            <div className="space-y-4">
              {posts.length === 0 ? (
                <p className="text-gray-400 text-center py-10">{isRTL ? 'لا توجد منشورات حالياً.' : 'No posts available.'}</p>
              ) : (
                posts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <span className="text-white font-medium">{isRTL ? post.title_ar : post.title_en}</span>
                    <button 
                      onClick={() => {
                        if (listAction === 'edit') {
                          setPostData(post);
                          setIsEditMode(true);
                          setCurrentView('form');
                        } else {
                          handleDelete(post.id);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${listAction === 'edit' ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white' : 'bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white'}`}
                    >
                      {listAction === 'edit' ? <Edit size={16}/> : <Trash2 size={16}/>}
                      {listAction === 'edit' ? (isRTL ? 'تعديل' : 'Edit') : (isRTL ? 'حذف' : 'Delete')}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // شاشة لوحة التحكم الرئيسية (Dashboard)
  // ----------------------------------------------------
  return (
    <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/60 border border-blue-500/30 p-6 rounded-2xl mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <ShieldCheck size={40} className="text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">{isRTL ? 'لوحة تحكم المدونة' : 'Blog Control Panel'}</h1>
              <p className="text-green-400 text-sm">{isRTL ? 'صلاحيات كاملة للتحرير والإدارة' : 'Full Edit & Management Access'}</p>
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg transition-colors">
            <LogOut size={18} /> {isRTL ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {/* زر إضافة */}
          <button onClick={() => { setPostData(initialPost); setIsEditMode(false); setCurrentView('form'); }} className="flex flex-col items-center justify-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 p-8 rounded-2xl transition-all hover:scale-105 group">
            <PlusCircle size={40} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-blue-100">{isRTL ? 'إضافة منشور جديد' : 'Add New Post'}</span>
          </button>
          
          {/* زر التعديل الفعلي */}
          <button onClick={() => { fetchPosts(); setListAction('edit'); setCurrentView('list'); }} className="flex flex-col items-center justify-center gap-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 p-8 rounded-2xl transition-all hover:scale-105 group">
            <Edit size={40} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-purple-100">{isRTL ? 'تعديل المنشورات' : 'Edit Posts'}</span>
          </button>
          
          {/* زر الحذف الفعلي */}
          <button onClick={() => { fetchPosts(); setListAction('delete'); setCurrentView('list'); }} className="flex flex-col items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 p-8 rounded-2xl transition-all hover:scale-105 group">
            <Trash2 size={40} className="text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-red-100">{isRTL ? 'حذف المنشورات' : 'Delete Posts'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
