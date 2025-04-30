import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const GetAllCategories = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("blogCategories").collect();
    },
  });
  