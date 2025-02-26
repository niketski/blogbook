interface BlogRemovePageProps {
    params: { id: string }
}


export default async function BlogRemovePage(props: BlogRemovePageProps) {
    return (
        <div>
            This is the delete page. 
            {(await props.params).id}
        </div>
    );
}