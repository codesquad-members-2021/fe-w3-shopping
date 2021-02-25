let best;
let event;
let carousel;
let box;

class FileReader {

    getFileData(){
        const promise = fetch("http://localhost:3000/image")
        .then(response => response.json())
        .then(data => this.saveEachData(data))
        .catch(err => alert(err));
    }
    saveEachData(data){
        best = data[0].best;
        event = data[0].event;
        carousel = data[0].carousel;
        box = data[0].box;
    }
}

export { FileReader, best, event, carousel, box };