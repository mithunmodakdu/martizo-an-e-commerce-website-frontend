import z from "zod";

export interface ICategory {
  _id?: string;
  name?: string;
  parent?: string | null;
  icon?: string;
}

export const CreateCategoryZodSchema = z.object({
  name: z
    .string({ error: "Category name must be string" })
    .min(2, { error: "Category name must be of at least 2 characters" }),
  slug: z
    .string()
    .min(3, { error: "Category slug must be of at least 3 characters" })
    .optional(),
  parent: z.union([z.string(), z.null()], {error:"Parent Category must be string or null"}).optional(),
  icon: z.string().optional(),
});

export const UpdateCategoryZodSchema = z.object({
  name: z
    .string({ error: "Category name must be string" })
    .min(2, { error: "Category name must be of at least 2 characters" })
    .optional(),
  slug: z
    .string()
    .min(3, { error: "Category slug must be of at least 3 characters" })
    .optional(),
  parent: z.union([z.string(), z.null()], {error:"Parent Category must be string or null"}).optional(),
  icon: z.string().optional(),
});
