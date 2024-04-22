
async function getAPI(query){
    try {
        const response = await fetch('/api/' + query);
        const data = await response.json();
        console.log(JSON.stringify(data))
    } catch (error) {
        console.error('Error fetching API:', error);
    }
    
}

var query = '';

const button = document.querySelector('button')
const input = document.querySelector('input')

input.addEventListener('input', () => {
    
    query = input.value;
})

button.addEventListener('click', () => {getAPI(query)})