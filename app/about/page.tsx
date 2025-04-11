import React from 'react'
import Header from '../(main)/_components/HeaderHome'
import Footer from "@/components/footer/Footer";
function About() {
  return (
    <>
    <Header />
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Về Chúng Tôi</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Sứ Mệnh</h2>
        <p>
          Chúng tôi xây dựng nền tảng AI cá nhân hóa nhằm mang đến cho mỗi người dùng một trải nghiệm tương tác với trí tuệ nhân tạo
          gần gũi, hiệu quả và phù hợp nhất với nhu cầu cá nhân. Mỗi AI là một phiên bản phản chiếu phong cách và mục tiêu riêng của bạn.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Chúng Tôi Là Ai?</h2>
        <p>
          Là một nhóm phát triển đam mê về công nghệ và trải nghiệm người dùng, chúng tôi tin rằng AI không chỉ là công cụ —
          nó nên là người bạn đồng hành thông minh, hiểu bạn và hỗ trợ bạn trong học tập, công việc, hay sáng tạo nội dung.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tại Sao Chọn Chúng Tôi?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>🎯 Cá nhân hóa sâu — bạn kiểm soát mọi thứ từ tên, phong cách đến mô hình AI.</li>
          <li>🚀 Hỗ trợ nhiều mô hình AI mạnh mẽ (OpenAI, Gemini...)</li>
          <li>🔒 Bảo mật & quyền riêng tư người dùng được đặt lên hàng đầu.</li>
          <li>🎨 Giao diện thân thiện, dễ sử dụng, tối ưu cho cả mobile & desktop.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Liên Hệ</h2>
        <p>
          Có câu hỏi hoặc góp ý? Gửi email cho chúng tôi tại{' '}
          <a href="mailto:dh52100001@student.stu.edu.vn" className="text-blue-600 underline">
          dh52100001@student.stu.edu.vn
          </a>
        </p>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default About