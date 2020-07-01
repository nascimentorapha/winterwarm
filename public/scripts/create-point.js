function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value=>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


// function to select items to collect on create page
function handleSelectedItem(event) {
    const itemLi = event.target
    
    //add or remove class automatically
    itemLi.classList.toggle("selected") 

    // console.log(event.target.dataset.id)
    const itemID = itemLi.dataset.id


    // Verify selected items. If true, get items

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemID //true or false
        return itemFound
        }
    )

    // if selected, remove selection

    if( alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemID 
            return itemIsDifferent 
        } )
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemID)
    }

    collectedItems.value = selectedItems
}


for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}