import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/components/pages";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | SheRise" },
      { name: "description", content: "Complete your SheRise order with contact, address, delivery and payment details." },
    ],
  }),
  component: CheckoutPage,
});
