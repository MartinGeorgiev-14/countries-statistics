import * as basic from "./baiscFunctions.js"
import * as main from "./main.js"
import * as dataC from "../data/countries_data.js"
import * as display from "./displayer.js"
const elementManager = basic.createBaseElement() 
//Variables that check which sort is applied
//false applies desc sort
//true applies asc sort
let varBool = false
let capitalBool = false
let populationBool = false

// Function that displays countries info container based on which sorting method was chosen
export function sortExecuter(operation){
    const icons = elementManager.querySelectorAll('.sort-icon')
   
    if(operation === "name"){
        if(varBool){
            //removes all sort icons on all buttons
            iconRemover(icons.getAllElements())
            //sets icon on the sort button that was clicked
            icons.getCertainElement(0).classList.add("fa-sort-up")
            //changes the check value of the clicked sort button
            varBool = false
            //resets the check values of the rest sort buttons
            sortBoolReset(varBool)
            //sorts and displays the country info container based given arguments
            display.infoDataDisplay(sorter("name", "asc"))
            
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(0).classList.add("fa-sort-down")
            varBool = true
            display.infoDataDisplay(sorter("name", "desc"))
        }
    }
    else if(operation === "capital"){
        if(capitalBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(1).classList.add("fa-sort-up")
            capitalBool = false
            sortBoolReset(capitalBool)
            display.infoDataDisplay(sorter("capital", "asc"))
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(1).classList.add("fa-sort-down")
            capitalBool = true
            display.infoDataDisplay(sorter("capital", "desc"))
        }
    }
    else{
        if(populationBool){
            iconRemover(icons.getAllElements())
            icons.getCertainElement(2).classList.add("fa-sort-up")
            populationBool = false
            sortBoolReset(populationBool)
            display.infoDataDisplay(sorter("population", "asc"))
        }
        else{
            iconRemover(icons.getAllElements())
            icons.getCertainElement(2).classList.add("fa-sort-down")
            populationBool = true
            display.infoDataDisplay(sorter("population", "desc"))
        }
    }
}

//Function checks which check button is given and then resets the check values of the rest buttons
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

//Functions that removes icons out of array of buttons
export function iconRemover(arrayOfButtons){
    arrayOfButtons.forEach(button => {
        button.classList.remove("fa-sort-down")
        button.classList.remove("fa-sort-up")
    });
}

//Functions that returns combined string of languages
export function languageEnumerator(array){
    let countries = ""
 
    if(array.length === 1){
        countries += array[0]
    }
    else{
        const last = array.splice(array.length - 1)
        countries = array.join(", ")
        countries += ` and ${last}`
    }

    return countries
}

//Function that returns filtered array of countries based on search
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

//Functon that sorts array 
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

   return sortedData
}

//Function that returns combined population of all countries
export function totalWorldPopulationCalculator(data = dataC.dataCountries){
    let totalNumber = 0

    data.forEach(element => {
        totalNumber += element.population
    })

    return totalNumber
}

//Function that checks given input if it has different characters than letters
export function checkForInvalidInput(input){
    const regex = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+/
    return regex.test(input)
}

//used in statistics
//Function that returns sorted and filtered countries based on population or number of spoken languages
export function sortCountries(data = dataC.dataCountries, number = 9, type = "population"){
    if(type === "population"){
        return sort(data, number)
    }
    //checks for number of spoken languages
    else if(type === "languages"){
        return data.sort((a,b) => b[type].length - a[type].length).filter((element,index) => {
            if(index < number){
                return element
            }
        })
    }
    else{
        return sort(data, number)
    }

    function sort(sortData, total){
        return sortData.sort((a,b) => b[type] - a[type]).filter((element,index) => {
            if(index < total){
                return element
            }
        })
    }


}
//Functions that calculate the percentage between two numbers
export function percentageDifferenceCalc(firstNum, secondNum){
    return (secondNum / firstNum) * 100
}