

//var server = '192.168.1.40';

var server2 = 'node-territorios.herokuapp.com';
var apiBaseUsuarios = "http://"+server2+"/api";


//var server2 = 'localhost:5000';
//var apiBaseUsuarios = "http://"+server2+"/api";
var apiBase = localStorage.getItem("apiBase"); 
console.log(apiBase);

var direc = {

    direcciones: apiBase + "/direccion",
    territorios: apiBase + "/territorios",
    zonas: apiBase + "/zonas"
};

var direc2 = {
    usuarios: apiBaseUsuarios + "/usuarios"
};

var token = localStorage.getItem("app_token");
console.log(token);



