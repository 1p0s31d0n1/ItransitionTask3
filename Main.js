const readlineSync = require("readline-sync");
const Rules = require("./rules");
const Table = require("./table");
const Hmac = require("./Hmac");

class Main {

    isDataWrong(data) {
        if (!(data.length % 2 !== 0 && data.length > 1))
            return true;
        for (let i in data)
            if (i != data.lastIndexOf(data[i]))
                return true;
        return false;
    }

    getMenu(data) {
        for (let i in data)
            console.log(`${+i + 1} - ${data[i]}`);
        console.log(`0 - Exit\n? - help`);
    }

    askQuestion(query) {
        return readlineSync.question(query).replace(/ + /g,' ').trim().split(" ");
    }

    readData() {
        let data = [];
        for (let i = 2; i < process.argv.length; i++)
            data[i-2] = process.argv[i];

        while (this.isDataWrong(data)) {
            console.log("Wrong data. You must enter odd number(more then 1) of non-repeating values. Example: ")
            console.log("rock paper scissors");
            data = this.askQuestion(`Try enter data again:\n`);
        }
        return data;
    }

    isKeyValid(userKey, data) {
        if (userKey != "?" && !(userKey >= '0' && userKey <= data)) {
            console.log('Wrong move!');
            return false;
        }
        return true;
    }

    start() {
        let userKey;
        let data = this.readData();
        while (userKey != 0) {
            let move = data[Math.floor(Math.random()*data.length)];

            let rules = new Rules(data).createRules(),
                table = new Table();

            let hash = new Hmac(move);
            console.log("HMAC-sha256:" + hash.generateHMAC());
            this.getMenu(data);
            userKey = this.askQuestion(`Enter your move:`);
            if (this.isKeyValid(userKey,data.length))
                if (userKey == "?")
                    table.printTable(data,rules);
                else if (userKey != 0) {
                  console.log(`Your move: ${data[userKey-1]}`);
                  console.log(`Computer move: ${move}`);
                  console.log(rules[userKey - 1][data.lastIndexOf(move)]);
                  console.log(`HMAC key: ${hash.key}`);
                  console.log("NEXT GAME");
                }
        }
    }
}

let main = new Main();
main.start();