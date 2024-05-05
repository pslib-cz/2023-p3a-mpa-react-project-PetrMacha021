export default function Debug(...args: unknown[]) {
  if (process.env.NODE_ENV === "production") return;
  console.log(...args);
}
