import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import editTag from "@/actions/edit-tag";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EditTagFormProps {
    tag: {
        name: string,
        slug: string,
        id: string
    }
}

export default function EditTagForm({ tag } : EditTagFormProps) {
    const { toast } = useToast();
    const [formState, formAction, isPending] = useActionState(editTag, {
        status: 'idle',
        message: '',
        values: {
            name: tag.name,
            slug: tag.slug
        },
        errors: {}
    });

    useEffect(() => {

        if(formState.status === 'success') {
                
            toast({
                title: 'Success',
                description: formState.message
            });
        }

    }, [formState.status, toast, formState.message])

    return (
        <form action={formAction}>

            {formState.errors._form &&

                <Alert variant="destructive" className="mb-9">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{formState.errors._form}</AlertDescription>
                </Alert>

            }

            <div className="mb-5">
                <label htmlFor="name" className="mb-2 block font-bold">Name</label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={formState.values.name}
                    className={`${formState.errors.name ? 'border-red-500' : ''}`}/>

                    {formState.errors.name &&
                        <p className="text-sm text-red-500 mt-4">{formState.errors.name.join(', ')}</p>
                    }
            </div>
            <div className="mb-5">
                <label htmlFor="slug" className="mb-2 block font-bold">Slug</label>
                <Input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={formState.values.slug}
                    className={`${formState.errors.slug ? 'border-red-500' : ''}`}/>

                {formState.errors.slug &&
                    <p className="text-sm text-red-500 mt-4">{formState.errors.slug.join(', ')}</p>
                }

            </div>

            <Input
                type="hidden"
                name="tagId"
                defaultValue={tag.id}/>

            <div className="flex justify-end">
                <Button type="submit" variant="secondary" className={`${isPending ? 'pointer-events-none' : ''}`}>
                    {isPending ? 'Processing...' : 'Save'}
                    {isPending ? <LoaderCircle className="animate-spin"/> : ''}
                </Button>
            </div>

        </form>
    );
}