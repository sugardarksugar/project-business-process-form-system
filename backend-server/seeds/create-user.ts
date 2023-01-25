import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {

    await knex("user").del();

    let password = await hashPassword("123456")

    await knex("user").insert([
        {
            id: 1,
            email: 'admin@gmail.com',
            hash_password: password,
            is_admin: true
        },
        {
            id: 2,
            email: 'a@gmail.com',
            hash_password: password,
            is_admin: false
        },
        {
            id: 3,
            email: 'b@gmail.com',
            hash_password: password,
            is_admin: false
        },
        {
            id: 4,
            email: 'c@gmail.com',
            hash_password: password,
            is_admin: false
        },
        {
            id: 5,
            email: 'd@gmail.com',
            hash_password: password,
            is_admin: false
        },
        {
            id: 6,
            email: 'e@gmail.com',
            hash_password: password,
            is_admin: false
        },
        {
            id: 7,
            email: 'f@gmail.com',
            hash_password: password,
            is_admin: false
        },
    ]);
};
