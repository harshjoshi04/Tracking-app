import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const authOtps = pgTable('auth_otps', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    mobile: varchar('mobile', { length: 20 }),
    purpose: varchar('purpose', { length: 50 }).notNull(),
    otpHash: varchar('otp_hash', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    consumedAt: timestamp('consumed_at'),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
