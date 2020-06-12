const Joi = require('joi');
module.exports = {
	register(req, res, next) {
		const schema = {
			Email: Joi.string().email(),
			Password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
		};

		const { error, value } = Joi.validate(req.body, schema);

		if (error) {
			switch (error.details[0].context.key) {
				case 'Email':
					res.status(400).send({
						error: 'You must provide a valid email',
					});
					break;

				case 'Password':
					res.status(400).send({
						error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lowe case, upper case, numeric 
                        <br>
						2. It must be at least 8 characters length and not greater than 32 characters in length <br>` ,
						
					});
					break;
				default:
					res.status(400).send({
						error: 'Invalid registration infromation',
					});
			}
		} else {
			next();
		}
	},
};
