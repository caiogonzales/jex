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
    // abort
    //---------------------------------

    /**
     * Este metodo é chamado para abortar o processo de carregamento.
     */
    HTTP.prototype.abort = function(){
        if(this._httpRequest == null)
            return;

        this._httpRequest.abort();

        delete this._httpRequest;
    }
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
        this._httpRequest.addEventListener('load', this._onLoad.bind(this));
        this._httpRequest.addEventListener('progress',this._onProgress.bind(this));
        this._httpRequest.addEventListener('error', this._onError.bind(this));
        this._httpRequest.addEventListener('abort', this._onAbort.bind(this));
        this._httpRequest.responseType = 'text';
        this._httpRequest.open(method, url);
        this._httpRequest.send(null);
    };

    /**
     * @private
     * Chamamos esse metodo quando o carregamento é concluido.
     */
    HTTP.prototype._onLoad = function (event) {
        this.data = this._httpRequest.responseText;
        this.emit('load', {
            data: this.data
        });
    };

    /**
     * @private
     * Chamamos esse metodo para monitorar o processo de carregamento.
     */
    HTTP.prototype._onProgress = function(event){
        this.loaded = event.loaded;
        this.total  = event.total;
        this.emit('progress'); 
    };

    /**
     * @private
     * Chamamos esse metodo quando ocorrer um erro durante o processo de carregamento.
     */
    HTTP.prototype._onError = function(event){
        this.emit('error');
    };

    /**
     * @private
     * Esse metodo é chamado quando o metodo abort() é chamado
     */
    HTTP.prototype._onAbort = function(event){
        this.emit('abort')
    };
    
    return HTTP;

});