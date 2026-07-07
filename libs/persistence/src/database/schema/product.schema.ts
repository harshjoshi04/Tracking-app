import { pgTable, uuid, varchar, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';
import { categories } from './category.schema';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    categoryId: uuid('category_id')
        .notNull()
        .references(() => categories.id),
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    stock: decimal('stock', { precision: 12, scale: 2 }).notNull().default('0'),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
