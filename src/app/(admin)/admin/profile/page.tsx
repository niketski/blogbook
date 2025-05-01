import { auth } from "@/lib/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import UserModel from "@/models/user-model";

export default async function ProfilePage() {
    const session = await auth();
    const userId = session && session.user ? session.user.id : null;
    const user = await UserModel.findById({ _id: userId });

    return (
        <div>
            <h1 className="font-bold text-4xl mb-10">User</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User info.</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="md:flex mb-3">
                        <div>
                            <strong>Name:</strong>
                            <p>{user?.name}</p>
                        </div>
                    </div>
                    <div className="md:flex">
                        <div className="md:w-1/2 mb-3">
                            <strong>Username:</strong>
                            <p>{user?.username}</p>
                        </div>
                        <div className="md:w-1/2 mb-3">
                            <strong>Email:</strong>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    <div>
                        <strong>Address:</strong>
                        <p>{user?.address}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}