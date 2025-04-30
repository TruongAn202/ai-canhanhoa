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
  
  // Xóa bài viết theo id
export const XoaBlog = mutation({
  args: { id: v.id("blog") }, // id của bảng "blog"
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Thêm category mới (bằng cách insert blog rỗng chỉ có category)
export const ThemCategory = mutation({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const exists = await ctx.db
      .query("blogCategories")
      .filter((q) => q.eq(q.field("name"), args.category))
      .first();

    if (!exists) {
      await ctx.db.insert("blogCategories", { name: args.category });
    }
  },
});

// Cập nhật bài viết
export const CapNhatBlog = mutation({
  args: {
    id: v.id("blog"), // ID của blog cần cập nhật
    title: v.string(),
    description: v.string(),
    author: v.string(),
    category: v.string(),
    slug: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, title, description, author, category, slug, content } = args;

    // Lấy bài viết hiện tại
    const blog = await ctx.db.get(id);
    console.log(blog); // Xem thông tin hiện tại của bài viết

    // Cập nhật thông tin bài viết
    await ctx.db.patch(id, {
      title,
      description,
      author,
      category,
      slug,
      content,
      date: new Date().toISOString(), // Cập nhật lại ngày nếu cần
    });

    // Kiểm tra lại bài viết đã được cập nhật
    const updatedBlog = await ctx.db.get(id);
    console.log(updatedBlog); // Xem bài viết sau khi cập nhật

    return { success: true }; // Trả về kết quả thành công
  },
});