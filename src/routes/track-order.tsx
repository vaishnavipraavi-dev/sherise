import { createFileRoute } from "@tanstack/react-router";
import { TrackOrderPage } from "@/components/pages";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Order | SheRise" },
      { name: "description", content: "Track your SheRise order status." },
    ],
  }),
  component: TrackOrderPage,
});
