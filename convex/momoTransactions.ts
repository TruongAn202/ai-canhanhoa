import { mutation,query } from './_generated/server';
import { v } from 'convex/values';

export const updateUserOrderAndCredit = mutation({
  args: {
    userId: v.id('users'),
    orderId: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    // Cập nhật thông tin người dùng
    await ctx.db.patch(args.userId, {
      orderId: args.orderId,
      credits: args.credits,
    });
  },
});
export const ghiNhanGiaoDich = mutation({
    args: {
      transactionId: v.string(),
      userId: v.id('users'),
      amount: v.number(),
      status: v.string(),
      paymentMethod: v.string(),
    },
    handler: async (ctx, args) => {
      await ctx.db.insert('momoTransactions', {
        transactionId: args.transactionId,
        userId: args.userId,
        amount: args.amount,
        status: args.status,
        paymentMethod: args.paymentMethod,
      });
    },
  });

// Lấy tất cả giao dịch MoMo (kèm tên người dùng)
export const GetAllTransactions = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.db.query("momoTransactions").collect();

    const enriched = await Promise.all(
      transactions.map(async (tx) => {
        const user = await ctx.db.get(tx.userId);
        return {
          ...tx,
          userName: user?.name || "Không rõ",
        };
      })
    );

    return enriched.sort((a, b) => b._creationTime - a._creationTime);
  },
});