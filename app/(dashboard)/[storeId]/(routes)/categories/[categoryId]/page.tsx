import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  if (params.categoryId === "new") {
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm billboards={billboards} initialData={null} />
        </div>
      </div>
    );
  }

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
