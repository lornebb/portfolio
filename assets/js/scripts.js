const homeSection = $('#home-section');
const resumeSection = $('#resume-section');
const contactSection = $('#contact-section');
const interestsSection = $('#interests-section');
const githubSection = $('#github-section');
const homeButton = $('#home-button');
const resumeButton = $('#resume-button');
const contactButton = $('#contact-button');
const interestsButton = $('#interests-button');
const githubButton = $('#github-button');


$(document).ready(function () {
    homeButton.on('click', function () {
        homeSection.show();
        resumeSection.hide();
        contactSection.hide();
        interestsSection.hide();
        githubSection.hide();
    })
    resumeButton.on('click', function () {
        homeSection.hide();
        resumeSection.show();
        contactSection.hide();
        interestsSection.hide();
        githubSection.hide();
    })
    contactButton.on('click', function () {
        homeSection.hide();
        resumeSection.hide();
        contactSection.show();
        interestsSection.hide();
        githubSection.hide();
    })
    interestsButton.on('click', function () {
        homeSection.hide();
        resumeSection.hide();
        contactSection.hide();
        interestsSection.show();
        githubSection.hide();
    })
    githubButton.on('click', function () {
        homeSection.hide();
        resumeSection.hide();
        contactSection.hide();
        interestsSection.hide();
        githubSection.show();
    })
});

/**
 *  GitHub - will present the user with profiles from github upon searching
 * */
// function userInformationHTML(user) {
//     return `
//         <h2>${user.name}
//             <span class="small-name">
//                 (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
//             </span>
//         </h2>
//         <div class="gh-content">
//             <div class="gh-avatar">
//                 <a href="${user.html_url}" target="_blank">
//                     <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
//                 </a>
//             </div>
//             <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
//         </div>`;
// }

// function repoInformationHTML(repos) {
//     if (repos.length == 0) {
//         return `<div class="clearfix repo-list">No repos!</div>`;
//     }

//     var listItemsHTML = repos.map(function (repo) {
//         return `<li>
//                     <a href="${repo.html_url}" target="_blank">${repo.name}</a>
//                 </li>`;
//     });

//     return `<div class="clearfix repo-list">
//                 <p>
//                     <strong>Repo List:</strong>
//                 </p>
//                 <ul>
//                     ${listItemsHTML.join("\n")}
//                 </ul>
//             </div>`;
// }

// function fetchGitHubInformation(event) {
//     $("#gh-user-data").html("");
//     $("#gh-repo-data").html("");

//     var username = $("#gh-username").val();
//     if (!username) {
//         $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
//         return;
//     }

//     $("#gh-user-data").html(
//         `<div id="loader">
//             <img src="assets/css/loader.gif" alt="loading..." />
//         </div>`);

//     $.when(
//         $.getJSON(`https://api.github.com/users/${username}`),
//         $.getJSON(`https://api.github.com/users/${username}/repos`)
//     ).then(
//         function (firstResponse, secondResponse) {
//             var userData = firstResponse[0];
//             var repoData = secondResponse[0];
//             $("#gh-user-data").html(userInformationHTML(userData));
//             $("#gh-repo-data").html(repoInformationHTML(repoData));
//         },
//         function (errorResponse) {
//             if (errorResponse.status === 404) {
//                 $("#gh-user-data").html(
//                     `<h2>No info found for user ${username}</h2>`);
//             } else if (errorResponse.status === 403) {
//                 var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
//                 $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
//             } else {
//                 console.log(errorResponse);
//                 $("#gh-user-data").html(
//                     `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
//             }
//         });
// }

$(document).ready(fetchGitHubInformation);

/** 
 * Google Maps - will display locations on the site and respond to user query in real time
 * */
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [{
            lat: 40.785091,
            lng: -73.968285
        },
        {
            lat: 41.084045,
            lng: -73.874245
        },
        {
            lat: 40.754932,
            lng: -73.984016
        }
    ];

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

/** 
 * sendMail will provide the user with an opportunity to communicate directly with the developer.
 * */
function sendMail(contactForm) {
    emailjs.send("gmail", "rosie", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "project_request": contactForm.projectsummary.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false; // To block from loading a new page
}