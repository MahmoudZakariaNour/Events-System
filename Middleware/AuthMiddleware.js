const JWT = require("jsonwebtoken");

module.exports = (req, res, nxt) => {
	let token, decode;
	try {
		token = req.get("Authorization").split(" ")[1];
		decode = JWT.verify(token, process.env.SecretKey);
	} catch (err) {
		err.message = "Not Authorized";
		err.status = 403;
		nxt(err);
	}
	if (decode !== undefined) {
		req.role = decode.role;
		req.email = decode.email;
        req.id = decode.id;
		nxt();
	}
};
