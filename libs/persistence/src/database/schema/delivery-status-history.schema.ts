import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { deliveries } from './delivery.schema';

export const deliveryStatusHistory = pgTable('delivery_status_history', {
    id: uuid('id').defaultRandom().primaryKey(),
    deliveryId: uuid('delivery_id')
        .notNull()
        .references(() => deliveries.id),
    status: varchar('status', { length: 50 }).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
