"use client";

import { searchProducts } from "@/lib/server-actions/product.action";
import { removeKeysFromQuery } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResult = ({ onClick }) => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const search = searchParams.get("search");

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const getProducts = await searchProducts(search);

        setProduct(JSON.parse(getProducts));
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [search, searchParams]);

  return (
    <div className="absolute top-full bg-gray-200 w-[245px] px-3 py-2">
      {isLoading ? (
        <div className="w-full py-3 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      ) : product.length > 0 ? (
        product.map((pro) => (
          <Link key={pro._id} href={`/product/${pro._id}`} onClick={onClick}>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Image
                  src={pro.imageUrl[0]}
                  alt="product"
                  width={40}
                  height={30}
                />
                <p className="text-xs">{pro.title}</p>
              </div>
              <p className="text-xs">${pro.discountedPrice}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center my-2">
          <p>No Result found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
