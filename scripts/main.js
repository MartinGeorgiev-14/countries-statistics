import * as basic from "./baiscFunctions.js"
import * as specific from "./appSpecific.js"
import * as data from "../data/countries_data.js"
import * as display from "./displayer.js"


const elementManager = basic.createBaseElement() 
//first header container elements
const numOfCountries = elementManager.getElementById("num-of-countries")
const italicSearchStats = elementManager.getElementById("italic-search-stats")
const satisfiedCriteriaNum = elementManager.getElementById("satisfied-criteria-num")
const currentCountries = elementManager.getElementById("current-countries")
//second header container elements
const countrySearch = elementManager.getElementById("country-search")
const secondHeaderContainer = elementManager.getElementById("second-header-container")
const buttonOptionContainer = elementManager.getElementById("button-option-container")
// const nameSort = elementManager.getElementById("name-sort")
// const capitalSort = elementManager.getElementById("capital-sort")
// const populationSort = elementManager.getElementById("population-sort")
// export const nameIcon = elementManager.getElementById("name-icon")
// export const capitalIcon = elementManager.getElementById("capital-icon")
// export const populationIcon = elementManager.getElementById("population-icon")

//main elements
const countriesInfoContainer = elementManager.getElementById("countries-info-container")

currentCountries.setInnerHTML(`Currently, we have ${data.dataCountries.length} countries`)
display.infoDataDisplay()

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
    const length = specific.searchByCountry(countrySearch.getValue())
    if(length === 1){
        satisfiedCriteriaNum.setInnerHTML(`${length} country satisfied the search criteria`)
    }
    else if(length > 1){
        satisfiedCriteriaNum.setInnerHTML(`${length} countries satisfied the search criteria`)
    }
    else{
        satisfiedCriteriaNum.setInnerHTML("")
    }
    
})