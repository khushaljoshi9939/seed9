import { Pool } from 'pg';

/**
 * this is class to return connection
 */
export default class Connection {

    // singleton instance
    static instance = null;

    // create a new instance 
    constructor( clientObject = {} ){
        const { user = "postgres", host = "localhost", database = "postgres", password = "postgres", port = "5432"} = clientObject;

        // if instance already exists then return instance 
        if(Connection.instance != null) return Connection.instance;

        // create the instance
        Connection.instance = new Pool(
            {
                user,
                host,
                database,
                password,
                port
            }
        );

        return Connection.instance;
    }

    // close the instance 
    static async close () {
        return Connection.instance.close();
    }
}

