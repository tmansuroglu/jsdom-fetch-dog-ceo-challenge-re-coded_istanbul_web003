console.log('%c HI', 'color: firebrick')

function isALink(link){
    return link.slice(0,8) == "https://"
}


document.addEventListener("DOMContentLoaded", () => {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const dogImageContainer = document.getElementById("dog-image-container");
    
    

    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(json => {
            for(const property in json){
                if(Array.isArray(json[property])){
                    for (const image of json[property]){
                        if (isALink(image)){
                            dogImageContainer.innerHTML += `<img src=${image} alt="dog"><br>`
                        }
                    }
                }
            }
        })
    
    
    const dropDownSelector = document.getElementById("breed-dropdown");
    const listOfDogBreeds = document.getElementById("dog-breeds");
    
    
    dropDownSelector.addEventListener("change",(e) => {
        console.log("changed")
        fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            for(const property in json){
                if(typeof(json[property])=== "object"){
                    listOfDogBreeds.innerHTML = ""
                    for (const breed of Object.keys(json[property])){
                        const dropDownValue = dropDownSelector.options[dropDownSelector.selectedIndex].value;
                        if (breed[0]===dropDownValue){
                            const newLi = document.createElement("li");
                            newLi.innerText = breed;
                            listOfDogBreeds.appendChild(newLi);
                        }
                    }     
                }
            }
        })      
    });

    


});