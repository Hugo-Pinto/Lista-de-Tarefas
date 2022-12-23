const inputTarefa = document.querySelector('.input-tarefa');
const botao = document.querySelector('.btn-tarefa');
const tarefa = document.querySelector('.tarefas');

function criaLista (){
    const li = document.createElement('li'); //cria uma lista dentro da UL no HTML.
    return li; //retornamos a lista.
}

function criaTarefa( textoTarefa ){
    const li = criaLista(); //recebe como retorno uma lista.
    li.innerHTML = textoTarefa; //adicionamos no HTML da lista o texto passado pelo input.
    tarefa.appendChild(li);//adcionamos a lista no HTML.
    limpaInput();
    apagaTarefa(li); //chamamos a função que cria um botão na lista de tarefas criada.
    salvaTarefa();
}

function limpaInput(){
    inputTarefa.value = '';//zera o valor atribuido ao input.
    inputTarefa.focus();//força o foco para o input, sempre fazendo com que o ponteiro volte a ele.
}

function apagaTarefa (li) {
    li.innerHTML += ' ';
    const apagar = document.createElement('button');//criamos o botão
    apagar.innerText='apagar'; //texto que ficará no botão.
    li.appendChild(apagar);//inserimos no HTML o botão apagar dentro da lista.
    //apagar.classList.add('apagar'); cria uma classe pro botão recem criado com JS.
    apagar.setAttribute('class', 'apagar'); //cria uma classe pro botão recem criado com JS.
}

inputTarefa.addEventListener('keypress', function(e){//pegando o evento de pressionar alguma tecla do teclado, nesse caso, tecla enter para envio dos dados na lista.
    //console.log(e);//ao printar o evento, você poderá verificar no console qual o código da tecla que deseja, nesse caso, o código de enter é 13
    if(e.keyCode === 13){
        if(!inputTarefa.value) return; //impede que, ao pressionar enter, seja enviado um texto vazio a lista
        criaTarefa(inputTarefa.value);
    }
});

//capturando o evento de click no botão. É obrigatório ter uma função como segundo parametro do eventlistener.
botao.addEventListener('click', function(){
    if(!inputTarefa.value) return; //se o valor dos dados do input for vazio, não retorna nada.
    criaTarefa(inputTarefa.value); //passamos a função o valor atribuido ao input.
});

document.addEventListener('click', function(e){ //precisamos passar um evento a esta função para saber em qual parte do documento está sendo clicado, para então apagarmos.
    const elemento = e.target; //capturamos o evento
    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove();//removemos o pai do elemento que queremos apagar, como cada elemento é inserido dentro de uma list LI, basta apagar a lista LI. 
        salvaTarefa(); //Como apagamos uma tarefa, salvamos o apagamento.
    }
});

function salvaTarefa(){
    const listaTarefas = tarefa.querySelectorAll('li');//Pegamos TODAS as listas inseridas, isso retorna uma node list.
    
    //pegando somente o TEXTO inserido na li
    const toDoList = [];
    for(let tarefa of listaTarefas){//pra cada tarefa em lista de tarefas, pega o texto e remove o texto apagar
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('apagar', '').trim();//função trim remove o espaço que fica depois do texto que está na lista
        toDoList.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(toDoList);//Criamos uma string atrávez do array todolist em formato JSON.
    localStorage.setItem('tarefas', tarefasJson);//tarefas é o nome dado para acessarmos posteriormente essa minibase de dados posteriormente. Só salva strings.
}

function adcTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); //transformamos do JSON para string novamente.

    for( let tarefa of listaDeTarefas){
        criaTarefa(tarefa);//recriamos a lista de tarefas passando a tarefa armazenada anteriormente.
    }
}

adcTarefasSalvas();