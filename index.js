const endPoint = "http://localhost:3000/api/v1/instruments"

document.addEventListener("DOMContentLoaded", () => {
  getInstruments()
  const createInstrumentForm = document.querySelector("#create-instrument-form")

  createInstrumentForm.addEventListener("submit", (e) => 
  createFormHandler(e)
  )
//  addSounds()
})


function getInstruments() {
  fetch(endPoint)
  .then(resp => resp.json())
  .then(instruments => {
    instruments.data.forEach(instrument => {
      const instrumentMarkup = `
      <div data-id=${instrument.id}>
      <h3>${instrument.attributes.name}</h3>
      <p>${instrument.attributes.tuning}</p>
      <button class="sound-button" id="sound-${instrument.id}">Sound</button>
      <form onsubmit="return deleteSound(${instrument.id}); ">
        <input type="submit" value="Delete" id="delete-${instrument.id}"/>
      </form>
      </div>
      <br></br>`
      
      document.querySelector('#instrument-container').innerHTML += instrumentMarkup;
      return new Promise(addSounds(`${instrument.id}`))
    })
  }).catch(err => console.log(err));
}

function createFormHandler(e) {
  e.preventDefault()
  const inputName = document.querySelector('#input-name').value
  const tuningInput = parseInt(document.querySelector('#tunings').value)
  postFetch(inputName, tuningInput)
}

function deleteSound(id)
{
  debugger
  let el = document.get(`${id}`)
}


function addSounds(id) {
  const coll = document.getElementsByClassName('sound-button');
  let collLn = Array.prototype.slice.call(coll,  0);
  for (let soundBn of collLn) {
    debugger
    soundBn.addEventListener('click', e => {
      
        playTone()
      })
    }
}

function postFetch(name, tuning_id) {
  const bodyData = {name, tuning_id}
  fetch(endPoint, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(resp => resp.json())
  .then(instrument => {
    debugger
    const instrumentData = instrument
    instrumentMarkup = `
    <div data-id=${instrumentData.id}.>
    <h3>${instrumentData.attributes.name}</h3>
    <p>${instrumentData.attributes.tuning.name}</p>
    </div>
    `
  })

}

function playTone() {
  const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");
}