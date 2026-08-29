import { axiosClient } from "./axiosClient.js";

// Used for render wake-up call for free tier
export const pingBackend = () => axiosClient.get("/health").catch(() => {});