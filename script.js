document.cookie = "cookieName=cookieValue; SameSite=Lax";
document.addEventListener('DOMContentLoaded', function() {
  let modalOpen = false; // Variável de controle para indicar se o modal está aberto
  fetch("https://swapi.dev/api/films/")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const filmList = document.querySelector('.film-list');
      data.results.forEach(filme => {
        
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';

        const filmesImagens = {
          'A New Hope': 'a_new_hope.jpg',
          'The Empire Strikes Back': 'the_empire_strikes_back.jpg',
          'Return of the Jedi': 'return_of_the_jedi.jpg',
          'The Phantom Menace': 'the_phantom_menace.jpg',
          'Attack of the Clones': 'attack_of_the_clones.jpg',
          'Revenge of the Sith': 'revenge_of_the_sith.jpg'
        };
        
        const imgElement = document.createElement('img');
        imgElement.src = `images/${filmesImagens[filme.title]}`;
        imgElement.className = 'imgElement';
        filmCard.appendChild(imgElement);
        
        filmCard.addEventListener('click', function() {
          // Obtém os dados do filme a partir dos atributos de dados
          var title = filmCard.getAttribute('data-title');
          var details = filmCard.getAttribute('data-details');

          if (!modalOpen) { // Verifica se o modal não está aberto
            openModal(title, details);
            modalOpen = true; // Define a variável como true para indicar que o modal está aberto
          }
        });

        const searchInput = document.querySelector('.search-input');
        const filmCards = document.querySelectorAll('.film-card');
        
        searchInput.addEventListener('keyup', function(event) {
          const searchTerm = event.target.value.toLowerCase();
          
          // Itera sobre todos os film cards e verifica se o termo de pesquisa está no título de cada filme
          filmCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(searchTerm)) {
              card.style.display = 'block'; // Exibe o card se o título corresponder ao termo de pesquisa
            } else {
              card.style.display = 'none'; // Oculta o card se o título não corresponder ao termo de pesquisa
            }
          });
        });
        


        // Define os atributos de dados para o título e detalhes do filme
        filmCard.setAttribute('data-title', filme.title);
        filmCard.setAttribute('data-details', filme.opening_crawl);

        filmList.appendChild(filmCard);
      });
    })
    .catch(error => {
      console.error('Ocorreu um erro', error);
    });

  // Função para abrir o modal
  function openModal(title, details) {
    // Atualize o conteúdo do modal com o título e detalhes do filme
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDetails').textContent = details;

    // Exibe o modal
    document.getElementById('myModal').style.display = 'block';
  }

  // Função para fechar o modal
  function closeModal() {
    // Oculta o modal
    document.getElementById('myModal').style.display = 'none';
    modalOpen = false; // Define a variável como false para indicar que o modal está fechado
  }

    // Evento de clique fora do modal para fechá-lo
    window.addEventListener('click', function(event) {
      if (event.target == document.getElementById('myModal')) {
        closeModal();
      }

      
    // Evento de clique no botão de busca
  document.getElementById('searchButton').addEventListener('click', function() {
    var characterName = document.getElementById('characterInput').value;
    
  // Realiza a busca na API do Star Wars
  fetch(`https://swapi.dev/api/people/?search=${characterName}`)
    .then(response => response.json())
    .then(data => {
      // Verifica se encontrou algum personagem com o nome buscado
      if (data.count > 0) {
        var character = data.results[0]; // Obtém o primeiro resultado da busca

        // Atualiza a imagem e detalhes do personagem no modal
        document.getElementById('characterImage').src = `https://starwars-visualguide.com/assets/img/characters/${character.url.match(/\/(\d+)\/$/)[1]}.jpg`;
        document.getElementById('characterDetails').textContent = `Nome: ${character.name}, Gênero: ${character.gender}, Altura: ${character.height}cm, Peso: ${character.mass}kg`;
      } else {
        // Caso não encontre nenhum personagem com o nome buscado, exibe uma mensagem de erro
        document.getElementById('characterImage').src = '';
        document.getElementById('characterDetails').textContent = 'Personagem não encontrado.';
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro', error);
    });

    document.getElementById('btnPersonagens').addEventListener('click', function() {
      // Obtém o título do filme do modal
      var title = document.getElementById('modalTitle').textContent;
    
      // Chama a função para buscar os personagens relacionados ao filme na API
      getFilmCharacters(title)
        .then(characters => {
          // Limpa a lista de personagens antes de adicionar os novos cards
          document.getElementById('personagensList').innerHTML = '';
    
          // Cria e adiciona os cards dos personagens na lista
          characters.forEach(character => {
            const characterCard = createCharacterCard(character);
            document.getElementById('personagensList').appendChild(characterCard);
          });
        })
        .catch(error => {
          console.error('Ocorreu um erro ao buscar os personagens', error);
        });
    });
    
    function getFilmCharacters(title) {
      return fetch("https://swapi.dev/api/films/")
        .then(response => response.json())
        .then(data => {
          const film = data.results.find(filme => filme.title === title);
          const charactersUrls = film.characters;
          return Promise.all(charactersUrls.map(url => fetch(url).then(response => response.json())));
        });
    }

// Evento de clique no botão "Personagens"
document.getElementById('btnPersonagens').addEventListener('click', function() {
  // Obtenha os dados do filme do modal
  const title = document.getElementById('modalTitle').textContent;
  const details = document.getElementById('modalDetails').textContent;

  // Faça a chamada à API do Star Wars para obter os personagens do filme
  fetch("https://swapi.dev/api/people/")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const characters = data.results;
      const characterList = document.querySelector('.character-list');
      characterList.innerHTML = ''; // Limpa a lista de personagens antes de adicioná-los

      characters.forEach(character => {
        const characterCard = createCharacterCard(character);
        characterList.appendChild(characterCard);
      });

      // Abra o modal de personagens
      document.getElementById('myModalCharacters').style.display = 'block';
    })
    .catch(error => {
      console.error('Ocorreu um erro', error);
    });
});

}

  );
});
});