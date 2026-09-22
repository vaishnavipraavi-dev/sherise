import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/components/pages";

export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [
      { title: "My Orders | SheRise" },
      { name: "description", content: "View your SheRise order history." },
    ],
  }),
  component: OrdersPage,
});
