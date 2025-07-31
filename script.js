currentScreen = "start-screen";

function startScreen() {
    currentScreen = "start-screen";
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');

    document.getElementById('playerName').textContent = "";
}
function creditsScreen() {
    currentScreen = "credits-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.remove('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
}
function instructionsScreen() {
    currentScreen = "instructions-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.remove('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
}
function selectPlayerChoiceScreen() {
    currentScreen = "player-choice-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.remove('hidden');
}
function selectResearchScreen() {
    gameState.internName = gameState.character.name; // Set intern name from character
    console.log("Selected Character Card: " + gameState.character);
    currentScreen = "choose-research-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.remove('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
    initResearchButtons();
    updateSelectionDisplay();
}
function mentorMatchingScreen() {
    currentScreen = "mentor-matching-screen";
    if(selectedResearchAreas.length < 3) {
        return;
    }
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.remove('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
    gameState.assignedMentor = assignMentor();
    displayMentorInfo();
}
function beginInternshipScreen() {
    currentScreen = "game-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
    initializeStats();
    updateUI();
}

document.querySelectorAll(".home-button").forEach(button => {
    console.log("CLICKED HOME BUTTON " + currentScreen);
    button.addEventListener("click", () => {
        if (currentScreen === "credits-screen" || currentScreen === "instructions-screen") {
            startScreen(); // Go straight home from credits
        } else {
            document.getElementById("confirmOverlay").classList.remove("hidden");
        }
    });
});
document.querySelectorAll(".home-button-main").forEach(button => {
    button.addEventListener("click", () => {
        if (currentScreen === "credits-screen" || currentScreen === "instructions-screen") {
            startScreen(); // Go straight home from credits
        } else {
            document.getElementById("confirmOverlay").classList.remove("hidden");
        }
    });
});
document.getElementById("confirmYes").addEventListener("click", () => {
    document.getElementById("confirmOverlay").classList.add("hidden");
    //startScreen();
    window.location.reload();
});
document.getElementById("confirmNo").addEventListener("click", () => {
    document.getElementById("confirmOverlay").classList.add("hidden");
});
document.querySelectorAll(".instructions-button").forEach(button => {
    console.log("CLICKED INSTRUCTIONS BUTTON " + currentScreen);
    button.addEventListener("click", () => {
        if (currentScreen === "credits-screen" || currentScreen === "instructions-screen") {
            return;
        } else {
            document.getElementById("instructionsOverlay").classList.remove("hidden");
        }
    });
});
document.getElementById("instructionsBack").addEventListener("click", () => {
    document.getElementById("instructionsOverlay").classList.add("hidden");
});



const gameState = {
    internName: "",     // to be filled after name entry
    character: null, // to hold selected character information
    researchChoices: [], // to hold the selected fields
    field: "",          // assigned research field
    assignedMentor: null,       // assigned mentor object
    stats: {
        happiness: 0,
        motivation: 0,
        stress: 0,
        researchProgress: 0
    },
    currentWeek: 0,
    totalWeeks: 10,
    usedEventIDs: null,
};
gameState.usedEventIds = new Set(); // Track event IDs that have already been used

// DEBUG INITIALIZE STATS I DONT THINK ITS WORKING RIGHT
function initializeStats(){
    console.log("INITIALIZING STATS");
    console.log("Research Field: " + gameState.field);
    console.log("Selected Research Areas: " + selectedResearchAreas);

    gameState.stats.researchProgress = 0;

    researchAreaRank = 4; //TEMP NEED TO FIX assignMentor() first
    if(gameState.field === selectedResearchAreas[0]) researchAreaRank = 1;
    if(gameState.field === selectedResearchAreas[1]) researchAreaRank = 2;
    if(gameState.field === selectedResearchAreas[2]) researchAreaRank = 3;

    console.log("Research Area Rank: " + researchAreaRank);

    switch(researchAreaRank) {
        case 1:
            gameState.stats.happiness = getRandomIntInclusive(80,100);
            gameState.stats.motivation = getRandomIntInclusive(75,95);
            gameState.stats.stress = getRandomIntInclusive(10,30);
            break;
        case 2:
            gameState.stats.happiness = getRandomIntInclusive(70,90);
            gameState.stats.motivation = getRandomIntInclusive(65,85);
            gameState.stats.stress = getRandomIntInclusive(20,40);
            break;
        case 3:
            gameState.stats.happiness = getRandomIntInclusive(60,80);
            gameState.stats.motivation = getRandomIntInclusive(55,75);
            gameState.stats.stress = getRandomIntInclusive(30,50);
            break;
        case 4:
            gameState.stats.happiness = getRandomIntInclusive(50,70);
            gameState.stats.motivation = getRandomIntInclusive(30,50);
            gameState.stats.stress = getRandomIntInclusive(40,60);
            break;
    }
}

characterPool = {
    archie:{
        name: "Archie",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    celine:{
        name: "Celine",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    emma:{
        name: "Emma",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    jacob:{
        name: "Jacob",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    james:{
        name: "James",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    mallory:{
        name: "Mallory",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    marlena:{
        name: "Marlena",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    },
    walker:{
        name: "Walker",
        events:[],
        eventChoices:[],
        eventOutcomes:[]
    }
}

const cards = document.querySelectorAll(".character-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        // Unselect previous
        cards.forEach(c => c.classList.remove("selected"));
        // Select new
        card.classList.add("selected");

        // Get data-id from the selected card
        const characterId = card.dataset.id;

        // Update gameState
        gameState.character = characterPool[characterId];
        document.getElementById("playerChoiceNextScreen").disabled = false; // Enable the Next button
        console.log("Selected Character: ", characterId, gameState.character);
  });
});


const researchAreas = [
    "Biophysics", "Computational Physics", "Materials Science", "Nuclear Physics", "Particle Physics"
]
const mentorPool = {
    "Biophysics": [
        {
            name: "Dr. Abhijit Sarkar", // jacob
            field: "Biophysics",
            research: "Single-Molecule Biophysics",
            researchDescription: "Elasticity of DNA and DNA-Histone Complexes Under Physiological and High-Salt Conditions: A Horizontal Magnetic Tweezers Study."
        },
        {
            name: "Dr. Abhijit Sarkar", // mallory
            field: "Computational Physics",
            research: "Single-Molecule Biophysics",
            researchDescription: "GPU-Accelerated Bead Tracking Program for Magnetic Tweezer Experiments."
        },
    ],
    "Computational Physics": [
        {
            name: "Dr. Abhijit Sarkar", // mallory
            field: "Computational Physics",
            research: "Single-Molecule Biophysics",
            researchDescription: "GPU-Accelerated Bead Tracking Program for Magnetic Tweezer Experiments."
        },
        {
            name:"Dr. Nicholas Mecholsky", // celine
            field: "Computational Physics",
            research: "Computational Materials Science",
            researchDescription: "Computing Raman-Active Vibrational Frequencies of Amorphous Silica with DFT."
        }
    ],
    "Materials Science": [
        {
            name: "Dr. Biprodas Dutta", // james
            field: "Materials Science",
            research: "Nanofabrication and Spintronics",
            researchDescription: "Investigating Electrical Properties of 40Li2O•(55−x)B2O3•(x)P2O5•5LiCl Glasses."
        },
        {
            name: "Dr. Nicholas Mecholsky", // celine
            field: "Materials Science",
            research: "Computational Materials Science",
            researchDescription: "Computing Raman-Active Vibrational Frequencies of Amorphous Silica with DFT."
        }
    ],
    "Nuclear Physics": [
        {
            name: "Dr. Tanja Horn", // archie
            field: "Nuclear Physics",
            research: "Experimental Nuclear Physics",
            researchDescription: "Reconstruction Analysis of Kaon Structure Functions via Tagged Deep Inelastic Scattering."
        },
        {
            name: "Dr. Grzegorz Kalicy", // marlena
            field: "Nuclear Physics",
            research: "Hadronic Physics and Spectroscopy",
            researchDescription: "Simulation-Based Optimization of xpDIRC Geometry for Next-Generation PID."
        },
        {
            name: "Dr. Carlos Yero", // walker
            field: "Nuclear Physics",
            research: "Nuclear Structure and Reaction Studies",
            researchDescription: "Kinematic Optimization of SHMS and HMS in Hydrogen Elastic Events for Deuteron Electro-Disintegration Studies at JLab"
        }
    ],
    "Particle Physics": [
        {
            name: "Dr. Shin Shan Yu", // emma
            field: "Particle Physics",
            research: "Collider Physics and Instrumentation",
            researchDescription: "Study of hh+MET signature in type-I 2HDM+ and Searching for DarkMatter at the LHC."
        }
    ]
};
const selectedResearchAreas = []; // max 3
const maxSelections = 3;
// Initialize research area buttons
function initResearchButtons() {
    const container = document.getElementById("available-research-choices");
    container.innerHTML = "<h3>Available</h3>";

    researchAreas.forEach(area => {
        const btn = document.createElement("button");
        btn.classList.add("research-choice-button");
        btn.innerText = area;
        btn.dataset.area = area;
        btn.onclick = () => handleAreaClick(area);
        container.appendChild(btn);
    });
}
function handleAreaClick(area) {
    const isSelected = selectedResearchAreas.includes(area);

    if (isSelected) {
        // Remove from selectedResearchAreas and re-render
        const index = selectedResearchAreas.indexOf(area);
        selectedResearchAreas.splice(index, 1);
    } else {
        if (selectedResearchAreas.length >= maxSelections) return; // Already 3 chosen
        selectedResearchAreas.push(area);
    }
    //console.log("Selected Research Areas: ", selectedResearchAreas);

    if(selectedResearchAreas.length == 3) {
        document.getElementById("researchAreasNextScreen").disabled = false;   
    }
    else {
        document.getElementById("researchAreasNextScreen").disabled = true;
    }

    updateSelectionDisplay();
}
function updateSelectionDisplay() {
    const listItems = document.querySelectorAll(".choice-slot");
    listItems.forEach((slot, index) => {
        const area = selectedResearchAreas[index];
        slot.innerText = area ? area : "";
        slot.onclick = area ? () => handleAreaClick(area) : null;
    });

    // Re-render available list with only unselected areas
    const container = document.getElementById("available-research-choices");
    container.innerHTML = "<h3>Available</h3>";

    researchAreas.forEach(area => {
        if (!selectedResearchAreas.includes(area)) {
            const btn = document.createElement("button");
            btn.classList.add("research-choice-button");
            btn.innerText = area;
            btn.dataset.area = area;
            btn.onclick = () => handleAreaClick(area);
            container.appendChild(btn);
        }
    });
}

function assignMentor() {
    const allFields = Object.keys(mentorPool);
    const weights = new Map();

    // Assign weights to preferred fields
    if (selectedResearchAreas[0]) weights.set(selectedResearchAreas[0], 600);
    if (selectedResearchAreas[1]) weights.set(selectedResearchAreas[1], 250);
    if (selectedResearchAreas[2]) weights.set(selectedResearchAreas[2], 100);

    // Assign small weights to all other fields (optional)
    const leftoverFields = allFields.filter(f => !weights.has(f));
    const leftoverWeight = 50; // 5% total chance
    const perFieldWeight = leftoverWeight / leftoverFields.length;
    leftoverFields.forEach(f => weights.set(f, perFieldWeight));

    // Create weighted field array
    const weightedFields = [];
    for (const [field, weight] of weights.entries()) {
        for (let i = 0; i < Math.round(weight); i++) {
            weightedFields.push(field);
        }
    }

    // Randomly choose field
    const chosenField = weightedFields[Math.floor(Math.random() * weightedFields.length)];
    console.log("Chosen Research Field: " + chosenField);
    console.log("Selected Research Areas: " + selectedResearchAreas);

    // Randomly pick a mentor from that field
    const mentorOptions = mentorPool[chosenField];
    const chosenMentor = mentorOptions[Math.floor(Math.random() * mentorOptions.length)];

    // Save to game state
    gameState.field = chosenField;
    gameState.mentor = chosenMentor;

    return chosenMentor;
}
function displayMentorInfo() {
    const m = gameState.assignedMentor;
    const info1 = `
        You’ve been matched with\n<strong>${m.name}</strong>
    `;
    const info2 = 'Research Field: ' + m.field;
    const info3 = 'Research Area: ' + m.research;
    const info4 = 'Description: ' + m.researchDescription;

    document.getElementById("mentor-info").innerHTML = info1; 
    document.getElementById("mentor-research-field").innerHTML = info2;
    document.getElementById("mentor-research-area").innerHTML = info3; 
    document.getElementById("mentor-research-description").innerHTML = info4; 
}

function updateUI() {
    document.getElementById("internPlayerName").textContent = gameState.internName;
    document.getElementById("playerField").textContent = gameState.field;
    document.getElementById("mentorName").textContent = gameState.mentor.name;

    document.getElementById("happiness").textContent = gameState.stats.happiness + "%";
    document.getElementById("stress").textContent = gameState.stats.stress + "%";
    document.getElementById("motivation").textContent = gameState.stats.motivation + "%";
    document.getElementById("researchProgress").textContent = gameState.stats.researchProgress + "%";

    document.getElementById("currentWeek").textContent = gameState.currentWeek;
    document.getElementById("weekBar").value = gameState.currentWeek;
    document.getElementById("weekBar").max = gameState.totalWeeks;
    document.getElementById("weeksLeft").textContent = gameState.totalWeeks - gameState.currentWeek;

    console.log(gameState.currentWeek + " UI updated");
}

// EVENTS

introEvents = [
    {
        id: "meetMentor",
        title: "Meet your Mentor",
        weekRange: [1],
        description: "Your Mentor brings you to your lab for a tour. On the way, do you...",
        choices:[
            {
                text: "Tell them you've read all of their published papers (you haven't)",
                outcomes: [
                    {
                        resultText: "They give you a curious side-eye and keep walking.",
                        chance: 40, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,+2,0]
                    },
                    {
                        resultText: "They turn and start quizzing you. Your lie is uncovered.",
                        chance: 5, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-10,0,+15,0]
                    },
                    {
                        resultText: "They nod, subtley impressed.",
                        chance: 40, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,+3,0,0]
                    },
                    {
                        resultText: "They are excited to hear it and you start chatting.",
                        chance: 15, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+8,+5,0,0]
                    }
                ]
            },
            {
                text: "Stare forward in silence",
                outcomes: [
                    {
                        resultText: "Neither of you speak. It's a little awkward but okay.",
                        chance: 50, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,+1,0]
                    },
                    {
                        resultText: "They try to make conversation politely.",
                        chance: 50, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,+2,0,0]
                    }
                ]
            },
            {
                text: "Try to make polite conversation",
                outcomes: [
                    {
                        resultText: "They appreciate it and the two of you keep talking.",
                        chance: 75, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+5,0,0,0]
                    },
                    {
                        resultText: "They find it awkward and the two of you stop talking.",
                        chance: 25, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,+2,0]
                    }
                ]
            }
        ]
    },
    {
        id: "meetGradStudents",
        title: "Meet the Grad Students",
        weekRange: [1],
        description: "You are introduced to the grad students in your lab",
        choices:[
            {
                text: "Ask them about their research",
                outcomes: [
                    {
                        resultText: "They stare forward with a dead look in their eyes.",
                        chance: 20, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,-3,+3,0]
                    },
                    {
                        resultText: "They explain what they do but the science is beyond you.",
                        chance: 25, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,-1,+2,0]
                    },
                    {
                        resultText: "You appreciate how passionate they are about their research.",
                        chance: 55, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,+5,0,0]
                    }
                ]
            },
            {
                text: "Talk to them about their other interests",
                outcomes: [
                    {
                        resultText: "You find a common interest and have a nice conversation.",
                        chance: 65, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+5,+1,0,0]
                    },
                    {
                        resultText: "They ask what other interests are with a hollow look in their eyes.",
                        chance: 10, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,-5,+3,0]
                    },
                    {
                        resultText: "They describe how to make the best (and most cost effective) coffee.",
                        chance: 25, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,+1,0,0]
                    },
                ]
            },
            {
                text: "Ask them about your mentor",
                outcomes: [
                    {
                        resultText: "They wordlessly shake their head no..",
                        chance: 20, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-2,0,+3,0]
                    },
                    {
                        resultText: "You learn a cool fact about your mentor",
                        chance: 80, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,+3,0,0]
                    },
                ]
            }
        ]
    },
    {
        id: "readPapers",
        title: "Introduction to Research",
        weekRange: [1],
        description: "Your mentor gives you a stack of papers and a demonstration video",
        choices:[
            {
                text: "Skim the papers and watch the video",
                outcomes: [
                    {
                        resultText: "You get the gist, but your mentor isn't impressed.",
                        chance: 50, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-2,0,+2,+1]
                    },
                    {
                        resultText: "The papers were probably not that helpful anyways.",
                        chance: 50, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,0,0,+1]
                    },
                ]
            },
            {
                text: "Read Everything Thoroughly",
                outcomes: [
                    {
                        resultText: "Your mentor appreciates your dedication.",
                        chance: 60, // %
                        weight: [1,1,1,1],
                        effects: [+3,+3,0,+3]
                    },
                    {
                        resultText: "Your mentor gives you another bigger stack of papers.",
                        chance: 10, // %
                        weight: [1,1,1,1],
                        effects: [-2,-2,+2,+3]
                    },
                    {
                        resultText: "You get the general gist of the research.",
                        chance: 30, // %
                        weight: [1,1,1,1],
                        effects: [0,+2,0,+2]
                    }
                ]
            },
            {
                text: "Ignore the papers and video you probably won't need them",
                outcomes: [
                    {
                        resultText: "You get a good understanding on a zoom call with your mentor later.",
                        chance: 15, // %
                        weight: [1,1,1,1], 
                        effects: [0,0,-2,+3]
                    },
                    {
                        resultText: "Your mentor is disappointed in your lack of effort. Not a good first impression.",
                        chance: 35, // %
                        weight: [1,1,1,1], 
                        effects: [-5,0,+5,0]
                    },
                    {
                        resultText: "You'll hopefully learn everything you need on the job.",
                        chance: 50, // %
                        weight: [1,1,1,1], 
                        effects: [-2,0,+2,0]
                    },
                ]
            }         
        ]
    },
    {
        id: "meetInterns",
        title: "Meet Other REU Students",
        weekRange: [1],
        description: "You're in a group meeting the other students in your program",
        choices:[
            {
                text: "Participate enthusiastically",
                outcomes: [
                    {
                        resultText: "You get everyone talking and make some friends.",
                        chance: 70, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+5,0,-3,0]
                    },
                    {
                        resultText: "You come on a little too strong but everyone is nice.",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,0,+1,0]
                    },
                ]
            },
            {
                text: "Be sarcastic and aloof",
                outcomes: [
                    {
                        resultText: "People think you're cool.",
                        chance: 60, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,0,-1,0]
                    },
                    {
                        resultText: "The others don't have much of an impression of you.",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,+1,0]
                    },
                    {
                        resultText: "Your sarcasm doesn't vibe with the others.",
                        chance: 10, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-1,0,+2,0]
                    },
                ]
            },
            {
                text: "Ask who everyone's favorite physicist is",
                outcomes: [
                    {
                        resultText: "You're with the right crowd. Sparks fun conversation.",
                        chance: 60, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,+2,0,0]
                    },
                    {
                        resultText: "People look at you weird for being too nerdy.",
                        chance: 35, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,-1,0,0]
                    },
                    {
                        resultText: "Two interns get into a heated argument. A fistfight breaks out.",
                        chance: 5, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,-1,+5,0]
                    },
                ]
            },         
        ]
    },
    {
        id: "dormRoomSetup",
        title: "Set Up your Dorm",
        weekRange: [1],
        description: "You've arrived at your dorm room and need to unpack",
        choices: [
            {
                text: "Push the beds together to form Megabed™",
                outcomes: [
                    {
                        resultText: "Megabed™ is glorious. Megabed™ is amazing. Megabed™ is perfect.",
                        chance: 60, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+8,+6,-2,0]
                    },
                    {
                        resultText: "A knock comes at your door. You've been assigned a roommate",
                        chance: 5, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-2,0,+1,0]
                    },
                    {
                        resultText: "Megabed™ is cool and there's tons of room to sleep now",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,+1,0,0]
                    },
                ]
            },
            {
                text: "Hang nerdy posters everywhere",
                outcomes: [
                    {
                        resultText: "Other people in your building think you're cool.",
                        chance: 60, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,+1,-1,0]
                    },
                    {
                        resultText: "The posters keep you on task no matter where you look.",
                        chance: 10, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,+5,0,0]
                    },
                    {
                        resultText: "You make a friend who likes your posters.",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,+1,-2,0]
                    },
                ]
            },
            {
                text: "Stock the mini-fridge",
                outcomes: [
                    {
                        resultText: "A soda can explodes inside the fridge making a mess.",
                        chance: 15, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-2,0,+2,0]
                    },
                    {
                        resultText: "Your snacking game is on point.",
                        chance: 60, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,+2,0,0]
                    },
                    {
                        resultText: "You fill it with food that will inevitably mostly go bad",
                        chance: 25, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-1,-1,0,0]
                    },
                ]
            },
        ]
    },
    {
        id: "exploreCampus",
        title: "Explore CUA's Campus",
        weekRange: [1],
        description: "You have some time on your hands and decide to explore campus",
        choices: [
            {
                text: "Walk through the Law School courtyard",
                outcomes: [
                    {
                        resultText: "You trip and fall into the fountain.",
                        chance: 20, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-4,-2,0,0]
                    },
                    {
                        resultText: "You feel very studious.",
                        chance: 80, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,+3,0,0]
                    }
                ]
            },
            {
                text: "Enter Hannon Hall and explore",
                outcomes: [
                    {
                        resultText: "You run into your professor and it's very awkward.",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,+2,0]
                    },
                    {
                        resultText: "You run into your professor and have a nice conversation.",
                        chance: 40, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+2,+2,0,0]
                    },
                    {
                        resultText: "You unintentionally made a grad student friend after becoming lost.",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,0,0,0]
                    }
                ]
            },
            {
                text: "Wander around outside looking at the birds",
                outcomes: [
                    {
                        resultText: "You see a lot of common house sparrows.",
                        chance: 50, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+1,0,-1,0]
                    },
                    {
                        resultText: "Another intern walks with you and you learn a lot about birds.",
                        chance: 45, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+3,0,-1,0]
                    },
                    {
                        resultText: "Out of nowhere a bird swoops down and tries to peck your eyes out.",
                        chance: 5, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-5,0,+2,0]
                    }
                ]
            },
            {
                text: "Visit the Basilica",
                outcomes: [
                    {
                        resultText: "Lots of pretty stained glass.",
                        chance: 70, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+1,0,-1,0]
                    },
                    {
                        resultText: "You meet a priest who urges you to attend the next mass.",
                        chance: 30, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [-1,0,+1,0]
                    }
                ]
            }
        ]
    }
]
majorIntroEvents = [ // intro week meeting with each mentor
    {
        id: "archie",
        title: "",
        description: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "celine",
        title: "",
        decription: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "emma",
        title: "",
        description: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "jacob",
        title: "",
        decription: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "james",
        title: "",
        description: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "mallory",
        title: "",
        decription: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "marlena",
        title: "",
        description: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id: "walker",
        title: "",
        decription: "",
        weekRange: [1],
        choices: [
            {
                text: "",
                outcomes: [
                    {
                        resultText: "",
                        chance: 100, // %
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [0,0,0,0]
                    }
                ]
            }
        ]
    },
]
normalEvents = [
    {
        id:"labMeeting",
        title:"Attend Lab Meeting",
        weekRange:[2,3,4],
        description:"You're attending your weekly lab meeting, do you...",
        choices:[
            {
                text: "Take notes during the meeting.",
                outcomes: [
                    {
                        resultText: "Your mentor is impressed by your engagement and nods in approval.",
                        chance: 20,
                        weight: [1,1,1,1], // happiness, motivation, stress, research progress
                        effects: [+4,+4,0,+3]
                    },
                    {
                        resultText: "You contribute a thoughtful comment. The lab is impressed.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [+3,+3,0,+4]
                    },
                    {
                        resultText: "You mostly stay silent but absorb a lot of new information.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [0,+2,0,+2]
                    },
                    {
                        resultText: "Your mentor thinks you're not paying attention.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [-2,0,+3,0]
                    },
                    {
                        resultText: "You try to pay attention but end up doodling instead.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [0,-3,0,0]
                    }
                ]
            },
            {
                text: "Sit silently and try to decode the jargon.",
                outcomes: [
                    {
                        resultText: "You are able to follow along with most of the discussion.",
                        chance: 25,
                        weight: [1,1,1,1],
                        effects: [0,+3,0,+3]
                    },
                    {
                        resultText: "It's overwhelming, but you learn a few key terms.",
                        chance: 30,
                        weight: [1,1,1,1],
                        effects: [0,0,+3,+2]
                    },
                    {
                        resultText: "You nod along like you understand everything.",
                        chance: 25,
                        weight: [1,0,1,0],
                        effects: [0,0,+2,+1]
                    },
                    {
                        resultText: "You zone out and miss something important.",
                        chance: 20,
                        weight: [0,0,1,1],
                        effects: [0,-1,+4,0]
                    }
                ]
            }, 
            {
                text:"Ask a question every few minutes to stay involved.",
                outcomes: [
                    {
                        resultText: "People seem to appreciate your curiosity.",
                        chance: 50,
                        weight: [1,1,0,1],
                        effects: [+3,+3,0,+2]
                    },
                    {
                        resultText: "One postdoc answers curtly and moves on.",
                        chance: 30,
                        weight: [0,0,1,0],
                        effects: [-1,0,+3,0]
                    },
                    {
                        resultText: "Someone explains something really helpful.",
                        chance: 20,
                        weight: [1,1,0,1],
                        effects: [+2,+4,0,+2]
                    }
                ]
            }
        ]
    },
    {
        id:"lateStart",
        title:"Late for Lab",
        weekRange:[2,3],
        description: "You oversleep and wake up an hour after you were supposed to be in lab.",
        choices:[
            {
                text: "Rush in and apologize profusely",
                outcomes: [
                    {
                        resultText: "Your mentor waves it off, clearly amused.",
                        chance: 40,
                        weight: [1,1,0,0],
                        effects: [+2,+2,0,0]
                    },
                    {
                        resultText: "You interrupt a lab meeting mid-sentence. Awkward.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [-2,0,+4,0]
                    },
                    {
                        resultText: "You spill your coffee on the door handle. What a morning.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [-3,0,+5,0]
                    }
                ]
            },
            {
                text: "Send a professional email and show up late but composed",
                outcomes: [
                    {
                        resultText: "Your mentor appreciates the honesty and maturity.",
                        chance: 50,
                        weight: [1,1,0,0],
                        effects: [+4,+3,0,0]
                    },
                    {
                        resultText: "They seem disappointed, but say nothing.",
                        chance: 30,
                        weight: [1,1,1,0],
                        effects: [-1,+1,+3,0]
                    },
                    {
                        resultText: "Your PI never saw the email. Oops.",
                        chance: 20,
                        weight: [1,0,1,0],
                        effects: [-2,0,+3,0]
                    }
                ]
            },
            {
                text: "Pretend you were working from home all morning",
                outcomes: [
                    {
                        resultText: "They buy it. Barely.",
                        chance: 40,
                        weight: [1,1,0,1],
                        effects: [+1,+1,0,+1]
                    },
                    {
                        resultText: "A postdoc casually asks what you were working on.",
                        chance: 35,
                        weight: [0,0,1,0],
                        effects: [-4,0,+6,0]
                    },
                    {
                        resultText: "They already know you weren’t online.",
                        chance: 25,
                        weight: [1,0,1,0],
                        effects: [-6,0,+8,0]
                    }
                ]
            }            
        ]
    },
    {
        id:"safetyTraining",
        title:"Safety Training",
        weekRange:[2,3],
        description: "Mandatory online lab safety training",
        choices:[
            {
                text: "Skip it. You’re pretty sure you’ve done this before.",
                outcomes: [
                    {
                        resultText: "You get an email from your mentor asking why you didn't complete the trainings.",
                        chance: 45,
                        weight: [1,0,1,0],
                        effects: [-4,0,+5,0]
                    },
                    {
                        resultText: "Somehow, no one notices. It wasn't that important anyways",
                        chance: 55,
                        weight: [1,0,0,0],
                        effects: [+1,0,-1,0]
                    }
                ]
            },
            {
                text: "Zone out and doodle in the handout margins",
                outcomes: [
                    {
                        resultText: "You retain absolutely nothing, but your sketch of the fire extinguisher is impressive.",
                        chance: 40,
                        weight: [1,0,0,0],
                        effects: [+2,0,0,0]
                    },
                    {
                        resultText: "Your mentor asks what you thought of the ‘acetone spill protocol.’ You bluff your way through it.",
                        chance: 30,
                        weight: [1,1,1,0],
                        effects: [0,+1,+2,0]
                    },
                    {
                        resultText: "You completely miss the emergency exit drill.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [-2,0,+3,0]
                    }
                ]                
            },
            {
                text:"Concentrate and take notes throughout.",
                outcomes: [
                    {
                        resultText: "Your mentor doesn't care but at least you know where to go during a fire drill",
                        chance: 65,
                        weight: [1,1,1,0],
                        effects: [+5,0,+3,0]
                    },
                    {
                        resultText: "You seem a little too interested in asking where the biohazards are discarded and get flagged by public safety",
                        chance: 5,
                        weight: [1,1,1,0],
                        effects: [-2,0,+3,0]
                    },
                    {
                        resultText: "Your enthusiasm impresses your professor, who also has a passion for lab safety",
                        chance: 30,
                        weight: [1,1,1,0],
                        effects: [+5,0,-2,0]
                    }
                ]
            }
        ]
    },
    {
        id:"mentorCheckIn",
        title: "Mentor Check-in",
        weekRange:[2,3,4,5],
        description: "Your mentor walks in the room while you're playing solitaire on your laptop",
        choices: [
            {
                text: "Panic and pretend you're debugging something",
                outcomes: [
                    {
                        resultText: "You frantically open a terminal window. It's clearly empty.",
                        chance: 40,
                        weight: [1,1,1,0],
                        effects: [-2,+1,+5,0]
                    },
                    {
                        resultText: "Your mentor squints. 'Is this... a new visualization tool?'",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [+3,+2,0,0]
                    },
                    {
                        resultText: "They don't buy it, and now you're moved to a desk visible to your mentor.",
                        chance: 40,
                        weight: [1,0,1,0],
                        effects: [-3,0,+4,0]
                    }
                ]
            },
            {
                text: "Minimize it and ask how their day is going",
                outcomes: [
                    {
                        resultText: "They appreciate the shift and sit down to chat.",
                        chance: 50,
                        weight: [1,1,0,1],
                        effects: [+3,+2,0,+1]
                    },
                    {
                        resultText: "They glance at your screen but move on.",
                        chance: 30,
                        weight: [1,0,0,0],
                        effects: [+1,0,0,0]
                    },
                    {
                        resultText: "They casually mention work-life balance and then assign 3 papers for you to read.",
                        chance: 20,
                        weight: [1,0,1,1],
                        effects: [0,0,+2,+2]
                    }
                ]
            },
            {
                text: "Own it. Invite them to play a round.",
                outcomes: [
                    {
                        resultText: "They sit down and beat you in three moves.",
                        chance: 50,
                        weight: [1,1,0,0],
                        effects: [+2,+2,0,0]
                    },
                    {
                        resultText: "They sigh and walk away. Time to focus up.",
                        chance: 50,
                        weight: [1,0,1,0],
                        effects: [-2,0,+3,0]
                    }
                ]
            },
            {
                text: "Close your laptop and start rambling about your recent progress",
                outcomes: [
                    {
                        resultText: "They nod, but you can tell they're not convinced.",
                        chance: 40,
                        weight: [1,0,1,1],
                        effects: [-1,0,+2,+1]
                    },
                    {
                        resultText: "They stop you mid-sentence and suggest documenting everything… right now.",
                        chance: 30,
                        weight: [1,0,1,1],
                        effects: [0,0,+3,+2]
                    },
                    {
                        resultText: "Your fast-talking pays off, they leave impressed.",
                        chance: 30,
                        weight: [1,1,0,1],
                        effects: [+5,+3,0,+2]
                    }
                ]
            }
        ]
    },
    {
        id:"dcTourist",
        title: "DC Tourist",
        weekRange:[2,3,4,5,6],
        description: "Some other REU students are asking if anyone wants to sight-see this weekend",
        choices: [
            {
                text: "Politely decline because you have a stack of papers that your professor wants you to read",
                outcomes:[
                    {
                        resultText: "You try to read, but end up doomscrolling half the time away.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [0,0,+1,+1]
                    },
                    {
                        resultText: "You get through everything and impress your mentor on Monday.",
                        chance: 15,
                        weight: [1,1,1,1],
                        effects: [+4,+3,+3,+5]
                    },
                    {
                        resultText: "The group that went tried to sneak into the White House and got arrested.",
                        chance: 5,
                        weight: [1,1,1,1],
                        effects: [+2,0,-2,+2]
                    },
                    {
                        resultText: "You missed out on the Zoo but at least you got through some readings",
                        chance: 50,
                        weight: [1,1,1,1],
                        effects: [-2,+1,+2,+3]
                    }
                ]
            },
            {
                text: "Go to the zoo to see pandas",
                outcomes:[
                    {
                        resultText: "You bond with the other interns over Panda Diplomacy.",
                        chance: 40,
                        weight: [1,1,0,0],
                        effects: [+2,+3,0,0]
                    },
                    {
                        resultText: "It's hot, crowded, and the pandas are asleep.",
                        chance: 10,
                        weight: [1,1,0,0],
                        effects: [0,+1,0,0]
                    },
                    {
                        resultText: "You get sunburned and exhausted but happy.",
                        chance: 40,
                        weight: [1,0,0,0],
                        effects: [-1,+2,0,0]
                    },
                    {
                        resultText: "It starts pouring rain and drenches your group before even seeing the pandas.",
                        chance: 10,
                        weight: [1,1,1,1],
                        effects: [-2,-1,+1,0]
                    }
                ]
            },
            {
                text: "Suggest the National Mall",
                outcomes: [
                    {
                        resultText: "Everyone loves the idea and you all end up doing a segway tour",
                        chance: 40,
                        weight: [1,1,0,1],
                        effects: [+3,+2,0,0]
                    },
                    {
                        resultText: "You walk way too much and your feet are killing you.",
                        chance: 30,
                        weight: [1,0,0,0],
                        effects: [-1,+1,0,0]
                    },
                    {
                        resultText: "You stumble into a protest and get a free sticker.",
                        chance: 30,
                        weight: [1,1,0,0],
                        effects: [+1,+2,0,0]
                    }
                ]
            }
        ]
    },
    {
        id:"diningHallClosed",
        title: "Dining Hall Closed",
        weekRange:[3,4,5,6],
        description: "You get an email from Ronnie White that Garvey Hall is no longer serving interns",
        choices:[
            {
                text:"Try to sneak in with one of the authorized groups.",
                outcomes:[
                    {
                        resultText:"You don a camo T-shirt and successfully get in with jROTC.",
                        chance: 25,
                        weight: [0,1,1,0],
                        effects: [+4,+2,0,0]
                    },
                    {
                        resultText:"You pretend to be in a middle school group but then get herded to their next activity.",
                        chance: 20,
                        weight: [0,1,1,0],
                        effects: [+1,0,+2,0]
                    },
                    {
                        resultText:"You sit and argue with some old ladies who tell you about a mysterious prophecy.",
                        chance: 10,
                        weight: [0,1,1,0],
                        effects: [0,+1,+2,0]
                    },
                    {
                        resultText:"You get caught and kicked out. So much for Catholic charity.",
                        chance: 15,
                        weight: [0,1,1,0],
                        effects: [-3,0,+3,0]
                    },
                    {
                        resultText:"You get caught but the dining workers pity you and let you eat lunch.",
                        chance: 30,
                        weight: [0,0,1,0],
                        effects: [+2,0,+1,0]
                    }
                ]
            },
            {
                text:"Go anyways and plead your case.",
                outcomes: [
                    {
                        resultText:"They don't understand what you're saying and yell at you to swipe your ID.",
                        chance: 25,
                        weight: [1,1,1,0],
                        effects: [-3,0,+3,0]
                    },
                    {
                        resultText:"You stare at the dining worker awkwardly until they wave you in.",
                        chance: 50,
                        weight: [1,1,1,0],
                        effects: [+2,-2,0,0]
                    },
                    {
                        resultText:"You name-drop Ronnie White and they let you in.",
                        chance: 10,
                        weight: [1,1,1,0],
                        effects: [+3,0,0,0]
                    },
                    {
                        resultText:"You promise to become Catholic if they give you food.",
                        chance: 15,
                        weight: [1,1,1,0],
                        effects: [-1,-1,+2,0]
                    }
                ]
            },
            {
                text:"Trader Joe's run.",
                outcomes:[
                    {
                        resultText:"You're eating better food but it is more work.",
                        chance: 40,
                        weight: [0,1,0,0],
                        effects: [+5,+3,+3,0]

                    },
                    {
                        resultText:"The dining hall food tasted like canola oil anyways.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [+3,-1,0,0]
                    },
                    {
                        resultText:"You buy some food from Trader Joe's, but anything you have to pay for is disappointing.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [-1,0,-2,0]
                    }
                ]
            }
        ]
    },
    {
        id:"diningHallID",
        title:"Where's my ID?",
        weekRange:[7,8,9],
        description:"You get to Garvey Hall for lunch only to find out you forgot your ID at your dorm",
        choices:[
            {
                text:"Sneak in from the exit",
                outcomes:[
                    {
                        resultText:"You almost get caught but you hide in the bathroom for 10 minutes and are able to get in.",
                        chance: 40,
                        weight: [1,1,0,0],
                        effects: [+3,0,+3,0]

                    },
                    {
                        resultText:"The same dining worker that yelled at you this morning sees you sneaking in and tackles you to the floor.",
                        chance: 15,
                        weight: [1,1,0,0],
                        effects: [-5,0,+5,0]
                    },
                    {
                        resultText:"With the help of another intern you are able to sneak in and get food.",
                        chance: 45,
                        weight: [1,1,0,0],
                        effects: [+2,0,+1,0]
                    }
                ]
            },
            {
                text:"Beg the dining worker on your knees to let you in",
                outcomes:[
                    {
                        resultText:"You have to wait til other physics REU students come and vouch for you but you get in eventually.",
                        chance: 25,
                        weight: [1,1,0,0],
                        effects: [+4,+2,-1,0]
                    },
                    {
                        resultText:"The dining worker pities you and lets you in.",
                        chance: 40,
                        weight: [1,1,0,0],
                        effects: [+4,0,-1,0]
                    },
                    {
                        resultText:"Despite your best efforts, the dining worker is not moved and you are forced to leave.",
                        chance: 35,
                        weight: [1,1,0,0],
                        effects: [-2,0,+1,0]
                    }
                ]
            },
            {
                text:"Walk in with your head down",
                outcomes:[
                    {
                        resultText:"An angry worker yells at you but you pretend to be deaf. Suprisingly it works.",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [+4,+2,-1,0]
                    },
                    {
                        resultText:"You are recognized by a dining hall worker who threatens to call campus security.",
                        chance: 35,
                        weight: [1,1,0,0],
                        effects: [-2,0,+3,0]
                    },
                    {
                        resultText:"You get in but the food is terrible and you feel guilty for sneaking in.",
                        chance: 45,
                        weight: [1,1,0,0],
                        effects: [0,-4,-3,0]
                    }
                ]
            },
            {
                text:"Give up and eat somewhere else",
                outcomes:[
                    {
                        resultText:"Return to your dorm but you still don't have your ID so you can't get in.",
                        chance: 20,
                        weight: [1,1,1,0],
                        effects: [-5,-4,+1,0]
                    },
                    {
                        resultText:"Trader Joe's run",
                        chance: 40,
                        weight: [1,1,1,0],
                        effects: [+1,0,-1,0]
                    },
                    {
                        resultText:"You eat alone at Chipotle but at least you got some steps in.",
                        chance: 40,
                        weight: [1,1,1,0],
                        effects: [+1,+2,0,0]
                    },
                    {
                        resultText:"Another REU student makes dinner with you in the dorm kitchen and you bond over the experience.",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [+3,+2,0,0]
                    }
                ]
            }
        ]
    },
    {
        id:"friendVisits",
        title: "Visit from Friend",
        weekRange:[4,5,6,7,8],
        description: "A close friend is visiting for the weekend",
        choices:[
            {
                text: "Play minigolf at the Wharf",
                outcomes: [
                    {
                        resultText: "You guys have a great time and catch some live music afterwards.",
                        chance: 55,
                        weight: [1,1,0,0],
                        effects: [+4,+2,-1,0]
                    },
                    {
                        resultText: "Your friend is much better than you and you feel a bit salty.",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [-1,-1,+1,0]
                    },
                    {
                        resultText: "It starts raining halfway through and you end up standing inside instead.",
                        chance: 25,
                        weight: [1,1,0,0],
                        effects: [+2,+1,0,0]
                    }
                ]
            },
            {
                text:"Try to sneak into the White House",
                    outcomes: [
                    {
                        resultText: "You are tackled by a Secret Service agent while trying to climb the fence.",
                        chance: 50,
                        weight: [1,1,1,0],
                        effects: [+1,+1,+5,0]
                    },
                    {
                        resultText: "Your friend gets scared and bails halfway through the plan.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [-2,-2,0,0]
                    },
                    {
                        resultText: "You hop the fence when no one's looking and take patriotic selfies.",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [+4,+1,+1,0]
                    }
                ]
            },
            {
                text: "Spend the weekend showing them your research setup",
                outcomes: [
                    {
                        resultText: "They nod politely while you ramble about your project.",
                        chance: 40,
                        weight: [0,1,0,1],
                        effects: [+2,+2,0,+2]
                    },
                    {
                        resultText: "They ask questions you can’t answer and now you're spiraling.",
                        chance: 20,
                        weight: [0,1,1,1],
                        effects: [-2,0,+3,+1]
                    },
                    {
                        resultText: "Your explanation makes so little sense that they convert to Catholicism.",
                        chance: 25,
                        weight: [0,1,0,1],
                        effects: [0,-3,0,0]
                    },
                    {
                        resultText: "You realize you haven’t done as much as you thought.",
                        chance: 15,
                        weight: [0,1,1,1],
                        effects: [-2,0,+2,0]
                    }
                ]
            },
        ]
    },
    {
        id:"7/11Slurpees",
        title: "National Slurpee Day",
        weekRange: [7],
        description: "It's 7/11, which means free slurpees at 7-Eleven",
        choices:[
            {
                text:"Go with the other interns after work",
                outcomes:[
                    {
                        resultText:"An angry lady starts a fight and tries to run you over.",
                        chance: 10,
                        weight: [1,1,1,1],
                        effects: [-8,0,+10,0]
                    },
                    {
                        resultText:"The slurpees are great, and no one tried to run you over.",
                        chance: 60,
                        weight: [1,1,1,1],
                        effects: [+3,+4,0,0]
                    },
                    {
                        resultText:"You keep going back in for more until the manager asks you to leave.",
                        chance: 30,
                        weight: [1,1,1,1],
                        effects: [+2,0,-3,0]
                    }
                ]
            },
            {
                text:"Free slurpees aren't worth it",
                outcomes:[
                    {
                        resultText:"Good choice, the other interns got run over by a car.",
                        chance: 10,
                        weight: [1,1,1,0],
                        effects: [-2,+4,-2,+1]
                    },
                    {
                        resultText:"The other interns agree and you go out for icecream instead.",
                        chance: 50,
                        weight: [1,1,1,0],
                        effects: [+4,0,-3,0]
                    },
                    {
                        resultText:"You work on your project while some other REU students go.",
                        chance: 40,
                        weight: [1,1,1,0],
                        effects: [-2,0,0,+4]
                    }
                ]
            }
        ]
    },
    {
        id: "3Dprinting",
        title: "Abusing the 3D printer",
        weekRange: [4,5,6,7,8],
        description: "You want to use the 3D printer in Dr.Yero's lab to make something, but you can't decide what.",
        choices:[
            {
                text: "Print out a 20-cigarette holder to gift to your friend",
                outcomes:[
                    {
                        resultText: "Dr. Yero catches you and thinks it's funny.",
                        chance: 30,
                        weight: [1,1,1,1],
                        effects: [+7,+2,-2,0]
                    },
                    {
                        resultText: "You give it to your friend and they love it.",
                        chance: 60,
                        weight: [1,1,1,1],
                        effects: [+5,+2,-2,0]
                    },
                    {
                        resultText: "You try to print it, but end up breaking the printer (it explodes and bursts into flames).",
                        chance: 10,
                        weight: [1,1,1,1],
                        effects: [-10,-4,+4,-2]
                    }
                ]
            },
            {
                text: "Print out a model of the Eiffel Tower as a gift to Dr. Yero.",
                outcomes:[
                    {
                        resultText: "Dr. Yero loves the gesture!",
                        chance: 60,
                        weight: [1,1,1,1],
                        effects: [+5,+5,-4,0]
                    },
                    {
                        resultText: "Dr. Yero is confused, but thanks you anyways.",
                        chance: 30,
                        weight: [1,1,1,1],
                        effects: [+2,+2,0,0]
                    },
                    {
                        resultText: "The filament spaghettifies when printing the Tower's intricacies, so you have to spend time repairing it.",
                        chance: 10,
                        weight: [1,1,1,1],
                        effects: [-5,-4,+3,-3]
                    }
                ]
            },
            {
                text: "Print out a bust of Walker as a joke.",
                outcomes: [
                    {
                        resultText: "Walker thinks its funny and puts it up on a shelf to oversee the lab.",
                        chance: 85,
                        weight: [1,1,1,1],
                        effects: [+3,+3,-2,+2]
                    },
                    {
                        resultText: "The 3D printer can't handle Walker's immaculate beauty and self-destructs.",
                        chance: 15,
                        weight: [1,1,1,1],
                        effects: [-4,-1,+3,0]
                    }
                ]
            },
            {
                text: "Print out a TheRocktopus™.",
                outcomes:[
                    {
                        resultText: "Dr. Yero sees it and is both confused and concerned.",
                        chance: 60,
                        weight: [1,1,1,1],
                        effects: [+3,+3,0,0]
                    },
                    {
                        resultText: "TheRocktopus™ is beautiful. TheRocktopus™ is great. TheRocktopus™ is perfect.",
                        chance: 15,
                        weight: [1,1,1,1],
                        effects: [+7,+3,-3,0]
                    },
                    {
                        resultText: "TheRocktopus™ coaches you on how to best progress on your research project, leading to a huge breakthrough.",
                        chance: 25,
                        weight: [1,1,1,1],
                        effects: [+2,+3,-2,+8]
                    }
                ]
            }
        ]
    },
    {
        id:"BaltimoreTrip",
        title: "Day-Trip to Baltimore",
        weekRange: [7,8],
        description: "Some REU friends take the train with you into Baltimore for the day",
        choices:[
            {
                text:"Go to the downtown Farmer's Market",
                outcomes:[
                    {
                        resultText:"You buy a watermelon and carry it around with you the rest of the day.",
                        chance:35,
                        weight:[1,1,1,1],
                        effects:[+2,0,+1,0]
                    },
                    {
                        resultText:"You get some great fried donuts to share.",
                        chance:55,
                        weight:[1,1,1,1],
                        effects:[+4,+2,0,0]
                    },
                    {
                        resultText:"You fail to hula hoop and embarass yourself in front of the other interns",
                        chance:10,
                        weight:[1,1,1,1],
                        effects:[-2,0,+3,0]
                    },
                ]
            },
            {
                text:"Get a $5 palm reading from a psychic",
                outcomes:[
                    {
                        resultText:"You find out your true passion in life is actually Pharmacology.",
                        chance:25,
                        weight:[1,1,1,0],
                        effects:[+1,-5,0,0]
                    },
                    {
                        resultText:"You will make lots of money after you sell your soul to Lockheed Martin.",
                        chance:25,
                        weight:[1,1,1,1],
                        effects:[+3,+2,0,0]
                    },
                    {
                        resultText:"Your life line indicates you will be married and give birth in under 2 years.",
                        chance:25,
                        weight:[1,1,1,0],
                        effects:[-1,-1,+3,0]
                    },
                    {
                        resultText:"Ms. Leslie tells you your friends are out to get you and gives you her card.",
                        chance:25,
                        weight:[1,1,1,0],
                        effects:[-2,0,+2,0]
                    }
                ]
            },
            {
                text:"Go on a Dragon pedal-boat ride",
                outcomes:[
                    {
                        resultText:"It starts pouring but you have a good time.",
                        chance:35,
                        weight:[1,1,1,0],
                        effects:[+1,-2,0,0]
                    },
                    {
                        resultText:"The boat tips over and you all fall in.",
                        chance:10,
                        weight:[1,1,1,0],
                        effects:[-5,0,+4,0]
                    },
                    {
                        resultText:"You all get weird looks for the dragon noises you guys make but it was an otherwise solid experience.",
                        chance:55,
                        weight:[1,1,1,0],
                        effects:[+3,0,0,0]
                    }
                ]
            }
        ]
    },
    {
        id:"internMixer",
        title:"CUA Intern Mixer",
        weekRange:[5,9],
        description:"You get an email from Ronnie White inviting you to this month's intern mixer.",
        choices:[
            {
                text:"You and the other interns go together.",
                outcomes: [
                    {
                        resultText:"The food is fantastic and you leave with a couple extra plates for later.",
                        chance:35,
                        weight:[1,0,1,0],
                        effects:[+3,0,-2,0]
                    },
                    {
                        resultText:"The food is alright and Ronnie White's speech moves you to tears.",
                        chance:30,
                        weight:[1,1,1,0],
                        effects:[+2,+5,0,0]
                    },
                    {
                        resultText:"The food is slightly better than Garvey??",
                        chance:35,
                        weight:[1,1,1,0],
                        effects:[+1,-2,0,0]
                    }
                ]
            },
            {
                text:"Try to meet new people there!",
                outcomes:[
                    {
                        resultText:"You have a great conversation with a Capital Hill intern and exchange numbers.",
                        chance:50,
                        weight:[1,1,1,0],
                        effects:[+5,0,-1,0]
                    },
                    {
                        resultText:"You socialize a bit but don't make any lasting impressions.",
                        chance:30,
                        weight:[1,1,1,0],
                        effects:[+1,0,-1,0],
                    },
                    {
                        resultText:"You mention your extra REU meal stipend loud enough for Ronnie White to hear. An investigation is being launched.",
                        chance:10,
                        weight:[1,1,1,0],
                        effects:[-2,0,+5,0]
                    },
                    {
                        resultText:"You try to kiss up to Ronnie White for intern perks. Mild Success.",
                        chance:10,
                        weight:[1,1,1,0],
                        effects:[+3,0,0,0]
                    }
                ]
            },
            {
                text:"You have deadlines to meet, so you pass this time.",
                outcomes:[
                    {
                        resultText:"You miss out on some good food but get some progress done on your project.",
                        chance:60,
                        weight:[0.5,1,0.25,0.25],
                        effects:[-2,0,0,+6]
                    },
                    {
                        resultText:"You hear from the other interns that Ronnie White was handing out $100 gift cards",
                        chance:5,
                        weight:[1,1,1,1],
                        effects:[-3,0,0,+3]
                    },
                    {
                        resultText:"It's hard to focus on your work with only a Trader Joe's frozen burrito to fuel you.",
                        chance:35,
                        weight:[0.5,1,0.25,0.5],
                        effects:[-3,0,+1,+4]
                    }
                ]
            }
        ]
    },
    {
        id:"FreeTime",
        title:"Free Time",
        weekRange:[5,6,7,8],
        description:"You have some free time this weekend, do you...",
        choices:[
            {
                text:"Work on your project outside of lab",
                outcomes:[
                    {
                        resultText:"You make great progress and feel accomplished.",
                        chance: 40,
                        weight: [1,1,1,1],
                        effects: [+3,+3,0,+5]
                    },
                    {
                        resultText:"You get distracted by YouTube and end up watching cat videos for hours.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [0,-3,+3,0]
                    },
                    {
                        resultText:"You realize you need to do more research before making any real progress.",
                        chance: 25,
                        weight: [1,1,1,1],
                        effects: [0,-1,0,+1]
                    },
                    {
                        resultText:"You get so into it that you end up ordering takeout at 2am.",
                        chance: 15,
                        weight: [1,1,1,1],
                        effects: [-2,0,+2,+3]
                    }
                ]                
            },
            {
                text:"Sightsee around DC",
                outcomes:[
                    {
                        resultText:"You go to the National Archives and read physics papers from the 1800s.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [0,+2,0,+1]
                    },
                    {
                        resultText:"You get lost in the city and end up at a random food truck.",
                        chance: 20,
                        weight: [1,1,1,0],
                        effects: [0,+1,+2,0]
                    },
                    {
                        resultText:"You visit the Washington Monument and realize its just a really inefficient capacitor.",
                        chance: 30,
                        weight: [1,1,1,0],
                        effects: [+3,+2,0,0]
                    },
                    {
                        resultText:"You try to calculate the gravitational potential of the top of the Capitol Dome and get escorted away by security.",
                        chane: 30,
                        weight: [1,1,1,0],
                        effects: [-3,0,+4,0]
                    }
                ]
            },
            {
                text:"Catch up on sleep",
                outcomes:[
                    {
                        resultText:"You sleep for 12 hours straight and wake up feeling refreshed.",
                        chance: 30,
                        weight: [1,1,1,0],
                        effects: [+5,+3,0,0]
                    },
                    {
                        resultText:"You sleep through your alarm and don't make it to Garvey Hall in time for a free meal.",
                        chance: 20,
                        weight: [1,1,1,0],
                        effects: [-2,+1,+2,0]
                    },
                    {
                        resultText:"You have nightmares about your project and wake up more tired than before.",
                        chance: 20,
                        weight: [1,1,1,1],
                        effects: [-3,-2,+2,0]
                    },
                    {
                        resultText:"You sleep so much that you forget what day it is.",
                        chance: 30,
                        weight: [1,1,1,1],
                        effects: [+2,+1,0,0]
                    }
                ]
            }
        ]
    },
    {
        id:"TornadoWarning",
        title:"Tornado Warning",
        weekRange:[6,7,8],
        description:"A tornado warning is issued for the area and CUA sends out an alert to all students",
        choices:[
            {
                text:"Head to the nearest basement with the other interns",
                outcomes:[
                    {
                        resultText:"You all huddle together and play cards while waiting it out.",
                        chance: 50,
                        weight: [1,1,0,0],
                        effects: [+2,+3,0,0]
                    },
                    {
                        resultText:"You end up in a storage room with no windows and no signal.",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [-1,0,+2,0]
                    },
                    {
                        resultText:"You get to meet some other interns from different programs and exchange stories.",
                        chance: 30,
                        weight: [1,1,0,0],
                        effects: [+3,+2,0,0]
                    }
                ]
            },
            {
                text:"Stay in your dorm and hope for the best",
                outcomes:[
                    {
                        resultText:"You hear the wind howling outside but nothing happens.",
                        chance: 25,
                        weight: [1,1,0,0],
                        effects: [+1,0,+1,0]
                    },
                    {
                        resultText:"A branch crashes through your window and a squirrel gets in.",
                        chance: 5,
                        weight: [1,1,0,0],
                        effects: [-3,0,+4,0]
                    },
                    {
                        resultText:"You end up binge-watching a show and forget about the warning.",
                        chance: 30,
                        weight: [1,1,0,0],
                        effects: [+2,+2,-2,0]
                    },
                    {
                        resultText:"You take the time to catch up on your project and make some good progress.",
                        chance: 20,
                        weight: [0.5,1,0.5,0],
                        effects: [0,+2,0,+4]
                    },
                    {
                        resultText:"The power goes out and you have to use votive candles to see.",
                        chance: 20,
                        weight: [1,1,0,0],
                        effects: [-2,0,+2,0]
                    }
                ]
            },
            {
                text:"Go outside and collect data for your 'human resistance to airborne debris' thesis",
                outcomes:[
                    {
                        resultText:"You get some interesting data but also a concussion from a flying branch.",
                        chance: 10,
                        weight: [1,1,1,0],
                        effects: [-5,-5,0,0]
                    },
                    {
                        resultText:"You try to count debris impacts but lose track after the fifth squirrel",
                        chance: 30,
                        weight: [1,1,1,0],
                        effects: [+1,-3,0,0]
                    },
                    {
                        resultText:"You try to categorize debris by impact force, but your only units are 'ouch' and 'that hurt'.",
                        chance: 25,
                        weight: [1,1,1,0],
                        effects: [0,+1,+2,0]
                    },
                    {
                        resultText:"A flying notebook opens mid-air and you accidentally derive a turbulence equation.",
                        chance: 20,
                        weight: [1,1,1,0],
                        effects: [+3,+2,0,+1]
                    },
                    {
                        resultText:"A Styrofoam cup hits you and bounces off harmlessly.",
                        chance: 15,
                        weight: [1,1,1,0],
                        effects: [+2,0,0,0]
                    }
                ]
            }
        ]
    }
]
globalMeetingEvents=[ // List of global meetings that can each happen every week
    {
        id:"globalMeeting1",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeeting2",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeeting3",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeeting4",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeeting5",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeeting6",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:"You watch a twelve minute long video about how to break into finance as a physics major. The only notable takeaway is the following question that stays in your mind: How do you convince a one-club golfer to use the rest of the clubs in his bag? "
    },
    {
        id:"globalMeeting7",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:"You learn about common post-grad options for physics majors. They do well. Apparently, however, psychology majors have it rough"
    },
    {
        id:"globalMeeting8",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeetin9",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
    {
        id:"globalMeeting10",
        title:"REU Global Meeting",
        weekRange:[1,2,3,4,5,6,7,8],
        description:""
    },
]
majorEvents=[
    {
        id:"UMDVisit",
        title:"Visit to Unvirsity of Maryland",
        weekRange:[8],
        description:"You and the other interns visit the University of Maryland and their REU program",
        choices:[]
    },
    {
        id:"finalPresentationCheckpoint",
        title:"Practice Session for Final Presentation",
        weekRange:[9],
        choices:[]
    },
    {
        id:"finalPresentation",
        title:"Final Presenation",
        weekRange:[10],
        choices:[]
    }
]
labSpecificEvents=[
    {

    }
]

let currentEvent = null;
let numEventsTilNextWeek = null;
weekEventQueue = [];

eventsPerWeekMin = [-1,3,4,4,4,4,4,4,4,4,4]; // index 0 is unused, so week 1 starts at index 1
eventsPerWeekMax = [-1,5,5,6,6,6,6,6,6,6,6];

function updateNextTurnButton() {
    console.log("UPDATING NEXT TURN BUTTON NOW");
    console.log("\tevents til next week: " + numEventsTilNextWeek);
    if(numEventsTilNextWeek > 1) {
        document.getElementById('nextTurn-button').classList.remove('hidden');
        console.log("\tshowing next turn button");
    }
    else {
        document.getElementById('nextTurn-button').classList.add('hidden');
        console.log("\thiding next turn button");
    }
}
function updateNextWeekButton() {
    console.log("UPDATING NEXT WEEK BUTTON NOW");
    console.log("\tevents til next week: " + numEventsTilNextWeek);
    if(numEventsTilNextWeek > 1) {
        document.getElementById('nextWeek-button').classList.add('hidden');
        console.log("\thiding next week button");
    }
    else {
        document.getElementById('nextWeek-button').classList.remove('hidden');
        console.log("\tshowing next week button");
    }  
}
function weekOneEvents() {
    console.log("Beginning week 1 events");
    numEventsTilNextWeek = getRandomIntInclusive(eventsPerWeekMin[gameState.currentWeek], eventsPerWeekMax[gameState.currentWeek]); // Should be 3-5
    console.log(numEventsTilNextWeek + " events in week 1");

    const shuffled = [...introEvents].sort(() => 0.5 - Math.random());
    weekEventQueue = shuffled.slice(0, numEventsTilNextWeek);
    console.log("successfully shuffled and sliced temp events");

    loadNextWeek1Event();
}
function loadNextWeek1Event() {
    if (weekEventQueue.length > 0) {
        const nextEvent = weekEventQueue.shift();
        loadEvent(nextEvent); // this displays the event and choice UI
    } else {
        console.log("WEEK 1 COMPLETE");
        // nextTurn(); // or whatever should happen after week 1
    }    
}
function loadEvent(event) {
    currentEvent = event;
    document.getElementById("eventText").textContent = event.name;
    document.getElementById("eventDescription").textContent = event.description;

    const choicePanel = document.getElementById("choicePanel");
    choicePanel.innerHTML = "";

    event.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => handleChoice(choice);
        choicePanel.appendChild(btn);
    });

    document.getElementById("eventResult").classList.add("hidden");
    document.getElementById("resultText").textContent = "";
    document.getElementById("choicePanel").classList.remove("hidden");    
}
function handleChoice(choice) {
    console.log("handling choice..");
    document.getElementById("choicePanel").classList.add("hidden");
    document.getElementById("eventResult").classList.remove("hidden");

    // Apply stat changes from choice.outcomes
    let currentPickedOutcome = pickOutcome(choice);
    document.getElementById("resultText").textContent = currentPickedOutcome.resultText;
    applyOutcomeResults(currentPickedOutcome);
    updateNextTurnButton();
    updateNextWeekButton();
}
function pickOutcome(playerChoice) {
    const stats = gameState.stats;
    console.log("Stats:", stats);

    let weightedChances = playerChoice.outcomes.map(outcomes => {
        let baseChance = outcomes.chance;
        let weights = outcomes.weight;

        let statInfluence =
            weights[0] * stats.happiness +
            weights[1] * stats.motivation +
            weights[2] * stats.stress +
            weights[3] * stats.researchProgress;

        let adjustedChance = baseChance * statInfluence;

        console.log("Outcome:", outcomes);
        console.log("Base chance:", baseChance);
        console.log("Stat influence:", statInfluence);
        console.log("Adjusted chance:", adjustedChance);

        return adjustedChance;
    });

    // Normalize
    const total = weightedChances.reduce((a, b) => a + b, 0);
    console.log("Total weight:", total);
    if (total === 0) {
        console.warn("Total weight is 0 — falling back to equal chance.");
        weightedChances = playerChoice.outcomes.map(() => 1);
    }

    const normalized = weightedChances.map(w => w / total);
    console.log("Normalized chances:", normalized);

    const rand = Math.random();
    console.log("Random number:", rand);

    let cumulative = 0;

    for (let i = 0; i < normalized.length; i++) {
        cumulative += normalized[i];
        if (rand <= cumulative) {
            console.log("Selected outcome index:", i);
            return playerChoice.outcomes[i];
        }
    }

    // Fallback (should rarely happen if weights are valid)
    console.log("fallback triggered");
    return playerChoice.outcomes[playerChoice.outcomes.length - 1];
}
function applyOutcomeResults(outcome) {
    document.getElementById("resultTextStats").textContent = "";

    // happiness
    stat_hap = outcome.effects[0];
    if(stat_hap != 0){
        gameState.stats.happiness += stat_hap;
        if(stat_hap > 0) {
            document.getElementById("resultTextStats").textContent += "+" + stat_hap + " happiness\n";
        }
        else {
            document.getElementById("resultTextStats").textContent += stat_hap + " happiness\n";
        }
    }

    // motivation
    stat_mot = outcome.effects[1];
    if(stat_mot != 0){
        gameState.stats.motivation += stat_mot;
        if(stat_mot > 0) {
            document.getElementById("resultTextStats").textContent += "+" + stat_mot + " motivation\n";
        }
        else {
            document.getElementById("resultTextStats").textContent += stat_mot + " motivation\n";
        }

    }

    // stress
    stat_str = outcome.effects[2];
    if(stat_str != 0){
        gameState.stats.stress += stat_str;
        if(stat_str > 0) {
            document.getElementById("resultTextStats").textContent +=  "+" + stat_str + " stress\n";
        }
        else {
            document.getElementById("resultTextStats").textContent += stat_str + " stress\n";
        }
    }
    
    // research progress
    stat_pro = outcome.effects[3];
    if(stat_pro != 0){
        gameState.stats.researchProgress += stat_pro;
        if(stat_pro > 0) {
            document.getElementById("resultTextStats").textContent += "+" + stat_pro + " research progress\n";
        }
        else {
            document.getElementById("resultTextStats").textContent += stat_pro + " research progress\n";
        }
    }

    updateUI();
}
function nextTurn() {
    document.getElementById('nextWeek-button').classList.add('hidden');
    document.getElementById('nextTurn-button').classList.add('hidden');
    console.log("HIDING NEXT WEEK AND NEXT TURN BUTTONS");
    // Advance week
    numEventsTilNextWeek--;
    if(gameState.currentWeek == 1) {
        loadNextWeek1Event();
    }
    else {
        //console.log("no more next turns. week 2 coming soon :))");
        loadNextGenericWeekEvent();
    }
}
function nextWeek() {
    document.getElementById('nextWeek-button').classList.add('hidden');
    document.getElementById('nextTurn-button').classList.add('hidden');
    console.log("HIDING NEXT WEEK AND NEXT TURN BUTTONS");
    // console.log("hiding next week AND next turn buttons -- directly from nextweek() function");
    gameState.currentWeek++;
    console.log("ADVANCING TO WEEK: " + gameState.currentWeek);
    updateUI();
    document.getElementById("currentWeek").textContent = gameState.currentWeek;
    document.getElementById("weekBar").value = gameState.currentWeek;
    document.getElementById("weeksLeft").textContent = 10 - gameState.currentWeek;
    if(gameState.currentWeek == 1) {
        weekOneEvents();
    }
    else {
        // week 2-10 events
        console.log("Loading Week " + gameState.currentWeek + " events");
        genericWeekEvents();
    }
    // updateNextWeekButton();
}

