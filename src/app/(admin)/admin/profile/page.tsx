import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export default function ProfilePage() {
    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">User</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User info.</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex mb-3">
                        <div>
                            <strong>Name:</strong>
                            <p>Nicole Benedict Lim</p>
                        </div>
                    </div>
                    <div className="flex mb-3">
                        <div className="md:w-1/2">
                            <strong>Username:</strong>
                            <p>annonymouskangaroo</p>
                        </div>
                        <div>
                            <strong>Email:</strong>
                            <p>limnicolebenedict3@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <strong>Address:</strong>
                        <p>0393 Quirino Avenue Don Galo Paranaque City.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}