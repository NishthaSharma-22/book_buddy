import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function getPastelColor(id: string) {
  const pastelColors = [
  "bg-pink-100",
  "bg-purple-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-rose-100",
  "bg-indigo-100",
  ]
  const index = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return pastelColors[index % pastelColors.length];
}