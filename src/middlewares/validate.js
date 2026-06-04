const validate = (schema, property) => {
    return (req, res, next) => {
        // property puede ser 'body' o 'params'
        const { error } = schema.validate(req[property], { abortEarly: false }); 

        if (error) {
            // Recolectamos todos los errores detectados por Joi
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ 
                mensaje: "Error de validación de datos", 
                errores: errorMessages 
            });
        }
        
        next(); // Si todo está bien, continúa al controlador
    };
};
module.exports = validate;