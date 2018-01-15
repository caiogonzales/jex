jx.class('HTTP', function(){
    var EventEmitter = jx.use('EventEmitter');

    var HTTP = function(){
        EventEmitter.call(this);
    };
    HTTP.prototype = jx.extends(EventEmitter.prototype);
    HTTP.prototype.constructor = HTTP;

    HTTP.prototype.load = function(url, method){

        if(typeof(url) != 'string')
            throw 'Erro: O parâmetro url deve ser uma string'; 

        if(method == null)
            method = 'get';

        this._httpRequest = new XMLHttpRequest();
        this._httpRequest.responseType = 'text';
        this._httpRequest.open(method, url);
        this._httpRequest.send();
        this._httpRequest.addEventListener('load', this._onLoad.bind(this));
    };

    HTTP.prototype._onLoad = function(event){
        this.data = this._httpRequest.responseText;
        this.emit('loadComplete', {
            data: this.data
        });
    };

    return HTTP;
});