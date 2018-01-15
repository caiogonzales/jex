jx.class('HTTP', function () {

    var EventEmitter = jx.use('EventEmitter');

    //--------------------------------------------------------------------------
    //
    // Construtor da classe
    //
    //--------------------------------------------------------------------------

    /**
     * Cria um novo objeto HTTP
     */
    var HTTP = function () {
        EventEmitter.call(this);
    };

    HTTP.prototype = jx.extends(EventEmitter.prototype);
    HTTP.prototype.constructor = HTTP;

    //--------------------------------------------------------------------------
    //
    //  Métodos da classe
    //
    //--------------------------------------------------------------------------

    //---------------------------------
    // load
    //---------------------------------

    /**
     * Realiza uma requisição de carregamento HTTP.
     * 
     * @param {String} url A url a ser carregada.
     * 
     * @param {String} method O método usado pela requisição.
     * 
     * @throws {Error} Se o parâmetro <code>url</code> não for uma string.
     */
    HTTP.prototype.load = function (url, method) {

        if (typeof (url) != 'string')
            throw 'Erro: O parâmetro url deve ser uma string';

        if (method == null)
            method = 'get';

        this._httpRequest = new XMLHttpRequest();
        this._httpRequest.responseType = 'text';
        this._httpRequest.open(method, url);
        this._httpRequest.send();
        this._httpRequest.addEventListener('load', this._onLoad.bind(this));
    };

    /**
     * @private
     * Chamamos esse metodo quando o carregamento é concluido.
     */
    HTTP.prototype._onLoad = function (event) {
        this.data = this._httpRequest.responseText;
        this.emit('loadComplete', {
            data: this.data
        });
    };

    return HTTP;
});