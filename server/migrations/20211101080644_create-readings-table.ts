
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("readings");
    if(!hasTable) {
        await knex.schema.createTable("readings", (table)=> {
            table.increments();
            table.string("title").notNullable;
            table.string("content").notNullable;
            table.string("category");
            table.integer("user_id").unsigned().references("users.id"); // unsigned即係冇分正負
            table.timestamps(false, true);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("readings");
}

