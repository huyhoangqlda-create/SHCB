import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import * as mammoth from 'mammoth';

export default function AutoDraft() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      let documentText = '';
      let inlineDataPart = null;

      const ext = file.name.split('.').pop()?.toLowerCase();

      if (ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        documentText = result.value;
      } else if (ext === 'txt') {
        documentText = await file.text();
      } else if (ext === 'pdf') {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
        });
        reader.readAsDataURL(file);
        const base64String = await base64Promise;
        
        inlineDataPart = {
          inlineData: {
            data: base64String,
            mimeType: 'application/pdf'
          }
        };
      } else {
        throw new Error('Định dạng file không được hỗ trợ. Vui lòng tải lên file .docx, .pdf hoặc .txt');
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Dựa vào báo cáo kết quả công tác tháng trong tài liệu đính kèm, hãy đóng vai một Bí thư chi bộ dày dặn kinh nghiệm và dự thảo giúp tôi 3 nội dung sau để phục vụ buổi sinh hoạt chi bộ thường kỳ:
1. Dự thảo Nội dung sinh hoạt chi bộ (các vấn đề trọng tâm cần đưa ra bàn bạc, đánh giá).
2. Dự thảo Nội dung kết luận của Bí thư chi bộ (tóm tắt các quyết nghị, phân công nhiệm vụ).
3. Dự thảo Báo cáo kết quả sinh hoạt chi bộ (để nộp lên Đảng ủy cấp trên).

Trình bày rõ ràng, chia thành 3 phần riêng biệt, sử dụng văn phong chuẩn mực của Đảng, bám sát Hướng dẫn 42-HD/BTCTW.

${documentText ? `Nội dung tài liệu:\n${documentText}` : ''}`;

      const parts: any[] = [{ text: prompt }];
      if (inlineDataPart) {
        parts.unshift(inlineDataPart);
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: parts
        }
      });

      setResult(response.text || 'Không thể tạo dự thảo. Vui lòng thử lại.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Đã xảy ra lỗi trong quá trình xử lý tài liệu. Vui lòng kiểm tra lại định dạng file hoặc thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Trợ lý AI Dự thảo</h2>
        <p className="text-slate-600">Tải lên báo cáo công tác tháng (Word, PDF) để AI tự động dự thảo nội dung sinh hoạt, kết luận và báo cáo.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 hover:border-red-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-1">Tải lên Báo cáo công tác</h3>
            <p className="text-slate-500 text-sm mb-4">Hỗ trợ định dạng .docx, .pdf, .txt</p>
            <button className="px-4 py-2 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors">
              Chọn tệp từ máy tính
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".docx,.doc,.pdf,.txt" 
              className="hidden" 
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setResult(null); setError(null); }}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!result && (
              <div className="flex justify-end">
                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-6 py-3 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Đang phân tích & dự thảo...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Tạo Dự thảo Tự động
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <CheckCircle2 className="text-green-500" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Kết quả Dự thảo</h3>
          </div>
          <div className="text-slate-700">
            <div className="markdown-body">
              <Markdown>{result}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
