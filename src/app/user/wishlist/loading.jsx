import { Skeleton } from "@/components/ui/skeleton";

const WishlistLoading = () => {
  return (
    <section className="mt-14 mx-24">
      <div className="flex gap-5">
        <div>
          <Skeleton className="h-[300px] w-[300px]" />
          <Skeleton className="w-[120px] h-[30px] mb-2 mt-2" />
          <Skeleton className="w-[90px] h-[30px]" />
        </div>
        <div>
          <Skeleton className="h-[300px] w-[300px]" />
          <Skeleton className="w-[120px] h-[30px] mb-2 mt-2" />
          <Skeleton className="w-[90px] h-[30px]" />
        </div>
        <div>
          <Skeleton className="h-[300px] w-[300px]" />
          <Skeleton className="w-[120px] h-[30px] mb-2 mt-2" />
          <Skeleton className="w-[90px] h-[30px]" />
        </div>
      </div>
    </section>
  );
};

export default WishlistLoading;
