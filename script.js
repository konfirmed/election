function startSimulation() {
    document.getElementById('results').innerHTML = '';

    const northCentral = ["APC", "PDP", "APGA", "YPP", "SDP"];
    const northEast = ["APC", "PDP", "APGA", "YPP", "SDP"];
    const northWest = ["APC", "PDP", "APGA", "YPP", "SDP"];
    const southSouth = ["APC", "PDP", "APGA", "YPP", "SDP"];
    const southWest = ["APC", "PDP", "APGA", "YPP", "SDP"];
    const southEast = ["APC", "PDP", "APGA", "YPP", "SDP"];

    const regions = [
        { name: "North Central", parties: northCentral, voters: 13 },
        { name: "North East", parties: northEast, voters: 12 },
        { name: "North West", parties: northWest, voters: 15 },
        { name: "South South", parties: southSouth, voters: 10 },
        { name: "South West", parties: southWest, voters: 11 },
        { name: "South East", parties: southEast, voters: 9 },
    ];

    let voteResults = [];

    regions.forEach(region => {
        let regionResult = simulateRegion(region);
        voteResults.push(...regionResult.votes);
        displayResult(regionResult);
    });

    displayFinalResults(voteResults);
}

function simulateRegion(region) {
    let votes = [];
    for (let i = 0; i < region.voters; i++) {
        votes.push(region.parties[Math.floor(Math.random() * region.parties.length)]);
    }

    let result = {
        region: region.name,
        votes: votes
    };

    return result;
}

function displayResult(result) {
    let container = document.getElementById('results');
    let regionDiv = document.createElement('div');
    regionDiv.classList.add('region-result');
    
    let header = document.createElement('h2');
    header.innerText = result.region;
    regionDiv.appendChild(header);

    let list = document.createElement('ul');
    result.votes.forEach(vote => {
        let listItem = document.createElement('li');
        listItem.innerText = vote;
        list.appendChild(listItem);
    });
    regionDiv.appendChild(list);

    container.appendChild(regionDiv);
}

function displayFinalResults(voteResults) {
    let parties = voteResults.reduce((acc, vote) => {
        acc[vote] = (acc[vote] || 0) + 1;
        return acc;
    }, {});

    let winner = Object.keys(parties).reduce((a, b) => parties[a] > parties[b] ? a : b);

    let container = document.getElementById('results');
    let finalResultDiv = document.createElement('div');
    finalResultDiv.classList.add('final-result');
    
    let header = document.createElement('h2');
    header.innerText = `Final Results`;
    finalResultDiv.appendChild(header);

    let list = document.createElement('ul');
    Object.keys(parties).forEach(party => {
        let listItem = document.createElement('li');
        listItem.innerText = `${party}: ${parties[party]} seats`;
        list.appendChild(listItem);
    });
    finalResultDiv.appendChild(list);

    let winnerText = document.createElement('p');
    winnerText.innerText = `The winning party is the ${winner} party with ${parties[winner]} seats.`;
    finalResultDiv.appendChild(winnerText);

    container.appendChild(finalResultDiv);
}
