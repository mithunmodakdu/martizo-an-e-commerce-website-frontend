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

export const title = "Disabled State";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const { data: productsData, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: 10,
  });

  const totalPage = productsData?.meta?.totalPage || 1;
  console.log(totalPage);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <ProductCardsContainer productsData={productsData?.data} />
      )}
      {
        totalPage > 1 && (
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

            {Array.from(
              { length: totalPage },
              (_, index) => index + 1,
            ).map((page, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setCurrentPage(page)} isActive={page === currentPage} className="cursor-pointer">
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

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
        )
      }
    </div>
  );
}
