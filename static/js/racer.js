const racer_data = async (event) => {
    // get the season and round
    event.preventDefault()
    let season = document.querySelector('#season').value
    let round = document.querySelector('#round').value
    
    let url = `https://ergast.com/api/f1/${season}/${round}/driverStandings.json`
    // get request 
    let response = await axios.get(url)
    // get data that we want
    driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    populateRacer(driverStandings)
}
function populateRacer(driverStandings){
    let count = 0
    table.innerText = ''
    for(const racer of driverStandings){
        if(count < 7){
            // create new row 
            let table = document.getElementById('table')
            let row  = table.insertRow(count)
            // create new cells for the row 
            let position = row.insertCell(0)
            let racer_name = row.insertCell(1)
            let nationality = row.insertCell(2)
            let sponsor = row.insertCell(3)
            let points = row.insertCell(4)
            // get the data and insert them into row
            position.innerText = `${racer.position}`
            racer_name.innerText = `${racer.Driver.givenName} ${racer.Driver.familyName}`
            nationality.innerText = `${racer.Driver.nationality}`
            sponsor.innerText = `${racer.Constructors[0].name}`
            points.innerText = `${racer.points}`
            count++;
        }
    }
}
document.getElementById('get_standings').addEventListener('submit', racer_data)