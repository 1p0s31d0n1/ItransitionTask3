class Table {
    printTable(data, rules) {
        let x = [];
        for (let j in data) {
            let i = 0;
            x.push(rules[j].reduce(function(target, key, index) {
                target[data[i++]] = key;
                return target;
            }, {}));
        }
        let i = 0;
        let table = x.reduce(function(target, key, index) {
            target[data[i++]] = key;
            return target;
        }, {})
        console.log("GAME RULES: ");
        console.table(table);
    }
}

module.exports = Table;