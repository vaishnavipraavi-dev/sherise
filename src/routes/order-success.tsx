import { createFileRoute } from "@tanstack/react-router";
import { OrderSuccessPage } from "@/components/pages";

export const Route = createFileRoute("/order-success")({
  validateSearch: (search: Record<string, unknown>) => ({ order: search.order as string | undefined }),
  head: () => ({
    meta: [
      { title: "Order Confirmed | SheRise" },
      { name: "description", content: "Your SheRise order confirmation and next steps." },
    ],
  }),
  component: OrderSuccessPage,
});
