import { pgTable, uuid, varchar, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';
import { deliveries } from './delivery.schema';

export const deliveryLocationHistory = pgTable('delivery_location_history', {
    id: uuid('id').defaultRandom().primaryKey(),
    deliveryId: uuid('delivery_id')
        .notNull()
        .references(() => deliveries.id),
    address: varchar('address', { length: 255 }).notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 7 }),
    longitude: decimal('longitude', { precision: 10, scale: 7 }),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
