'use server'

interface CreateBlogFormState {
    message: string,
    errors: {
        title?: string,
        content?: string,
        status?: 'draft' | 'published',
        category?: string,
        tags?: string,
        featuredImage?: string,
        metaTitle?: string,
        metaDescription?: string,
        _form?: string
    }
}

export default async function createBlog(prevState: CreateBlogFormState, formData: FormData): Promise<CreateBlogFormState> {

    try {

        console.log(formData);
    
        return {
            message: 'A blog has been created successfully!',
            errors: {}
        }

    } catch(error: any) {

        console.log(error);

        return {
            errors: {
                _form: 'Something went wrong.'
            },
            message: 'There\'s error sending data.'
        }

    }

}