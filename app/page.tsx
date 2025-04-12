"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "./(main)/_components/HeaderHome";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

export default function Home() {
  const sections = [
    {
      title: "Tích Hợp Nhiều AI",
      desc: "Chọn giữa nhiều mô hình AI, từ GPT-4 đến Claude, Gemini, và hơn thế nữa.",
      img: "/ai-integration.png",
      reverse: false, // Ảnh bên trái, chữ bên phải
    },
    {
      title: "Tùy Chỉnh Theo Sở Thích",
      desc: "Đặt tên AI, chọn model, hướng dẫn AI theo phong cách riêng của bạn.",
      img: "/custom-ai.png",
      reverse: true, // Ảnh bên phải, chữ bên trái
    },
    {
      title: "Lưu Trữ Cấu Hình",
      desc: "Lưu lại các tùy chỉnh để AI luôn hiểu bạn theo cách riêng biệt.",
      img: "/save-settings.png",
      reverse: false, // Ảnh bên trái, chữ bên phải
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-10 space-y-6">
        <h1 className="text-5xl font-bold">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Cá Nhân Hóa AI
          </span>{" "}
          Theo Cách Của Bạn
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Thiết lập AI theo phong cách riêng của bạn.
        </p>
        <video
          src="https://framerusercontent.com/assets/JSOuDeN0xX8MygdSsw7bGJawKo.mp4"
          width={350}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl shadow-lg"
        />
        <Link href="/sign-in">
          <Button className="mt-4 px-6 py-3 text-lg cursor-pointer">
            Bắt Đầu
          </Button>
        </Link>
      </section>
      {/* Các tính năng */}
      {sections.map((section, index) => (
        <motion.section
          key={index}
          className={`h-screen flex items-center justify-center px-10 lg:px-32 ${section.reverse ? "flex-row-reverse" : "flex-row"
            }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Ảnh */}
          <motion.div
            className="w-1/2 flex justify-center"
            initial={{ opacity: 0, x: section.reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={section.img}
              alt={section.title}
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Nội dung */}
          <motion.div
            className="w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: section.reverse ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-5xl font-bold">{section.title}</h2>
            <p className="mt-4 text-xl text-gray-600">{section.desc}</p>
          </motion.div>
        </motion.section>
      ))}

      {/* Footer */}
      <Footer />
    </div>
  );
}
