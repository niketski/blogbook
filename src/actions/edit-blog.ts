'use server'

export interface EditBlogFormState {
    status: 'error' | 'success' | 'idle',
    message: string,
    values: {
        title: string,
        slug: string,
        content: string,
        metaTitle: string,
        metaDescription: string,
        status: string,
        tags: string,
        category: string,
        featuredImage: string,
    },
    errors: {
        title?: string[],
        slug?: string[],
        content?: string[],
        metaTitle?: string[],
        metaDescription?: string[],
        status?: string[],
        tags?: string[],
        category?: string[],
        featuredImage?: string[],
        _form?: string
    }
}

export default async function EditBlog(prevState: EditBlogFormState, formData: FormData): Promise<EditBlogFormState> {

    try {

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const metaTitle =  formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const status = formData.get('status') as string;
        const tags = formData.get('tags') as string;
        const category = formData.get('category') as string;
        const featuredImage = formData.get('featuredImage') as string;
        
        return {
            status: 'success',
            message: 'Blog has been updated successfully!',
            values: {
                title: '',
                slug: '',
                content: '',
                metaTitle: '',
                metaDescription: '',
                status: 'draft',
                tags: '',
                category: '',
                featuredImage: '',
            },
            errors: {}
        }

    } catch(error: any) {

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const metaTitle =  formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const status = formData.get('status') as string;
        const tags = formData.get('tags') as string;
        const category = formData.get('category') as string;
        const featuredImage = formData.get('featuredImage') as string;

        return  {
            status: 'error',
            message: 'There\'s error sending data.',
            values: {
                title,
                slug,
                content,
                metaTitle,
                metaDescription,
                status,
                tags,
                category,
                featuredImage
            },
            errors: {
                _form: 'Something went wrong.'
            },
        }
    }


};