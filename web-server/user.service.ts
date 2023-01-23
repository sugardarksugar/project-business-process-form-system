export class UserService {
  constructor(public knex: knex) {}

  table() {
    return this.knex("user");
  }
}
