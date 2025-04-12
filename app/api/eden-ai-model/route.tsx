
import { NextRequest, NextResponse } from "next/server";

// Hàm xử lý POST request từ client
export async function POST(req: NextRequest) {
  console.log("Nhận request từ client...");

  // Đọc và giải mã nội dung JSON từ body request
  const { provider, userInput, aiResp } = await req.json();
  console.log("Dữ liệu nhận được:", { provider, userInput, aiResp });

  // Thiết lập headers để gọi đến API của Eden AI
  const headers = {
    Authorization: "Bearer " + process.env.EDEN_API_KEY, // Lấy API key từ biến môi trường
    "Content-Type": "application/json", // Kiểu dữ liệu gửi đi là JSON
  };

  // URL endpoint của Eden AI
  const url = "https://api.edenai.run/v2/multimodal/chat";

  // Tạo mảng messages theo định dạng mà Eden AI yêu cầu
  const messages = [
    {
      role: "user", 
      content: [
        {
          type: "text",
          content: {
            text: userInput, 
          },
        },
      ],
    },
    // Nếu đã có phản hồi từ AI trước đó thì thêm vào đoạn chat lịch sử
    ...(aiResp
      ? [
          {
            role: "assistant", // Vai trò AI
            content: [
              {
                type: "text",
                content: {
                  text: aiResp, // Nội dung AI trả lời trước đó
                },
              },
            ],
          },
        ]
      : []), // Nếu không có thì bỏ qua
  ];

  // Dữ liệu sẽ gửi đi (body của request tới Eden AI)
  const body = JSON.stringify({
    providers: [provider], // Ví dụ: "openai", "google", "anthropic"
    temperature: 0.7, // Độ sáng tạo của AI
    max_tokens: 500, // Giới hạn độ dài phản hồi
    messages, // Lịch sử cuộc trò chuyện
  });

  // In ra body và headers để debug
  console.log("Body gửi đến Eden AI:", body);
  console.log("Header gửi:", headers);

  // Gửi request tới API Eden AI
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  // Đọc kết quả JSON từ phản hồi
  const result = await response.json();
  console.log("Phản hồi Eden AI:", result);

  // Trích xuất câu trả lời được tạo ra từ provider đã chọn
  let generatedText = result[provider]?.generated_text;

  // Nếu không có generated_text, thử lấy từ các message assistant
  if (!generatedText || generatedText.trim() === "") {
    const messages = result[provider]?.messages || [];

    // Tìm message gần nhất từ assistant trong danh sách
    const assistantMessage = messages
      .reverse()
      .find((msg: any) => msg.role === "assistant");

    // Lấy nội dung nếu có, hoặc fallback một câu nhắc mặc định
    generatedText =
      assistantMessage?.content?.[0]?.content?.text ||
      "Vui lòng đặt câu hỏi rõ ràng hơn nhé!";
  }

  // Tạo response gửi về client
  const resp = {
    role: "canhanhoa", // Có thể là tên AI cá nhân hóa
    content: generatedText, // Nội dung trả về từ AI
  };

  // In ra nội dung phản hồi để debug
  console.log("Trả kết quả về client:", resp);

  // Trả JSON response cho client
  return NextResponse.json(resp);
}
