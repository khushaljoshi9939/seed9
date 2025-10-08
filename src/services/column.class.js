import _ from "lodash";
export default class Column {
  constructor({
    name,
    dataType,
    udtName,
    isNullable,
    isForeignKey,
    foreignKeyTable,
    foreignKeyName,
    db,
  }) {
    this.db = db;
    this.name = name;
    this.dataType = dataType;
    this.udtName = udtName; // enum values
    this.isNullable = isNullable;
    this.isForeignKey = isForeignKey;
    this.foreignKeyTable = foreignKeyTable;
    this.foreignKeyName = foreignKeyName;
    this.isEnum = false;
    this.enumValues = [];
  }

  // get name
  async name() {
    return this.name;
  }

  async loadEnums() {
    if (this.dataType == "USER-DEFINED") {
      this.isEnum = true;

      const enums = await this.db.getEnumValues(this.udtName);

      this.enumValues = enums.rows?.map((e) => {
        return e.enum_value;
      });
    }
    return;
  }

  // get info
  async getInfo() {
    return {
      name: this.name,
      dataType: this.dataType,
      udtName: this.udtName,
      isNullable: this.isNullable,
      isForeignKey: this.isForeignKey,
      foreignKeyName: this.foreignKeyName,
      foreignKeyName: this.foreignKeyName,
      isEnum: this.isEnum,
      enumType: this.enumType,
      isEnumValues: this.isEnumValues,
    };
  }

  async generateRandomEnumValue() {
    return _.sample(this.enumValues);
  }

  // static create column
  static async create({
    name,
    dataType,
    udtName,
    isNullable,
    isForeignKey,
    foreignKeyTable,
    foreignKeyName,
    db,
  }) {
    const column = new Column({
      name,
      dataType,
      udtName,
      isNullable,
      isForeignKey,
      foreignKeyTable,
      foreignKeyName,
      db,
    });

    // load enums
    await column.loadEnums();

    return column;
  }
}
