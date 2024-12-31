import{ Schema, Document, Types, model, models } from "mongoose";

interface IBlog extends Document {
    title: string,
    content: string,
    featuredImage: {
        url: string,
        id: string
    },
    tags: Types.ObjectId[],
    category: Types.ObjectId,
    // tags: string,
    // category: string,
    status: string,
    metaTitle: string,
    metaDescription: string
}

const BlogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
    },
    featuredImage: {
        type: Object
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag' 
        }
    ],
    // category: {
    //     type: String,
    // },
    // tags: {
    //     type: String
    // },
    status: String,
    metaTitle: String,
    metaDescription: String,
    
}, { timestamps: true });

const BlogModel = models.Blog || model<typeof BlogSchema>('Blog', BlogSchema);

export default BlogModel;
