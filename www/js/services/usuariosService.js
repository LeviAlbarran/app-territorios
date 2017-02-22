app.factory('usuariosService', function ($resource){
	apiBase = localStorage.getItem("apiBase");
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
                    url: direc2.usuarios,
                    isArray: array,
                    header: {"Content-Type": "application/json"}

                }    

            });

        },


        unUsuario: function(method, id){
            if(method=='get'){
                array=true;
            }else{
                array=false;
            }

            return $resource(apiBase, {}, {

                ejecutar: {
                    method:method,
                    url:direc2.usuarios+"/"+id,
                    isArray:false,
                    header:{"Content-Type":"application/json"}
                }
            });

        }

	};
});