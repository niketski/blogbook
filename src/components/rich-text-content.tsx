'use client';
import DOMPurify from "isomorphic-dompurify";



export default function RichTextContent ({ content } : { content: string }) {
    const sanitizedHTML = DOMPurify.sanitize(content);

    return (
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(sanitizedHTML)}}></div>
    );
}