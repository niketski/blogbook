import{ Schema, Document, Types, model} from "mongoose";

interface IBlog extends Document{
    title: string,
    content: string,
    featuredImage: string,
    tags: Types.ObjectId[],
    category: Types.ObjectId,
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
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    metaTitle: String,
    metaDescription: String,
});

const BlogModel = model<typeof BlogSchema>('Blog', BlogSchema);

export default BlogModel;
