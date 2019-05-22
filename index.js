console.log("i work");

function watchForm() {
    $(".landing").submit(event => {
        event.preventDefault();
        const specialization = $('#special').val();
        const docLocation = $('#doctorLocation').val();
        const symp = $('#symptom').val();
        findDoctor(specialization, docLocation, symp);
    });
}

function findDoctor(specialization, docLocation, symp) {
    const betdocURL = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symp}&specialty_uid=${specialization}&location=${docLocation}&skip=0&limit=10&user_key=6175af41bae3977ce99981e9ffc4e446`;

    fetch(betdocURL) 
    .then((response) => {
        return response.json();
    })
    .then((myJSON) => {
        console.log(myJSON);
        displayResults(myJSON.data);
    })
    .catch((error) => {
        console.log(error);
        alert('Something went wrong, try again later');
    });
}

function displayResults(results) {
    $('.container').css('display', 'none');
    $('html').css('background-image', 'none');
    $('body').css('background-image', 'none');
    $('.display-doctors').html(`<h2>List of Doctors</h2>`);
    for (let i = 0; i < results.length; i++) { 
        $('.display-doctors').append(`
            <img src="${results[i].profile.image_url}" alt="Image of doctor" />
            <p>${results[i].profile.first_name} ${results[i].profile.last_name}</p>
            <p>${results[i].profile.bio}</p>
            `);
    }
}


watchForm();


//`<img src="${results[i].profile.image_url}" alt="Image of doctor" />`
//explanation: hero, bgimage, text title and explanation
//limit paginated
//need more than one api call for each?? 
//zipcode

