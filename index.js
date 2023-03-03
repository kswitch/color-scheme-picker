const colorSchemeForm = document.querySelector('#color-scheme-form')
const baseURL = 'https://www.thecolorapi.com'
const endpointInfo = '/id?'
const endpointScheme = '/scheme?'

colorSchemeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const colorSelectedHex = document.querySelector(".color-selected").value.slice(1)
    const modeSeleted = document.querySelector(".mode-selected").value
    if(e.submitter.id == 'get-color-scheme') {
        getColorScheme(colorSelectedHex, modeSeleted)
    }
    if(e.submitter.id == 'get-color-info') {
        getColorInfo(colorSelectedHex)
    }
})

function getColorScheme(color, mode) {
    fetch(`${baseURL}${endpointScheme}hex=${color}&mode=${mode}`)
        .then(res => res.json())
        .then(color => {
            renderColorScheme(color)
        })
}

function renderColorScheme(color) {
    // <p class="generated-colors-name">${color.colors[i].name.value}</p>   
    let columnHtml = ''
    Array(color.colors.length).fill(0).map((item, i) => {
        columnHtml += `
        <div class="colors-result">
            <div class="generated-colors" style="background-color: ${color.colors[i].hex.value};">
            </div>
            <div class="generated-colors-hex">
                ${color.colors[i].hex.value}
            </div>
        </div>
        `
    })  
    document.querySelector('main').innerHTML = columnHtml
}
    
function getColorInfo (color) {
    fetch(`${baseURL}${endpointInfo}hex=${color}`)
    .then(res => res.json())
    .then(color => {
        renderColorInfo(color)
    })
}

function renderColorInfo(color) {
    document.querySelector('main').innerHTML = `
    <div class="colors-result">
        <div>
            <img  class="generated-colors" src="${color.image.named}" />  
        </div>
        <div class="generated-colors-hex">
            HEX: ${color.hex.value}
            <br />
            Name: ${color.name.value}
        </div>
    </div>
    `
}