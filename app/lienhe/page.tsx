"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Header from "../(main)/_components/HeaderHome";
import Footer from "@/components/footer/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");//mail
  const [message, setMessage] = useState("");//tin nhan 
  const [loading, setLoading] = useState(false);//trang thai loading
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0); // Đếm số ký tự trong tin nhắn

  const createSupportTicket = useMutation(api.support.CreateSupportTicket);

  const handleSubmit = async (e: React.FormEvent) => {//,xu ly gui form,kiem tra ko qua 4000 ky tu, thong bao khi gui thanh cong
    e.preventDefault();
    if (message.length > 4000) {
      setError("Tin nhắn không được vượt quá 4000 ký tự!");
      return;
    }

    setLoading(true);
    setError(""); // Xóa lỗi khi bắt đầu gửi yêu cầu
    try {
      await createSupportTicket({ name, email, message });
      alert("Gửi yêu cầu thành công! Chúng tôi sẽ phản hồi sớm nhất.");
      setName("");
      setEmail("");
      setMessage("");
      setCharCount(0); // Reset số ký tự sau khi gửi
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {//hien thi kiem tra cac ky tu dang go hien tai va 4000 kky tu, khong cho phap vuot qua
    const newMessage = e.target.value;
    if (newMessage.length <= 4000) {//xu ly thay doi tin nhan, dem ky tu
      setMessage(newMessage);
      setCharCount(newMessage.length);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Liên Hệ</h1>
          <p className="text-gray-600 mb-6 text-center">
            Gửi cho chúng tôi câu hỏi hoặc yêu cầu hỗ trợ. Đội ngũ sẽ phản hồi bạn trong thời gian sớm nhất!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ tên của bạn"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tin nhắn</label>
              <textarea
                rows={5}
                value={message}
                required
                onChange={handleMessageChange}
                placeholder="Nhập yêu cầu hỗ trợ hoặc câu hỏi của bạn..."
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              ></textarea>
              <div className="text-sm text-gray-500 mt-1">
                {charCount}/{4000} ký tự
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu hỗ trợ"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
