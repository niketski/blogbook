import { model, Document, models, Schema } from 'mongoose';

interface ICategory extends Document {
    name: string,
    slug: string,
}

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        unique: true,
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

const CategoryModel = models.Category || model<typeof CategorySchema>('Category', CategorySchema);

export { type ICategory };

export default CategoryModel;