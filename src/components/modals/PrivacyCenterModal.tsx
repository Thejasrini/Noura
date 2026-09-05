import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { StorageService } from '../../services/storage';
import { Shield, Download, Trash2, Lock, CheckCircle, Database } from 'lucide-react';

interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [lockEnabled, setLockEnabled] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    const dataStr = StorageService.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mybody_noura_data_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleStartFresh = () => {
    if (window.confirm("Start with a completely clean account? All test and sample data will be removed.")) {
      StorageService.clearAllData();
      window.location.reload();
    }
  };

  const handleLoadDemoData = () => {
    if (window.confirm("Load sample demo data? This will populate 60 days of historical wellness records for demonstration.")) {
      StorageService.loadSampleDemoData();
      window.location.reload();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Center & Data Control" emoji="🔒">
      <div className="space-y-6">
        {/* Privacy Promise Banner */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl border border-emerald-200/60 flex items-start gap-3">
          <Shield className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Your Data Belongs Entirely to You</h4>
            <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
              My Body stores your health, cycle, mood, and meal logs locally on your browser. Your private data is never sold, shared, or sent to third-party ad networks.
            </p>
          </div>
        </div>

        {/* Data Tools */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Data & Account Mode</h4>

          {/* Start Fresh Button */}
          <button
            onClick={handleStartFresh}
            className="w-full p-3.5 bg-pink-50 hover:bg-pink-100 rounded-2xl border border-pink-200 flex items-center justify-between transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-pink-900">Start Fresh (Remove Test Data)</p>
                <p className="text-xs text-pink-700">Clear all prefilled sample data and start logging your own history</p>
              </div>
            </div>
            <span className="text-xs font-bold text-pink-600 bg-white px-2.5 py-1 rounded-xl border border-pink-200">Start Fresh</span>
          </button>

          {/* Load Sample Demo Data Button */}
          <button
            onClick={handleLoadDemoData}
            className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">Load Sample Demo Data</p>
                <p className="text-xs text-slate-500">Populate 60 days of pre-created wellness logs for testing</p>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-600">Load Demo</span>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">Export All My Data (JSON)</p>
                <p className="text-xs text-slate-500">Download complete backup of cycle, nutrition, journal, and workouts</p>
              </div>
            </div>
            {exportSuccess ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <span className="text-xs font-bold text-sky-600 group-hover:underline">Download</span>
            )}
          </button>

          {/* Passcode Lock Toggle */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">Biometric / Passcode Lock</p>
                <p className="text-xs text-slate-500">Require lock screen when opening app</p>
              </div>
            </div>
            <button
              onClick={() => setLockEnabled(!lockEnabled)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                lockEnabled
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              {lockEnabled ? 'Enabled ✓' : 'Disabled'}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition"
        >
          Close Privacy Center
        </button>
      </div>
    </Modal>
  );
};
