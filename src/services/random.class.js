import { faker } from '@faker-js/faker';

// generate random data
export default class Random {
    static randomString(seed = 10){
        return faker.string.alphanumeric(seed);
    }

    static randomInt() {
        return faker.number.int();
    }   

    static randomUUID() {
        return faker.string.uuid()
    }
}