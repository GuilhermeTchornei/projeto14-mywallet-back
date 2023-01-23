import joi from 'joi';

const transitionSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().required(),
    type: joi.string().valid("entry", "exit").required()
});

export default transitionSchema;