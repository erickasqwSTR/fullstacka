const {Model}=require("objection");
const Pais =require("./Pais");
class Usuario extends Model{
    static get tableName(){
        return "usuario";
    }
    static get relationMappings(){
        return{
            pais:{
                relation:Model.BelongsToOneRelation,
                modelClass:Pais,
                join:{
                    from:"usuario.pais_id",//clave foranea
                    to:"pais.id"//clave primaria
                }
            }
        }
    }
}
module.exports=Usuario;