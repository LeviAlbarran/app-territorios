app.factory('usuariosService', function ($resource){
	
	 return { 
        todosUsuarios: function (method){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }

            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: direc.usuarios,
                    isArray: array,
                    header: {"Content-Type": "application/json"}


                }    

            });

        },

        unUsuario: function (method, id){
            if(method=='get'){
                array=true;
            }else{
                array=false;

            }
            return $resource(apiBase, {},{
                ejecutar:{
                    method: method,
                    url: direc.usuarios+"/"+id,
                    isArray: false,
                    header: {"Content-Type": "application/json"}
                }    

            });

        }
	}
});