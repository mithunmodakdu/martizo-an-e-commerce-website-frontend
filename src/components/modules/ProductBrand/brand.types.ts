import z from "zod";

export const CreateBrandZodSchema = z.object({
  name: z
    .string({ error: "Brand name must be string." })
    .min(2, { error: "Brand name must have at least 2 characters" }),
  tagline: z
    .string({error: "Brand tagline name must be string." })
    .min(5, {error: "Brand tagline must have at least 5 characters" }),
  totalProducts: z.number({error: "Total Products must be integer number." }).int().min(0),
  isTopBrand: z.boolean({ error: "isTopBrand must be boolean." }).optional(),
  isMartizoChoice: z
    .boolean({ error: "Is Martizo Choice must be boolean." })
    .optional(),
  isFeatured: z.boolean({ error: "Is Featured must be boolean."}).optional(),
  brandLogo: z.string({ error: "Brand logo must be string." }),
});

export const UpdateBrandZodSchema = z.object({
  name: z
    .string({ error: "Brand name must be string." })
    .min(2, { error: "Brand name must have at least 2 characters" })
    .optional(),
  tagline: z
    .string({error: "Brand tagline name must be string." })
    .min(5, {error: "Brand tagline must have at least 5 characters" }).optional(),
  totalProducts: z.number().int().min(0).optional(),
  isTopBrand: z.boolean({ error: "isTopBrand must be boolean." }).optional(),
  isMartizoChoice: z
    .boolean({ error: "isMartizoChoice must be boolean." })
    .optional(),
  isFeatured: z.boolean({ error: "Is Featured must be boolean."}).optional(),
  brandLogo: z.string({ error: "Brand logo must be string." }).optional()
});

export interface IBrand {
  _id?: string;
  name: string;
  slug?: string;
  tagline: string;
  totalProducts: number;
  isTopBrand?: boolean;
  isMartizoChoice?: boolean;
  isFeatured?: boolean;
  brandLogo: string;
}
