function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")  //promeça 
    .then(res => res.json() )  
    .then(  states  => {
            for( const state of states){ //estrutura de repetição
            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`

        }
    } )
}
populateUFs()

function getCities(event){
    const citySelect =  document.querySelector("select[name=city]")
    const stateInput =  document.querySelector("Input[name=state]")

    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.disabled = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

        fetch(url)
        .then(res => res.json()) 
        .then(  cities => {
        
        for( const city of cities){
            citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]") // pegar o campo
  .addEventListener("change",getCities) //ouvidor de eventos= change é mudar
//itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")
    for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
 const collectesItems = document.querySelector("input[name=items]")

let seletedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou tremover uma classe com javaScript
    itemLi.classList.toggle("selected")
    const itemId= itemLi.dataset.id

console.log('ITEM ID:', itemId)

    //verificar se existe items selecionados, se sim
    //pegar os iems selecionados
    const alreadySelected = seletedItems.findIndex(item => {
        const itemFound = item == itemId  // isso sera true ou falso
        return itemFound
    })



    //se já estivert selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item !=itemId //false
            return itemIsDifferent
        })

            selectedItems = filteredItems
            
    } else {
        
    
    //se não estiver seleciondo, adicionar a seleção
    seletedItems.push(itemId)
    }

 //console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os items selecionados
        collectesItems.value = seletedItems
}
