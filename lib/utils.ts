import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
  
export const changeDate =(date:Date)=>{
  const result = formatDistanceToNow(new Date(date), { addSuffix: true });
 return result;
}


