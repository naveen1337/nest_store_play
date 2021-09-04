import knexBuilder from "./schema"
import db from "../config/db"
class Query  {
    public identification :string
    public tableName :string

    constructor(identification: string, tableName: string) {
        this.identification = identification
        this.tableName = tableName
    }
    async create(payload: any): Promise<any> {
        return payload
    }
    async insert(payload: any): Promise<any> {
        try{
            let query = await knexBuilder(this.tableName).insert(payload).toString()
            let dbResponse = await db.run(query)
            return dbResponse
        }
        catch(err){
            console.log(err)
            return false
        }
        return payload
    }
}

export default Query