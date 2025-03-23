import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import { PipelineStage } from "mongoose";
import BlogModel from "@/models/blog-model";
import dbConnect from "@/lib/db-connect";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limit = 5;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const skip = (page - 1) * limit;
    const url = request.url;
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

        console.clear();
        console.log('query:', blogs[0].data.length);
        // console.log('asdadsas')
        // console.log('blogsasdasd:', blogs);
        
        const response = NextResponse.json({
            data: blogs,
            message: 'success',
        });

        response.cookies.set('banner', 'true');

        return response;

    } catch(error: unknown) {

        if(error instanceof Error) {

            return NextResponse.json({
                status: 'error',
                message: error.message
            });

        }
        
    }
    

}