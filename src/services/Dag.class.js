export default class Dag {
    constructor(tables, size){
        // array
        this.tables = tables;
        this.tableSize = size
    }

    // CREATE THE DAG
    async create(){
        this.graph = {};

        for(let table in this.tables ){
            this.graph[table] = [];
            for(let joinedTable of [...(this.tables[table].foreignTableNames)]){
                this.graph[table].push(joinedTable);
            }
        }
    }

    // sort 
    async topologicalSort(){

        const inDegree = this.tables.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {});

        // setting indegree
        for(let key in this.graph){
            for( let table in this.graph[key]){
                inDegree[table]++;
            }
        }

        // store inDegree
        const queue = [];

        // seed in inDegree
        for(let table of Object.keys(inDegree)){
            if(inDegree[table] == 0) 
                queue.push(table);
        }

        const result = [];
        while(queue.size() != 0 ){
            let table = queue.shift();
            result.push(table);

            for(let adjTable of graph[table]){
                inDegree[adjTable]--;

                if(inDegree[adjTable] == 0)
                    queue.push(adjTable);
            }
        }

    }
}