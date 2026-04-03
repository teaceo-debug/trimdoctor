import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

export const PLANS: Record<
  string,
  { name: string; firstPriceEnv: string; ongoingPriceEnv: string; firstPrice: number; ongoingPrice: number }
> = {
  semaglutide_injection: {
    name: "Semaglutide Injection",
    firstPriceEnv: "STRIPE_PRICE_SEMAGLUTIDE_INJ_FIRST",
    ongoingPriceEnv: "STRIPE_PRICE_SEMAGLUTIDE_INJ_ONGOING",
    firstPrice: 179,
    ongoingPrice: 299,
  },
  semaglutide_tablets: {
    name: "Semaglutide Tablets",
    firstPriceEnv: "STRIPE_PRICE_SEMAGLUTIDE_TAB_FIRST",
    ongoingPriceEnv: "STRIPE_PRICE_SEMAGLUTIDE_TAB_ONGOING",
    firstPrice: 149,
    ongoingPrice: 249,
  },
  tirzepatide_injection: {
    name: "Tirzepatide Injection",
    firstPriceEnv: "STRIPE_PRICE_TIRZEPATIDE_FIRST",
    ongoingPriceEnv: "STRIPE_PRICE_TIRZEPATIDE_ONGOING",
    firstPrice: 249,
    ongoingPrice: 399,
  },
};
