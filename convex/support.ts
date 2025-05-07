import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server"; // Chắc chắn rằng bạn đang import đúng
// Mutation để tạo ticket yêu cầu hỗ trợ
export const CreateSupportTicket = mutation({//tao yeu cau
  args: {
    name: v.string(),
    email: v.string(),
    message: v.any(),
  },
  handler: async (ctx, args) => {
    // Thiết lập status mặc định là false
    const data = {
      ...args,
      status: false, // Giá trị mặc định là false
    };

    // Thêm ticket vào bảng support
    const ticket = await ctx.db.insert("support", data);
    return ticket;
  },
});
// Trong file API của bạn (ví dụ: convex/api/support.ts)


export const GetAllSupportTickets = query({//lay tat ca yeu cau ho tro
  handler: async (ctx) => {
    const tickets = await ctx.db
      .query('support')
      .order('desc') // Sắp xếp theo thời gian tạo giảm dần
      .collect();
    return tickets;
  }
});

export const GetSupportTicketById = query({//lay yeu cau ho tro bang id
    args: { id: v.id("support") },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id);
    },
  });
  
  // trong convex/support.ts
export const UpdateSupportStatus = mutation({//cap nhat trang thai
    args: {
      id: v.id("support"),
      status: v.boolean(), // thêm status làm tham số
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.id, { status: args.status });
    },
  });
  
  
