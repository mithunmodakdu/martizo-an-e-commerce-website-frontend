import { ProductCardsContainer } from "@/components/modules/Product/ProductCardsContainer";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import Loading from "@/utils/Loading";


export default function ProductsPage() {
  const {data: productsData, isLoading} = useGetAllProductsQuery(undefined);
  return (
    <div>
      {
        isLoading? <Loading/> : (
          <ProductCardsContainer productsData={productsData?.data}/>
        )
      }
    </div>
  );
}