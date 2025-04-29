import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const TaoUser = mutation({
    args: {
      name: v.string(),
      email: v.string(),
      picture: v.string(),
    },
    handler: async (ctx, args) => {
      const users = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();
  
      if (users.length === 0) {
        const data = {
          name: args.name,
          email: args.email,
          picture: args.picture,
          credits: 5000,
          role: "user", // 👈 thêm role mặc định
        };
        const newUser = await ctx.db.insert("users", data);
        return newUser;
      }
  
      return users[0]; // đã tồn tại thì trả về user đầu tiên
    },
  });  

export const GetUser=query({ //lay user dua vao email
    args:{
        email:v.string(),
    },
    handler:async(ctx, args)=>{
        const user=await ctx.db.query('users').filter(q=>q.eq(q.field('email'), args.email)).collect();
        return user[0];
    }
})

export const UpdateTokens = mutation({ // cap nhat token
    args:{
        credits:v.number(),
        uid:v.id('users'),
    },
    handler:async(ctx, args)=>{
        const result=await ctx.db.patch(args.uid,{
            credits:args.credits
        })
        return result;
    }
})

export const GetAllUsers = query({
    handler: async (ctx) => {
      const users = await ctx.db.query("users").collect();
      return users;
    },
  });

  //phan quyen
  export const UpdateUserRole = mutation({
    args: {
      userId: v.id('users'),
      role: v.string(), // Cập nhật role, có thể là "admin" hoặc "user"
    },
    handler: async (ctx, args) => {
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), args.userId)).first();
      if (!user) {
        throw new Error("User not found");
      }
      
      await ctx.db.patch(user._id, {
        role: args.role, // Cập nhật role của người dùng
      });
  
      return { success: true, message: `Role updated to ${args.role}` };
    },
  });
  
  //xoa tai khoan
  export const DeleteUser = mutation({
    args: {
      userId: v.id('users'),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), args.userId)).first();  // Sử dụng _id thay vì id
      if (!user) {
        throw new Error("User not found");
      }
  
      // Xóa tài khoản
      await ctx.db.delete( user._id); // chi can id
  
      return { success: true, message: "User deleted successfully" };
    },
  });
  
  