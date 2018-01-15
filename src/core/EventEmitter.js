jx.class('EventEmitter', function(){
    //--------------------------------------------------------------------------
    //
    // Construtor da classe
    //
    //--------------------------------------------------------------------------

    /**
     * Cria um novo objeto EventEmitter.
     */
    var EventEmitter = function(){

    };

    //--------------------------------------------------------------------------
    //
    //  Métodos da classe
    //
    //--------------------------------------------------------------------------

    //---------------------------------
    // emit
    //---------------------------------

    /**
     * Emite o evento de nome especifico.
     * 
     * @param {String} eventName O nome do evento.
     * 
     * @param {Object} eventObject Objeto passado por parâmetro à função de 
     * retorno. Este objeto terá no mínimo as propriedades <code>eventName
     * </code> que é o nome do evento, e <code>target</code> que é o alvo que 
     * emitiu o evento.
     * 
     * @throws {Error} Se o parâmetro <code>eventName</code> não for uma string.
     */
    EventEmitter.prototype.emit = function (eventName, eventObject){
        if (typeof (eventName) != 'string')
            throw 'Erro: O parâmetro eventName deve ser uma string.';

        if (this._eventMap == null)
            return;
        
        var list = this._eventMap[eventName];

        if(list == null)
            return;

        if(eventObject == null)
            eventObject = {};

        eventObject.eventName = eventName;
        eventObject.target = this;

        for(var i=0; i<list.length; ++i){
          var listener = list[i];

          listener.callback.call(listener.thisArg, eventObject);  
        }
    };

    //---------------------------------
    // on
    //---------------------------------

    /**
     * Adiciona um ouvinte de evento ao mapa de eventos.
     * 
     * <p>O ouvinte é composto pelo nome do evento e pela função de retorno que 
     * será chamada na ocorrência do evento.</p>
     * 
     * @param {String} eventName O nome do evento.
     * 
     * @param {Function} callback A função de retorno do evento.
     * 
     * @param {Object} thisArg  O objeto que será definido como <code>this
     * </code> da função de retorno.
     * 
     * @throws {Error} Se o parâmetro <code>eventName</code> não for uma string.
     * 
     * @throws {Error} Se o parâmetro <code>callback</code> não for uma função.
     */
    EventEmitter.prototype.on = function(eventName, callback, thisArg){
        if(typeof(eventName) != 'string')
            throw 'Erro: O parâmetro eventName deve ser uma string.';

        if (typeof (callback) != 'function')
            throw 'Erro: O parâmetro callback deve ser uma função.';

        if(this._eventMap == null)
            this._eventMap = {};
        
        var list = this._eventMap[eventName];

        thisArg = thisArg != null ? thisArg : this;

        if(list == null){
            list = [];
            list.push(new Listener(eventName, callback, thisArg));
            this._eventMap[eventName] = list;
        }else{
            list.push(new Listener(eventName, callback, thisArg));
        }
    };

    //--------------------------------------------------------------------------
    //
    // Classe Auxiliar: Listener
    //
    //--------------------------------------------------------------------------

    /**
     * Cria um novo objeto Listener.
     * 
     * @param {String} eventName O nome do evento.
     *
     * @param {Function} callback A função de retorno do evento.
     *
     * @param {Object} thisArg  O objeto que será definido como <code>this
     * </code> da função de retorno.
     */
    var Listener = function(eventName, callback, thisArg){
        this.eventName = eventName;
        this.callback = callback;
        this.thisArg = thisArg;
    };

    return EventEmitter;
});