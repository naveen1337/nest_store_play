export const sanitizeUpdateAdminInput = (payload) => {
	let updateObj = { ...payload };
	delete updateObj['password'];
	delete updateObj['created_at'];
	delete updateObj['admin_id'];
	return updateObj;
};
