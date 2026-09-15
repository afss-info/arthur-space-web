'use client';

import React, { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { ShieldCheck, Mail, Key, Edit, PlusCircle, Trash2, LogOut, RadioTower, Image as ImageIcon, Film, Send, ArrowLeft, RefreshCw, Cpu, ShieldAlert } from 'lucide-react';

const StarsBackground = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => { setStars(Array.from({ length: 40 }).map((_, i) => ({ id: i, left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 2}s`, animationDelay: `${Math.random() * 5}s`, size: Math.random() * 2 + 1 }))); }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (<div key={star.id} className="absolute bg-white rounded-full shadow-[0_0_12px_#fff] animate-fall" style={{ left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDuration: star.animationDuration, animationDelay: star.animationDelay, top: '-5%' }} />))}
    </div>
  );
};

export default function MediaPortal() {
  const { isRTL } = useLang();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentView, setCurrentView] = useState<'menu' | 'form' | 'list'>('menu');
  const [listAction, setListAction] = useState<'edit' | 'delete'>('edit');
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const initialPost = { id: null, title_ar: '', title_en: '', content_ar: '', content_en: '', media: '', mediaType: 'none' };
  const [postData, setPostData] = useState(initialPost);
  const [publishStatus, setPublishStatus] = useState('');
  const [isAuditing, setIsAuditing] = useState(false); 
  const [isRejected, setIsRejected] = useState(false); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.toLowerCase(), password }), });
      if (res.ok) setIsLoggedIn(true);
      else setError(isRTL ? 'بيانات الاعتماد غير صحيحة' : 'Invalid credentials');
    } catch (err) { setError(isRTL ? 'خطأ في الاتصال' : 'Connection error'); }
    setLoading(false);
  };

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { alert(isRTL ? 'حجم الملف كبير جداً! (الحد الأقصى 4MB)' : 'File too large! (Max 4MB)'); return; }
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => { setPostData({ ...postData, media: reader.result as string, mediaType: isVideo ? 'video' : 'image' }); };
      reader.readAsDataURL(file);
    }
  };

  // 🧠 نظام التدقيق الحقيقي الذي يفهم رفض آرثرون
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setIsRejected(false);
    setPublishStatus(isRTL ? 'آرثرون يقوم بالتدقيق العلمي...' : 'Arthuron is Auditing...');
    
    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const res = await fetch('/api/posts', { 
        method: method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(postData), 
      });
      
      const data = await res.json();
      setIsAuditing(false);

      if (res.ok) {
        setPublishStatus(isRTL ? 'تم اجتياز التدقيق بنجاح! 🚀' : 'Audit Passed & Published! 🚀');
        setTimeout(() => { setCurrentView('menu'); setPublishStatus(''); }, 2000);
      } else {
        // قنص رسالة الرفض من الباك إند
        if (data.isArthuronRejection) {
          setIsRejected(true);
          setPublishStatus(`⛔ ${isRTL ? 'تدخل آرثرون: ' : 'Arthuron Intervention: '} ${data.message}`);
        } else {
          setIsRejected(true);
          setPublishStatus(isRTL ? 'حدث خطأ في النظام!' : 'System Error Occurred!');
        }
      }
    } catch (err) { 
      setIsAuditing(false);
      setIsRejected(true);
      setPublishStatus(isRTL ? 'فشل الاتصال بخوادم أثيريس!' : 'Connection to Atheris Servers Failed!'); 
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(isRTL ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) return;
    await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  if (!isLoggedIn) {
    return (
      <div className="page-section min-h-screen py-20 flex items-center justify-center relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <style dangerouslySetInnerHTML={{__html: `@keyframes fall { 0% { transform: translateY(-10vh) translateX(0); opacity: 1; } 100% { transform: translateY(110vh) translateX(-20vw); opacity: 0; } } .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }`}} />
        <StarsBackground />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
        
        <div className="glass-card border border-blue-500/30 p-8 rounded-3xl w-full max-w-md bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] relative overflow-hidden z-10">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
          <div className="text-center mb-8 relative z-10">
            <RadioTower size={48} className="text-blue-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-black tracking-widest text-white mb-2">{isRTL ? 'بوابة فريق الإعلام' : 'Media Team Portal'}</h1>
            <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em]">{isRTL ? 'منطقة محظورة' : 'RESTRICTED AREA'}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="relative">
              <Mail className="absolute top-4 right-4 text-gray-500" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'} className="w-full bg-black/50 border border-blue-500/30 rounded-xl px-12 py-4 text-white font-mono text-sm focus:outline-none focus:border-blue-400 transition-colors" required />
            </div>
            <div className="relative">
              <Key className="absolute top-4 right-4 text-gray-500" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isRTL ? 'كلمة المرور' : 'Password'} className="w-full bg-black/50 border border-blue-500/30 rounded-xl px-12 py-4 text-white font-mono text-sm focus:outline-none focus:border-blue-400 transition-colors" required />
            </div>
            {error && <p className="text-red-400 text-xs font-mono text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 tracking-widest uppercase">
              {loading ? (isRTL ? 'جاري التحقق...' : 'AUTHENTICATING...') : (isRTL ? 'تأسيس الاتصال' : 'SECURE UPLINK')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentView === 'form') {
    return (
      <div className="page-section min-h-screen py-20 relative" dir={isRTL ? 'rtl' : 'ltr'}>
        <StarsBackground />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <button onClick={() => setCurrentView('menu')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <ArrowLeft size={15} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'عودة للوحة التحكم' : 'Back to Dashboard'}
          </button>
          
          <div className={`glass-card border rounded-3xl p-6 sm:p-10 bg-black/80 backdrop-blur-xl shadow-2xl transition-colors duration-500 ${isRejected ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-blue-500/30'}`}>
            <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest">
              {isEditMode ? <Edit className="text-purple-400"/> : <PlusCircle className="text-blue-400"/>}
              {isEditMode ? (isRTL ? 'تعديل المنشور' : 'Edit Post') : (isRTL ? 'إنشاء منشور جديد' : 'Create New Post')}
            </h2>
            
            <form onSubmit={handlePublish} className="space-y-6">
              <div className="border-2 border-dashed border-blue-500/30 rounded-2xl p-8 text-center hover:bg-blue-500/5 transition-colors relative overflow-hidden group">
                <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {postData.media ? (
                   postData.mediaType === 'video' ? <video src={postData.media} controls className="max-h-64 mx-auto rounded-lg shadow-lg relative z-0" /> : <img src={postData.media} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg relative z-0" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-blue-400/50">
                    <ImageIcon size={40} />
                    <p className="font-mono text-sm">{isRTL ? 'رفع وسائط (أقل من 4MB)' : 'Upload Media (Max 4MB)'}</p>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div><input type="text" placeholder={isRTL ? 'العنوان (عربي)' : 'Title (Arabic)'} value={postData.title_ar} onChange={e => setPostData({...postData, title_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-right focus:border-blue-500 font-bold" required /></div>
                <div><input type="text" placeholder={isRTL ? 'العنوان (إنجليزي)' : 'Title (English)'} value={postData.title_en} onChange={e => setPostData({...postData, title_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-left focus:border-blue-500 font-bold" required /></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div><textarea rows={6} placeholder={isRTL ? 'المحتوى (عربي)' : 'Content (Arabic)'} value={postData.content_ar} onChange={e => setPostData({...postData, content_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-right focus:border-blue-500 text-sm leading-relaxed" required /></div>
                <div><textarea rows={6} placeholder={isRTL ? 'المحتوى (إنجليزي)' : 'Content (English)'} value={postData.content_en} onChange={e => setPostData({...postData, content_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-left focus:border-blue-500 text-sm leading-relaxed" required /></div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className={`font-mono text-xs font-bold flex-1 leading-relaxed ${isAuditing ? 'text-purple-400 animate-pulse' : isRejected ? 'text-red-400' : 'text-green-400'}`}>
                   {isAuditing ? <><Cpu size={14} className="inline mr-2 animate-spin"/> {publishStatus}</> : 
                    isRejected ? <><ShieldAlert size={14} className="inline mr-2"/> {publishStatus}</> : 
                    publishStatus}
                </div>
                
                <button type="submit" disabled={isAuditing} className={`w-full sm:w-auto text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${isRejected ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]'}`}>
                  {isAuditing ? <RefreshCw className="animate-spin" /> : <Send />} 
                  {isEditMode ? (isRTL ? 'حفظ ونشر' : 'SAVE & PUBLISH') : (isRTL ? 'تدقيق ونشر' : 'AUDIT & PUBLISH')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section min-h-screen py-20 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <StarsBackground />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {currentView === 'list' ? (
          <div className="max-w-4xl mx-auto">
             <button onClick={() => setCurrentView('menu')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
               <ArrowLeft size={15} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'عودة' : 'Back'}
             </button>
             <div className="glass-card border border-blue-500/30 rounded-3xl p-6 bg-black/80 backdrop-blur-xl">
               <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">{listAction === 'edit' ? (isRTL ? 'تعديل السجلات' : 'EDIT LOGS') : (isRTL ? 'حذف السجلات' : 'DELETE LOGS')}</h2>
               <div className="space-y-4">
                 {posts.length === 0 ? (<p className="text-gray-400 text-center py-10 font-mono">{isRTL ? 'لا توجد منشورات.' : 'No posts.'}</p>) : (
                   posts.map(post => (
                     <div key={post.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                       <span className="text-white font-medium text-sm">{isRTL ? post.title_ar : post.title_en}</span>
                       <button onClick={() => { if (listAction === 'edit') { setPostData(post); setIsEditMode(true); setCurrentView('form'); } else { handleDelete(post.id); } }}
                         className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 uppercase tracking-widest ${listAction === 'edit' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50 hover:bg-purple-600 hover:text-white' : 'bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600 hover:text-white'} transition-colors`}>
                         {listAction === 'edit' ? <Edit size={14}/> : <Trash2 size={14}/>} {listAction === 'edit' ? (isRTL ? 'تعديل' : 'Edit') : (isRTL ? 'حذف' : 'Delete')}
                       </button>
                     </div>
                   ))
                 )}
               </div>
             </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center bg-black/60 border border-blue-500/30 p-6 rounded-2xl mb-8 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/50 rounded-xl flex items-center justify-center"><ShieldCheck size={28} className="text-blue-400" /></div>
                <div>
                  <h1 className="text-2xl font-black text-white tracking-widest uppercase">{isRTL ? 'محطة الإعلام الرئيسية' : 'MEDIA MAINFRAME'}</h1>
                  <p className="text-blue-400 text-xs font-mono">{isRTL ? 'صلاحيات وصول عالية' : 'HIGH CLEARANCE GRANTED'}</p>
                </div>
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-3 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest">
                <LogOut size={16} /> {isRTL ? 'إنهاء الاتصال' : 'TERMINATE LINK'}
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <button onClick={() => { setPostData(initialPost); setIsEditMode(false); setCurrentView('form'); }} className="flex flex-col items-center justify-center gap-4 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 p-10 rounded-3xl transition-all hover:-translate-y-2 group shadow-lg">
                <PlusCircle size={48} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black tracking-widest uppercase text-blue-100">{isRTL ? 'بث جديد' : 'NEW BROADCAST'}</span>
              </button>
              
              <button onClick={() => { fetchPosts(); setListAction('edit'); setCurrentView('list'); }} className="flex flex-col items-center justify-center gap-4 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/30 p-10 rounded-3xl transition-all hover:-translate-y-2 group shadow-lg">
                <Edit size={48} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black tracking-widest uppercase text-purple-100">{isRTL ? 'تعديل السجلات' : 'EDIT RECORDS'}</span>
              </button>
              
              <button onClick={() => { fetchPosts(); setListAction('delete'); setCurrentView('list'); }} className="flex flex-col items-center justify-center gap-4 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 p-10 rounded-3xl transition-all hover:-translate-y-2 group shadow-lg">
                <Trash2 size={48} className="text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black tracking-widest uppercase text-red-100">{isRTL ? 'حذف السجلات' : 'PURGE RECORDS'}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
