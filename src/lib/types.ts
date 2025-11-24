
export interface Template {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  hint: string;
  isPremium?: boolean;
  price?: number;
  color?: string;
}
