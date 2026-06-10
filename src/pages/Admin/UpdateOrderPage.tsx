import { useParams } from "react-router";

const UpdateOrderPage = () => {

  const params = useParams()
  console.log(params.orderId
)
  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">
            Update order
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Order{" "}
            <span className="font-mono text-foreground/80"></span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UpdateOrderPage;
