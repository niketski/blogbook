import{ Schema, Document, Types, model, models } from "mongoose";

export interface IBlog extends Document {
    title: string,
    slug: string,
    content: string,
    featuredImage: {
        url: string,
        id: string
    },
    tags: Types.ObjectId[],
    category: Types.ObjectId,
    status: string,
    metaTitle: string,
    metaDescription: string
    createdAt: string
}

const BlogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
    },
    featuredImage: {
        type: Object,
        default: undefined
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
    status: String,
    metaTitle: String,
    metaDescription: String,
    
}, { timestamps: true });

const BlogModel = models.Blog || model<typeof BlogSchema>('Blog', BlogSchema);

export default BlogModel;
