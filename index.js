const endPoint = "http://localhost:3000/api/v1/instruments"

document.addEventListener("DOMContentLoaded", () => {
  getInstruments()
})


function getInstruments() {
  fetch(endPoint)
  .then(resp => resp.json())
  .then(instruments => {
    console.log(instruments);
    instruments.data.forEach(instrument => {
      const instrumentMarkup = `
      <div data-id=${instrument.id}>
      <img src=${instrument.attributes.image_url}>
      <h3>${instrument.attributes.name}</h3>
      <p>${instrument.attributes.tuning}</p>
      </div>
      <br></br>`

      document.querySelector('#instrument-container').innerHTML += instrumentMarkup 
    }) 
  })
}

