import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/components/pages";
export const Route = createFileRoute("/cart")({ head:()=>({meta:[{title:"Your Cart | SheRise"},{name:"description",content:"Review the SheRise products in your cart before checkout."},{property:"og:title",content:"Your Cart | SheRise"},{property:"og:description",content:"Review the SheRise products in your cart before checkout."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"/cart"}]}), component:CartPage });
