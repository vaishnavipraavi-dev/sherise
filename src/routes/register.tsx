import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/components/pages";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register | SheRise" },
      { name: "description", content: "Create your SheRise account." },
    ],
  }),
  component: RegisterPage,
});
