/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary(); // Primary key
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('emailVerifiedAt');
    table.string('profilePictureUrl');
    table.string('bannerPictureUrl');
    table.text('bio');
    table.integer('followersCount').defaultTo(0); // Track total followers count
    table.integer('followingCount').defaultTo(0); // Track total following count
    table.integer('postsCount').defaultTo(0); // Track total posts count
    table.string('token').nullable(); // Nullable token for authentication
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users'); // Drop the table on rollback
};
