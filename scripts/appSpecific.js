import * as basic from "./baiscFunctions.js"
import * as main from "./main.js"
import * as dataC from "../data/countries_data.js"
import * as display from "./displayer.js"
const elementManager = basic.createBaseElement() 

// const icons = elementManager.querySelectorAll('.sort-icon')

let varBool = false
let capitalBool = false
let populationBool = false

export function sortExecuter(operation){
    const icons = elementManager.querySelectorAll('.sort-icon')
   
    // if(operation === "name"){
    //     operationChecker(varBool)
    // }
    // else if(operation === "capital"){
    //     operationChecker(capitalBool)
    // }
    console.log(varBool, capitalBool, populationBool)
    if(operation === "name"){
        if(varBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(0).classList.add("fa-sort-up")
            varBool = false
            sortBoolReset(varBool)
            sorter("name", "asc")
            
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(0).classList.add("fa-sort-down")
            varBool = true
            sorter("name", "desc")
        }
    }
    else if(operation === "capital"){
        if(capitalBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(1).classList.add("fa-sort-up")
            capitalBool = false
            sortBoolReset(capitalBool)
            sorter("capital", "asc")
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(1).classList.add("fa-sort-down")
            capitalBool = true
            sorter("capital", "desc")
        }
    }
    else{
        if(populationBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(2).classList.add("fa-sort-up")
            populationBool = false
            sortBoolReset(populationBool)
            sorter("population", "asc")
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(2).classList.add("fa-sort-down")
            populationBool = true
            sorter("population", "desc")
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
        case varBool:
            capitalBool = false
            populationBool = false
            break
        case capitalBool:
            varBool = false
            populationBool = false
            break
        case populationBool:
            varBool = false;
            capitalBool = false;
            break
        default:
            varBool = false
            capitalBool = false
            populationBool = false
            break
    }
}

// function iconButtonChecker(boolVar){
    
//     const icons = elementManager.querySelectorAll('.sort-icon')
//     if(boolVar === varBool){
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

export function searchByCountry(value, data = dataC.dataCountries){
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

function sorter(type, mode, data = display.currentData){
    const sortedData = data.sort((a,b) => {
        const varA = a[type]
        const varB = b[type]

        if(mode === "desc"){
            if(varA < varB){
                return 1
            }
            if(varA > varB){
                return -1
            }
        }
        if(mode === "asc"){
            if(varA < varB){
                return -1
            }
            if(varA > varB){
                return 1
            }
        }

        return 0
    })

   display.infoDataDisplay(sortedData)
}

export function totalWorldPopulationCalculator(data = dataC.dataCountries){
    let totalNumber = 0

    data.forEach(element => {
        totalNumber += element.population
    })

    return totalNumber
}

export function checkForInvalidInput(input){
    const regex = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+/
    return regex.test(input)
}

export function sortCountriesDesc(data = dataC.dataCountries, number = 9, type = "population"){
    return data.sort((a,b) => b[type] - a[type]).filter((element,index) => {
        if(index < number){
            return element
        }
    })
}
