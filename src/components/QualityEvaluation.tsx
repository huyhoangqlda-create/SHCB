import React, { useState, useEffect } from 'react';
import { Calculator, Save, AlertCircle } from 'lucide-react';

interface Criterion {
  id: string;
  label: string;
  maxScore: number;
  score: number;
}

export default function QualityEvaluation() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: 'c1', label: '1. Chấp hành thời gian, thời lượng sinh hoạt', maxScore: 5, score: 5 },
    { id: 'c2', label: '2. Tỷ lệ đảng viên dự sinh hoạt (≥90% và không vắng mặt không lý do)', maxScore: 5, score: 5 },
    { id: 'c3_1', label: '3.1. Chuẩn bị đúng, đủ nội dung, có trọng tâm', maxScore: 5, score: 5 },
    { id: 'c3_2', label: '3.2. Họp Chi ủy / Bí thư thông báo trước; đăng tải tài liệu', maxScore: 5, score: 5 },
    { id: 'c4_1', label: '4.1. Thực hiện đầy đủ các bước quy trình', maxScore: 5, score: 5 },
    { id: 'c4_2', label: '4.2. Thực hiện đầy đủ nội dung, có biểu dương/phê bình, nhiều ý kiến', maxScore: 25, score: 25 },
    { id: 'c4_3', label: '4.3. Công tác điều hành của Bí thư linh hoạt, hiệu quả', maxScore: 10, score: 10 },
    { id: 'c5', label: '5. Thực hiện nguyên tắc tập trung dân chủ, tự phê bình và phê bình', maxScore: 5, score: 5 },
    { id: 'c6', label: '6. Kết quả lãnh đạo thực hiện kết luận/nghị quyết của chi bộ', maxScore: 30, score: 30 },
    { id: 'c7', label: '7. Kết thúc: Chủ trì kết luận, thông qua biên bản, đăng tải tài liệu', maxScore: 5, score: 5 },
  ]);

  const [totalScore, setTotalScore] = useState(0);
  const [classification, setClassification] = useState('');

  useEffect(() => {
    const total = criteria.reduce((sum, c) => sum + (Number(c.score) || 0), 0);
    setTotalScore(total);
    
    if (total >= 90) setClassification('Tốt');
    else if (total >= 70) setClassification('Khá');
    else if (total >= 50) setClassification('Trung bình');
    else setClassification('Kém');
  }, [criteria]);

  const handleScoreChange = (id: string, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setCriteria(criteria.map(c => {
      if (c.id === id) {
        // Ensure score is within 0 and maxScore
        const validScore = Math.max(0, Math.min(numValue, c.maxScore));
        return { ...c, score: validScore };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Đánh giá Chất lượng Sinh hoạt</h2>
          <p className="text-slate-600">Dựa trên Khung tiêu chí (Mục 5, Hướng dẫn 42-HD/BTCTW)</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 min-w-[200px] text-center">
          <div className="text-sm text-slate-500 mb-1 font-medium">Tổng điểm tự chấm</div>
          <div className={`text-4xl font-bold ${
            classification === 'Tốt' ? 'text-green-600' :
            classification === 'Khá' ? 'text-blue-600' :
            classification === 'Trung bình' ? 'text-amber-500' : 'text-red-600'
          }`}>
            {totalScore}<span className="text-2xl text-slate-400">/100</span>
          </div>
          <div className="font-medium text-slate-700 mt-2 pt-2 border-t border-slate-100">
            Xếp loại: <span className={`uppercase font-bold ${
              classification === 'Tốt' ? 'text-green-600' :
              classification === 'Khá' ? 'text-blue-600' :
              classification === 'Trung bình' ? 'text-amber-500' : 'text-red-600'
            }`}>{classification}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-slate-100 border-b border-slate-200 font-semibold text-slate-700 text-sm md:text-base">
          <div className="col-span-8 md:col-span-9">Tiêu chí đánh giá</div>
          <div className="col-span-2 md:col-span-1 text-center">Tối đa</div>
          <div className="col-span-2 md:col-span-2 text-center">Điểm</div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {criteria.map((c) => (
            <div key={c.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors">
              <div className="col-span-8 md:col-span-9 text-slate-700 pr-4 text-sm md:text-base">
                {c.label}
              </div>
              <div className="col-span-2 md:col-span-1 text-center font-medium text-slate-500">
                {c.maxScore}
              </div>
              <div className="col-span-2 md:col-span-2">
                <input
                  type="number"
                  min="0"
                  max={c.maxScore}
                  value={c.score.toString()}
                  onChange={(e) => handleScoreChange(c.id, e.target.value)}
                  className="w-full text-center p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium text-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex items-start gap-4">
        <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={24} />
        <div className="text-sm text-blue-900">
          <p className="font-bold mb-2 text-base">Quy trình đánh giá:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Phân công 01 đồng chí theo dõi diễn biến để chấm điểm.</li>
            <li>Cuối buổi, chi ủy thống nhất điểm tự chấm, đề xuất mức xếp loại.</li>
            <li>Chi bộ thảo luận, biểu quyết thông qua. Người chủ trì chỉ ra mặt hạn chế và giải pháp khắc phục (ghi vào biên bản).</li>
            <li>Báo cáo cấp ủy cấp trên trực tiếp để quyết định mức xếp loại chính thức.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