function loadGlobalMeetingEvent() {
    const index = randomIntInclusive(0, globalMeetings.length - 1);
    const selectedGlobalMeeting = globalMeetings[index];
    console.log("Loading global meeting event: " + selectedGlobalMeeting.title);
    globalMeetingEvents.splice(index,1); // Remove global meeting event from the list so it can't be chosen again
    loadEvent(selectedGlobalMeeting); // this displays the event and choice UI
}

function genericWeekEvents() {
    console.log("Beginning week " + gameState.currentWeek + " events");

    const currentWeek = gameState.currentWeek;

    // Filter events that (1) match the week AND (2) haven't been used yet
    const validEvents = normalEvents.filter(event => 
        event.weekRange.includes(currentWeek) &&  // Check if the event is in the current week
        !gameState.usedEventIds.has(event.id) // Check if the event ID has not been used yet
    );
    //console.log("Filtered valid events for week " + currentWeek + ": " + validEvents.length);

    // Select a random number of events for the week
    numEventsTilNextWeek = Math.min(getRandomIntInclusive(3, weeklyEventCoverage[currentWeek]), validEvents.length);
    console.log("\t" + numEventsTilNextWeek + " events will occur this week");

    // Shuffle and slice to create the event queue
    weekEventQueue = [];
    const shuffled = [...validEvents].sort(() => 0.5 - Math.random());
    weekEventQueue = shuffled.slice(0, numEventsTilNextWeek);
    //console.log("Successfully prepared week event queue:", weekEventQueue.map(e => e.id));

    // Mark selected events as used
    weekEventQueue.forEach(event => gameState.usedEventIds.add(event.id));

    // Load the first event
    loadNextGenericWeekEvent();
}

