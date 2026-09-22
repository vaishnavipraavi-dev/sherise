import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/pages";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | SheRise" },
      { name: "description", content: "Login to your SheRise account." },
    ],
  }),
  component: LoginPage,
});
