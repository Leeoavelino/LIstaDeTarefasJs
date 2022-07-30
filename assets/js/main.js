const inputTarefa = document.querySelector('.input-tarefa')
//selecionando o input aonde iremos lançar as tarefas
const tarefas = document.querySelector('.tarefas')
//selecionando aonde iremos por o resultado com as tarefas
function criaLi(){
    const li = document.createElement('li')
    return li
    //funçao criada exclusivamente para criar e retornar o li
}

inputTarefa.addEventListener('keypress', function(e){ //pegar a tecla enter 
    if(e.keyCode === 13){
        if(!inputTarefa.value) return

        criaTarefa(inputTarefa.value)

    }
})

function limpaInput(){ 
    //apos escrever e alimentar o tarefas a parte de escrever ficar limpa
    inputTarefa.value = ''
    inputTarefa.focus()  //apos clicar enter volta pro mesmo local para escrever outro
}

function criaBotaoApagar(li){
    //cria botao para apagar as tarefas criadas
    li.innerText += ' ' //espaço entre o li e o botao que vai ficar ao lado do li
    const botaoApagar = document.createElement('button') //criando elemento botao
    botaoApagar.innerText = 'Apagar' //o nome que estara no botao

    botaoApagar.setAttribute('class', 'apagar' )
    botaoApagar.setAttribute('title', 'apagar essa tarefa' )
    //setando a classe apagar e o titulo apagar tarefa ao botao
    li.appendChild(botaoApagar)

}


function criaTarefa(textoInput){
    //função criada para receber os textos que serao enviados para class tarefas
    const li = criaLi() //o li dessa constante recebe o li da funçao criaLi
    //cria uma li que vai alimentar a class tarefas
    li.innerText = textoInput  //recebe o paramentro da class

    tarefas.appendChild(li) //li é adicionado a tarefas como elemento filho

    limpaInput()  //funçao de limpar tarefa e com focus aonde escreve

    criaBotaoApagar(li)  

    salvarTarefas()

}

function adicionar(){
//quando clicar no botao vem para essa funçao
    if(!inputTarefa.value) return  //se tiver com valor vazio nao continua a funçao

    criaTarefa(inputTarefa.value)
  
}

document.addEventListener('click', function(e){

    const el = e.target

    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas(){
    //funçao para criar array com as tarefas e salvar
    const liTarefas =  tarefas.querySelectorAll('li')

    const listaDeTarefas = []

    for(let tarefa of liTarefas){
        
        let tarefaTexto = tarefa.innerText   //local do erro. aqui estava innerHTML

        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()

        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)

    

}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
   
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}

adicionaTarefasSalvas()