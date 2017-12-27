window.jx = {
    //---------------------------------
    // class
    //---------------------------------

    /**
     * Register a class in the JEX class map.
     * 
     * @param {String} name The class name. The class name must be an 
     * alphanumeric string beginning with a letter.
     * 
     * @param {Function} definition The class definition. The class definition 
     * must be a function.
     * 
     * @throws {ArgumentError} If the class name must not be an alphanumeric 
     * string beginning with a letter.
     * 
     * @throws {TypeError} If the class definition must not be a function.
     */
    class: function(name, definition){
        if(this.$classMap == null){
            this.$classMap = {};
        };

        if(!(/^[a-zA-Z][a-zA-Z0-9]+$/).test(name)){
            throw 'ArgumentError: The class name must be an alphanumeric '+
                'string beginning with a letter.';
        };

        if (typeof (definition) != 'function'){
            throw 'TypeError: The class definition must be a function.';
        };

        this.$classMap[name] = definition;
    },

    //---------------------------------
    // use
    //---------------------------------

    /**
     * Returns the class definition that registered with specified name.
     * 
     * @param {String} name The class name. The class name must be an
     * alphanumeric string beginning with a letter.
     * 
     * @throws {ArgumentError} If the class name must not be an alphanumeric 
     * string beginning with a letter.
     * 
     * @throws {Error} If the class definition not found.
     * 
     * @throws {Error} If the class definition should not return the class 
     * constructor.
     */
    use: function(name){
        if (!(/^[a-zA-Z][a-zA-Z0-9]+$/).test(name)) {
            throw 'ArgumentError: The class name must be an alphanumeric ' +
            'string beginning with a letter.';
        };

        if (this.$classMap == null) {
            throw 'Error: Class definition not found.';
        };

        var definition = this.$classMap[name];

        if (definition == null) {
            throw 'Error: Class definition not found.';
        };

        var constructor = definition();

        if (typeof (constructor) != 'function') {
            throw 'Error: The class definition should return the class '+
                'constructor.';
        };

        return constructor;
    }
};