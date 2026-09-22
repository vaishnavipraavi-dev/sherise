import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/pages";
import { articles } from "@/data/site";
export const Route = createFileRoute("/blog/$slug")({
 head:({params})=>{const a=articles.find(x=>x.slug===params.slug);const title=a?`${a.title} | SheRise`:`Article Not Found | SheRise`;const desc=a?.excerpt??"This SheRise article is not available.";return {meta:[{title},{name:"description",content:desc},{property:"og:title",content:title},{property:"og:description",content:desc},{property:"og:type",content:"article"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:`/blog/${params.slug}`}]};},
 component:()=>{const {slug}=Route.useParams();return <ArticlePage slug={slug}/>;}
});
