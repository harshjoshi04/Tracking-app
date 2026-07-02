import {
    pgTable,
    uuid,
    varchar,
    boolean,
    timestamp,
} from 'drizzle-orm/pg-core';
import { roles } from './role.schema';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    roleId: uuid('role_id')
        .notNull()
        .references(() => roles.id),

    name: varchar('name', { length: 100 }).notNull(),

    email: varchar('email', { length: 255 })
        .notNull()
        .unique(),
    address: varchar('address', { length: 255 }),
    mobile: varchar('mobile', { length: 20 }),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
