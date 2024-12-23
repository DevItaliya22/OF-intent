/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('follows', (table) => {
    table.string('id').primary(); // Unique identifier for the follow relationship
    table.string('followerId').notNullable().references('id').inTable('users').onDelete('CASCADE'); // Foreign key to users table
    table.string('followingId').notNullable().references('id').inTable('users').onDelete('CASCADE'); // Foreign key to users table
    table.timestamp('createdAt').defaultTo(knex.fn.now()); // Timestamp for when the follow relationship was created
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('follows'); // Drop the table on rollback
};
