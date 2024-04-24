trashs = document.querySelectorAll("img")
itemTexts = document.querySelectorAll('li')

itemTexts.forEach(item => {
    item.addEventListener('click', changeCompletion)
})


trashs.forEach(trash => {
    trash.addEventListener('click', deleteFunction)
});

async function changeCompletion() {
    const item = this.parentNode.childNodes[1].textContent;

    try{
        const response = await fetch('/changeCompletion', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'itemFromJS': item})
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err){
        console.error(err)
    }
    
}
async function deleteFunction() { //this can be a replacement for e.target
    const item = this.parentNode.childNodes[1].textContent;
    try{
        const response = await fetch('/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ //sending a json of the text inside the item we want to delete
              'itemFromJS': item
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.error(error)
    }
}

// async function getAPI(query){
//     try {
//         const response = await fetch('/api/' + query);
//         const data = await response.json();
//         console.log(JSON.stringify(data))
//     } catch (error) {
//         console.error('Error fetching API:', error);
//     }
    
// }

// var query = '';

// const button = document.querySelector('button')
// const input = document.querySelector('input')

// input.addEventListener('input', () => {
    
//     query = input.value;
// })

// button.addEventListener('click', () => {getAPI(query)})