
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export interface SessionResponse {
    data: Session | null,
    message?: string,
}

export async function GET(): Promise<NextResponse<SessionResponse>> {

    try {
        const session = await auth();
        
        if(!session) {
            throw Error('The session has been expired or invalid.');
        }
        
        return NextResponse.json({
            data: session,
            message: 'Success.'
        });

    } catch(error: unknown) {

        if(error instanceof Error) {

            console.log(error.message);

            return NextResponse.json({
                data: null,
                message: error.message
            });
        }

        return NextResponse.json({
            data: null,
            message: 'Error fetching data.'
        });
    }
}
