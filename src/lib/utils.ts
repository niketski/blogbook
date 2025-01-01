import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isExceededFileLimit({ file, maxMb = 10 } : { file: string, maxMb: number }) {

  // check if there's a file
  if(!file.length) {
    return false;
  }

  // Extract the Base64 portion of the data URI
  const base64String = file.split(",")[1]; // Remove the prefix (e.g., 'data:image/png;base64,')
    
  if (!base64String) {
    throw new Error("Invalid Base64 data URI");
  }

  // Calculate the size in bytes
  const byteLength = (base64String.length * 3) / 4 - (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);

  // Convert bytes to MB
  const sizeInMB = byteLength / (1024 * 1024);

  console.log(sizeInMB);

  return Math.round(sizeInMB) >= maxMb;

}


export function formatSlug(string: string) {
  let currentText = string;

  // remove special characters
  currentText = currentText.replace(/[^a-zA-Z0-9&\s]/g, '');

  // replace & to and
  currentText = currentText.replace(/&/g, 'and');

  // set string to lowercase
  currentText = currentText.toLowerCase();

  // replace whitespace with dash
  currentText = currentText.replace(/\s/g, '-');

  return currentText;
}