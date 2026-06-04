const saludar= (req, res) =>{
    res.json({
        mensaje:"Hola chiques",
        fecha:"07/05/2026"
    });
}
const suma=(req,res)=>{
    s=5+3;
    res.json({
        respuesta:"El resultado es: "+s

    });
}
module.exports={
    saludar, suma
};