const letterContainer = document.getElementById('letter-container');
const optionsContainer = document.getElementById('options-container');  
const userInputSection = document.getElementById('user-input-section');
const newGameContainer = document.getElementById('new-game-container');
const newGameButton = document.getElementById('new-game-button');
const canvas = document.getElementById('canvas');
const resultText = document.getElementById('result-text');

// Options values for buttons
let options = {
    fruits: [
        'apple',
        'banana',
        'orange',
        'strawberry',
        'grapes',
        'mango',
        'watermelon',
        'pineapple',
        'kiwi',
        'pear',
        'peach',
        'plum',
        'cherry',
        'pomegranate',
        'lemon',
        'lime',
        'coconut',
        'blueberry',
        'raspberry',
        'blackberry',
        'apricot',
        'avocado',
        'fig',
        'grapefruit',
        'guava',
        'jackfruit',
        'lychee',
        'mandarin',
        'nectarine',
        'papaya',
        'passion fruit',
        'persimmon',
        'pumpkin',
        'tangerine',
        'tomato',
        'zucchini'
    ],
    animals: [
        'hedgehog',
        'rabbit',
        'cat',
        'dog',
        'mouse',
        'rat',
        'hamster',
        'gerbil',
        'guinea pig',
        'chinchilla',
        'squirrel',
        'chipmunk',
        'ferret',
        'weasel',
        'mink',
        'raccoon',
        'skunk',
        'badger',
        'otter',
        'beaver',
        'mole',
        'shrew',
        'bat',
        'pangolin',
        'anteater',
        'armadillo',
        'sloth',
        'aardvark',
        'elephant',
        'rhinoceros',
        'hippopotamus',
        'tapir',
        'horse',
        'zebra',
        'pig',
        'cow',
        'sheep',
        'goat',
        'deer',
        'giraffe',
        'camel',
        'llama',
        'alpaca',
        'moose',
        'elk',
        'reindeer',
        'caribou',
        'bison',
        'buffalo',
        'yak',
        'antelope',
        'gazelle',
        'lion',
        'tiger',
        'leopard',
        'cheetah',
        'jaguar',
        'cougar',
        'bobcat',
        'lynx',
        'panther',
        'puma',
        'hyena',
        'wolf',
        'fox',
        'coyote',
        'jackal',
        'bear',
        'polar bear',
        'panda bear',
        'koala',
        'kangaroo',
        'wallaby',
        'opossum',
        'wombat',
        'platypus',
        'echidna',
        'crocodile',
        'alligator',
        'turtle',
        'tortoise',
        'lizard',
        'snake',
        'iguana',
        'chameleon',
        'gecko',
        'frog',
        'toad',
        'salamander',
        'newt',
        'axolotl',
        'fish',
        'shark',
        'whale',
        'dolphin',
        'porpoise',
        'seal',
        'walrus',
    ],
    countries: [
        'America',
        'Argentina',
        'Brazil',
        'Canada',
        'Chile',
        'Colombia',
        'Cuba',
        'Ecuador',
        'Mexico',
        'Peru',
        'Venezuela',
        'Afghanistan',
        'Bahrain',
        'Bangladesh',
        'Bhutan',
        'Brunei',
        'Cambodia',
        'China',
        'Cyprus',
        'East Timor',
        'India',
        'Indonesia',
        'Iran',
        // ... Remaining country names
    ],
    Mythology: [
        'Achilles',
        'Aeneas',
        'Aphrodite',
        'Apollo',
        'Ares',
        'Artemis',
        'Athena',
        'Atlas',
        'Cronus',
        'Demeter',
        'Dionysus',
        'Hades',
        'Hecate',
        'Hephaestus',
        'Hera',
        'Hercules',
        'Hermes',
        'Hestia',
        'Medusa',
        'Odysseus',
        'Pan',
        'Persephone',
        'Poseidon',
        'Prometheus',
        'Zeus',
        // ... Remaining mythological names
    ],
};

let winCount = 0;
let count = 0;

let chosenWord = '';

// display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement('div');
    for (let value in options) {
        buttonCon.innerHTML += `<button class='options' onclick='generateWord("${value}")'>${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

// Block all the buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll('.options');
    let letterButtons = document.querySelectorAll('.letter');
    // disable all the options buttons
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    // disable all the letter buttons
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    
    newGameContainer.classList.remove('hide');
};

// Generate a random word from the options
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll('.options');
    // if optionValue matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add('active');
        }
        button.disabled = true;
    });

    // intially hide letters, clear previous word
    letterContainer.classList.remove('hide');
    userInputSection.innerText = '';

    let optionArray = options[optionValue];
    // choose random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    // replace every letter with span containing an underscore
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>'); // /./g means every character

    // Display each element as span
    userInputSection.innerHTML = displayItem;
};

// Initial funtion (called when page loads/user clicks new game)
const initializer = () => {
    winCount = 0;
    count = 0;

    // initially erase all content and hide letters and game button
    userInputSection.innerText = '';
    optionsContainer.innerHTML = '';
    letterContainer.classList.add('hide');
    newGameContainer.classList.add('hide');
    letterContainer.innerHTML = '';

    // for creating letter buttons
    for (let i = 65; i < 91; i++) { // 65 is ASCII value of A and 90 is ASCII value of Z
        let button = document.createElement('button');
        button.classList.add('letters');
        // Number to ASCII conversion
        button.innerText = String.fromCharCode(i); // String.fromCharCode() converts ASCII value to character
        // Character button click
        button.addEventListener('click', () => {
            let charArray = chosenWord.split(''); // split the chosen word into array of characters
            let dashes = document.getElementsByClassName('dashes'); // get all the dashes
            //if array contains clickd value then replace the dash with the value
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    // if character in array matches the clicked value then replace the dash with the value
                    if (char === button.innerText) {
                        // replace dash with letter
                        dashes[index].innerText = char; // replace the dash with the letter
                        // increment counter
                        winCount += 1;
                        //if win count equals to length of chosen word then user wins
                        if (winCount == charArray.length) {
                            resultText.innerText = `<h2 class='win-msg>You Win!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            // block allbuttons
                            blocker();
                        }
                    }
                });
            } else {
                //lose count
                count += 1;
                // for drawing man
                drawMan(count);
                //count==6 because head, body, left arm, right arm, left leg, right leg
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg>You Lose!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    // block all buttons
                    blocker();
                }
            }
            // disable clicked button
            button.disabled = true;
        });
        letterContainer.appendChild(button);
    }

    displayOptions();
    // call to canvasCreator (for clearing previous canvas and drawing new canvas)
    let { initialDrawing } = canvasCreator();
    // initial drawing would draw the frame
    initialDrawing();
}

// Canvas
const canvasCreator = () => {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    // for drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 70);
    };
    
    const leftArm = () => {
        drawLine(70, 50, 60, 60);
    };

    const rightArm = () => {
        drawLine(70, 50, 80, 60);
    };

    const leftLeg = () => {
        drawLine(70, 70, 60, 80);
    };

    const rightLeg = () => {
        drawLine(70, 70, 80, 80);
    };

    // initial frame
    const initialDrawing = () => {
        // clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // bottom line
        drawLine(10, 130, 130, 130);
        // left line
        drawLine(10, 10, 10, 131);
        // top line
        drawLine(10, 10, 70, 10);
        // small top line
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    };
};

//New Game
newGameButton.addEventListener('click', initializer);
window.onload = initializer;