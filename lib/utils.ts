import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomImage = (
  width: number = 800,
  height: number = 600,
  category?: string
) => {
  const categories = ["technology", "business", "science", "nature", "people"];
  const selectedCategory =
    category || categories[Math.floor(Math.random() * categories.length)];
  return `https://picsum.photos/${width}/${height}?random=${Math.random()}&category=${selectedCategory}`;
};
