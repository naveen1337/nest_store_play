import knex from 'knex';

let knexBuilder = knex({
	client: 'sqlite3',
});

export const createAdminTabe = async () => {
	try {
		let query = await knexBuilder.schema.createTable('admin', (table) => {
			table.increments('admin_id').primary();
			table.string('name');
			table.string('email').unique();
			table.string('passwoord');
			table.datetime('created_at');
		}).toString();
		console.log(query)
		return query;
	} catch (err) {
		console.log(err);
		return false;
	}
};
