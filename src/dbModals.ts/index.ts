class Query  {
    constructor(identification: string, tableName: string) {
        this.identification = identification
        this.tableName = tableName
    }
    create(payload: any): any {
        return payload
    }
}