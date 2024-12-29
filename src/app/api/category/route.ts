import CategoryModel from "@/models/category-model"

export async function GET(request: Request, response: Response) {
  const categories = await CategoryModel.find({});

  return Response.json(categories, {
    status: 200,
  });
}