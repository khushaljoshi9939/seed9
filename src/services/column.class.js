export default class Column {
    constructor ({ name, dataType, udtName, isNullable, isForeignKey, foreignKeyTable, foreignKeyName, isEnum, enumType, enumValues}) {

        this.name = name;
        this.dataType = dataType;
        this.udtName = udtName;
        this.isNullable = isNullable;
        this.isForeignKey = isForeignKey;
        this.foreignKeyTable = foreignKeyTable;
        this.foreignKeyName = foreignKeyName;
        this.isEnum = isEnum || false;
        this.enumType = enumType ||'';
        this.isEnumValues = enumValues || [];

    }

    // get name
    async name(){
        return this.name;
    }

    // get info
    async getInfo(){
        return {
            name: this.name,
            dataType: this.dataType,
            udtName: this.udtName,
            isNullable: this.isNullable,
            isForeignKey: this.isForeignKey,
            foreignKeyName: this.foreignKeyName,
            foreignKeyName: this.foreignKeyName,
            isEnum: this.isEnum,
            enumType: this.enumType ,
            isEnumValues: this.isEnumValues,
        }
    }
}