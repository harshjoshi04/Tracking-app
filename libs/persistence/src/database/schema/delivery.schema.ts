import {
    pgTable,
    uuid,
    varchar,
    boolean,
    timestamp,
    decimal,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const deliveries = pgTable('deliveries', {
    id: uuid('id').defaultRandom().primaryKey(),
    trackingId: varchar('tracking_id', { length: 100 }).notNull().unique(),
    customerId: uuid('customer_id')
        .notNull()
        .references(() => users.id),
    driverId: uuid('driver_id').references(() => users.id),
    pickUpAddress: varchar('pick_up_address', { length: 255 }).notNull(),
    pickUpLatitude: decimal('pick_up_latitude', { precision: 10, scale: 7 }),
    pickUpLongitude: decimal('pick_up_longitude', { precision: 10, scale: 7 }),
    dropAddress: varchar('drop_address', { length: 255 }).notNull(),
    dropLatitude: decimal('drop_latitude', { precision: 10, scale: 7 }),
    dropLongitude: decimal('drop_longitude', { precision: 10, scale: 7 }),
    status: varchar('status', { length: 50 }).notNull(),
    driverAssignedAt: timestamp('driver_assigned_at'),
    deliveredAt: timestamp('delivered_at'),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => users.id),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
