import { Layout } from "@/components/store";
import {
  AccountPage,
  ArticlePage,
  BlogPage,
  CartPage,
  CheckoutPage,
  ContactPage,
  ErrorStatePage,
  FaqPage,
  GuidePage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OrdersPage,
  PolicyPage,
  ProductPage,
  RegisterPage,
  ShopPage,
  StoryPage,
  TrackOrderPage,
  WhyPage,
  WishlistPage,
} from "@/components/pages";
import { RouterProvider, usePathname } from "@/lib/router";

function Routes() {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, "") || "/";

  if (path === "/") return <HomePage />;
  if (path === "/shop") return <ShopPage />;
  if (path === "/product/sherise-sanitary-pads") return <ProductPage />;
  if (path === "/cart") return <CartPage />;
  if (path === "/checkout") return <CheckoutPage />;
  if (path === "/order-success") return <OrderSuccessPage />;
  if (path === "/track-order") return <TrackOrderPage />;
  if (path === "/wishlist") return <WishlistPage />;
  if (path === "/login") return <LoginPage />;
  if (path === "/register") return <RegisterPage />;
  if (path === "/account") return <AccountPage />;
  if (path === "/account/orders") return <OrdersPage />;
  if (path === "/why-sherise") return <WhyPage />;
  if (path === "/our-story") return <StoryPage />;
  if (path === "/period-guide") return <GuidePage />;
  if (path === "/blog") return <BlogPage />;
  if (path.startsWith("/blog/")) return <ArticlePage slug={decodeURIComponent(path.slice(6))} />;
  if (path === "/faq") return <FaqPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/privacy-policy") return <PolicyPage title="Privacy Policy" intro="How information will be handled when SheRise services go live." />;
  if (path === "/shipping-returns") return <PolicyPage title="Shipping & Returns" intro="Delivery, hygiene-product returns and refund details will be confirmed before launch." />;
  if (path === "/terms") return <PolicyPage title="Terms & Conditions" intro="The terms that will guide use of the SheRise website and store." />;
  if (path === "/payment-failed") return <ErrorStatePage type="payment" />;

  return <ErrorStatePage type="404" />;
}

export default function App() {
  return (
    <RouterProvider>
      <Layout>
        <Routes />
      </Layout>
    </RouterProvider>
  );
}
