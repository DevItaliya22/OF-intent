/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.string('id').primary();  // Assuming 'id' is a string-based primary key
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
      table.integer('followersCount').defaultTo(0);
      table.integer('followingCount').defaultTo(0);
      table.integer('postsCount').defaultTo(0);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  