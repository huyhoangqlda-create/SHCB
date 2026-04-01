import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, FileText, Users, Save, Download } from 'lucide-react';

export default function MeetingPlanner() {
  const [meetingType, setMeetingType] = useState('thuongky');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [agenda, setAgenda] = useState('');

  const generateAgenda = () => {
    if (meetingType === 'thuongky') {
      setAgenda(`1. Tuyên bố lý do, giới thiệu đại biểu.
2. Cử thư ký ghi biên bản.
3. Điểm danh, thông báo tình hình đảng viên, thu đảng phí.
4. Thông qua nội dung, chương trình sinh hoạt.
5. Đánh giá công tác chính trị, tư tưởng trong tháng.
6. Đánh giá kết quả thực hiện nhiệm vụ chính trị của chi bộ và đảng viên.
7. Thảo luận, tự phê bình và phê bình.
8. Xác định nhiệm vụ tháng tới, phân công nhiệm vụ.
9. Biểu quyết thông qua nghị quyết/kết luận.
10. Đánh giá chấm điểm chất lượng sinh hoạt.`);
    } else {
      setAgenda(`1. Tuyên bố lý do, giới thiệu đại biểu.
2. Nêu mục đích, yêu cầu buổi sinh hoạt chuyên đề.
3. Trình bày dự thảo chuyên đề.
4. Đảng viên thảo luận, liên hệ thực tiễn và bản thân.
5. Tiếp thu ý kiến, hoàn thiện chuyên đề.
6. Bí thư kết luận, đánh giá chất lượng chuyên đề.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Lên Kế hoạch Sinh hoạt</h2>
        <p className="text-slate-600">Chuẩn bị nội dung và thông báo cho kỳ sinh hoạt sắp tới</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Loại hình sinh hoạt</label>
            <select 
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition-shadow"
            >
              <option value="thuongky">Sinh hoạt Thường kỳ</option>
              <option value="chuyende">Sinh hoạt Chuyên đề</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Ngày tổ chức</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Thời gian</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Địa điểm</label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Phòng họp chi bộ..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-end">
            <label className="block text-sm font-semibold text-slate-700">Chương trình dự kiến (Agenda)</label>
            <button 
              onClick={generateAgenda}
              className="text-sm text-red-600 hover:text-red-800 font-bold bg-red-50 px-3 py-1.5 rounded-md transition-colors"
            >
              Tạo mẫu tự động
            </button>
          </div>
          <textarea 
            rows={10}
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-mono text-sm leading-relaxed transition-shadow"
            placeholder="Nhập chương trình sinh hoạt..."
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
          <button className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
            <Download size={18} />
            Xuất Thông báo
          </button>
          <button className="px-5 py-2.5 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Save size={18} />
            Lưu Kế hoạch
          </button>
        </div>
      </div>
    </div>
  );
}
