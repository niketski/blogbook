'use server'

export default async function DeleteBlog(formData: FormData){
    const blogId = formData.get('blogId');

    console.log('deleted: ', blogId);
}