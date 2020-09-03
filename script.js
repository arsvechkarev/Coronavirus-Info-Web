const TABLE_COUNRIES = 'table_countries'

const COUNTRIES_KEY = 'Countries'
const COUNTRY_NAME_KEY = 'Country'
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
  const table = document.getElementById(TABLE_COUNRIES)

  for (let i = 0; i < countries.length; i++) {
    const row = table.insertRow()
    const numberCell = createStyledCell(row)
    const countryCell = createStyledCell(row)
    const confirmedCell = createStyledCell(row)
    const recoveredCell = createStyledCell(row)
    const deathsCell = createStyledCell(row)
    numberCell.appendChild(document.createTextNode(`${(i + 1)}.`))
    countryCell.appendChild(document.createTextNode(countries[i][COUNTRY_NAME_KEY]));
    appendNumber(confirmedCell, countries[i][CONFIRMED_KEY])
    appendNumber(recoveredCell, countries[i][RECOVERED_KEY])
    appendNumber(deathsCell, countries[i][DEATHS_KEY])
  }
}

function createStyledCell(row) {
  const cell = row.insertCell()
  cell.setAttribute('class', 'table_cell')
  return cell
}

function appendNumber(cell, number) {
  cell.style.textAlign = 'right'
  cell.appendChild(document.createTextNode(format(number)));

  function format(number) {
    const result = []
    const string = number.toString()
    let i = string.length;
    counter = 1
    while (i--) {
      result.push(string[i])
      if ((counter) % 3 == 0) {
        result.push(' ')
      }
      counter++
    }
    return result.reverse().join('')
  }
}

