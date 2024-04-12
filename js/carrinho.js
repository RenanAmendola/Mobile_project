const nome_produto = localStorage.getItem('nome_produto');
const imagem_produto = localStorage.getItem('imagem_produto');
const descrição = localStorage.getItem('descrição');
const tipo = localStorage.getItem('tipo');
const produto_preço = localStorage.getItem('preço_produto');

// Exibir os detalhes do produto no carrinho
document.getElementById("api-data-carrinho").innerHTML = `
    <div class="col-md-6 col-lg-4">
        <div class="product-card">
          <img src="${imagem_produto}"  class="card-img-top">
            <h5 class="mt-3 text-capitalize" id="nome">${nome_produto}</h5>
            <p class="text-break" id="descrição">${descrição}</p>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <small class="text-white" id="preço">Preço: R$ ${produto_preço}</small>
                
            </div>
        </div>
    </div>
`;




  function consultar_api_rua(event) {
    var valor_cep = document.getElementById("valor_cep").value;
  
    var url = 'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=01187dc5-61d0-438b-b1bc-b1ec508a3e0f&q=' + valor_cep;
  
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        // Verifica se há resultados
        if (data.result && data.result.records && data.result.records.length > 0) {
          // Obtém o primeiro resultado
          var cep_api_resultado = data.result.records[0];

          document.getElementById("bairro").value = cep_api_resultado.nomebairro;
          document.getElementById("logradouro").value = cep_api_resultado.nome_oficial_logradouro;
          document.getElementById("municipio").value = cep_api_resultado.municipio;
          document.getElementById("uf").value = cep_api_resultado.uf;
  
        } else {
          alert("Nenhum resultado encontrado para o CEP fornecido.");
        }
      },
      error: function(xhr, status, error) {
        console.error('Erro ao consultar a API:', error);
      }
    });
  }




  var $status = document.getElementById('status');

  if ('Notification' in window) {
    $status.innerText = Notification.permission;
  }
  
  function requestPermissionAndNotify() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }
    
    // Verifica se a permissão já foi concedida
    if (Notification.permission === 'granted') {
      // Se sim, mostra a notificação diretamente
      showNotification();
    } else {
      // Se não, solicita permissão ao usuário
      Notification.requestPermission(function (result) {
        $status.innerText = result;
        if (result === 'granted') {
          // Se o usuário concedeu a permissão, mostra a notificação
          showNotification();
        }
      });
    }
  }
  
  function showNotification() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }
    
    try {
      var notification = new Notification("Compra realizada com sucesso! \nRedirecionando para a aba de "+ tipo);

      document.getElementById("botao_compra").innerHTML = "Aguarde..."
      
      // Adiciona um atraso de 3 segundos (3000 milissegundos) antes de redirecionar para outra página
      setTimeout(function() {
        // Redireciona para outra página
        window.location.href = tipo +".html";
      }, 3000);
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }
  
  
  
  
