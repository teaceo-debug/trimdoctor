import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  uuid,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

// ── Enums ──────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", [
  "patient",
  "provider",
  "admin",
]);

export const assessmentStatusEnum = pgEnum("assessment_status", [
  "pending",
  "approved",
  "denied",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "past_due",
  "canceled",
  "trialing",
]);

export const shipmentStatusEnum = pgEnum("shipment_status", [
  "pending",
  "compounding",
  "shipped",
  "in_transit",
  "delivered",
]);

export const messageSenderEnum = pgEnum("message_sender", [
  "patient",
  "provider",
  "system",
]);

export const referralStatusEnum = pgEnum("referral_status", [
  "pending",
  "completed",
  "expired",
]);

// ── Users ──────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  role: userRoleEnum("role").notNull().default("patient"),
  stripeCustomerId: text("stripe_customer_id"),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ── NextAuth tables ────────────────────────────────────

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

// ── Assessments ────────────────────────────────────────

export const assessments = pgTable("assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  state: text("state"),
  dateOfBirth: text("date_of_birth"),
  sex: text("sex"),
  heightInches: integer("height_inches"),
  weight: integer("weight"),
  goalWeight: integer("goal_weight"),
  medication: text("medication").notNull(),
  conditions: jsonb("conditions").$type<string[]>().default([]),
  currentMedications: text("current_medications"),
  previousGlp1: boolean("previous_glp1").default(false),
  status: assessmentStatusEnum("status").notNull().default("pending"),
  physicianNotes: text("physician_notes"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ── Subscriptions ──────────────────────────────────────

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id"),
  plan: text("plan").notNull(),
  status: subscriptionStatusEnum("status").notNull().default("active"),
  currentPeriodStart: timestamp("current_period_start", { mode: "date" }),
  currentPeriodEnd: timestamp("current_period_end", { mode: "date" }),
  canceledAt: timestamp("canceled_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// ── Shipments ──────────────────────────────────────────

export const shipments = pgTable("shipments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  trackingNumber: text("tracking_number"),
  carrier: text("carrier"),
  pharmacy: text("pharmacy").default("Belmar Pharma Solutions"),
  medication: text("medication"),
  status: shipmentStatusEnum("status").notNull().default("pending"),
  shippedAt: timestamp("shipped_at", { mode: "date" }),
  deliveredAt: timestamp("delivered_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// ── Messages ───────────────────────────────────────────

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sender: messageSenderEnum("sender").notNull(),
  body: text("body").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// ── Referrals ──────────────────────────────────────────

export const referrals = pgTable("referrals", {
  id: uuid("id").primaryKey().defaultRandom(),
  referrerId: uuid("referrer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  refereeEmail: text("referee_email").notNull(),
  refereeId: uuid("referee_id").references(() => users.id),
  code: text("code").notNull().unique(),
  status: referralStatusEnum("status").notNull().default("pending"),
  rewardAmount: integer("reward_amount").default(5000), // cents
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// ── Weight Logs ────────────────────────────────────────

export const weightLogs = pgTable("weight_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  weight: integer("weight").notNull(),
  note: text("note"),
  loggedAt: timestamp("logged_at", { mode: "date" }).notNull().defaultNow(),
});
