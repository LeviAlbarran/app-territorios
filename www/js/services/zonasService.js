app.factory('zonasService', function ($resource){
	
return{
		     
		todasZonas: function(method){
			if(method=='get'){
                array=true;
            }else{
                array=false;
            }
			return $resource(apiBase, {}, {
				ejecutar: {
					method: method,
					url: direc.zonas,
					isArray: array,
					header: {"Content-Type": "application/json"}
				}
			});



		},

		unaZona: function(method, id){
			if(method=='get'){
                array=true;
            }else{
                array=false;
            }

			return $resource(apiBase, {}, {

				ejecutar: {
					method:method,
					url:direc.zonas+"/"+id,
					isArray:false,
					header:{"Content-Type":"application/json"}
				}
			});

		}


}

});