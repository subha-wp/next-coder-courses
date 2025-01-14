/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .substring(0, 60); // Limit length to 60 chars
}

export async function generateUniqueSlug(
  title: string,
  prisma: any
): Promise<string> {
  let slug = generateSlug(title);
  let counter = 1;

  // Keep checking until we find a unique slug
  while (true) {
    const exists = await prisma.course.findUnique({
      where: { slug },
    });

    if (!exists) break;

    // If slug exists, append counter and try again
    slug = `${generateSlug(title)}-${counter}`;
    counter++;
  }

  return slug;
}
