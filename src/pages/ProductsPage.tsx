import { ProductCardsContainer } from "@/components/modules/Product/ProductCardsContainer";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import Loading from "@/utils/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useSearchParams } from "react-router";
import ProductsFilter from "@/components/modules/Product/ProductsFilter";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || undefined;
  const selectedBrand = searchParams.get("brand") || undefined;
  const isCheckedNewArrival = searchParams.get("isNewArrival");
  const isCheckedBestSeller = searchParams.get("isBestSeller");
  const isCheckedTrending = searchParams.get("isTrending");
  const isCheckedFlashSale = searchParams.get("isFlashSale");
  const isCheckedMartizoExclusive = searchParams.get("isMartizoExclusive");
  const existedSearchTerm = searchParams.get("searchTerm");

  const { data: productsData, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: 6,
    category: selectedCategory,
    brand: selectedBrand,
    isNewArrival: isCheckedNewArrival,
    isBestSeller: isCheckedBestSeller,
    isTrending: isCheckedTrending,
    isFlashSale: isCheckedFlashSale,
    isMartizoExclusive: isCheckedMartizoExclusive,
    searchTerm: existedSearchTerm,
  });

  const totalPage = productsData?.meta?.totalPage || 1;

  return (
    <div>
      <div className="w-full px-5 flex flex-col md:flex-row gap-4 mt-10">
        <ProductsFilter />
        <div className="w-full md:w-3/4">
          {isLoading ? (
            <Loading />
          ) : (
            <ProductCardsContainer productsData={productsData?.data} />
          )}
        </div>
      </div>

      {totalPage > 1 && (
        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
