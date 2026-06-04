const {Model}=require("objection");
class Pais extends Model{
    static get tableName(){
        return "pais";
    }
}
module.exports=Pais;