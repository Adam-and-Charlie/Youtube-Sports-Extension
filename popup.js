// Setup function to be called when page is loaded
const favTeamsLocalStorageKey = "favTeamsData";

function init() {
    console.log("popup script running");
    var favTeamBtn = document.getElementById("favTeamBtn");
    favTeamBtn.onclick = receiveTeam;
}

// Receive favourite team from text field and add to favourite teams list
function receiveTeam() {
    var favTeam = document.getElementById("favTeamTxt").value;
    if (favTeam.trim().includes(" ") || favTeam == ""){
        alert("Please enter a word (one word)")
    }
    else{
        favTeams.push(favTeam);
        anotherTeam();
    }
}

// Option to accept add another team to favourite teams list
function anotherTeam() {
    document.getElementById("favTeamPrompt").innerHTML = "Do you have another favourite team?";

    document.getElementById("favTeamTxt").remove();
    document.getElementById("favTeamBtn").remove();

    const anotherTeamRequestBtn = document.createElement("button");
    const anotherTeamDenyBtn = document.createElement("button");
    
    anotherTeamRequestBtn.setAttribute("id", "anotherTeamReqBtn");
    anotherTeamDenyBtn.setAttribute("id", "anotherTeamDenyBtn");

    anotherTeamRequestBtn.innerHTML = "Yes";
    anotherTeamDenyBtn.innerHTML = "No";

    document.body.appendChild(anotherTeamRequestBtn);
    document.body.appendChild(anotherTeamDenyBtn);

    anotherTeamRequestBtn.onclick = resetTeamInput;
    anotherTeamDenyBtn.onclick = displayTeams;
}

// Reseting popup to receive a new team
function resetTeamInput() {
    document.getElementById("favTeamPrompt").innerHTML = "What's one of your favourite teams?";
    
    document.getElementById("anotherTeamReqBtn").remove();
    document.getElementById("anotherTeamDenyBtn").remove();

    const favTeamTxt = document.createElement("input");
    const favTeamBtn = document.createElement("button");

    favTeamTxt.setAttribute("type", "text");
    favTeamTxt.setAttribute("id", "favTeamTxt");
    favTeamBtn.setAttribute("id", "favTeamBtn");

    favTeamBtn.innerHTML = "Enter";

    document.body.appendChild(favTeamTxt);
    document.body.appendChild(favTeamBtn);

    favTeamBtn.onclick = receiveTeam;
}

// Display favourite teams list
function displayTeams() {
    document.getElementById("favTeamPrompt").innerHTML = "Here are your favourite teams:";
    
    document.getElementById("anotherTeamReqBtn").remove();
    document.getElementById("anotherTeamDenyBtn").remove();

    const favTeamsDisplay = document.createElement("h4");

    console.log("Here's the favTeams: " + favTeams);
    favTeamsDisplay.innerHTML = favTeams;
    document.body.appendChild(favTeamsDisplay);

    const teamsCompleteBtn = document.createElement("button");

    teamsCompleteBtn.setAttribute("id", "teamsCompleteBtn");
    teamsCompleteBtn.innerHTML = "Done";

    document.body.appendChild(teamsCompleteBtn);

    teamsCompleteBtn.onclick = sendFavTeams;
}

function sendFavTeams(){
    // Sending favourite teams list to content.js
    localStorage.clear()
    let data = {"subject": "favTeams", "data": favTeams};
    chrome.tabs.sendMessage(tabID, data); // Sending the message to context.js via the tabID
    console.log(data)
    window.close();
}

// Favourite teams list
var favTeams = [];

// Tabid
var tabID;

// Load the setup function once window is loaded
window.onload = init;

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    tabID = tabs[0].id;
});