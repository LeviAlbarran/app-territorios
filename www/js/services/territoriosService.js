app.factory('territoriosService',function($resource){
	apiBase = localStorage.getItem("apiBase");
return{
		     
		todosTerritorios: function(method){
			if(method=='get'){
                array=true;
            }else{
                array=false;
            }
			return $resource(apiBase, {}, {
				ejecutar: {
					method: method,
					url: direc.territorios,
					isArray: array,
					header: {"Content-Type": "application/json"}
				}
			});



		},

		unTerritorio: function(method, id){
			if(method=='get'){
                array=true;
            }else{
                array=false;
            }

			return $resource(apiBase, {}, {

				ejecutar: {
					method:method,
					url:direc.territorios+"/"+id,
					isArray:false,
					header:{"Content-Type":"application/json"}
				}
			});

		}


}

});