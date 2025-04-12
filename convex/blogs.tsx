// convex/blog.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Thêm bài viết mới
export const ThemBlog = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    author: v.string(),
    category: v.string(),
    slug: v.string(),
    date: v.string(), // ISO string
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("blog", args);
  },
});

// Lấy tất cả bài viết
export const GetTatCaBlog = query({
  handler: async (ctx) => {
    return await ctx.db.query("blog").order("desc").collect();
  },
});

// Lấy một bài viết theo slug
export const GetBlogBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
      const blog = await ctx.db
        .query("blog")
        .filter((q) => q.eq(q.field("slug"), args.slug))
        .first();
  
      return blog;
    },
  });
  