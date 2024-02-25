import { Skeleton } from "@/components/ui/skeleton";

const AboutLoader = () => {
  return (
    <section className="mt-14 h-screen">
      <div className="ml-24 flex items-center">
        <div className="flex-1">
          <Skeleton className="w-[100px] h-[20px] mb-3" />
          <Skeleton className="w-[200px] h-[100px]" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    </section>
  );
};

export default AboutLoader;
