import * as basic from "./baiscFunctions.js"
import * as main from "./main.js"
import * as dataC from "../data/countries_data.js"
import * as display from "./displayer.js"
const elementManager = basic.createBaseElement() 

// const icons = elementManager.querySelectorAll('.sort-icon')

let nameBool = false
let capitalBool = false
let populationBool = false

export function sortExecuter(operation){
    const icons = elementManager.querySelectorAll('.sort-icon')
   
    // if(operation === "name"){
    //     operationChecker(nameBool)
    // }
    // else if(operation === "capital"){
    //     operationChecker(capitalBool)
    // }
    console.log(nameBool, capitalBool, populationBool)
    if(operation === "name"){
        if(nameBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(0).classList.add("fa-sort-up")
            nameBool = false
            sortBoolReset(nameBool)
            nameSort(display.currentData)
            
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(0).classList.add("fa-sort-down")
            nameBool = true
            nameSort(display.currentData)
        }
    }
    else if(operation === "capital"){
        if(capitalBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(1).classList.add("fa-sort-down")
            capitalBool = false
            console.log("exec desc capital")
            sortBoolReset(capitalBool)
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(1).classList.add("fa-sort-up")
            capitalBool = true
            console.log("exec asc capital")
        }
    }
    else{
        if(populationBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(2).classList.add("fa-sort-down")
            populationBool = false
            console.log("exec desc population", populationBool)
            sortBoolReset(populationBool)
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(2).classList.add("fa-sort-up")
            populationBool = true
            console.log("exec asc population", populationBool)
        }
    }
}

// function operationChecker(bool){
//     const iconsArr = elementManager.querySelectorAll('.sort-icon')
//     const icon = iconButtonChecker(bool)
//     console.log(icon)

//     if(bool){
//         iconRemover(iconsArr.getAllElements())
//         icon.classList.add("fa-sort-down")
//         bool = false
//         console.log("exec desc")
//         sortBoolReset(bool)
//     }
//     else{
//         iconRemover(iconsArr.getAllElements())
//         icon.classList.add("fa-sort-up")
//         bool = true
//         console.log("exec asc")
//     }

// }

function sortfunc(data){
    console.log("work")
}

function sortBoolReset(bool){
    switch(bool){
        case nameBool:
            capitalBool = false
            populationBool = false
            break
        case capitalBool:
            nameBool = false
            populationBool = false
            break
        case populationBool:
            nameBool = false;
            capitalBool = false;
            break
        default:
            nameBool = false
            capitalBool = false
            populationBool = false
            break
    }
}

// function iconButtonChecker(boolVar){
    
//     const icons = elementManager.querySelectorAll('.sort-icon')
//     if(boolVar === nameBool){
//         return icons.getCertainElement(0)
//     }
//     else if(boolVar === capitalBool){
//         return icons.getCertainElement(1)
//     }
// }

export function iconRemover(arrayOfButtons){
    arrayOfButtons.forEach(button => {
        button.classList.remove("fa-sort-down")
        button.classList.remove("fa-sort-up")
    });
}

export function countryEnumerator(array){
    let countries = ""
 
    array.forEach((element, index) => {
        if(array.length > 1){
            if(array.length - 1 === index){
                countries += `and ${element}`
            }
            else if(array.length - 2 === index){
                countries += `${element} `
            }
            else{
                countries += `${element}, `
            }
        }else{
            countries += element
        }
    })

    return countries
}

export function searchByCountry(value, data = display.currentData){
    const regex = new RegExp(`\\b${value}\\w*\\b`, 'i')
    let length = 0
    if(value){
    const filteredData = data.filter(element => {
        if(regex.test(element.name)){
            return element
        }
    })
    length = filteredData.length
    display.infoDataDisplay(filteredData)

    }
    else{
        display.infoDataDisplay(data)
    }

    return length
}

function nameSort(data){
    display.infoDataDisplay(data.sort().reverse())
}


export function sortData(type, data){
console.log(type)
    switch(type){
        case "nameDesc":
            display.infoDataDisplay(data.sort().reverse())
            break;
        case "nameAsc":
            display.infoDataDisplay(data.sort())
            break;
    }


    // const sortedData = data.sort().reverse()
    // console.log(sortedData)
    // display.infoDataDisplay(sortedData)
}
