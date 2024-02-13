import * as basic from "./baiscFunctions.js"
import * as specific from "./appSpecific.js"
import * as data from "../data/countries_data.js"
import * as display from "./displayer.js"

const rootStyles = getComputedStyle(document.documentElement)
const mainColor = rootStyles.getPropertyValue("--main-color")

const elementManager = basic.createBaseElement() 
//first header container elements
const numOfCountries = elementManager.getElementById("num-of-countries")
const italicSearchStats = elementManager.getElementById("italic-search-stats")
const satisfiedCriteriaNum = elementManager.getElementById("satisfied-criteria-num")
const currentCountries = elementManager.getElementById("current-countries")
const icons = elementManager.querySelectorAll('.sort-icon')
//second header container elements
const countrySearch = elementManager.getElementById("country-search")
const secondHeaderContainer = elementManager.getElementById("second-header-container")
const buttonOptionContainer = elementManager.getElementById("button-option-container")

//main elements
const countriesInfoContainer = elementManager.getElementById("countries-info-container")

currentCountries.setInnerHTML(`Currently, we have ${data.dataCountries.length} countries`)
display.infoDataDisplay()

console.log(specific.totalWorldPopulationCalculator().toLocaleString('en-US'))

buttonOptionContainer.getElement().addEventListener("click", function(el){
    
    if(el.target.id === "name-sort"){
        specific.sortExecuter("name")
    }
    else if(el.target.id === "capital-sort"){
        specific.sortExecuter("capital")
    }
    else if(el.target.id === "population-sort"){
        specific.sortExecuter("population")
    }
    else{
        return
    }
})


countrySearch.getElement().addEventListener("keyup", function(){

   if(specific.checkForInvalidInput(countrySearch.getValue())){
        alert("Please enter only letters")
        countrySearch.setValue("")
        return
   }

    const length = specific.searchByCountry(countrySearch.getValue())
    specific.iconRemover(icons.getAllElements())

    if(length === 1){
        satisfiedCriteriaNum.setInnerHTML(`${length} country satisfied the search criteria`)
        satisfiedCriteriaNum.changeColor(mainColor)
    }
    else if(length > 1){
        satisfiedCriteriaNum.setInnerHTML(`${length} countries satisfied the search criteria`)
        satisfiedCriteriaNum.changeColor(mainColor)
    }
    else{
        satisfiedCriteriaNum.setInnerHTML("")
        satisfiedCriteriaNum.changeColor("transparent")
    }
    
})