import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages";
export const Route = createFileRoute("/")({
 head:()=>({meta:[{title:"SheRise | Comfortable Period Care & Sanitary Pads"},{name:"description",content:"Discover SheRise sanitary pads, thoughtfully designed for softer, easier and more confident period days."},{property:"og:title",content:"SheRise | Comfortable Period Care & Sanitary Pads"},{property:"og:description",content:"Thoughtfully designed period care for softer, easier and more confident days."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"/"}]}), component:HomePage });
