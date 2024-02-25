import ProductForm from "@/app/admin/_components/ProductForm";
import { getProductById } from "@/lib/server-actions/product.action";
import React from "react";

const EditProduct = async ({ params }) => {
  const productById = await getProductById(params.id);
  return (
    <div>
      <ProductForm type="Edit" data={JSON.stringify(productById)} />
    </div>
  );
};

export default EditProduct;
