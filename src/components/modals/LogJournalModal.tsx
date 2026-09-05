import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { JournalEntry, MoodType } from '../../types';
import confetti from 'canvas-confetti';

interface LogJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: JournalEntry) => void;
}

export const LogJournalModal: React.FC<LogJournalModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState<MoodType>('good');
  const [text, setText] = useState('');
  const [tagInput, setTagInput] = useState('walking, gratitude, rest');

  const moodOptions: { type: MoodType; emoji: string }[] = [
    { type: 'great', emoji: '😍' },
    { type: 'good', emoji: '😊' },
    { type: 'okay', emoji: '😐' },
    { type: 'low', emoji: '😔' },
    { type: 'not_good', emoji: '😣' },
  ];

  const handleSave = () => {
    if (!text.trim()) return;
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    const entry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: "2026-09-05",
      title: title.trim() || 'Personal Reflection',
      mood,
      text,
      tags
    };
    onSave(entry);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTitle('');
    setText('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Personal Journal Entry" emoji="📔">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Entry Title</label>
          <input
            type="text"
            placeholder="e.g. Sunset walk & calm thoughts..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mood Tag</label>
          <div className="flex gap-2">
            {moodOptions.map(opt => (
              <button
                key={opt.type}
                type="button"
                onClick={() => setMood(opt.type)}
                className={`flex-1 py-2 rounded-xl text-xl border transition ${
                  mood === opt.type
                    ? 'bg-amber-100 border-amber-300 scale-105'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Journal Thoughts</label>
          <textarea
            rows={5}
            placeholder="Write freely... This journal is 100% private to your device."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tags (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. walking, strength, gratitude"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-pink-400 text-white font-bold rounded-2xl shadow-soft hover:brightness-105 transition disabled:opacity-50"
        >
          Save Private Entry 📔
        </button>
      </div>
    </Modal>
  );
};
