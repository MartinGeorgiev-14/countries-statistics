import * as specific from "./appSpecific.js"
import * as basic from "./baiscFunctions.js"
import * as dataC from "../data/countries_data.js"

const elementManager = basic.createBaseElement() 
const countriesInfoContainer = elementManager.getElementById("countries-info-container")
const countriesStatisticsContainer = elementManager.getElementById("countries-statistics-container")
//Variable that stores the last edited array of countries
export let currentData = dataC.dataCountries

//Function that displays countries info container and statistics
export function infoDataDisplay(data = dataC.dataCountries, parentEl = countriesInfoContainer.getElement()){
    currentData = data
    basic.childRemover(parentEl)

    data.forEach(element => {

        const infoContainer = elementManager.createElement("div")
        const bannerTitle = elementManager.createElement("div")
        const countryBanner = elementManager.createElement("img")
        const countryTitle = elementManager.createElement("p")
        const countryStats = elementManager.createElement("div")
        const capital = elementManager.createElement("p")
        const languages = elementManager.createElement("p")
        const population = elementManager.createElement("p")

        infoContainer.addClass("info-container")
        bannerTitle.addClass("banner-title")
        countryStats.addClass("country-stats")

        countryBanner.setAttribute("src", element.flag)
        countryTitle.setInnerHTML(element.name)
        capital.setInnerHTML(`Capital: ${element.capital}`)
        languages.setInnerHTML(`Language/s: ${specific.languageEnumerator(element.languages)}`)
        population.setInnerHTML(`Population: ${element.population.toLocaleString('en-US')}`)

        countryBanner.appendTo(bannerTitle.getElement())
        countryTitle.appendTo(bannerTitle.getElement())
        bannerTitle.appendTo(infoContainer.getElement())
        capital.appendTo(countryStats.getElement())
        languages.appendTo(countryStats.getElement())
        population.appendTo(countryStats.getElement())
        countryStats.appendTo(infoContainer.getElement())
        infoContainer.appendTo(parentEl)
    })

    statisticsDataDisplay(data === dataC.dataCountries)
}
//Function that displays statistics
export function statisticsDataDisplay(worldCheck, type = "population", data = currentData){
    //Variable that stores all filtered countries
    let filteredCountries  
    //Variable that stores the highest value out of filteredCountries
    let highesValue 

    basic.childRemover(countriesStatisticsContainer.getElement())

    //Checks if the array of countries is not changed
    if(worldCheck && type === "population"){
        highesValue = {
            name: "World",
            population: specific.totalWorldPopulationCalculator()
        }
        filteredCountries = specific.sortCountries()
        filteredCountries.unshift(highesValue)
        
    }else{
        filteredCountries = specific.sortCountries(currentData, 10, type)
        highesValue = filteredCountries[0]
    }

    filteredCountries.forEach(element => {
        const countryStats = elementManager.createElement("div")
        const countryName = elementManager.createElement("p")
        const outerBar = elementManager.createElement("div")
        const innerBar = elementManager.createElement("div")
        const population = elementManager.createElement("p")

        countryStats.addClass("country-stats-row")
        outerBar.addClass("outer-bar")
        innerBar.addClass("inner-bar")
        
        //Checks if to display the population property or count of languages
        if(type === "population"){
            countryName.setInnerHTML(element.name)
            innerBar.setStyle("width", `${specific.percentageDifferenceCalc(highesValue[type], element[type])}%`)
            population.setInnerHTML(element[type].toLocaleString('en-US'))
        }
        else{
            countryName.setInnerHTML(element.name)
            innerBar.setStyle("width", `${specific.percentageDifferenceCalc(highesValue[type].length, element[type].length)}%`)
            population.setInnerHTML(element[type].length.toLocaleString('en-US'))
        }

        innerBar.appendTo(outerBar.getElement())
        countryName.appendTo(countryStats.getElement())
        outerBar.appendTo(countryStats.getElement())
        population.appendTo(countryStats.getElement())
        countryStats.appendTo(countriesStatisticsContainer.getElement())

    })

}