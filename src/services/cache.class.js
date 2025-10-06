import NodeCache from "node-cache";

export default class Cache {

    static instance = null;

    constructor (){
        if(Cache.instance) return Cache.instance;
        
        this.cache = new NodeCache();
        Cache.instance = this;
    }

    // wrapper methods
    set(key, value, ttl) {
        return this.cache.set(key, JSON.stringify(value), ttl);
    }

    get(key) {
        return JSON.parse(this.cache.get(key) || "{}");
    }

    del(key) {
        return this.cache.del(key);
    }
}