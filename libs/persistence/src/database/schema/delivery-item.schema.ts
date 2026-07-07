import { pgTable, uuid, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';
import { deliveries } from './delivery.schema';
import { products } from './product.schema';

export const deliveryItems = pgTable('delivery_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    deliveryId: uuid('delivery_id')
        .notNull()
        .references(() => deliveries.id),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id),
    quantity: decimal('quantity', { precision: 12, scale: 2 }).notNull(),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
