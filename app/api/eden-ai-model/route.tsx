import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("⏳ Nhận request từ client...");

  const { provider, userInput, aiResp } = await req.json();
  console.log("📥 Dữ liệu nhận được:", { provider, userInput, aiResp });

  const headers = {
    Authorization: "Bearer " + process.env.EDEN_API_KEY,
    "Content-Type": "application/json",
  };

  const url = "https://api.edenai.run/v2/multimodal/chat";

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
    ...(aiResp
      ? [
          {
            role: "assistant",
            content: [
              {
                type: "text",
                content: {
                  text: aiResp,
                },
              },
            ],
          },
        ]
      : []),
  ];

  const body = JSON.stringify({
    providers: [provider],
    temperature: 0.7,
    max_tokens: 500,
    messages,
  });

  console.log("📤 Body gửi đến Eden AI:", body);
  console.log("🔐 Header gửi:", headers);

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const result = await response.json();
  console.log("📦 Phản hồi Eden AI:", result);

  let generatedText = result[provider]?.generated_text;

  // Nếu generated_text rỗng, fallback sang messages
  if (!generatedText || generatedText.trim() === "") {
    const messages = result[provider]?.messages || [];
    const assistantMessage = messages
      .reverse()
      .find((msg: any) => msg.role === "assistant");

    generatedText =
      assistantMessage?.content?.[0]?.content?.text || "Vui lòng đặt câu hỏi rõ ràng hơn nhé!";
  }

  const resp = {
    role: "canhanhoa",
    content: generatedText,
  };

  console.log("✅ Trả kết quả về client:", resp);
  return NextResponse.json(resp);
}
