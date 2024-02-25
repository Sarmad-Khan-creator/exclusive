"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchResult from "./SearchResult";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const delayDebounce = () => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: "search",
        });

        router.push(newUrl, { scroll: false });
      }
    };

    delayDebounce();
  }, [search, router, searchParams, pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  const removeKey = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: "search",
    });

    router.push(newUrl, { scroll: false });

    setTimeout(() => {
      setSearch("");
      setIsOpen(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (!isOpen) {
      setIsOpen(true);
    }

    if (e.target.value === "" && isOpen) {
      setIsOpen(false);
    }
  };
  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="bg-[#F5F5F5] rounded-sm w-[243px] h-[45px] pl-5 py-[7px] pr-[12px] flex items-center gap-2">
        <Input
          type="text"
          placeholder="what are you looking for?"
          className="text-xs h-full bg-[#F5F5F5] focus-visible:ring-0 border-none"
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <SearchIcon />
      </div>
      {isOpen && <SearchResult onClick={removeKey} />}
    </div>
  );
};

export default Search;
