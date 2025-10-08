import Column from "./column.class.js";

export default class Table {
  // columns should be added here only
  constructor({ name, schema, database }) {
    this.name = name;
    this.schema = schema;
    this.database = database;
    this.columns = [];
    this.isForeignColumns = false;
    this.foreignColumns = {};
  }

  // load columns
  async loadColumns() {
    const tableInfo = await this.database.getTableInfo(this.schema, this.name);

    for (let column of tableInfo.rows) {
      await this.columns.push(
        await Column.create({
          name: column.column_name,
          dataType: column.data_type,
          udtName: column.udt_name,
          isNullable: column.is_nullable,
          db: this.database,
        }),
      );
    }
  }

  // load foreign relation
  async loadForeignRelation() {
    const allForeignKeys = await this.database.getForegienColumns(
      this.schema,
      this.name,
    );

    if (allForeignKeys.rows.length > 0) this.isForeignColumns = true;

    // all rows
    for (let row of allForeignKeys.rows) {
      this.foreignColumns[row["column_name"]] = {
        foreign_table: row["foreign_table"],
        foreign_column: row["foreign_column"],
      };
    }
  }

  //get Info
  async getInfo() {
    return {
      name: this.name,
      schema: this.schema,
      columns: this.columns,
    };
  }

  // create new table
  static async create({ name, schema, database }) {
    const table = new Table({ name, schema, database });

    // load all the details
    await table.loadColumns();
    await table.loadForeignRelation();

    return table;
  }
}
