import knex from 'knex';

let knexBuilder = knex({
	client: 'sqlite3',
});

export const createAdminTabe = async () => {
	try {
		let query = await knexBuilder.schema
			.createTable('admin', (table) => {
				table.increments('admin_id').primary();
				table.string('name').notNullable();
				table.string('email').unique().notNullable();
				table.string('password').notNullable();
				table
					.datetime('created_at', { precision: 6 })
					.defaultTo(knexBuilder.fn.now(6))
					.notNullable();
			})
			.toString();
		return query;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export default knexBuilder;
