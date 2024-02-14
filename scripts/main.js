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
const statisticsButtons = elementManager.getElementById("statistics-buttons")

//Shows the total count of countries in the dom
currentCountries.setInnerHTML(`Currently, we have ${data.dataCountries.length} countries`)
//Starting function that displays countries and statistics
display.infoDataDisplay()

//Event listener that sorts the countries info container in asc or desc based on the button
buttonOptionContainer.addEventListener("click", function(el){
    
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

//Event listener that validates if the entered value is correct, updates the paragraph with number of found countries based on criteria
//and removes all applied sorts on countries info container
countrySearch.addEventListener("keyup", function(){

   if(specific.checkForInvalidInput(countrySearch.getValue())){
        alert("Please enter only letters")
        countrySearch.setValue("")
        return
   }
    //Variable that shows how many countries are found
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

//Event listener that updates the statistics based on which clicked button 
statisticsButtons.addEventListener("click", function(button){
  const target = button.target.innerText.toLowerCase()
  display.statisticsDataDisplay(undefined, target, display.currentData)
})

