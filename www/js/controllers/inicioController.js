app.controller("LoginController", LoginController);
app.controller("SignupController", SignupController);
app.controller("LogoutController", LogoutController);

 
function SignupController($auth, $location, $ionicPopup) {  
    var vm = this;
    this.signup = function() {
        $auth.signup({
            nombre: vm.nombre,
            correo: vm.correo,
            clave: vm.clave,
            id_congregacion: vm.congregacion,
            nivel: '3',
            activacion: false,
            permisos: {
                territorios: [],
                sistema: {
                    verificacion: {
                        visualizar: false,
                        crear: false,
                        modificar: false,
                        eliminar: false
                    },
                    territorio: {
                        crear: false,
                        modificar: false,
                        eliminar: false
                    },
                    zonas: {
                        crear: false,
                        modificar: false,
                        eliminar: false
                    },
                    direcciones: {
                        crear: false,
                        modificar: false,
                        eliminar: false
                    }

                }
            } 
        })
        .then(function(resp) {
            console.log("signup");
            console.log(resp);

            var instructionsPopup = $ionicPopup.alert({
                title: 'Registrado Correctamente!',
                template: 'En espera de ser activado por alguno de los administradores'
             });
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
            // Si ha habido errores, llegaremos a esta función
            alert('Compruebe su conexion a internet');
        });
    }
}

function LoginController($auth, $location, $state, $scope, $ionicModal, $window) { 
  
    var auth = $auth.getPayload();
    if (auth) {
        console.log(auth);
        console.log('login');
        $state.go('app.dashboard');
    }; 
    

    this.goSignup = function(){
        console.log('response');
     // $state.go('inicio.registrarse');
 //      $window.location.href = '#/registrarse';
    }

    var vm = this;
    console.log(vm);
    this.login = function(){
        console.log("prueba");
        $auth.login({
            correo: vm.correo,
            clave: vm.clave
        })
        .then(function(resp){
            console.log(resp); 
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
        //$location.path("/dashboard");

        if (resp.data.token) {
               var auth = $auth.getPayload();           
                console.log(auth.conx);
                localStorage.setItem("apiBase", auth.conx);
               $state.go('app.dashboard');
        }else{

            $scope.responseLogin = resp.data.response;
        };
  //       window.location = "/www/#/dashboard";
        })
        .catch(function(response){
              console.log(response);
           alert('Compruebe su conexion a internet');
            // Si ha habido errores llegamos a esta parte
        });
    }
}

function LogoutController($scope, $rootScope, $auth, $location, usuariosService) {
    var auth = $auth.getPayload();
     $rootScope.miUsuario={};
     console.log(auth.sub);
         $rootScope.miUsuario._id= auth.sub;
   /*  $rootScope.auth= auth.per.sistema;
     $rootScope.miUsuario.nivel= auth.nvl;
     $rootScope.miUsuario.nombre= auth.usr;
     $rootScope.miUsuario.correo= auth.eml;
*/
usuariosService.unUsuario('get', $rootScope.miUsuario._id).ejecutar(function (data) {
                        console.log(data);
                        $rootScope.usuario=data;
                        $rootScope.miUsuario.nivel= data.nivel;
                        $rootScope.miUsuario.id_congregacion= data.id_congregacion;
                        $rootScope.miUsuario.nombre= data.nombre;
                        $rootScope.miUsuario.correo= data.correo;
                        $rootScope.auth= data.permisos.sistema;
                        $rootScope.usuario.sync=true;
   

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });


     console.log($rootScope.usr); 
     console.log($rootScope.auth); 
  this.logOut = function(){
          $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            localStorage.removeItem("apiBase");
            $location.path("/")
        });
    }
}



