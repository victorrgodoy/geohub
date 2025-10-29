export const formatDate = (date: string | null, fallback = "No Date") => {
  if (!date) return fallback;
  return new Date(date).toDateString();
};
