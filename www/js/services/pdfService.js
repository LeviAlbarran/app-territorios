app.factory('pdfService', ['$q', pdfService]);

function pdfService($q) {  
    function createPdf(data, descargar) {
        return $q(function(resolve, reject) {
            var dd = createDocumentDefinition(data);
            var pdf = pdfMake.createPdf(dd);
            if (descargar==true) {
              pdfMake.createPdf(dd).download();
              };
            pdf.getBase64(function (output) {
                resolve(base64ToUint8Array(output));
            });
        });
    }

    return {
        createPdf: createPdf
    };    
}




function base64ToUint8Array(base64) {  
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}


function createDocumentDefinition(dataDirections) {

console.log(dataDirections);
    var celdas=  [];
        celdas.push({ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'});



var contenido = [];

for (var i =0; i <dataDirections.length ; i++) {
  
if (!dataDirections[i].nombre) {
    dataDirections[i].nombre = '';
};
if (!dataDirections[i].publicador) {
    dataDirections[i].publicador = '';
};
if (!dataDirections[i].genero) {
    dataDirections[i].genero = '';
};
if (!dataDirections[i].condicion) {
    dataDirections[i].condicion = '';
};
if (!dataDirections[i].zona) {
    dataDirections[i].zona = '';
};
if (!dataDirections[i].edificacion) {
    dataDirections[i].edificacion = '';
};
if (!dataDirections[i].comentarios) {
    dataDirections[i].comentarios = '';
};




    contenido.push({
                columns: [
                    {
                      // auto-sized columns have their widths based on their content
                      width: '75%',
                      text: 'ID:  1302 - Nombre: '+ dataDirections[i].nombre,
                      style: 'subheader'
                    },
                   
                    {
                      // % width
                      width: '25%',
                      text: 'Publicador: ' +dataDirections[i].publicador
                    }
                  ],
                  columnGap: 10,
                  style: 'encabezado'
                });
    contenido.push({ text: '-'});


        contenido.push({
                columns: [
                    {
                      // auto-sized columns have their widths based on their content
                      width: '25%',
                      text: 'Genero: '+ dataDirections[i].genero
                    },
                   
                    {
                      // fixed width
                      width: "25%",
                      text: 'Condicion: '+dataDirections[i].condicion
                    },
                    {
                      // % width
                      width: '25%',
                      text: 'Zona: ' + dataDirections[i].zona
                    },
                    {
                      // % width
                      width: '25%',
                      text: 'Edificacion: ' + dataDirections[i].edificacion
                    }
                  ],
                  columnGap: 10,
                  style: 'encabezado'
                });

        contenido.push({ text: '-'});
        contenido.push({ text: 'Direccion: ' + dataDirections[i].direccion});
        contenido.push({ text: '-'});
        contenido.push({ text: 'Observaciones: ' + dataDirections[i].comentarios});
        contenido.push({ text: '-'});


        contenido.push({
                style: 'itemsTable',
                table: {
                    widths: [27, 20, 20, 75, 75, 75 , "*" ],
                    body: [
                        [ 
                            { text: 'Fecha', style: 'itemsTableHeader' },
                            { text: 'Hora', style: 'itemsTableHeader' },
                            { text: 'Sim.', style: 'itemsTableHeader' },                            
                            { text: 'Publicador', style: 'itemsTableHeader' },
                            { text: 'Tema Conversado', style: 'itemsTableHeader' },
                            { text: 'Publicacion', style: 'itemsTableHeader' },
                            { text: 'Observaciones', style: 'itemsTableHeader' }
                        ],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],
                        [{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio'  },{ text: '-', style: 'espacio' },{ text: '-', style: 'espacio'}],  
                    ]          
                }
            });

    contenido.push({ text: '-', style: 'margin'});

     if( i % 2 == 0 ) {
       contenido.push({text:'-', pageBreak: 'after'})
    };
}

/*
var contenido = [

                {
                columns: [
                    {
                      // auto-sized columns have their widths based on their content
                      width: '75%',
                      text: 'ID:  1302 - Nombre: Sra Camenza Napolitano',
                      style: 'subheader'
                    },
                   
                    {
                      // % width
                      width: '25%',
                      text: 'Publicador: Levi Albarran'
                    }
                  ],
                  columnGap: 10,
                  style: 'encabezado'
                },
                 { text: '-'},
                {
                columns: [
                    {
                      // auto-sized columns have their widths based on their content
                      width: '25%',
                      text: 'Genero: Mujer'
                    },
                   
                    {
                      // fixed width
                      width: "25%",
                      text: 'Condicion: Descendiente'
                    },
                    {
                      // % width
                      width: '25%',
                      text: 'Zona: Sur'
                    },
                    {
                      // % width
                      width: '25%',
                      text: 'Edificacion: Sur'
                    }
                  ],
                  columnGap: 10,
                  style: 'encabezado'
                },
                { text: '-'},
                { text: 'Direccion: Calle 86 A'},
                { text: '-'},
                { text: 'Observaciones: Interasado, la Madre se llama Antonella'},



                      {
                style: 'itemsTable',
                table: {
                    widths: [20, 20, 20, 75, 75, 75 , "*" ],
                    body: [
                        [ 
                            { text: 'Fecha', style: 'itemsTableHeader' },
                            { text: 'Hora', style: 'itemsTableHeader' },
                            { text: 'Sim.', style: 'itemsTableHeader' },                            
                            { text: 'Publicador', style: 'itemsTableHeader' },
                            { text: 'Tema Conversado', style: 'itemsTableHeader' },
                            { text: 'Publicacion', style: 'itemsTableHeader' },
                            { text: 'Observaciones', style: 'itemsTableHeader' }
                        ],
                        celdas

                    ]
                }
            },

        ]*/






    var dd = {
        content: contenido,
        styles: {
            
            margin:{
                margin: [0, 5, 0, 15]
            },

            espacio:{
              color: 'white'
            },

            negritas:{
                    bold: true
            },

            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 12,
                bold: true
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 10,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 30, 0, 0]
            }
        },
        defaultStyle: {
            fontSize: 9
        }
    }

    return dd;
}
