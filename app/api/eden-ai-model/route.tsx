import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
    const {provider,userInput, aiResp}=await req.json()

    //cái đống ở dưới lấy ở eden ai khi chat test 1 model ai
    const headers = {
        Authorization: "Bearer " + process.env.EDEN_API_KEY, //phải có khoảng trắng sau Bearer
        'Content-Type': 'application/json'
    };
    
  const url = "https://api.edenai.run/v2/multimodal/chat";
  const body = JSON.stringify({
    providers: [provider],
    messages: [
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "content": {
          "text": userInput
        }
      }
    ]
  },
  ...(aiResp?[{
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "content": {
          "text": aiResp
        }
      }
    ]
  }] : [])
]
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body
  });

  const result = await response.json();
  console.log(result)
  const resp={
    role:'canhanhoa',
    content:result[provider]?.generated_text
  }
  return NextResponse.json(resp);

}