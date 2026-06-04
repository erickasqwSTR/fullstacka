/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.alterTable("usuario",(table)=>{
    table.integer("pais_id").unsigned().references("id").inTable("pais").onDelete("SET NULL");
   });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("usuario",(table)=>{table.dropColumn("pais_id");
        
    })
  
};
