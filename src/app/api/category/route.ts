import dbConnect from "@/lib/db-connect";
import CategoryModel from "@/models/category-model"

export async function GET() {
  await dbConnect();
  
  const categories = await CategoryModel.find({});

  return Response.json(categories, {
    status: 200,
  });
}