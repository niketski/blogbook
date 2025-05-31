'use client';

import { Dispatch, SetStateAction} from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface richTextEditorProps {
    value: string,
    onChange: Dispatch<SetStateAction<string>>
}

export default function RichTextEditor({value, onChange} :  richTextEditorProps) {
    
    return <ReactQuill 
            className="flex flex-col h-[300px]"
            theme="snow" 
            value={value} 
            onChange={onChange} />;
}