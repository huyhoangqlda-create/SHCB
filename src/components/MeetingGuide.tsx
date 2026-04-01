import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Users, FileCheck } from 'lucide-react';

export default function MeetingGuide() {
  const [openSection, setOpenSection] = useState<string | null>('regular');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quy trình Sinh hoạt Chi bộ</h2>
        <p className="text-slate-600">Căn cứ Hướng dẫn số 42-HD/BTCTW ngày 28/10/2025</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600 shrink-0"><Clock size={24} /></div>
          <div>
            <h3 className="font-semibold text-slate-800">Thời lượng</h3>
            <p className="text-sm text-slate-600 mt-1">Tối thiểu 90 phút. Nếu kết hợp chuyên đề: 120 phút.</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-3 rounded-lg text-green-600 shrink-0"><Users size={24} /></div>
          <div>
            <h3 className="font-semibold text-slate-800">Sĩ số</h3>
            <p className="text-sm text-slate-600 mt-1">Phấn đấu &gt;90% đảng viên tham dự.</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-600 shrink-0"><FileCheck size={24} /></div>
          <div>
            <h3 className="font-semibold text-slate-800">Tài liệu</h3>
            <p className="text-sm text-slate-600 mt-1">Gửi trước 01 ngày qua Sổ tay đảng viên điện tử.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Sinh hoạt thường kỳ */}
        <div className="border-b border-slate-200">
          <button
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
            onClick={() => toggleSection('regular')}
          >
            <h3 className="text-lg font-bold text-slate-800">1. Sinh hoạt Thường kỳ</h3>
            {openSection === 'regular' ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
          </button>
          
          {openSection === 'regular' && (
            <div className="p-6 space-y-8 bg-white">
              <div className="space-y-4">
                <h4 className="font-semibold text-red-700 flex items-center gap-2 text-lg">
                  <span className="bg-red-100 text-red-800 w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
                  Công tác chuẩn bị
                </h4>
                <ul className="list-disc pl-12 space-y-2 text-slate-700">
                  <li>Phân công người chuẩn bị nội dung, dự thảo nghị quyết.</li>
                  <li>Họp chi ủy (hoặc bí thư, phó bí thư) thống nhất nội dung, đánh giá tháng trước, dự kiến tháng sau.</li>
                  <li>Thông báo thời gian, địa điểm, nội dung đến đảng viên và cấp ủy cấp trên.</li>
                  <li>Đăng tải tài liệu lên Sổ tay đảng viên điện tử trước ít nhất 01 ngày.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-red-700 flex items-center gap-2 text-lg">
                  <span className="bg-red-100 text-red-800 w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                  Mở đầu
                </h4>
                <ul className="list-disc pl-12 space-y-2 text-slate-700">
                  <li>Tuyên bố lý do, giới thiệu đại biểu.</li>
                  <li>Cử thư ký ghi biên bản.</li>
                  <li>Điểm danh, thông báo tình hình đảng viên (có mặt, vắng mặt có/không lý do).</li>
                  <li>Thông báo tình hình nộp đảng phí.</li>
                  <li>Thông qua nội dung, chương trình.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-red-700 flex items-center gap-2 text-lg">
                  <span className="bg-red-100 text-red-800 w-7 h-7 rounded-full flex items-center justify-center text-sm">3</span>
                  Tiến hành sinh hoạt
                </h4>
                <ul className="list-disc pl-12 space-y-2 text-slate-700">
                  <li>Bí thư báo cáo nội dung đã chuẩn bị.</li>
                  <li>Đánh giá kết quả thực hiện nhiệm vụ của đảng viên.</li>
                  <li>Cung cấp thông tin, định hướng vấn đề mới, phức tạp.</li>
                  <li>Đảng viên thảo luận, đóng góp ý kiến; tự phê bình và phê bình.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-red-700 flex items-center gap-2 text-lg">
                  <span className="bg-red-100 text-red-800 w-7 h-7 rounded-full flex items-center justify-center text-sm">4</span>
                  Kết thúc
                </h4>
                <ul className="list-disc pl-12 space-y-2 text-slate-700">
                  <li>Tổng hợp ý kiến, tiếp thu bổ sung.</li>
                  <li>Phân công nhiệm vụ cho đảng viên (có thời hạn).</li>
                  <li>Định hướng tư tưởng, giải quyết kiến nghị.</li>
                  <li>Kết luận, thông qua nghị quyết (nếu có).</li>
                  <li>Đánh giá chất lượng buổi sinh hoạt (chấm điểm).</li>
                  <li>Thư ký trình bày biên bản.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sinh hoạt chuyên đề */}
        <div>
          <button
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
            onClick={() => toggleSection('thematic')}
          >
            <h3 className="text-lg font-bold text-slate-800">2. Sinh hoạt Chuyên đề (Ít nhất 1 lần/quý)</h3>
            {openSection === 'thematic' ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
          </button>
          
          {openSection === 'thematic' && (
            <div className="p-6 space-y-6 bg-white">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Lưu ý:</strong> Không tổ chức sinh hoạt chuyên đề thay thế sinh hoạt thường kỳ. Nếu kết hợp, phải thực hiện lần lượt từng phần. Tuyệt đối không họp chi bộ kết hợp với các cuộc họp khác.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-red-700 text-lg">Các bước thực hiện:</h4>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-red-600 mt-0.5">1.</span>
                    <div>
                      <strong className="text-slate-800">Chuẩn bị:</strong> Xây dựng kế hoạch từ đầu năm/quý. Phân công đảng viên am hiểu chuẩn bị dự thảo. Chi ủy thông qua dự thảo và gửi trước 01 ngày.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-red-600 mt-0.5">2.</span>
                    <div>
                      <strong className="text-slate-800">Mở đầu:</strong> Bí thư nêu mục đích, yêu cầu buổi sinh hoạt.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-red-600 mt-0.5">3.</span>
                    <div>
                      <strong className="text-slate-800">Trình bày:</strong> Đảng viên được phân công trình bày dự thảo chuyên đề.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-red-600 mt-0.5">4.</span>
                    <div>
                      <strong className="text-slate-800">Thảo luận:</strong> Bí thư định hướng. Đảng viên phát biểu nhận thức, liên hệ bản thân/đơn vị, đóng góp ý kiến.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-red-600 mt-0.5">5.</span>
                    <div>
                      <strong className="text-slate-800">Kết thúc:</strong> Bí thư đánh giá chất lượng chuyên đề, ý nghĩa tác dụng. Kết luận nội dung cần tiếp thu để hoàn thiện.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-red-600 mt-0.5">6.</span>
                    <div>
                      <strong className="text-slate-800">Sau sinh hoạt:</strong> Hoàn thiện chuyên đề, đăng tải lên Sổ tay đảng viên điện tử và báo cáo cấp trên.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
