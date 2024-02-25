import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts } from "@/lib/server-actions/product.action";
import { DeleteIcon, EditIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductTable = async () => {
  const products = await getProducts();
  return (
    <Table className="w-[1100px]">
      <TableHeader>
        <TableRow className="flex w-full items-center">
          <TableHead className="flex-1">P.id</TableHead>
          <TableHead className="flex-1">Image</TableHead>
          <TableHead className="flex-1">Title</TableHead>
          <TableHead className="flex-1">No. of Reviews</TableHead>
          <TableHead className="flex-1">Rating</TableHead>
          <TableHead className="flex-1">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length > 0 &&
          JSON.parse(products).map((product) => (
            <TableRow key={product.id} className="flex w-full items-center">
              <TableCell className="font-normal text-[10px] flex-1">
                {product._id}
              </TableCell>
              <TableCell className="flex-1">
                <Image
                  src={product.imageUrl[0]}
                  alt="Phone"
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell className="font-normal text-xs flex-1">
                {product.title}
              </TableCell>
              <TableCell className="font-normal text-xs flex-1">
                {product.numberOfReviews.length}
              </TableCell>
              <TableCell className="font-normal text-xs flex-1">
                {product.rating}
              </TableCell>
              <TableCell className="font-normal text-xs flex-1 flex gap-1">
                <Link href={`/admin/productEntry/edit/${product._id}`}>
                  <EditIcon />
                </Link>

                <DeleteIcon className="text-red-500 cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
