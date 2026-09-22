import { createFileRoute } from "@tanstack/react-router";
import { AccountPage } from "@/components/pages";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | SheRise" },
      { name: "description", content: "View your SheRise account dashboard." },
    ],
  }),
  component: AccountPage,
});
