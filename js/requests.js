function getCountries(){
    let request = new Request('https://restcountries.eu/rest/v2/all');
    fetch(request)
    .then(response => {
        return response.json();
    })
    .then(resource =>{
        //console.log(resource)
        resource.forEach(element => {
            //Ger namn på 250 länder!
            //console.log(element.name)
        });
    })
}

function patchBio(newBio){
    let request = new Request("/admin/api.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bio: newBio
        })
    })
    fetch(request)
    .then(response =>{
        return response.json();
    })
    .then(resource => {

    })
}