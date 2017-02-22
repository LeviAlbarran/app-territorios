app.factory('directionTMPService', function($resource){


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
                    url: direc.direccionesTMP,
                    isArray: array,
                    header: {"Content-Type": "application/json"}


                }    

            });

        },
        todasDireccionesOrdenFecha: function (method){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }

            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: direc.direccionesTMP+'?sort=fecha',
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
                    url: direc.direccionesTMP+"/"+id,
                    isArray: false,
                    header: {"Content-Type": "application/json"}
                }    

            });

        },

        listDirecciones: function (method){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }
            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: apiBase+'/listDirecciones',
                    isArray: array,
                    header: {"Content-Type": "application/json"}
                }    

            });

        },

        ultimaDireccion: function (method){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }
            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: apiBase+'/ultimaDireccion',
                    isArray: array,
                    header: {"Content-Type": "application/json"}
                }    

            });

        },


        direccionesTerritorio: function (method, idTerritorio){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }

            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: direc.direccionesTMP+'?territorio='+ idTerritorio,
                    isArray: array,
                    header: {"Content-Type": "application/json"}


                }    

            });

        },
    }

});