import { clsx, type ClassValue } from "clsx"
import { isValid } from "date-fns/isValid"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBreadCrumbLabel = (label: string) => {
  return label
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const isValidDate = (date: string | Date | null | undefined): boolean => {
  if (!date) return false;
  return isValid(new Date(date)) ? true : false
}