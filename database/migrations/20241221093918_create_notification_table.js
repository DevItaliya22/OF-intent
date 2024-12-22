/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('notifications', (table) => {
      table.string('id').primary();  // Assuming 'id' is a string-based primary key
      table.string('userId').notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');  // Foreign key to users
      table.string('postId').notNullable();
      table.foreign('postId').references('posts.id').onDelete('CASCADE');  // Foreign key to posts
      table.string('type').notNullable();  // Type of notification (e.g., reply, like)
      table.text('message').notNullable(); // Message content
      table.timestamp('readAt');  // When the notification was read
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('notifications');
  };
  