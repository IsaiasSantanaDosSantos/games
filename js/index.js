const gameScreem = document.querySelector('.game-board');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gemeOver = document.querySelector('.gemeOverText');
const startGameOptionBox = document.querySelector('.startGameChooseBox');
const scoreBox = document.querySelector('.scoreBox');
const scoreClosedBox = document.querySelector('.scoreClosedBox');
const playerNameBox = document.querySelector('.playerNameBox');
const nameInput = document.getElementById('playerName');
let errorMsg = document.querySelector('.errorMsg');
let playerLabel = document.querySelector('.playerLabel');
const initiallyWindow = document.querySelector('.initiallyWindow');
let pressEnterTxt = document.querySelector('.pressEnterTxt');
const rankingBox = document.querySelector('.rankingBox');
const cronometroElement = document.querySelector('.currentlyTime');
let betterScore = document.querySelector('.betterScore span');
let numberBtn = true;
let totalSeconds = 0;
let intervalId;
let currentlyGamer;
// Sound variables
let marioYoshiSound;
let marioJumpSound;
// let marioLoseSound;
// let marioGameOverSound;
let marioStartGameSound;
// let marioCoinSound;
let marioRemixSound;
// let marioGameWinSound;

let isMarioYoshiIslandSoundPlaying = false;
const jump = (event) => {
  if (event.key === 'w' || event.code === 'ArrowUp') {
    marioJumpSound_start();
    mario.classList.add('jump');
    document.removeEventListener('keydown', jump);
    setTimeout(() => {
      mario.classList.remove('jump');
      document.addEventListener('keydown', jump);
    }, 500);
  }
};
function startGame() {
  document.addEventListener('keydown', jump);
  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace('px', '');
    // Test ↓
    // pipe.style.display = 'none';
    if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 71) {
      document.removeEventListener('keydown', jump);
      marioJumpSound_stop();
      marioStartGameSound_stop();
      marioLoseSound_start();
      clearInterval(intervalId);
      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;

      // mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;

      mario.src = '/img/game-over.png';
      mario.style.width = '70px';
      mario.style.marginLeft = '38px';
      marioGameOverSound_start();
      clearInterval(loop);
      //LocalStore
      let newName = nameInput.value;
      const storedData = JSON.parse(localStorage.getItem('userData')) || [];

      const existingDataIndex = storedData.findIndex(
        (data) => data.name === newName
      );
      if (existingDataIndex !== -1) {
        storedData[existingDataIndex].score = cronometroElement.textContent;
      } else {
        storedData.push({
          name: newName,
          score: cronometroElement.textContent,
        });
      }
      localStorage.setItem('userData', JSON.stringify(storedData));
      nameInput.value = '';
      // End of LocalStore
      setTimeout(() => {
        // pipe.style.left = `${pipePosition}px`;

        retornGame();
        document.addEventListener('keydown', initialEvents);
        // nameInput.value = '';
        // pressEnterTxt.innerHTML =
        //   'Choose an option and press <span>"ENTER"</span>! ';
        // pressEnterTxt.style.display = 'flex';
        // playerLabel.style.display = 'flex';

        // startGame();
        // startAnimation();
      }, 5000);
    }
  }, 10);
}

