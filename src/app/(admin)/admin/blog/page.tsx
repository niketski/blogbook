export default async function BlogsPage() {

    const response = new Promise((res) => {

        setTimeout(() => {
            res('loaded');
        }, 5000);

    });

    const data = await response;

    console.log(data);

    return (
        <div>
            This is blog page
        </div>
    );
}