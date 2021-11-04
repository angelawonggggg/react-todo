import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("users");
    if(!hasTable){
        await knex.schema.createTable("users", (table)=> {
            table.increments();
            table.string("username").notNullable; 
            table.string("password_hash").notNullable;
            table.timestamps(false,true);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