function initialEvents() {
  const initialBtn = [...document.querySelectorAll('.startGameChooseBox span')];

  if (event.key === 'ArrowDown') {
    initialBtn[1].innerHTML = '►';
    initialBtn[0].innerHTML = '';
    numberBtn = true;
  }
  if (event.key === 'ArrowUp') {
    initialBtn[0].innerHTML = '►';
    initialBtn[1].innerHTML = '';
    numberBtn = false;
  }
  if (event.key === 'Enter') {
    if (getComputedStyle(startGameOptionBox).display === 'flex') {
      initialBtn.forEach((e) => {
        if (e.textContent === '►') {
          if (e.classList.contains('score')) {
            startGameOptionBox.style.display = 'none';
            scoreBox.style.display = 'flex';
          }
          if (e.classList.contains('start')) {
            startGameOptionBox.style.display = 'none';
            scoreBox.style.display = 'none';
            playerNameBox.style.display = 'flex';

            pressEnterTxt.style.display = 'none';
            playerLabel.style.display = 'flex';

            document.removeEventListener('keydown', initialEvents);

            nameInput.focus();
          }
        }
      });
    } else {
      setTimeout(() => {
        initialEvents();
      }, 50);
      // console.log('!== flex');
      // nameInput.addEventListener('keydown', (event) => {
      //   const regex = /^(?!.*\s)[\S]{3,15}$/;
      //   console.log(regex.test(nameInput.value));
      //   console.log(nameInput.value);
      //   if (event.key === 'Enter') {
      //     if (!regex.test(nameInput.value)) {
      //       errorMsg.innerHTML =
      //         'The name must contain between 5 and 15 characters';
      //       return;
      //     } else {
      //       // let newName = nameInput.value;
      //       // const storedData =
      //       //   JSON.parse(localStorage.getItem('userData')) || [];
      //       // const existingDataIndex = storedData.findIndex(
      //       //   (data) => data.name === newName
      //       // );
      //       // if (existingDataIndex !== -1) {
      //       //   storedData[existingDataIndex].score = '00:15';
      //       //   console.log('Usuário velho');
      //       // } else {
      //       //   storedData.push({ name: newName, score: '00:25' });
      //       //   console.log('Novo usuário');
      //       // }
      //       // localStorage.setItem('userData', JSON.stringify(storedData));
      //       // // currentlyGamer = nameInput.value;
      //       // nameInput.value = '';
      //       // pressEnterTxt.innerHTML =
      //       //   'Press <span>"ENTER"</span> to start the game! ';
      //       // playerLabel.style.display = 'none';
      //       // initiallyWindow.style.display = 'none';
      //       //   if (event.key === 'Enter') {
      //       //     //   initiallyWindow.style.display = 'none';
      //       //     //   setTimeout(() => {
      //       // startGame();
      //       //     //     pipe.style.display = 'block';
      //       //     //     pipe.style.animation = 'pipe-animation 1.8s infinite linear';
      //       //     //     mario.style.bottom = '0';
      //       //     //     mario.src = '/img/mario-gif.gif';
      //       //     //   }, 50);
      //       //   }
      //     }
      //   }
      // });
      // nameInput.addEventListener('input', () => {
      //   errorMsg.innerHTML = '';
      // });
    }
  }

  scoreClosedBox.addEventListener('click', () => {
    scoreBox.style.display = 'none';
    startGameOptionBox.style.display = 'flex';
  });
}

nameInput.addEventListener('keydown', () => {
  // e.preventDefault();
  const regex = /^(?!.*\s)[\S]{3,15}$/;
  if (event.key === 'Enter') {
    if (!regex.test(nameInput.value)) {
      errorMsg.innerHTML = 'The name must contain between 5 and 15 characters';
      return;
    } else {
      // let newName = nameInput.value;
      // const storedData = JSON.parse(localStorage.getItem('userData')) || [];

      // const existingDataIndex = storedData.findIndex(
      //   (data) => data.name === newName
      // );

      // if (existingDataIndex !== -1) {
      //   storedData[existingDataIndex].score = '00:15';
      //   console.log('Usuário velho');
      // } else {
      //   storedData.push({ name: newName, score: '00:25' });
      //   console.log('Novo usuário');
      // }

      // localStorage.setItem('userData', JSON.stringify(storedData));
      // // currentlyGamer = nameInput.value;
      // nameInput.value = '';

      pressEnterTxt.innerHTML =
        'Press <span>"ENTER"</span> to start the game! ';
      playerLabel.style.display = 'none';
      if (event.key === 'Enter') {
        initiallyWindow.style.display = 'none';
        setTimeout(() => {
          startGame();
          pipe.style.display = 'block';
          pipe.style.animation = 'pipe-animation 1.8s infinite linear';
          mario.style.bottom = '0';
          marioYoshiIslandSound_stop();
          marioStartGameSound_start();
          marioBigImg();
          intervalId = setInterval(updateTimer, 1000);
        }, 50);
      }
    }
  }
});
nameInput.addEventListener('input', () => {
  errorMsg.innerHTML = '';
});
function retornGame() {
  initiallyWindow.style.display = 'flex';
  startGameOptionBox.style.display = 'flex';
}
function startAnimation() {
  // let pipe = document.createElement('img');
  // pipe.classList.add('pipe');
  // pipe.setAttribute('src', 'img/pipe.png');
  // pipe.setAttribute('alt', 'Pipe');
  // pipe.style.animation = 'pipe-animation 1.8s infinite linear';
  mario.style.bottom = '0';
  mario.style.width = '120px';
  marioBigImg();
  // gemeOver.classList.remove('gameOverZoom');
}

//TIME

function updateTimer() {
  const displayMinutes = Math.floor(totalSeconds / 60);
  const displaySeconds = totalSeconds % 60;
  const minutesString = displayMinutes.toString().padStart(2, '0');
  const secondsString = displaySeconds.toString().padStart(2, '0');
  cronometroElement.textContent = `${minutesString}:${secondsString}`;
  totalSeconds++;
}
//END OF TIME

