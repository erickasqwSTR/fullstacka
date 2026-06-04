const Joi=require("joi");
// Esquema para validar el cuerpo (body) en un PATCH
const updatePaisSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).messages({
        "string.min": "El nombre del país debe tener al menos 3 caracteres.",
        "string.max": "El nombre del país no puede exceder los 100 caracteres."
    }),
    codigo: Joi.string().length(2).messages({
        "string.length": "El código ISO debe tener exactamente 2 caracteres (Ej: EC, AR)."
    })
}).min(1); // Al menos un campo debe ser enviado para actualizar

// Esquema para validar parámetros de la URL (id)
const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "number.base": "El ID debe ser un número.",
        "number.positive": "El ID debe ser un número positivo."
    })
});

module.exports = {
    updatePaisSchema,
    idParamSchema
};