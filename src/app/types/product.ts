// types/product.ts
export interface Product {
  _id?: string;

  /* required text fields */
  name: string;
  description: string;
  shortDescription: string; // ✨ fixed spelling + lower‑case S

  /* numbers */
  price: number;
  discount?: number; // often optional

  /* relations */
  categoryId: string; // back‑end stores the ObjectID
  brandId: string; // <-- add if you use brands

  /* media */
  images?: string[]; // array of file names

  /* flags */
  isFeatured: boolean;
  isNewProduct: boolean;
}
