import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const TaoUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
    },
    handler:async(ctx,args)=>{
        //neu user co ton tai
        const user=await ctx.db
        .query('users') //cu phap truy van tu bang users
        .filter(q=>q.eq(q.field('email'), args.email)) // doc du lieu có email === với args.email(tham so dau vao)
        .collect(); // tra ve mang
        //neu ko ton tai thi them mới
        if(user?.length==0){ // neu chua co user nay thi tạo user moi
            const data = {
                name:args.name,
                email:args.email,
                picture:args.picture,
                credits:5000
            }
            const result=await ctx.db.insert('users',data);
        }
        return user[0];
    }
})

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