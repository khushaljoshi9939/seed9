import Column from "./column.class";

export default class Table {

    // columns should be added here only
    constructor({ name, schema, database}){
        this.name = name;
        this.schema = schema;
        this.database = database;
        this.columns = null;
        this.loadColumns();
    }

    // load columns
    async loadColumns(){
        const tableInfo = await this.database.getTableInfo(this.schema, this.name);

        for( let column of tableInfo.rows){
            this.columns.push(new Column(
                // insert the info
            ));
        }
    }

    //get Info
    async getInfo(){
        return {
            name: this.name, schema: this.schema, columns: this.columns
        }
    }

}