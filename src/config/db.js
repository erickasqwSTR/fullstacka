const {Model}=require("objection");
const Knex = require("knex");
const knexfile = require("../../knexfile");
const knex=Knex(knexfile.development);
Model.knex(knex);
module.exports=knex;

