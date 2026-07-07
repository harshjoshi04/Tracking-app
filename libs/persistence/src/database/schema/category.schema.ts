import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    description: varchar('description', { length: 255 }),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
