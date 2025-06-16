import { NextResponse, NextRequest } from "next/server";
import { PipelineStage } from "mongoose";
import BlogModel from "@/models/blog-model";
import { BlogResult } from "@/app/(admin)/admin/blog/_components/blog-table";

export interface BlogGetResponse {
    data?: BlogResult[],
    metaData?: { page: number, pages: number, total: number },
    status: 'success' | 'error' | 'idle',
    message: string
}

export async function GET(request: NextRequest): Promise<NextResponse<BlogGetResponse>> {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) :  5;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip') as string) : (page - 1) * limit;
    const query: { [key: string]: string | object } = {};

    try {

        // generate query dynamically based on search params
        for(const [key, value] of searchParams) {

            if(value && value !== 'default') {
                switch (key) { 

                    case 'category':

                        query['categoryData'] = { $elemMatch: { slug: value } };

                    break;

                    case 'tag':

                        query['tagsData'] = { $elemMatch: { slug: value } };

                    break;

                    case 'status':

                        query['status'] = value;

                    break;

                    case 'search':

                        query['title'] = { $regex: value, $options: 'i' };

                    break;
                }
            }

        }

        const piplineStages: PipelineStage[] = [
            // left join categories data
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
             // left join tags data
            {
                $lookup: {
                    from: 'tags',
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tagsData'
                }
            },
            {
                $match: query
            },
            {
                $facet: {
                    metaData: [
                        { $count: 'total' },
                        { $addFields: { page, pages: { $ceil: {  $divide: ['$total', limit] } } } }
                    ],
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limit }
                    ]
                }
            }
        ];

        

        const blogs = await BlogModel.aggregate(piplineStages);
        const metaData = blogs[0].metaData.length ? blogs[0].metaData[0] : undefined;
        const data = blogs[0].data.length ? blogs[0].data : [];

        const responseData: BlogGetResponse = {
            data,
            metaData,
            status: 'success',
            message: 'Blogs fetched successfully!'
        };

        const response = NextResponse.json(responseData);

        response.headers.set('status', '200');

        return response;

    } catch(error: unknown) {

        if(error instanceof Error) {

            const errorResponse: BlogGetResponse = {
                status: 'error',
                message: error.message
            };

            return NextResponse.json(errorResponse);

        }

        const errorResponse: BlogGetResponse = {
            status: 'error',
            message: 'An unexpected error occurred!'
        };

        return NextResponse.json(errorResponse);
        
    }
    

}