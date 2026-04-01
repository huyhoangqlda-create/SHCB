import React, { useState } from 'react';

const cellTypes = [
  {
    id: 'thon',
    name: 'Thôn, Tổ dân phố',
    content: [
      'Tuyên truyền, vận động nhân dân thực hiện chủ trương, chính sách; xây dựng khối đại đoàn kết.',
      'Lãnh đạo phát triển kinh tế - xã hội, an ninh trật tự; xây dựng nông thôn mới/đô thị văn minh.',
      'Thực hiện dân chủ ở cơ sở, hương ước, quy ước; xây dựng môi trường văn hóa.',
      'Phòng chống tham nhũng, lãng phí; quản lý đất đai, trật tự xây dựng, vệ sinh môi trường.',
      'Bồi dưỡng quần chúng, tạo nguồn phát triển đảng viên ở khu dân cư.'
    ]
  },
  {
    id: 'hanhchinh',
    name: 'Cơ quan hành chính, Sự nghiệp',
    content: [
      'Lãnh đạo đổi mới lề lối làm việc, cải cách hành chính, chuyển đổi số, nâng cao chất lượng phục vụ.',
      'Thực hiện quy chế, nội quy; đánh giá tiến độ, chất lượng công việc chuyên môn.',
      'Thực hành tiết kiệm, chống lãng phí, tiêu cực trong công vụ, giảng dạy, khám chữa bệnh...',
      'Thực hiện dân chủ ở cơ sở; giữ mối liên hệ với cấp ủy nơi cư trú.',
      'Công tác đào tạo, bồi dưỡng cán bộ; phát triển đảng viên.'
    ]
  },
  {
    id: 'doanhnghiep_nn',
    name: 'Doanh nghiệp Nhà nước',
    content: [
      'Lãnh đạo phát triển doanh nghiệp, thực hiện nhiệm vụ sản xuất kinh doanh, nâng cao năng lực quản trị.',
      'Quan tâm đời sống, việc làm của người lao động và hoạt động của các đoàn thể.',
      'Thực hiện dân chủ ở cơ sở; tham gia hoạt động xã hội, từ thiện.',
      'Phòng chống tham nhũng, lãng phí; giữ mối liên hệ với cấp ủy nơi cư trú.',
      'Nâng cao tay nghề người lao động; bồi dưỡng kết nạp đảng viên.'
    ]
  },
  {
    id: 'doanhnghiep_tn',
    name: 'Doanh nghiệp Tư nhân / FDI',
    content: [
      'Tham gia xây dựng, thực hiện nhiệm vụ sản xuất kinh doanh; nâng cao năng suất, sức cạnh tranh.',
      'Chấp hành pháp luật, nội quy, quy chế của doanh nghiệp.',
      'Quan tâm đời sống, hợp đồng lao động, thỏa ước lao động tập thể; hài hòa quan hệ lao động.',
      'Tuyên truyền phát triển tổ chức đảng, đoàn thể; tạo nguồn phát triển đảng viên.'
    ]
  },
  {
    id: 'hocsinh',
    name: 'Học sinh, Sinh viên',
    content: [
      'Chấp hành chủ trương, pháp luật, nội quy nhà trường; nâng cao bản lĩnh chính trị.',
      'Chủ động học tập, nghiên cứu khoa học, rèn luyện đạo đức, lối sống.',
      'Tham gia hoạt động tình nguyện, xã hội vì cộng đồng.',
      'Phòng chống tiêu cực, gian lận trong thi cử; bảo đảm an ninh học đường.',
      'Bồi dưỡng quần chúng, tạo nguồn phát triển đảng viên trong HSSV.'
    ]
  },
  {
    id: 'vutrang',
    name: 'Lực lượng Vũ trang',
    content: [
      'Giáo dục truyền thống, xây dựng chi bộ trong sạch vững mạnh gắn với đơn vị vững mạnh toàn diện.',
      'Quán triệt nhiệm vụ chính trị, mệnh lệnh cấp trên.',
      'Thực hiện điều lệnh, kỷ luật quân đội/công an; sẵn sàng chiến đấu.',
      'Nâng cao đời sống cán bộ, chiến sĩ; xây dựng tổ chức quần chúng.'
    ]
  }
];

export default function ContentHandbook() {
  const [activeType, setActiveType] = useState(cellTypes[0].id);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sổ tay Nội dung Sinh hoạt</h2>
        <p className="text-slate-600">Nội dung trọng tâm theo từng loại hình chi bộ (Mục 4, Hướng dẫn 42-HD/BTCTW)</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar for types */}
        <div className="w-full md:w-1/3 space-y-2">
          {cellTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                activeType === type.id 
                  ? 'bg-red-50 border-red-300 text-red-800 font-bold shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
              {cellTypes.find(t => t.id === activeType)?.name}
            </h3>
            <ul className="space-y-5">
              {cellTypes.find(t => t.id === activeType)?.content.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-0.5 bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
