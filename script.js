//usar o fetch para conectar co a API do dicionário
async function buscarPalavra(event) {
    event.preventDefault();

    const word = document.querySelector('input[type="text"]').value;
    
    if (!word) {
        alert('Por favor, insira uma palavra válida.');
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Palavra não encontrada');
        }
        const dados = await resposta.json();
        exibirResultado(dados);
    } catch (erro) {
        const main = document.getElementsByTagName('main')[0];
        main.innerHTML = `<p>Erro: ${erro.message}</p>`;
        main.style.display = 'block';
    }
}

function exibirResultado(dados) {
    const main = document.querySelector('main'); // Use querySelector para selecionar diretamente o elemento
    if (!main) {
        console.error("Elemento <main> não encontrado na página.");
        return;
    }
    if (dados && dados.length > 0) {
        const palavra = dados[0].word;
        const significados = dados[0].meanings.map(meaning => {
                return  `<p><strong>${meaning.partOfSpeech}:</strong> ${meaning.definitions[0].definition}</p>` // Corrigi para acessar a propriedade 'definition'
    }).join('');

        main.innerHTML = `<h2>Definição de "${palavra}":</h2>${significados}`;
        main.style.display = 'block';
    } else {
        main.innerHTML = '<p>Palavra não foi encontrada.</p>';
        main.style.display = 'block';
    }
}
const form = document.querySelector('form');
form.addEventListener('submit', buscarPalavra);