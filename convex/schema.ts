import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({ //chua bang
    users:defineTable({ //bang users
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        credits:v.number(),
        orderId:v.optional(v.string())
    }),
    userAiCaNhanHoa:defineTable({ //bang AI
        id:v.number(),
        name:v.string(),
        title:v.string(),
        image:v.string(),
        instruction:v.string(), // chi dan cua AI mac dinh
        userInstruction:v.string(), // chi dan cua user doi voi AI
        aiModelId:v.optional(v.string()),
        sampleQuestions:v.any(), //yeu cau tu khung chat
        uid:v.id('users')
    }),
    support: defineTable({
        name: v.string(),
        email: v.string(),
        message: v.any(),
        status: v.optional(v.boolean()), // Thay v.boolean() bằng v.optional(v.boolean())
      }),
})