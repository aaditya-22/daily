async function getAnimalData() {
    const response = await fetch("https://fakerapi.it/api/v1/persons")
    const finalData = await response.json();
    document.getElementById("cont").innerHTML = JSON.stringify(finalData.data)
}
