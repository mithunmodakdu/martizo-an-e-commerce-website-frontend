import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/features/users.api";
import { CreateReviewForm } from "./CreateReviewForm";


interface ReviewsSectionProps {
  productId: string;
}

export const ReviewsSection = () =>{
  const [open, setOpen] = useState(false);
  const {data: meData} = useGetMeQuery(undefined);
  const isAuthenticated = meData?.data?.email;

  return (
    <section id="reviews" className="space-y-5 bg-muted-foreground p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Ratings & Reviews
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              disabled={!isAuthenticated}
              title={!isAuthenticated ? "Sign in to write a review" : undefined}
            >
              Write a review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
                        
            <CreateReviewForm/>

          </DialogContent>
        </Dialog>
      </div>


    </section>
  );
}
