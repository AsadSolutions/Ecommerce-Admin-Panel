import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  // Check if the productId is "new"
  if (params.productId === "new") {
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm
            categories={categories}
            colors={colors}
            sizes={sizes}
            initialData={null} // Pass null for a new product
          />
        </div>
      </div>
    );
  }

  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product} // Existing product data
        />
      </div>
    </div>
  );
};

export default ProductPage;
