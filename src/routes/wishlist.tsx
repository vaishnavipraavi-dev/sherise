import { createFileRoute } from "@tanstack/react-router";
import { WishlistPage } from "@/components/pages";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | SheRise" },
      { name: "description", content: "View your saved SheRise products." },
    ],
  }),
  component: WishlistPage,
});
