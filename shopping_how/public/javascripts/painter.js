export default class Painter {
    renderUI(){
        const promise = fetch("http://localhost:3000/image")
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
        })
        .catch(err => alert(err));
    }
}