import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  // Check if the sizeId is "new"
  if (params.sizeId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeForm initialData={null} />
        </div>
      </div>
    );
  }

  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  if (!size) {
    return <div>Size not found</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
