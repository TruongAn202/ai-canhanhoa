"use client"
import React from 'react'
import Header from '../(main)/_components/HeaderHome';
import Footer from "@/components/footer/Footer";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

type BlogPost = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: 'AI Cá Nhân Hóa' | 'Công nghệ AI' | 'Ứng dụng thực tiễn';
};


const blogPosts: BlogPost[] = [
  // --- AI Cá Nhân Hóa ---
  {
    title: 'AI Cá Nhân Hóa: Xu hướng và ứng dụng thực tế',
    description:
      'Khám phá cách AI cá nhân hóa đang thay đổi cách con người tương tác với công nghệ và các ứng dụng thực tiễn trong giáo dục, kinh doanh, và đời sống.',
    slug: 'ai-ca-nhan-hoa-xu-huong',
    date: '2025-04-10',
    author: 'Nguyễn Văn A',
    category: 'AI Cá Nhân Hóa',
  },
  {
    title: 'Cách tạo trợ lý AI mang phong cách riêng của bạn',
    description:
      'Hướng dẫn tạo một AI cá nhân hóa từ tên, mô hình AI, đến cách AI phản hồi đúng với phong cách bạn muốn.',
    slug: 'tao-tro-ly-ai-ca-nhan',
    date: '2025-04-05',
    author: 'Lê Minh Tú',
    category: 'AI Cá Nhân Hóa',
  },
  {
    title: '5 cách sử dụng AI cá nhân hóa trong công việc hàng ngày',
    description:
      'Từ viết email đến lên kế hoạch công việc – AI cá nhân hóa có thể giúp bạn tiết kiệm thời gian thế nào?',
    slug: 'ung-dung-ai-ca-nhan-trong-cong-viec',
    date: '2025-03-28',
    author: 'Phạm Thị Hoa',
    category: 'AI Cá Nhân Hóa',
  },
  {
    title: 'Câu lệnh gợi ý (Prompt) cho AI cá nhân hóa hiệu quả',
    description:
      'Tổng hợp các prompt mẫu giúp AI phản hồi chính xác, tự nhiên và phù hợp với mục tiêu của bạn.',
    slug: 'prompt-ai-ca-nhan-hoa',
    date: '2025-03-20',
    author: 'Nguyễn Văn A',
    category: 'AI Cá Nhân Hóa',
  },

  // --- Công nghệ AI ---
  {
    title: 'So sánh các mô hình AI: ChatGPT vs Gemini vs Claude',
    description:
      'Bài viết so sánh các mô hình AI phổ biến hiện nay dựa trên tốc độ, độ chính xác, khả năng xử lý ngữ cảnh và chi phí.',
    slug: 'so-sanh-chatgpt-gemini-claude',
    date: '2025-03-30',
    author: 'Trần Thị B',
    category: 'Công nghệ AI',
  },
  {
    title: 'OpenAI GPT-5 sắp ra mắt: Có gì mới?',
    description:
      'Dự đoán về khả năng, cải tiến và những điểm đáng mong chờ ở mô hình GPT-5.',
    slug: 'gpt-5-co-gi-moi',
    date: '2025-04-02',
    author: 'Lê Hữu Đức',
    category: 'Công nghệ AI',
  },
  {
    title: 'Tổng quan về Gemini: Mô hình AI của Google có gì đặc biệt?',
    description:
      'Giới thiệu chi tiết về Gemini – đối thủ của ChatGPT trong hệ sinh thái AI.',
    slug: 'tong-quan-gemini',
    date: '2025-03-21',
    author: 'Phạm Hồng Quân',
    category: 'Công nghệ AI',
  },
  {
    title: 'Bảo mật khi sử dụng AI: Những điều cần lưu ý',
    description:
      'Bạn có nên cung cấp thông tin nhạy cảm cho AI? Cách bảo vệ quyền riêng tư khi dùng dịch vụ AI.',
    slug: 'bao-mat-va-ai',
    date: '2025-03-15',
    author: 'Nguyễn Thị Dung',
    category: 'Công nghệ AI',
  },
  {
    title: 'Tự xây dựng mô hình AI cơ bản với Python',
    description:
      'Hướng dẫn đơn giản về cách tạo một mô hình AI cơ bản bằng Python dành cho người mới.',
    slug: 'tu-xay-dung-ai-voi-python',
    date: '2025-03-05',
    author: 'Hoàng Minh',
    category: 'Công nghệ AI',
  },

  // --- Ứng dụng thực tiễn ---
  {
    title: 'AI trong giáo dục: Trợ giảng thông minh & hỗ trợ học tập',
    description:
      'Khám phá các cách AI đang được ứng dụng trong lớp học và cải thiện kết quả học tập.',
    slug: 'ai-trong-giao-duc',
    date: '2025-03-12',
    author: 'Vũ Ngọc Ánh',
    category: 'Ứng dụng thực tiễn',
  },
  {
    title: 'Doanh nghiệp nhỏ ứng dụng AI như thế nào?',
    description:
      'Tư duy áp dụng AI hiệu quả cho startup và doanh nghiệp quy mô vừa và nhỏ.',
    slug: 'ai-cho-doanh-nghiep-nho',
    date: '2025-03-08',
    author: 'Trần Thanh Sơn',
    category: 'Ứng dụng thực tiễn',
  },
  {
    title: 'Tạo nội dung bằng AI: Có nên hay không?',
    description:
      'Phân tích ưu & nhược điểm khi sử dụng AI để viết bài, sáng tạo nội dung số và vai trò của con người.',
    slug: 'tao-noi-dung-bang-ai',
    date: '2025-02-28',
    author: 'Đào Hải Yến',
    category: 'Ứng dụng thực tiễn',
  },
  {
    title: 'AI hỗ trợ tâm lý: Trợ lý ảo có thể “lắng nghe” bạn?',
    description:
      'Khám phá khái niệm AI hỗ trợ sức khỏe tinh thần và liệu AI có thể thực sự giúp con người vượt qua khủng hoảng không?',
    slug: 'ai-ho-tro-tam-ly',
    date: '2025-02-22',
    author: 'Nguyễn Văn B',
    category: 'Ứng dụng thực tiễn',
  },
];

export default function Blog() {
  const categories = ['AI Cá Nhân Hóa', 'Công nghệ AI', 'Ứng dụng thực tiễn'];
  const blogPosts = useQuery(api.blogs.GetTatCaBlog); // Lấy dữ liệu blog từ Convex

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Công Nghệ & AI</h1>

        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 border-b pb-2">{category}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(blogPosts
                ? blogPosts.filter((post) => post.category === category)
                : Array(2).fill(null) // tạo 2 card loading giả
              ).map((post, index) => (
                <div
                  key={post?._id ?? index}
                  className="border rounded-2xl p-5 shadow hover:shadow-lg transition min-h-[160px]"
                >
                  {!post ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-2">{post.description}</p>
                      <div className="text-sm text-gray-500 mb-2">
                        {post.author} · {new Date(post.date).toLocaleDateString('vi-VN')}
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Đọc tiếp →
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}