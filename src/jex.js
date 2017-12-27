window.jx = {
    class: function(name, definition){
        if(this.$classMap == null){
            this.$classMap = {};
        };

        if(!(/^[a-zA-Z][a-zA-Z0-9]+$/).test(name)){
            throw 'ArgumentError: The class name must be an alphanumeric string beginning with a letter.';
        };

        if (typeof (definition) != 'function'){
            throw 'TypeError: The class definition must be a function.';
        };

        this.$classMap[name] = definition;
    },

    use: function(name){
        if (this.$classMap == null) {
            throw 'Error: Class definition not found.';
        };

        var definition = this.$classMap[name];

        if (definition == null) {
            throw 'Error: Class definition not found.';
        };

        var constructor = definition();

        if (typeof (constructor) != 'function') {
            throw 'Error: The class definition should return the class constructor.';
        };

        return constructor;
    }
};