currentScreen = "start-screen";

function startScreen() {
    currentScreen = "start-screen";
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('choose-name-screen').classList.add('hidden');
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
    document.getElementById('choose-name-screen').classList.add('hidden');
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
    document.getElementById('choose-name-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.remove('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
}
function selectNameScreen() {
    currentScreen = "choose-name-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-name-screen').classList.remove('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.add('hidden');
}
function selectPlayerChoiceScreen() {
    currentScreen = "player-choice-screen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-name-screen').classList.add('hidden');
    document.getElementById('choose-research-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('mentor-matching-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('player-choice-screen').classList.remove('hidden');
}
function selectResearchScreen() {
    currentScreen = "choose-research-screen";
    const name = document.getElementById("playerName").value.trim();
    console.log("PLAYER NAME: " + name);
    if(name === "") return;
    gameState.internName = name;
    console.log(gameState.internName);
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('choose-name-screen').classList.add('hidden');
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
    document.getElementById('choose-name-screen').classList.add('hidden');
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
    document.getElementById('choose-name-screen').classList.add('hidden');
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
    startScreen();
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
    totalWeeks: 10
};

// DEBUG INITIALIZE STATS I DONT THINK ITS WORKING RIGHT
function initializeStats(){
    console.log("INITIALIZING STATS");
    researchAreaRank = 0;
    if(gameState.field === gameState.researchChoices[0]) researchAreaRank = 1;
    else if(gameState.field === gameState.researchChoices[1]) researchAreaRank = 2;
    else if(gameState.field === gameState.researchChoices[3]) researchAreaRank = 3;
    else researchAreaRank = 4;

    gameState.stats.researchProgress = 0;

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

const researchAreas = [
    "Astrophysics", "Biophysics", "Computational", "Materials Science", "Nuclear", "Particle"
]
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

const mentorPool = {
    "Astrophysics": [
        {
            name: "Dr. Duilia F. de Mello",
            research: "Astrophysics",
            researchDescription: "Observational and theoretical studies of galaxy formation and evolution through multi‑wavelength surveys."
        },
        {
            name: "Dr. Steve Kraemer",
            research: "Astrophysics",
            researchDescription: "Solar physics and active galactic nuclei studies in collaboration with NASA Goddard Space Flight Center."
        }
    ],
    "Biophysics": [
        {
            name: "Dr. Abhijit Sarkar",
            research: "Single-Molecule Biophysics",
            researchDescription: "Experimental studies using magnetic tweezers to probe DNA‑protein interactions at the single‑molecule level."
        },
        {
            name: "Dr. John Philip",
            research: "Glass Physics in Biology",
            researchDescription: "Investigation of glassy biological materials and their nanostructured physical properties in the Vitreous State Laboratory."
        }
    ],
    "Computational": [
        {
            name: "Dr. Vadim Uritsky",
            research: "Computational Astrophysics",
            researchDescription: "Numerical modeling of heliophysics and space weather phenomena using high‑performance computing tools."
        },
        {
            name: "Dr. Tommy Wiklind",
            research: "Computational Astronomy",
            researchDescription: "Computational analysis of transiting exoplanet atmospheres with space telescope data."
        },
        {
            name:"Dr. Nicholas Mecholsky",
            research: "Computational Materials Science",
            researchDescription: "Models quantum mechanical properties of nanostructures and strongly correlated systems."
        }
    ],
    "Materials Science": [
        {
            name: "Dr. Ian L. Pegg",
            research: "Glassy Materials and Waste Form Science",
            researchDescription: "Leads research on nuclear waste vitrification and glass structure analysis."
        },
        {
            name: "Dr. Biprodas Dutta",
            research: "Nanofabrication and Spintronics",
            researchDescription: "Develops nanoscale materials and devices for emerging electronic applications."
        },
        {
            name: "Dr. Nicholas Mecholsky",
            research: "Computational Materials Science",
            researchDescription: "Models quantum mechanical properties of nanostructures and strongly correlated systems."
        }
    ],
    "Nuclear": [
        {
            name: "Dr. Tanja Horn",
            research: "Experimental Nuclear Physics",
            researchDescription: "Conducts experiments at Jefferson Lab exploring nucleon structure and meson production."
        },
        {
            name: "Dr. Grzegorz Kalicy",
            research: "Hadronic Physics and Spectroscopy",
            researchDescription: "Studies meson spectroscopy and detector systems for high-energy experiments."
        },
        {
            name: "Dr. Carlos Yero",
            research: "Nuclear Structure and Reaction Studies",
            researchDescription: "Investigates nuclear scattering processes and quark-gluon interactions in nuclei."
        }
    ],
    "Particle": [
        {
            name: "Dr. Rachel Bartek",
            research: "Experimental High-Energy Physics",
            researchDescription: "High‑energy particle physics research through collaborations at CERN and detector analysis."
        },
        {
            name: "Dr. Aaron Dominguez",
            research: "Collider Physics and Instrumentation",
            researchDescription: "Contributions to experiments in high energy physics and data analysis from collider experiments."
        }
    ]
};

function assignMentor() {
    const allFields = Object.keys(mentorPool);
    const weights = new Map();

    // Assign weights to preferred fields
    if (selectedResearchAreas[0]) weights.set(selectedResearchAreas[0], 60);
    if (selectedResearchAreas[1]) weights.set(selectedResearchAreas[1], 25);
    if (selectedResearchAreas[2]) weights.set(selectedResearchAreas[2], 10);

    // Assign small weights to all other fields (optional)
    const leftoverFields = allFields.filter(f => !weights.has(f));
    const leftoverWeight = 5; // 5% total chance
    const perFieldWeight = leftoverWeight / leftoverFields.length;
    leftoverFields.forEach(f => weights.set(f, perFieldWeight));

    // Create weighted field array
    const weightedFields = [];
    for (const [field, weight] of weights.entries()) {
        for (let i = 0; i < weight; i++) {
        weightedFields.push(field);
        }
    }

    // Randomly choose field
    const chosenField = weightedFields[Math.floor(Math.random() * weightedFields.length)];

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
        You’ve been matched with <strong>${m.name}</strong>
    `;
    const info2 = 'Research Area: ' + m.research;
    const info3 = 'Description: ' + m.researchDescription;

    document.getElementById("mentor-info").innerHTML = info1; 
    document.getElementById("mentor-research-field").innerHTML = info2; 
    document.getElementById("mentor-research-description").innerHTML = info3; 
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
                        resultText: "They nod, vaguely impressed.",
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
                        resultText: "Neither of you speak. Its a little awkward but okay.",
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
                        chance: 10, // %
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
                        chance: 65, // %
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
        title: "Learning How to Research",
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
                        resultText: "Your sar+casm doesn't vibe with the others.",
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
                        resultText: "You see a lot of common housesparrows.",
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
                        resultText: "Out of nowhere a bird swoops down and tries to attack you.",
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
                        resultText: "Your mentor is impressed by your engagement.",
                        chance: 50,
                        weight: [1,1,0,1], // happiness, motivation, stress, research progress
                        effects: [+5,+4,0,+3]
                    },
                    {
                        resultText: "You contribute a thoughtful comment. The lab is impressed.",
                        chance: 25,
                        weight: [1,1,1,1],
                        effects: [+4,+6,0,+4]
                    },
                    {
                        resultText: "You mostly stay silent but absorb a lot.",
                        chance: 25,
                        weight: [1,1,1,1],
                        effects: [+2,+2,0,+2]
                    }
                ]
            },
            {
                text: "Sit silently and try to decode the jargon.",
                outcomes: [
                    {
                        resultText: "It's overwhelming, but you learn a few key terms.",
                        chance: 60,
                        weight: [1,1,1,1],
                        effects: [+1,+2,+3,+1]
                    },
                    {
                        resultText: "You nod along like you understand everything.",
                        chance: 25,
                        weight: [1,0,1,0],
                        effects: [0,0,+2,0]
                    },
                    {
                        resultText: "You zone out and miss something important.",
                        chance: 15,
                        weight: [0,0,1,1],
                        effects: [-2,-1,+5,0]
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
                        effects: [+3,+3,0,+3]
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
                        effects: [+2,+4,0,+4]
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
                text: "Politely decline because you have a stack of papers your professor wants you to read",
                outcomes:[
                    {
                        resultText: "You try to read, but end up doomscrolling half the time.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [0,0,+1,+1]
                    },
                    {
                        resultText: "You get through everything and impress your mentor on Monday!",
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
                        chance: 45,
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
                        chance: 45,
                        weight: [1,0,0,0],
                        effects: [-1,+2,0,0]
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
                        resultText:"You sit with some old ladies who tell you about a mysterious prophecy.",
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
                        resultText:"You miss going to the dining hall.",
                        chance: 30,
                        weight: [1,0,1,0],
                        effects: [-2,0,+2,0]
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
                        resultText:"You almost get caught but you hide in the bathroom for 10 minutes.",

                    },
                    {
                        resultText:"The same dining worker that yelled at you earlier sees you sneaking in and tackles you to the floor."
                    },
                    {
                        resultText:""
                    }
                ]
            },
            {
                text:"Beg the dining worker on your knees to let you in",
                outcomes:[
                    {
                        resultText:"You have to wait til other physics REU students come and vouch for you but you get in eventually."
                    },
                    {
                        resultText:""
                    }
                ]
            },
            {
                text:"Walk in with your head down",
                outcomes:[
                    {
                        resultText:"An angry worker yells at you but you pretend to be deaf. Suprisingly it works.",
                    }
                ]
            },
            {
                text:"Give up and eat somewhere else",
                outcomes:[
                    {
                        resultText:"Return to your dorm but you still don't have your ID so you can't get in."
                    },
                    {
                        resultText:"Trader Joe's run"
                    },
                    {
                        resultText:"You eat alone at Chipotle but at least you got some steps in.",
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
        id:"BaltimoreTrip",
        title: "Day-Trip to Baltimore",
        weekRange: [7,8],
        description: "Some REU friends take the train with you into Baltimore for the day",
        choices:[
            {
                text:"Go to the downtown Farmer's Market",
                outcomes:[
                    {
                        resultText:"Buy a watermelon and carry it around with you the rest of the day.",
                        chance:35,
                        weight:[1,1,1,1],
                        effects:[+2,0,+1,0]
                    },
                    {
                        resultText:"Get some great fried donuts to share.",
                        chance:55,
                        weight:[1,1,1,1],
                        effects:[+4,+2,0,0]
                    },
                    {
                        resultText:"Fail to hula hoop, and embarass yourself in front of the other interns",
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
                        effects:[+1,-5,]
                    },
                    {
                        resultText:"You will make lots of money after you sell your soul to Lockheed Martin.",
                        chance:25,
                        weight:[1,1,1,1],
                        effects:[]
                    },
                    {
                        resultText:"Your life line indicates you will be married in under 2 years.",
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
                text:"Go on a Dragon Boat Ride",
                outcomes:[
                    {
                        resultText:"It starts pouring but you have a good time.",
                        chance:35,
                        weight:[1,1,1,0],
                        effects:[+1,-2,0,0]
                    },
                    {
                        resultText:"The boat tips and you all fall in.",
                        chance:10,
                        weight:[1,1,1,0],
                        effects:[-5,0,+4,0]
                    },
                    {
                        resultText:"You all get weird looks for the dragon noises you guys make but otherwise solid.",
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
    }
]
majorEvents=[
    {
        id:"globalMeeting1",
        title:"REU Global Meeting",
        weekRange:[3],
    },
    {
        id:"globalMeeting2",
        title:"REU Global Meeting",
        weekRange:[6],
    },
    {
        id:"globalMeeting3",
        title:"REU Global Meeting",
        weekRange:[8],
    },
    {
        id:"finalPresentationCheckpoint",
        title:"REU Global Meeting",
        weekRange:[9],
    },
    {
        id:"finalPresentation",
        title:"Final Presenation",
        weekRange:[10],
    }
]

/*
EVENT PLANNING
week 1: 1 intro + 1 normal
    learn how to do research- read papers, watch demonstration
    meet grad students- choice of what to talk about
week 2-5: 2 normal + chance of 3rd
week 6+: 2 normal + larger chance of 3rd + chance of one of the events being major event

IDEAS: ride on scooters

CUSTOM EVENT CHOICES FOR SPECIFIC PEOPLE:
celine- able to eat bird/forage (diningHallID)



2-3 intro week events
12-16 normal events
3-5 rare events
6-8 major events

SOME ONLY HAPPEN DURING CERTAIN WEEKS (include allowedWeeks parameter)
global meetings once a week on friday (early ones we watch or listen presentations/have discussions, later ones we have deadlines/have to present our progress)

research related - mentor gives extra work, mentor says your work is bad, weekly 'global meeting' deadlines
social - visit zoo, visit museum, other DC tourism stuff, ride segways around national mall, visit 7/11 for national slushie day, bird watch, movie night
personal - garvey dining hall is not open for any meals, friend comes to visit, ant infestation in dorm!
random/funny - pigeon in the lab, get a $5 palm reading from a psychic, someone (other intern (RARE: ronnie white)) tries to convert you to catholicism
big/impactful - midterm presentation (if vibes are good enough Dr. Yero lets everyone just read their abstract instead), visit to UMD visit (choose a lab to tour, maybe play hangman?)
*/

let currentEvent = null;
let numEventsTilNextWeek = null;
week1EventQueue = [];

function updateNextTurnButton() {
    console.log("updating next turn button..");
    console.log("\tevents til next week: " + numEventsTilNextWeek);
    if(numEventsTilNextWeek > 1) {
        document.getElementById('nextTurn-button').classList.remove('hidden');
        console.log("showing next turn button");
    }
    else {
        document.getElementById('nextTurn-button').classList.add('hidden');
        console.log("hiding next turn button");
    }
}
function updateNextWeekButton() {
    console.log("updating next week button..");
    console.log("\tevents til next week: " + numEventsTilNextWeek);
    if(numEventsTilNextWeek > 1) {
        document.getElementById('nextWeek-button').classList.add('hidden');
        console.log("hiding next week button");
    }
    else {
        document.getElementById('nextWeek-button').classList.remove('hidden');
        console.log("showing next week button");
    }  
}
function weekOneEvents() {
    console.log("Beginning week 1 events");
    numEventsTilNextWeek = getRandomIntInclusive(3,5);
    console.log(numEventsTilNextWeek + " events in week 1");

    const shuffled = [...introEvents].sort(() => 0.5 - Math.random());
    week1EventQueue = shuffled.slice(0, numEventsTilNextWeek);
    console.log("successfully shuffled and sliced temp events");

    loadNextWeek1Event();
}
function loadNextWeek1Event() {
    if (week1EventQueue.length > 0) {
        const nextEvent = week1EventQueue.shift();
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
    // Advance week
    numEventsTilNextWeek--;
    updateNextTurnButton();
    if(gameState.currentWeek == 1) {
        loadNextWeek1Event();
    }
    else {
        console.log("no more next turns. week 2 coming soon :))");
    }
}
function nextWeek() {
    if(gameState.currentWeek == 1) {
        console.log("week 2 coming soon :)");
        return;
    }
    document.getElementById('nextWeek-button').classList.add('hidden');
    document.getElementById('nextTurn-button').classList.add('hidden');
    console.log("hiding next week AND next turn buttons -- directly from nextweek() function");
    gameState.currentWeek++;
    console.log("ADVANCING TO WEEK: " + gameState.currentWeek);
    updateUI();
    document.getElementById("currentWeek").textContent = gameState.currentWeek;
    document.getElementById("weekBar").value = gameState.currentWeek;
    document.getElementById("weeksLeft").textContent = 10 - gameState.currentWeek;
    if(gameState.currentWeek == 1) {
        weekOneEvents();
    }
    updateNextWeekButton();
}





function getRandomIntInclusive(min,max) {
    min = Math.ceil(min); // Ensure min is an integer
    max = Math.floor(max); // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}