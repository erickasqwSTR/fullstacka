const {Model}=require("objection");
const Knex = require("knex");
const knexfile = require("../../knexfile");
const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexfile[environment]);
Model.knex(knex);
module.exports=knex;

