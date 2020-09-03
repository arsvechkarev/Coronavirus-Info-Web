const COUNTRIES_KEY = 'Countries'
const COUNTRY_NAME_KEY = 'Country'
const COUNTRY_CODE_KEY = 'CountryCode'
const CONFIRMED_KEY = 'TotalConfirmed'
const RECOVERED_KEY = 'TotalRecovered'
const DEATHS_KEY = 'TotalDeaths'

fetch('https://api.covid19api.com/summary')
  .then(string => string.json())
  .then(json => createSortedList(json))
  .then(list => renderTable(list))

function createSortedList(json) {
  const array = json[COUNTRIES_KEY]
  array.sort((a, b) => b[CONFIRMED_KEY] - a[CONFIRMED_KEY])
  return array
}

function renderTable(countries) {
  const table = document.createElement('table')
  table.style.marginTop = window.innerHeight / 6 + 'px'
  table.setAttribute('id', 'table_countries')
  const bg = document.getElementById('bg')
  bg.appendChild(table)
  renderTableHeaders(table)
  renderCountriesRows(countries, table)
}

function renderTableHeaders(table) {
  const firstRow = table.insertRow()
  firstRow.insertCell() // Empty cell
  const countryNameCell = firstRow.insertCell()
  const confirmedCell = firstRow.insertCell()
  const recoveredCell = firstRow.insertCell()
  const deathsCell = firstRow.insertCell()
  countryNameCell.appendChild(document.createTextNode('Country'))
  confirmedCell.appendChild(document.createTextNode('Confirmed'))
  recoveredCell.appendChild(document.createTextNode('Recovered'))
  deathsCell.appendChild(document.createTextNode('Deaths'))
  countryNameCell.setAttribute('class', 'table_countries_header')
  confirmedCell.setAttribute('class', 'table_countries_header')
  recoveredCell.setAttribute('class', 'table_countries_header')
  deathsCell.setAttribute('class', 'table_countries_header')
  confirmedCell.setAttribute('id', 'header_confirmed')
  recoveredCell.setAttribute('id', 'header_recovered')
  deathsCell.setAttribute('id', 'header_deaths')
}

function renderCountriesRows(countries, table) {
  for (let i = 0; i < countries.length; i++) {
      const row = table.insertRow()
      const numberCell = createStyledCell(row)
      const countryCell = createStyledCell(row)
      const confirmedCell = createStyledCell(row)
      const recoveredCell = createStyledCell(row)
      const deathsCell = createStyledCell(row)
      numberCell.appendChild(document.createTextNode(`${(i + 1)}.`))
      countryCell.appendChild(document.createTextNode(countries[i][COUNTRY_NAME_KEY]))
      appendNumber(confirmedCell, countries[i], CONFIRMED_KEY)
      appendNumber(recoveredCell, countries[i], RECOVERED_KEY)
      appendNumber(deathsCell, countries[i], DEATHS_KEY)
    }
  }  

function createStyledCell(row) {
  const cell = row.insertCell()
  cell.setAttribute('class', 'table_cell')
  return cell
}

// Countries that for whatever reason don't provide recovered data.
// Instead of recovered number symbol `—` should be displayed instead  
const countriesWithoutRecovered = ['SE', 'RS', 'NL']

function appendNumber(cell, country, key) {
  cell.style.textAlign = 'right'
  let text = country[key].toLocaleString()
  if (key == RECOVERED_KEY && countriesWithoutRecovered.includes(country[COUNTRY_CODE_KEY])) {
    text = '—\xa0\xa0\xa0\xa0'
  }
  cell.appendChild(document.createTextNode(text));
}
