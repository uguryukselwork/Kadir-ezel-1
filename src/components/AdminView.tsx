import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { UserRequest, RequestStatus, RequestTypeOption } from '../types';
import {
  ShieldCheck,
  Search,
  MessageCircle,
  Phone,
  Trash2,
  Calendar,
  Users,
  Filter,
  RefreshCw,
  CheckCircle2,
  Clock,
  CheckCheck,
  Globe2,
  AlertCircle,
  Settings
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    language,
    requests,
    updateRequestStatus,
    deleteRequest,
    clearAllRequests,
    seedSampleRequests,
    showToast,
    openSettingsModal,
    playSound
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'All' | RequestStatus>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Stats
  const totalCount = requests.length;
  const newCount = requests.filter((r) => r.status === 'New').length;
  const contactedCount = requests.filter((r) => r.status === 'Contacted').length;
  const completedCount = requests.filter((r) => r.status === 'Completed').length;

  // Filter logic
  const filteredRequests = requests.filter((req) => {
    if (statusFilter !== 'All' && req.status !== statusFilter) return false;
    if (typeFilter !== 'All' && req.requestType !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = req.name.toLowerCase().includes(q);
      const matchPhone = req.phone.toLowerCase().includes(q);
      const matchMsg = req.message?.toLowerCase().includes(q) || false;
      return matchName || matchPhone || matchMsg;
    }
    return true;
  });

  const getCleanPhone = (phoneStr: string) => {
    return phoneStr.replace(/[^\d]/g, '');
  };

  const getWaChatUrl = (req: UserRequest) => {
    const cleanNum = getCleanPhone(req.phone);
    const text = language === 'tr'
      ? `Merhaba ${req.name} Bey/Hanım, Kadir Thai üzerinden ilettiğiniz "${req.requestType}" talebinizle ilgili ulaşıyorum.`
      : `Hello ${req.name}, I am reaching out regarding your "${req.requestType}" request submitted on Kadir Thai.`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  const handleDelete = (id: string) => {
    deleteRequest(id);
    setDeleteConfirmId(null);
    showToast(
      language === 'tr' ? 'Talep Silindi' : 'Request Deleted',
      language === 'tr' ? 'Kayıt başarıyla kaldırıldı.' : 'Record was successfully removed.',
      'info'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-teal-300 text-xs font-black uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('adminPanelBadge', language)}</span>
          </div>
          <h2 className="font-black text-2xl text-[var(--text)]">
            {t('adminPanelTitle', language)}
          </h2>
          <p className="text-xs font-semibold text-[var(--text-muted)] mt-1">
            {t('adminPanelSub', language)}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { openSettingsModal(); playSound('click'); }}
            className="h-9 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-black text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1"
            title={language === 'tr' ? 'Ayarlar' : 'Settings'}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'tr' ? 'Ayarlar' : 'Settings'}</span>
          </button>

          <button
            onClick={seedSampleRequests}
            className="h-9 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-black text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1"
            title="Örnek verileri yeniden yükle"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'tr' ? 'Örnek Yükle' : 'Seed Data'}</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Cards: Explicit requirement: "Summary at top: total, new, completed" */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Total */}
        <div className="p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] shadow-sm text-center">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {t('totalLabel', language)}
          </div>
          <div className="font-black text-2xl text-slate-900 dark:text-slate-100 mt-0.5">
            {totalCount}
          </div>
        </div>

        {/* New */}
        <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 shadow-sm text-center">
          <div className="text-[11px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            {t('newStatus', language)}
          </div>
          <div className="font-black text-2xl text-teal-600 dark:text-teal-400 mt-0.5">
            {newCount}
          </div>
        </div>

        {/* Completed */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 shadow-sm text-center">
          <div className="text-[11px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <CheckCheck className="w-3 h-3 text-emerald-600" />
            {t('completedStatus', language)}
          </div>
          <div className="font-black text-2xl text-emerald-600 dark:text-emerald-400 mt-0.5">
            {completedCount}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchAdminPlaceholder', language)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] outline-none focus:border-teal-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'New', 'Contacted', 'Completed'] as const).map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`h-8 px-3 rounded-full text-xs font-black shrink-0 transition-all ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-[var(--surface-card)] text-slate-600 dark:text-slate-400 border border-[var(--border)]'
                }`}
              >
                {status === 'All'
                  ? t('allLabel', language)
                  : status === 'New'
                  ? t('newStatus', language)
                  : status === 'Contacted'
                  ? t('contactedStatus', language)
                  : t('completedStatus', language)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Request List */}
      <div className="space-y-3.5">
        {filteredRequests.length === 0 ? (
          <div className="empty">
            <h2>{t('noRequestsFound', language)}</h2>
            <p>
              {language === 'tr'
                ? 'Henüz bir talep bulunmuyor veya seçilen filtrelere uyan kayıt yok.'
                : 'No client inquiries found matching the selected filters.'}
            </p>
            <div className="mt-4">
              <button onClick={seedSampleRequests} className="btn btn-sm btn-primary">
                {language === 'tr' ? 'Örnek Talepleri Getir' : 'Load Sample Requests'}
              </button>
            </div>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const formattedDate = new Date(req.createdAt).toLocaleString(
              language === 'tr' ? 'tr-TR' : 'en-US',
              {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }
            );

            return (
              <div
                key={req.id}
                className="p-4 rounded-[24px] bg-[var(--surface-card)] border border-[var(--border)] shadow-sm space-y-3 hover:border-teal-500/40 transition-all"
              >
                {/* Header: Date + Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>

                  {/* Status Dropdown/Selector */}
                  <select
                    value={req.status}
                    onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                    className={`h-7 px-2.5 rounded-full text-[11px] font-black outline-none border cursor-pointer ${
                      req.status === 'New'
                        ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border-teal-500/30'
                        : req.status === 'Contacted'
                        ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-500/30'
                        : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    <option value="New">● {t('newStatus', language)}</option>
                    <option value="Contacted">◐ {t('contactedStatus', language)}</option>
                    <option value="Completed">✔ {t('completedStatus', language)}</option>
                  </select>
                </div>

                {/* Name, Phone, Nationality & Request Type */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-[var(--text)]">
                        {req.name}
                      </h4>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {req.country || req.nationality || (language === 'tr' ? 'Belirtilmedi' : 'Unspecified')}
                      </span>
                    </div>

                    <a
                      href={`tel:${getCleanPhone(req.phone)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 mt-1 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{req.phone}</span>
                    </a>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-black shrink-0">
                    {req.requestType}
                  </span>
                </div>

                {/* Details (Date & Guests) */}
                {(req.date || req.peopleCount) && (
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                    {req.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{req.date}</span>
                      </div>
                    )}
                    {req.peopleCount && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-teal-600" />
                        <span>{req.peopleCount}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Client Message */}
                {req.message && (
                  <div className="text-xs text-[var(--text-muted)] bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)] italic">
                    "{req.message}"
                  </div>
                )}

                {/* Action Buttons: Explicit requirement - "One-tap WhatsApp button to message each request's phone number" */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {/* One-tap WhatsApp Button */}
                    <a
                      href={getWaChatUrl(req)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_3px_0_#128C7E] active:translate-y-0.5 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                      <span>{t('messageWhatsApp', language)}</span>
                    </a>

                    {/* Direct Call Button */}
                    <a
                      href={`tel:${getCleanPhone(req.phone)}`}
                      className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
                      title={language === 'tr' ? 'Telefonla Ara' : 'Call'}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Delete button */}
                  {deleteConfirmId === req.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(req.id)}
                        className="h-10 px-3 rounded-full bg-rose-600 text-white text-xs font-black hover:bg-rose-700 transition-colors"
                      >
                        {t('confirmLabel', language)}
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="h-10 px-2 rounded-full text-xs font-bold text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(req.id)}
                      className="w-10 h-10 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                      title={language === 'tr' ? 'Talebi Sil' : 'Delete Request'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Tools */}
      {requests.length > 0 && (
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm(language === 'tr' ? 'Tüm talepleri temizlemek istediğinize emin misiniz?' : 'Are you sure you want to clear all requests?')) {
                clearAllRequests();
                showToast('Temizlendi', 'Tüm kayıtlar silindi.', 'info');
              }
            }}
            className="text-xs font-bold text-rose-500 hover:underline"
          >
            {language === 'tr' ? 'Tüm Talepleri Sıfırla' : 'Clear All Requests'}
          </button>

          <span className="text-[11px] font-bold text-slate-400">
            {language === 'tr' ? 'Veriler tarayıcınızın hafızasında saklanır.' : 'Data stored locally in browser.'}
          </span>
        </div>
      )}
    </div>
  );
};
