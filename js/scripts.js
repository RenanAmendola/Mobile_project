/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});





function change_button(event){

    chan

}

// script.js

// Função para fazer uma requisição HTTP GET
function fetchData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  
  // URL da API que você quer consumir
  var apiUrl = "http://localhost:8080/Products/";
  
  // Função para manipular os dados recebidos da API
  function handleData(data) {
    // Se a API retornar uma lista de produtos
    if (Array.isArray(data)) {
      // Seleciona o elemento onde os produtos serão exibidos
      var productListElement = document.getElementById("product-list");
  
      // Limpa o conteúdo atual do elemento
      productListElement.innerHTML = "";
  
      // Itera sobre a lista de produtos e cria elementos HTML para cada produto
      data.forEach(function(product) {
        // Cria os elementos HTML para o produto
        var productCard = document.createElement("div");
        productCard.className = "col-md-6 col-lg-4";
        productCard.innerHTML = `
          <div class="product-card">
            <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
            <h5 class="mt-3 text-capitalize product-name">${product.name}</h5>
            <p class="text-break product-description">${product.description}</p>
            <div class="card-footer d-flex align-items-center justify-content-between">
              <small class="text-white product-price">Preço: R$ ${product.price.toFixed(2)}</small>
              <button class="btn btn-success btn-sm">Comprar</button>
            </div>
          </div>
        `;
  
        // Adiciona o produto ao elemento pai
        productListElement.appendChild(productCard);
      });
    }
  }
  
  // Faz a requisição para a API
  fetchData(apiUrl, handleData);
  