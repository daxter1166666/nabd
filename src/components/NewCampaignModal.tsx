import React, { useState } from 'react';
import { X, PlusCircle, Tag, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { Campaign } from '../types';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCampaign: (campaign: Campaign) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  onAddCampaign
}) => {
  const [title, setTitle] = useState('');
  const [questionPrompt, setQuestionPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [hashtag, setHashtag] = useState('#');
  const [category, setCategory] = useState<Campaign['category']>('cancer');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !questionPrompt.trim()) return;

    let cleanHashtag = hashtag.trim();
    if (!cleanHashtag.startsWith('#')) {
      cleanHashtag = `#${cleanHashtag}`;
    }

    const newCampaign: Campaign = {
      id: `camp_${Date.now()}`,
      title: title.trim(),
      questionPrompt: questionPrompt.trim(),
      description: description.trim() || 'فعالية تبرع صوتي لجمع الرسائل التشجيعية والملهمة.',
      hashtag: cleanHashtag,
      category,
      coverImage: coverImage.trim(),
      startDate: new Date().toISOString().split('T')[0],
      isActive: true,
      donationsCount: 0,
      totalLikesCount: 0,
      organizerName: 'إدارة منصة صوت الأمل'
    };

    onAddCampaign(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl overflow-hidden my-auto border border-stone-200">
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">إضافة فعالية تبرع صوتي جديدة</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              عنوان الفعالية الأسبوعية:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: ماذا تقول لمرضى السرطان في أسبوع الشفاء؟"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 font-bold focus:ring-2 focus:ring-rose-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-rose-800" />
              السؤال الموجه للمتبرعين بالصوت:
            </label>
            <input
              type="text"
              required
              value={questionPrompt}
              onChange={(e) => setQuestionPrompt(e.target.value)}
              placeholder="مثال: ما هي رسالتك الداعمة لأبطال الغسيل الكلوي اليوم؟"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 font-semibold focus:ring-2 focus:ring-rose-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-rose-800" />
                الهاشتاغ المخصص:
              </label>
              <input
                type="text"
                required
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="#تبرع_للمرضى"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">الفئة:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Campaign['category'])}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 font-bold"
              >
                <option value="cancer">مرضى السرطان</option>
                <option value="elderly">كبار السن</option>
                <option value="autism">أبطال التوحد</option>
                <option value="orphans">الأيتام</option>
                <option value="hospitals">أطفال المستشفيات</option>
                <option value="general">عام</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">وصف الفعالية:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="تفاصيل الهدف من الفعالية والفئة المستهدفة..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-rose-800" />
              رابط صورة الغلاف:
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
          >
            نشر الفعالية وجعلها رسمية
          </button>
        </form>
      </div>
    </div>
  );
};
