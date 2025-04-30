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

export const GetAllTransactionsWithUser = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.db.query("momoTransactions").collect();
    const allUsers = await ctx.db.query("users").collect();

    const enriched = transactions.map((tx) => {
      const user = allUsers.find((u) => u._id === tx.userId);
      return {
        ...tx,
        userName: user?.name || "Không rõ",
        email: user?.email || "Không rõ",
        credits: user?.credits ?? 0,
      };
    });

    return enriched.sort((a, b) => b._creationTime - a._creationTime);
  },
});
//tong doanh thu
export const GetTongDoanhThu = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.db.query("momoTransactions").collect();

    // Chỉ tính những giao dịch có status là "success" (nếu bạn có trạng thái như vậy)
    const totalRevenue = transactions
      .filter((tx) => tx.status === "success")
      .reduce((sum, tx) => sum + tx.amount, 0);

    return totalRevenue;
  },
});
//tong don hang
export const DemTongDonHangThanhCong = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.db.query("momoTransactions").collect();
    const thanhCong = transactions.filter((tx) => tx.status === "success");
    return thanhCong.length;
  },
});