// Ranking
function createRanking() {
  dataOrganization();

  const storedData = JSON.parse(localStorage.getItem('userData')) || [];

  storedData.forEach((data) => {
    let rankingText = document.createElement('p');
    rankingText.classList.add('rankingText');
    rankingText.innerHTML = `
    <span class="gamerName"> ${data.name}</span
    ><span class="rankingBar"></span
    ><span class="gamerScore">${data.score}</span>
  `;
    rankingBox.appendChild(rankingText);
  });
}
// End of Ranking

function dataOrganization() {
  storedData.sort((a, b) => {
    const tempoA = a.score;
    const tempoB = b.score;
    return compararTempos(tempoB, tempoA);
  });

  function compararTempos(tempoA, tempoB) {
    const [minutosA, segundosA] = tempoA.split(':').map(Number);
    const [minutosB, segundosB] = tempoB.split(':').map(Number);
    if (minutosA !== minutosB) {
      return minutosA - minutosB;
    } else {
      return segundosA - segundosB;
    }
  }
  localStorage.setItem('userData', JSON.stringify(storedData));
}

//Get better time
const storedData = JSON.parse(localStorage.getItem('userData')) || [];
let maiorNome = '';
let maiorTempo = '00:00';
storedData.forEach((data) => {
  const tempo = data.score;

  // Compare os tempos (supondo que os tempos estejam no formato 'MM:SS')
  if (tempo > maiorTempo) {
    maiorTempo = tempo;
    maiorNome = data.name;
    betterScore.textContent = maiorNome + ` ► ` + maiorTempo;
  }
});
// End of get better time

// Sounds
// Start music

const marioJumpSound_start = () => {
  marioJumpSound = new Howl({
    src: ['/sounds/jump.mp3'],
  });
  marioJumpSound.play();
  return marioJumpSound;
};
function marioLoseSound_start() {
  let sound = new Howl({
    src: ['/sounds/lose-game.mp3'],
  });
  return sound.play();
}
function marioGameOverSound_start() {
  gemeOver.classList.add('gameOverZoom');
  let sound = new Howl({
    src: ['/sounds/game-over.mp3'],
  });
  return sound.play();
}
function marioStartGameSound_start() {
  if (!marioStartGameSound) {
    marioStartGameSound = new Howl({
      src: ['/sounds/start.mp3'],
    });
  }
  marioStartGameSound.play();
  return marioStartGameSound;
}
function marioCoinSound_start() {
  let sound = new Howl({
    src: ['/sounds/coin.mp3'],
  });
  return sound.play();
}
const marioYoshiIslandSound_start = () => {
  if (!marioYoshiSound) {
    marioYoshiSound = new Howl({
      src: ['/sounds/yoshi_island.mp3'],
      onplay: () => {
        isMarioYoshiIslandSoundPlaying = true;
      },
      onend: () => {
        isMarioYoshiIslandSoundPlaying = false;
      },
    });
  }
  marioYoshiSound.play();
  return marioYoshiSound;
};
function marioRemixSound_start() {
  let sound = new Howl({
    src: ['/sounds/remix-game.mp3'],
  });
  return sound.play();
}
function marioGameWinSound_start() {
  let sound = new Howl({
    src: ['/sounds/end-of-game.mp3'],
  });
  return sound.play();
}
// End of music
const marioYoshiIslandSound_stop = () => {
  if (marioYoshiSound && marioYoshiSound.playing()) {
    isMarioYoshiIslandSoundPlaying = false;
    marioYoshiSound.stop();
  }
};
const marioStartGameSound_stop = () => {
  if (marioStartGameSound && marioStartGameSound.playing()) {
    marioStartGameSound.stop();
  }
};
const marioJumpSound_stop = () => {
  if (marioJumpSound && marioJumpSound.playing()) {
    marioJumpSound.stop();
  }
};
// End of Sounds

// Mario images
function marioGameOverImg() {
  mario.src = '/img/game-over.png';
  mario.style.width = '70px';
  mario.style.marginLeft = '38px';
  return mario;
}
function marioCoverImg() {
  mario.src = '/img/mario-cover-gif.gif';
  return mario;
}
function marioBigImg() {
  mario.src = '/img/mario-big-gif.gif';
  return mario;
}
// Mario images
document.addEventListener('DOMContentLoaded', function () {
  pipe.style.display = 'none';
  document.addEventListener('keydown', initialEvents);
  createRanking();
  marioYoshiIslandSound_start();
});
