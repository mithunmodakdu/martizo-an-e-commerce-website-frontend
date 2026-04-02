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

  const { data: productsData, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: 10,
    category: selectedCategory,
    brand: selectedBrand,
    isNewArrival: isCheckedNewArrival,
    isBestSeller: isCheckedBestSeller,
    isTrending: isCheckedTrending,
  });

  console.log(productsData);

  const totalPage = productsData?.meta?.totalPage || 1;

  return (
    <div>
      <div className="w-full flex justify-center items-center mt-10">
        <ProductsFilter />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <ProductCardsContainer productsData={productsData?.data} />
      )}

      {totalPage > 1 && (
        <div>
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
