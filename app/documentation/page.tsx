import React from 'react'
import Header from '../(main)/_components/HeaderHome'
import Footer from "@/components/footer/Footer";
function Documentation() {
  return (
    //trang tai lieu
    <>
    <Header/>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Tài liệu: AI Cá Nhân Hóa</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Giới thiệu</h2>
        <p>
          Tính năng AI cá nhân hóa cho phép bạn tạo ra một AI được tùy chỉnh theo nhu cầu, sở thích và phong cách riêng của bạn. 
          Bạn có thể đặt tên cho AI, chọn mô hình thông minh (ví dụ: ChatGPT, Gemini...), và đưa ra hướng dẫn để AI hành xử đúng với vai trò mong muốn.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Các Tính Năng Chính</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>🔧 Tùy chỉnh hướng dẫn (instruction) cho AI.</li>
          <li>🧠 Chọn mô hình AI phù hợp (ChatGPT, Gemini Flash...)</li>
          <li>👤 Đặt tên & tạo phong cách riêng cho AI.</li>
          <li>📁 Lưu nhiều AI cá nhân hóa cho các mục đích khác nhau.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Cách Sử Dụng</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Truy cập trang <strong>AI Cá Nhân Hóa</strong>.</li>
          <li>Chọn <strong>"Tạo AI mới"</strong>.</li>
          <li>Điền tên, chọn mô hình AI và nhập hướng dẫn.</li>
          <li>Lưu lại và bắt đầu trò chuyện với AI đã tùy chỉnh.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">4. Ví dụ Hướng Dẫn Cho AI</h2>
        <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
Tôi là một chuyên gia marketing, hãy trả lời các câu hỏi của tôi một cách chuyên nghiệp, ngắn gọn và đi thẳng vào vấn đề.
        </pre>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default Documentation