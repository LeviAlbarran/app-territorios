app.factory('directionService', function($resource){


    return { 
        todasDirecciones: function (method){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }

            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: direc.direcciones,
                    isArray: array,
                    header: {"Content-Type": "application/json"}


                }    

            });

        },
        unaDireccion: function (method, id){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }
            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: direc.direcciones+"/"+id,
                    isArray: false,
                    header: {"Content-Type": "application/json"}
                }    

            });

        }
    }




});