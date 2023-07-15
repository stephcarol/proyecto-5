let plot = (data) => {

    const ctx = document.getElementById('myChart');
    const dataset = {
        labels: data.hourly.time, /* ETIQUETA DE DATOS */
        datasets: [{
            label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
            data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    const config = {
        type: 'line',
        data: dataset,
    };

    const chart = new Chart(ctx, config);
 }

 let load = (data) => { 
    let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'

    fetch(URL)
     .then(response => response.json())
     .then(data => {
            load(data)
            
      })
     .catch(console.error);

 }

 let loadInocar = () =>{
    let URL = 'https://cors-anywhere.herokuapp.com/'+'https://www.inocar.mil.ec/mareas/consultan.php';

    fetch(URL)
     	.then(response => response.text())
        .then(data => {
           const parser = new DOMParser();
           const xml = parser.parseFromString(data, "text/html");
           console.log(xml);
           let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
           let contenedorHTML = document.getElementById('table-container');
           contenedorHTML.innerHTML = contenedorMareas.innerHTML;


        })
        .catch(console.error);

 }

 (
    function () { 
        let meteo = localStorage.getItem('meteo');
        if(meteo == null) {
            let URL = 'https://...';
                
            fetch(URL)
            .then(response => response.json())
            .then(data => {
                load(data)
        
                /* GUARDAR DATA EN MEMORIA */
                localStorage.setItem("meteo", JSON.stringify(data))
        
            })
            .catch(console.error);
        } else {

            /* CARGAR DATA EN MEMORIA */
            load(JSON.parse(meteo))
      
        }

     
    }
  )();

(
  function () { 
    let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m';
    fetch( URL )
    .then(response => response.json())
    .then(data => {
        console.log(data);
        plot(data)
    })
     .catch(console.error);

   }

)();