import * as specific from "./appSpecific.js"
import * as basic from "./baiscFunctions.js"
import * as dataC from "../data/countries_data.js"

const elementManager = basic.createBaseElement() 
const countriesInfoContainer = elementManager.getElementById("countries-info-container")
export let currentData = dataC.dataCountries


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
        languages.setInnerHTML(`Language/s: ${specific.countryEnumerator(element.languages)}`)
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
}