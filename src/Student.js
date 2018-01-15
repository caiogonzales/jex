jx.class('Student', function () {
    var Person = jx.use('Person');

    var Student = function (name, birthdayYear) {
        Person.call(this, name, birthdayYear);
    };

    Student.prototype = jx.extends(Person.prototype);
    Student.prototype.constructor = Student;

    return Student;
})