const Joi = require('joi');

// User validation schemas
const userSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(50),
  profileImage: Joi.string().uri().allow('', null)
});

// Point validation schemas
const pointClaimSchema = Joi.object({
  userId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message.replace(/['"]/g, '') 
      });
    }
    
    next();
  };
};

module.exports = {
  validateUser: validate(userSchema),
  validatePointClaim: validate(pointClaimSchema)
};