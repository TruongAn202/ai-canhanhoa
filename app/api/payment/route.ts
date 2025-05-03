import { NextRequest } from 'next/server';
import crypto from 'crypto';
import https from 'https';

// Định nghĩa kiểu dữ liệu cho phản hồi từ MoMo
interface MoMoResponse {
  payUrl?: string;
  errorCode?: string;
  errorMessage?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Lấy dữ liệu từ body
    const body = await req.json();
    const { userId } = body;

    const accessKey = process.env.MOMO_ACCESS_KEY!;
    const secretKey = process.env.MOMO_SECRET_KEY!;
    const partnerCode = 'MOMO';
    const requestType = 'payWithMethod';
    const amount = '200000'; // VND
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const orderInfo = 'Nâng cấp tài khoản gói cao cấp';
    //const redirectUrl = 'http://localhost:3000/workspace';
    const redirectUrl = 'https://ai-canhanhoa-tr-an202.vercel.app/workspace';
    //const ipnUrl = 'https://27e5-171-232-66-106.ngrok-free.app/api/momo/ipn';
    const ipnUrl = 'https://ai-canhanhoa-tr-an202.vercel.app/api/momo/ipn';
    
    const extraData = userId;

    // Tạo rawSignature cho chữ ký
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    console.log("rawSignature:", rawSignature);
    console.log("Calculated Signature:", signature);


    // Cấu trúc body của yêu cầu gửi đến MoMo
    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: "AI App",
      storeId: "Store001",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: 'vi',
      requestType,
      autoCapture: true,
      extraData, // phải có dòng này
      orderGroupId: '',
      signature
    });

    // Thiết lập các tùy chọn yêu cầu HTTPS
    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      }
    };

    // Gửi yêu cầu đến MoMo API
    const momoRes = await new Promise<MoMoResponse>((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      });
      req.on('error', reject);
      req.write(requestBody);
      req.end();
    });

    // Kiểm tra phản hồi từ MoMo và trả về kết quả
    if (momoRes && momoRes.payUrl) {
      return new Response(JSON.stringify(momoRes), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Lỗi từ MoMo', details: momoRes }), { status: 500 });
    }
  } catch (error) {
    console.error('Error in MoMo payment request:', error);
    return new Response(JSON.stringify({ error: 'Không thể kết nối MoMo' }), {
      status: 500,
    });
  }
}
