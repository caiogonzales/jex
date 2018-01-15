jx.class('Person', function () {

    var Person = function (name, birthdayYear) {
        this.name = name;
        this.birthdayYear = birthdayYear;
        console.log('My name is ' + this.name + ' and I\'m ' + this.getAge() + ' years old.');
    };

    Person.prototype.toString = function () {
        return this.constructor.name + ' : {name: ' + this.name + '}';
    };

    Person.prototype.getAge = function () {
        return new Date().getFullYear() - this.birthdayYear;
    };

    return Person;
});