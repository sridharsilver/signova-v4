# Database Conventions

## Table Naming Prefix
As requested, **ALL** future database tables created for this project must use the prefix: `sg4_`

### Example
- Correct: `sg4_users`, `sg4_orders`, `sg4_inventory`
- Incorrect: `users`, `sg-4_orders`, `sg_4_inventory`

This convention ensures all tables are nicely grouped together and prevents namespace collisions if multiple projects share the same database instance.
