'use client'

export default function ErrorBlog({ error} : { error: Error}) {
    
    return (
        <div className="text-center min-h-[80vh] flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Something went wrong.</h1>
            <p>{error.message}</p>
        </div>
    );
}