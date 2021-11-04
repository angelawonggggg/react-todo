import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("readings").del(); // del咗readings先好del users，因為有foreign key reference緊佢
  await knex("users").del();

  // Inserts seed entries
  let user_rows = await knex("users").insert([
    { username: "beeno", password_hash: await hashPassword("beeno") },
    { username: "teddy", password_hash: await hashPassword("teddy") },
    { username: "katie", password_hash: await hashPassword("katie") },
    { username: "angela", password_hash: await hashPassword("angela") },
  ])
  .returning('id');

  await knex("readings").insert([
    {
        user_id: user_rows[0],
        title: "Halloween au zoo",
        content:
        "Pour Halloween, certains zoos offrent des citrouilles à leurs animaux. Et c’est un grand moment de découverte… et d’amusement. Babouins, ours, lémuriens… s’en donnent à cœur joie !",
        category: "society"
    },
    {
        user_id: user_rows[0],
        title: "Tes 3 infos de la semaine : enfants chinois vaccinés",
        content:
        "Ça s’est passé entre le 22 et le 28 octobre : la Chine a commencé à vacciner les enfants contre la Covid-19. En France, on recherche 10 000 volontaires pour étudier le blob, une créature étrange. ",
        category: "environment"

    }, 
    {
        user_id: user_rows[3],
        title: "article 3", 
        content: "content3", 
        category: "testing"
    }
  ]);
}
