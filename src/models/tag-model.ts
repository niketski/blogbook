import { model, Document, models, Schema } from 'mongoose';

interface ITag extends Document {
    name: string,
    slug: string,
    createdAt: string
}

const TagSchema = new Schema<ITag>({
    name: {
        type: String,
        unique: true,
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

const TagModel = models.Tag || model<typeof TagSchema>('Tag', TagSchema);

export { type ITag };

export default TagModel;