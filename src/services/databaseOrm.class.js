/**
 * this is database orm
 */
export default class databaseOrm {
  constructor(pool) {
    this.pool = pool;
  }

  // get get schemas
  async getSchemas() {
    return this.pool.query(
      `
              SELECT nspname
                FROM pg_namespace
                WHERE nspname NOT IN ('pg_catalog', 'information_schema') and nspname not like 'pg%'
                ORDER BY nspname;
            `,
    );
  }

  // get all tables of schema
  // if nothing is passed then default is public
  async getTables(schema = "public") {
    return this.pool.query(
      `
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = '${schema}'
                AND table_type = 'BASE TABLE';
            `,
    );
  }

  // get enum values
  async getEnumValues(enumType) {
    return this.pool.query(
      `
                SELECT  
                    t.typname AS enum_type,  
                    e.enumlabel AS enum_value  
                FROM pg_type t
                JOIN pg_enum e ON t.oid = e.enumtypid
                JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
                where t.typname = '${enumType}'
                ORDER BY t.typname, e.enumsortorder;
            `,
    );
  }

  async getForegienColumns(schema, table) {
    return this.pool.query(
      `
                SELECT
                    kcu.column_name,
                    ccu.table_name AS foreign_table,
                    ccu.column_name AS foreign_column
                FROM information_schema.table_constraints tc
                JOIN information_schema.key_column_usage kcu
                    ON tc.constraint_name = kcu.constraint_name
                AND tc.table_schema = kcu.table_schema
                JOIN information_schema.constraint_column_usage ccu
                    ON ccu.constraint_name = tc.constraint_name
                WHERE tc.constraint_type = 'FOREIGN KEY'
                AND tc.table_schema = '${schema}'
                AND tc.table_name = '${table}';
            `,
    );
  }

  async getTableInfo(schema, table) {
    return this.pool.query(
      `
                SELECT 
                    column_name, 
                    udt_name,
                    data_type, 
                    character_maximum_length, 
                    is_nullable, 
                    column_default
                FROM information_schema.columns
                WHERE table_name = '${table}' and table_schema = '${schema}' ;
            `,
    );
  }

  async insertBatchData(data) {}
}
