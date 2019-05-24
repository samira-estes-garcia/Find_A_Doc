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
    });
}

function displayResults(results) {
    $('.container').css('display', 'none');
    $('html').css('background-image', 'none');
    $('body').css('background-image', 'none');
    $('.main-nav').append(`<div><a href="index.html">Perfom Another Search</a></div>`);
    if (results.length === 0) {
        $('.display-doctors').append(`'<div class="no-result">Sorry, your search didn't return a match. <a href="index.html">Perform another search</a> to try again!</div>'`)
    } else {
        $('.display-doctors').html(`<h2>Here Are the Best Matches For You!</h2>`);
        for (let i = 0; i < results.length; i++) { 
        $('.display-doctors').append(`
            <div class="doc-container">
            <div class="prof-img">
            <img src="${results[i].profile.image_url}" class="doc-img" alt="Image of doctor" />
            </div>
            <div class="prof-bio">
            <p><b>${results[i].practices[0].name}</b></p>
            <p><b>Speciality:</b> ${results[i].specialties[0].actor}</p>
            <p><b>Contact:</b> ${results[i].practices[0].phones[0].number}</p>
            <p class="bio">${results[i].profile.bio}</p>
            </div>
            </div>
            `);
        }
    }
}

watchForm();


//`<img src="${results[i].profile.image_url}" alt="Image of doctor" />`
//explanation: hero, bgimage, text title and explanation
//limit paginated
//need more than one api call for each?? 
//zipcode

// $('.display-doctors').html(`<h2>Here Are the Best Matches For You!</h2>`);
//     for (let i = 0; i < results.length; i++) { 
//         $('.display-doctors').append(`
//             <div class="doc-container">
//             <div class="prof-img">
//             <img src="${results[i].profile.image_url}" class="doc-img" alt="Image of doctor" />
//             </div>
//             <div class="prof-bio">
//             <p><b>${results[i].practices[0].name}</b></p>
//             <p><b>Speciality:</b> ${results[i].specialties[0].actor}</p>
//             <p><b>Contact:</b> ${results[i].practices[0].phones[0].number}</p>
//             <p class="bio">${results[i].profile.bio}</p>
//             </div>
//             </div>
//             `);
//     }

