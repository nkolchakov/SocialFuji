'use strict'
import 'jquery'
const partialLoader = (function (){
    const cache = {};
    
    function get (partialName){

        return new Promise((resolve, reject)=>{
            if (cache[partialName]){
                resolve(cache[partialName]);
            }

            $.get(`/scripts/templates/partials/${partialName}.hb`)
            .done((data) => {
                let partial = Handlebars.compile(data);
                cache.partialName = partial;
                resolve(partial);
            });
        });
    }
    
    return {
        get
    };
}());

export {partialLoader};