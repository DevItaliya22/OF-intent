/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
      table.string('id').primary(); // Assuming 'id' is a string-based primary key
      table.string('userId').notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');  // Foreign key to users
      table.text('text').notNullable();
      table.string('imageUrl');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
      table.integer('likesCount').defaultTo(0);
      table.integer('commentsCount').defaultTo(0);
      table.string("isCommentOnPostId").defaultTo("");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
  };
  