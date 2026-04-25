import { ProductDetails } from "@/components/modules/Product/ProductDetails";
import { useGetProductBySlugQuery } from "@/redux/features/products/products.api";
import Loading from "@/utils/Loading";
import { useParams } from "react-router";


export default function ProductDetailsPage() {
  console.log(useParams())
  const slug = useParams().slug;
  const {data, isLoading} = useGetProductBySlugQuery(slug);
  console.log(data)
  return (
    <div className="max-w-7xl mx-auto p-5">
      {
        isLoading? <Loading/> : <ProductDetails productData={data}/>
      }
    </div>
  );
}