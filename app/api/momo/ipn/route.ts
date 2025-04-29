// app/api/momo/ipn/route.ts
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { api } from '@/convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    partnerCode,
    orderId,
    requestId,
    amount,
    orderInfo,
    orderType,
    transId,
    resultCode,
    message,
    payType,
    responseTime,
    extraData,
    signature,
  } = body;

  const accessKey = process.env.MOMO_ACCESS_KEY!;//phai co cai nay neu ko se ko khớp voi signature của momo
  const secretKey = process.env.MOMO_SECRET_KEY!;//phai co cai nay neu ko se ko khớp voi signature của momo

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
  const computedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  if (signature !== computedSignature) {
    console.error('Invalid MoMo signature:', {
      signature,
      computedSignature,
      rawSignature,
    });
    return new Response('Invalid signature', { status: 400 });
  }

  if (resultCode === 0) {//goi ham convex luu giao dich len data base
    try {
      await convex.mutation(api.momoTransactions.ghiNhanGiaoDich, {
        userId: extraData,
        transactionId: transId.toString(),
        amount: Number(amount),
        status: 'success',
        paymentMethod: payType || 'Momo',
      });

      await convex.mutation(api.momoTransactions.updateUserOrderAndCredit, {//luu thông tin id don hang va cong token
        userId: extraData,
        orderId,
        credits: 500000,
      });

      return new Response('IPN handled successfully', { status: 200 });
    } catch (error) {
      console.error('Lỗi xử lý IPN:', error);
      return new Response('Server error', { status: 500 });
    }
  }

  return new Response('IPN received but not successful', { status: 200 });
}
