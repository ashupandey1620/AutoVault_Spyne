export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_PUBLIC_BASE_URL
    : import.meta.env.VITE_BASE_URL;
