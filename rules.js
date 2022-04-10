class Rules {
    constructor(moves) {
        this.moves = moves;
    }

    createRules() {
        let count = (this.moves.length-1)/2;
        let table = [];
        let s = ["Draw", ..."Lose ".repeat(count).slice(0, -1).split(" "),
                ..."Win ".repeat(count).slice(0, -1).split(" ")];
        for (let i in this.moves) {
            table.push(s);
            s = [].concat(s.slice(-1), s.slice(0,-1));
        }
        return table;
    }
}

module.exports = Rules;