import { faker } from "@faker-js/faker";

// generate random data
export default class Random {
  static randomString(seed = 10) {
    return faker.string.alphanumeric(seed);
  }

  static randomWord() {
    return faker.lorem.word();
  }

  static randomText(size) {
    let str = "";
    for (let i = 0; i < size; i++) {
      str += randomWord() + " ";
    }
  }

  static randomInt() {
    return faker.number.int();
  }

  static randomFloat() {
    return faker.number.float();
  }

  static randomUUID() {
    return faker.string.uuid();
  }

  static randomTimestamp() {
    const date = new Date();

    return date.toISOString().slice(0, 19).replace("T", " ");
  }

  static randomTimestampz() {
    const date = new Date();

    return date.toISOString();
  }

  static randomDate() {
    const date = new Date();

    return date.toISOString().split("T")[0];
  }

  static randomTime() {
    const date = new Date();

    return date.toISOString().split("T")[1].split("Z")[0];
  }

  static randomJson(size = 3) {
    const randomObj = {};
    for (let i = 0; i < size; i++) {
      randomObj[randomWord()] = randomWord();
    }
    return randomObj;
  }
}
