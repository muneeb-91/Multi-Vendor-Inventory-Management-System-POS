export const validate = (schema) => {
    return (req,res,next)=>{
        const { error } =
        schema.validate(req.body);
        if(error){
            throw error.details[0].message;
        }
        next();
    };
};