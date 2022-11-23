const _ = require('lodash');

class Holiday{
    constructor(name, date){
        this.name = name;
        this.date = date;
    }

    from_today(){
        return parseInt((((((Date.parse(this.date) - Date.now())/1000))/60)/60)/24);
    }

    get_name(){
        return this.name;
    }

    get_date(){
        return this.date
    }

    get_info(){
        return `${this.name}: ${this.date}`
    }
}

let christmas = new Holiday("Christmas", '25 Dec 2022')
let holidays = [
    christmas,
    new Holiday("Easter", '09 Apr 2023'),
    new Holiday("New year", '01 Jan 2023'),
    new Holiday('Canada Day', '01 Jul 2023')
];

for (let i in holidays){
    console.log(`There are ${holidays[i].from_today()} days until ${holidays[i].get_name()}.`);
}

let random_holiday = _.sample(holidays).get_info();
console.log(random_holiday);
console.log(`Christmas is at the index ${_.findIndex(holidays, christmas)}.`);
console.log(`Canada Day is at the index ${_.findIndex(holidays, new Holiday('Canada Day', '01 Jul 2023'))}.`);
//or I could use a variable to represent canada day