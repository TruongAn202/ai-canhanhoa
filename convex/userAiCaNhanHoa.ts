import { v } from "convex/values"; //dinh nghia de khai bao kieu du lieu cua convex
import { mutation, query } from "./_generated/server"; //mutation: dùng cho những function thay đổi dữ liệu (create, update, delete).
//query: dùng cho những function chỉ đọc dữ liệu.

// Mutation để chèn danh sách các mục cá nhân hóa đã chọn vào bảng `userAiCaNhanHoa`
export const InsertSelectedCaNhanHoa = mutation({
    args: {
        records: v.any(), // `records` là một mảng chứa danh sách mục cá nhân hóa
        uid: v.id('users'), // `uid` là ID của người dùng, tham chiếu đến bảng `users`
    },
    handler: async (ctx, args) => {
        // Duyệt qua từng record và chèn vào bảng `userAiCaNhanHoa`
        const insertedIds = await Promise.all(
            args.records.map(async (record: any) =>
                await ctx.db.insert('userAiCaNhanHoa', {
                    ...record, // Sao chép tất cả thuộc tính từ record
                    aiModelId:'Google: Gemini 2.0 Flash', //mặc định
                    uid: args.uid, // Gán UID của người dùng để liên kết dữ liệu
                })
            )
        );
        return insertedIds; // Trả về danh sách ID của các bản ghi đã chèn
    },
});

// Query để lấy danh sách các mục cá nhân hóa của một user cụ thể
export const GetAllUserCaNhanHoa = query({
    args: {
        uid: v.optional(v.id('users')), // `uid` là ID của người dùng, dùng để lọc dữ liệu
    },
    handler: async (ctx, args) => {
        if (!args.uid) return [];
        // Truy vấn tất cả các bản ghi trong `userAiCaNhanHoa` có `uid` khớp với người dùng hiện tại
        const result = await ctx.db
            .query('userAiCaNhanHoa')
            .filter((q) => q.eq(q.field('uid'), args.uid)) // Lọc dữ liệu theo `uid`
            .order('desc')
            .collect();

        return result; // Trả về danh sách các mục cá nhân hóa của user
    },
});

export const CapNhatUserAiCaNhanHoa=mutation({ // ham cap nhat, chọn model ai và chi dan cua users
    args:{
        id:v.id('userAiCaNhanHoa'),
        userInstruction:v.string(),
        aiModelId:v.string()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.id,{ //patch la cú pháp để update
            aiModelId:args.aiModelId,
            userInstruction:args.userInstruction
        });
        return result;
    }
});

export const XoaCaNhanHoa=mutation({ //xoa 1 AI da them vao danh sach
    args:{
        id:v.id('userAiCaNhanHoa')
    },
    handler:async(ctx, args)=>{
        await ctx.db.delete(args.id);
    }
})