function loadNextGenericWeekEvent() {
    if (weekEventQueue.length > 0) {
        const nextEvent = weekEventQueue.shift();
        loadEvent(nextEvent); // this displays the event and choice UI
    } else {
        console.log("WEEK " + gameState.currentWeek + " COMPLETE");
        document.getElementById("eventText").textContent = "Week " + gameState.currentWeek + " complete!";
        document.getElementById("eventDescription").textContent = "Click 'Next Week' to continue.";
        document.getElementById("choicePanel").innerHTML = "";
        document.getElementById("eventResult").classList.add("hidden");
        document.getElementById('nextWeek-button').classList.remove('hidden');
        document.getElementById('nextTurn-button').classList.add('hidden');
    }   
}


let weeklyEventCoverage = [-10,0,0,0,0,0,0,0,0,0,0]; // index 0 is unused, so week 1 starts at index 1
debugEventCounting(); // Call this function to log the event coverage for debugging purposes
function debugEventCounting() {
    introEvents.forEach(event => {
        event.weekRange.forEach(week => {
            if (week >= 1 && week <= 10) {
                weeklyEventCoverage[week]++;
            }
        });
    });

    normalEvents.forEach(event => {
        event.weekRange.forEach(week => {
            if (week >= 1 && week <= 10) {
                weeklyEventCoverage[week]++;
            }
        });
    });

    majorEvents.forEach(event => {
        event.weekRange.forEach(week => {
            if (week >= 1 && week <= 10) {
                weeklyEventCoverage[week]++;
            }
        });
    });

    console.log("Event Coverage: " + weeklyEventCoverage);
    return;
}


function getRandomIntInclusive(min,max) {
    min = Math.ceil(min); // Ensure min is an integer
    max = Math.floor(max); // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}