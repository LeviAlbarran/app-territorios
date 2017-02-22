app.factory('localstorageService', function($resource){


    return { 
        direcciones: function (method, data){
            var dataSincronizacion = {}
            if (localStorage.getItem('dataSincronizacion')){
                localJSON = localStorage.getItem('dataSincronizacion');
                 dataSincronizacion = JSON.parse(localJSON);
            }else{
                localStorage.setItem('dataSincronizacion', JSON.stringify(dataSincronizacion))
            }

            if(method=='guardar'){   
                if (dataSincronizacion.direccionesNuevas) {
                    dataSincronizacion.direccionesNuevas = dataSincronizacion.direccionesNuevas.concat(data);      
                }
                else{
                    dataSincronizacion.direccionesNuevas = data;
                }                      
            }else if (method=='modificar') {
                if (dataSincronizacion.direccionesModificadas) {
                    dataSincronizacion.direccionesModificadas = dataSincronizacion.direccionesModificadas.concat(data);               
                }
                else{
                    dataSincronizacion.direccionesModificadas = data;
                }
            }else if (method=='eliminar') {
                if (dataSincronizacion.direccionesEliminadas) {
                    dataSincronizacion.direccionesEliminadas = dataSincronizacion.direccionesEliminadas.concat(data);
                }
                else{
                    dataSincronizacion.direccionesEliminadas = data; 
                }

            }

            localStorage.setItem('dataSincronizacion', JSON.stringify(dataSincronizacion)); 
            console.log(dataSincronizacion);
            return dataSincronizacion; 
             
        },

        direccionesTMP: function (method, data){
            var dataSincronizacion = {}
            if (localStorage.getItem('dataSincronizacion')){
                localJSON = localStorage.getItem('dataSincronizacion');
                 dataSincronizacion = JSON.parse(localJSON);
            }else{
                localStorage.setItem('dataSincronizacion', JSON.stringify(dataSincronizacion))
            }

            if(method=='guardar'){   
                if (dataSincronizacion.direccionesTMPNuevas) {
                    dataSincronizacion.direccionesTMPNuevas = dataSincronizacion.direccionesTMPNuevas.concat(data);      
                }
                else{
                    dataSincronizacion.direccionesTMPNuevas = data;
                }                      
            }else if (method=='modificar') {
                if (dataSincronizacion.direccionesTMPModificadas) {
                    dataSincronizacion.direccionesTMPModificadas = dataSincronizacion.direccionesTMPModificadas.concat(data);               
                }
                else{
                    dataSincronizacion.direccionesTMPModificadas = data;
                }
            }else if (method=='eliminar') {
                if (dataSincronizacion.direccionesTMPEliminadas) {
                    dataSincronizacion.direccionesTMPEliminadas = dataSincronizacion.direccionesTMPEliminadas.concat(data);
                }
                else{
                    dataSincronizacion.direccionesTMPEliminadas = data; 
                }

            }

            localStorage.setItem('dataSincronizacion', JSON.stringify(dataSincronizacion)); 
            console.log(dataSincronizacion);
            return dataSincronizacion; 
             
        },

        sincronizacion: function(method){
            if(method=='get'){
                array=true;
            }else{
                array=false;
            }
            return $resource(apiBase, {}, {
                ejecutar: {
                    method: method,
                   // url: direc.sincronizacion,
                    url: "http://localhost:5000/api/sincronizacion",
                    isArray: array,
                    header: {"Content-Type": "application/json"}
                }
            });
        }


    }

});