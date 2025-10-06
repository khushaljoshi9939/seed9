// import all the things 

import Connection  from './database.connection';
import databaseOrm from './databaseOrm.class'
import Table from './table.class';

// seeder class will be main start of the program all the algos will be written here
export default class Seeder {

    // build all the details 
    constructor({ pgDetails = { }, schema = [] }){
        this.pgDetails = pgDetails;
        this.schemas = schema || ['public'];
        this.connect = new Connection({
            user: pgDetails.user,
            host: pgDetails.host,
            database: pgDetails.database,
            password: pgDetails.password,
            port: pgDetails.port
        })
        this.database= new databaseOrm(this.connect);
        this.tables = null
    }

    // load all the details
    async build(){
        for(let schema of schemas){

            // get all tables
            const { rows: allTables } = await this.database.getTables(schema);

            // get foreign keys 
            /** */

            // let all the tables
            for(let table of allTables){
                this.addTable(new Table({
                    name: table.table_name,
                    schema,
                    database: this.database
                }))
            }
        }
    }

    // add table 
    async addTable(table){
        return this.tables.push(table);
    }

    async run (){
        try {

        }
        catch(error){
            if(this.connect) this.connect.close()
            console.log(error);
        }

    }
}