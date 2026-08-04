import React, { useState, useEffect } from 'react';

export default function FreeAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('Алматы');
  const [generatedKey, setGeneratedKey] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-lead-modal', handleOpen);
    return () => window.removeEventListener('open-lead-modal', handleOpen);
  }, []);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !contact) return alert('Пожалуйста, заполните обязательные поля');
      const randomHex = Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * 65536).toString(16).padStart(4, '0').toUpperCase()
      ).join('-');
      setGeneratedKey(`KZ-2026-VAULT-${randomHex}`);
      setStep(2);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-mono text-sm"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="text-xs font-mono text-emerald-400 mb-1">КАНАЛ ВЫДАЧИ ЛИЦЕНЗИЙ 0 ₸</div>
          <h3 className="text-xl font-bold text-slate-100">Скачивание Syrlas AI Desktop Engine</h3>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">ФИО / Наименование *</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Стяжков Александр"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Email / Телефон *</label>
              <input 
                type="text" 
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="alex@example.kz"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Город РК</label>
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Алматы">Алматы</option>
                <option value="Астана">Астана</option>
                <option value="Шымкент">Шымкент</option>
                <option value="Караганда">Караганда</option>
                <option value="Другой">Другой регион РК</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all cursor-pointer"
            >
              Сгенерировать ключ и скачать ➔
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Ваш оффлайн-ключ (Air-Gap Vault):</span>
              <div className="font-mono font-bold text-emerald-400 text-base tracking-widest">
                {generatedKey}
              </div>
            </div>
            <a
              href="#download-exe"
              onClick={() => alert('Начнется скачивание дистрибутива Syrlas_AI_Setup.exe')}
              className="block w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              ⬇️ Скачать Syrlas_AI_Setup.exe — 0 ₸
            </a>
          </div>
        )}
      </div>
    </div>
  );
}