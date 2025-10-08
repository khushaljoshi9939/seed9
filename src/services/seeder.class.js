// import all the things

import Connection from "./database.connection.js";
import databaseOrm from "./databaseOrm.class.js";
import Table from "./table.class.js";

// seeder class will be main start of the program all the algos will be written here
export default class Seeder {
  // build all the details
  constructor({ pgDetails = {}, schema = [] }) {
    this.pgDetails = pgDetails;
    this.schemas = schema || ["public"];
    this.connect = new Connection({
      user: pgDetails.user,
      host: pgDetails.host,
      database: pgDetails.database,
      password: pgDetails.password,
      port: pgDetails.port,
    });
    this.database = new databaseOrm(this.connect);
    this.tables = [];
  }

  // load all the details
  async build() {
    for (let schema of this.schemas) {
      // get all tables
      const { rows: allTables } = await this.database.getTables(schema);

      for (let table of allTables) {
        await this.addTable(
          await Table.create({
            name: table.table_name,
            schema,
            database: this.database,
          }),
        );
      }
    }
  }

  // add table
  async addTable(table) {
    return this.tables.push(table);
  }

  // this will initialize all the tables
  async run() {
    try {
      await this.build();
    } catch (error) {
      console.log(error);
      console.log("closing the connection");
    } finally {
      if (this.connect) await this.connect.end();
    }
  }
}
