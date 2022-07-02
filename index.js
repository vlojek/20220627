const express = require("express")
const app = express()
const port = 3000
const axios = require("axios")

app.get("/region/:regionName", async (req, res) => {
  try {
    let regionName = req.params.regionName
    const response = await axios.get("https://restcountries.com/v3.1/region/" + regionName)
    const countries = response.data

    regionName = response.data[0].region
    let helperArray = []
    let dayCounter = 0
    let output = ""
    let countryList = []

    const sorted = countries.reduce((groupedStartOfWeek, country) => {
      const day = country.startOfWeek
      console.log("day: " + day)
      if (groupedStartOfWeek[day] == null) groupedStartOfWeek[day] = []
      groupedStartOfWeek[day].push(country.name.common)
      return groupedStartOfWeek
    }, {})

    console.log(sorted)

    /*
    for (i = 0; i < response.data.length; i++) {
      helperArray.push(response.data[i].startOfWeek)
      console.log("helper array: " + helperArray)
    }
    let uniqueDays = [...new Set(helperArray)]
    console.log("unique days: " + uniqueDays.length)
    console.log("unique day array: " + uniqueDays)

    for (i = 0; i < uniqueDays.length; i++) {
      console.log("API: " + response.data[i].startOfWeek + ", Array: " + uniqueDays[i])
      for (i = 0; i < response.data.length; i++) {
        if (response.data[i].startOfWeek == uniqueDays[i]) {
          console.log("true")
          dayCounter += 1
        }
        countryList.push(response.data[i].name.common)
        console.log(dayCounter)
        output += uniqueDays[i] + ": " + dayCounter[i] + countryList[i] + "</br>"
      }
    }
    */

    res.send(`Test Output: <br><br> ${JSON.stringify(sorted)}`)
  } catch (err) {
    console.error(err)
    res.send("Something went wrong.")
  }
})
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
