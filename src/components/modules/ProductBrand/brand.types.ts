import z from "zod";

export const CreateBrandZodSchema = z.object({
  name: z
    .string({ error: "Brand name must be string." })
    .min(2, { error: "Brand name must have at least 2 characters" }),
  tagline: z
    .string({error: "Brand tagline name must be string." })
    .min(5, {error: "Brand tagline must have at least 5 characters" }),
  brandLogo: z.string({ error: "Brand logo must be string." }),
  isTopBrand: z.boolean({ error: "isTopBrand must be boolean." }).optional(),
  isMartizoChoice: z
    .boolean({ error: "Is Martizo Choice must be boolean." })
    .optional(),
  isFeatured: z.boolean({ error: "Is Featured must be boolean."}).optional()
});

export const UpdateBrandZodSchema = z.object({
  name: z
    .string({ error: "Brand name must be string." })
    .min(2, { error: "Brand name must have at least 2 characters" })
    .optional(),
  tagline: z
    .string({error: "Brand tagline name must be string." })
    .min(5, {error: "Brand tagline must have at least 5 characters" }).optional(),
  brandLogo: z.string({ error: "Brand logo must be string." }).optional(),
  isTopBrand: z.boolean({ error: "isTopBrand must be boolean." }).optional(),
  isMartizoChoice: z
    .boolean({ error: "isMartizoChoice must be boolean." })
    .optional(),
  isFeatured: z.boolean({ error: "Is Featured must be boolean."}).optional()
});

export interface IBrand {
  _id?: string;
  name: string;
  tagline: string;
  brandLogo: string;
  isTopBrand?: boolean;
  isMartizoChoice?: boolean;
  isFeatured?: boolean;
}
