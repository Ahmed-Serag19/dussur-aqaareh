import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCurrency(amount: number, currency = "SAR"): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatArea(area: number): string {
  return `${formatNumber(area)} م²`;
}
