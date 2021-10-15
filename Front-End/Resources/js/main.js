const server = 'http://localhost:27500';
// Remove and complete icons in SVG format
const removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

var data=[];

(async function() {
  "use strict";

  const resp = await fetch(`${server}/cities`)
  const cities = await resp.json()

 ///////////////////////////////////////////////////////////////////////////
    data = cities;
    renderCities(cities); 

  // renderTodoList(data)
})();

  let addform = document.getElementById('addform');
  
      addform.addEventListener('submit', (e) => {
        e.preventDefault();
  
        /* 
          Récupération des données du formualire
        */
        let form = document.forms.addform;
        // ...
        console.log(form);
  let formdata={
    CapitalName: form.city.value,
    CountryName: form.country.value,
    Year: form.year.value,
    Duration: form.duration.value,
    Unit: document.getElementById("inputCityDurationSelect").value,
    Completed:form.checkvisited.checked
  }

// let data={
//         CapitalName: "form.city.value",
//         CountryName: "form.country.valueee",
//         Year: 2011,
//         Duration: 4,
//         Unit: "day"
//       }
        console.log(formdata);
        // console.log(JSON.parse(data));
        addItem(formdata);
        data.push(formdata);
        document.getElementById('cities-list-tovisite').innerHTML = '' ;
        document.getElementById('cities-list-visited').innerHTML = '';
        renderCities(data);
      })

function addItem (value) {
  dataObjectUpdated('add', value);
}

function renderCities(datacities) {
    console.log(datacities);
  if (!datacities) {
      console.log("fail");
      return;
    }
  for (let j in datacities ) {
    console.log(datacities[j]);

    let bool = false;
    if(datacities[j].Completed){
        bool = true
        console.log("bool = true");
    }

     addItemToDOM(datacities[j],bool)
    }
}


function dataObjectUpdated(type, item) {
  switch(type){
    case 'add':
        fetch(`${server}/cities`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })
      break;
    case 'edit':
      fetch(`${server}/cities/${item.id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
    break;
    case 'delete':
      fetch(`${server}/cities/${item.id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
    break;
    default:
      break;
  }
}

function deleteItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  var city = {
    id: item.dataset.id
  }

  dataObjectUpdated('delete', city);

  parent.removeChild(item);
}

// Adds a new item to the todo list
function addItemToDOM(cities,bool) {

    let citiesTable;

    if(bool){
        console.log("bool = " + bool)
        citiesTable = document.getElementById('cities-list-tovisite');
    }else{
        citiesTable = document.getElementById('cities-list-visited');
    }
        // Pour toutes les objets du tableau
          
          // Nouvelle ligne <tr> avec comme id, la position dans le tableau
          let tr = document.createElement('tr');
          tr.setAttribute('data-id', cities._id); 
  
          // Création du <td> contenant le nom de la ville
          let city = document.createElement('td');
          let cityName = document.createTextNode(cities.CapitalName);
          
          // Création du <td> contenant le nom du pays
          let country = document.createElement('td');
          let countryName = document.createTextNode(cities.CountryName);
  
          // Création du <td> contenant le bouton d'ajout
          let action = document.createElement('td');
  
          // Création du bouton d'ajout
          let addToWishList = document.createElement('button');
          addToWishList.setAttribute('class', 'btn btn-danger');
          addToWishList.innerText = 'Retirer'
          // Exécution de la fonction au clic
          addToWishList.addEventListener('click', deleteItem)
          
          //On ajoute les textNodes aux éléments <td> puis le bouton au <td> correspondant
          city.appendChild(cityName);
          country.appendChild(countryName);
          action.appendChild(addToWishList);
  
          // On ajoute les <td> à la ligne <tr>
          tr.appendChild(city);
          tr.appendChild(country)
          tr.appendChild(action);
  
          // On ajoute toute la ligne au tableau
          citiesTable.appendChild(tr);
}
