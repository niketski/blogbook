import type { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel from '@/models/category-model';
 
type ResponseData = {
  message: string,
  data: object[]
}
export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {

    const categories = await CategoryModel.find({});
    
    return res.status(200).json({
      message: 'success',
      data: categories
    });
  }