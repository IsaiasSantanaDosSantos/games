function initialEvents() {
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
  let numberBtn = true;

  function startGame() {
    const jump = (event) => {
      if (event.key === 'w' || event.code === 'ArrowUp') {
        mario.classList.add('jump');

        setTimeout(() => {
          mario.classList.remove('jump');
        }, 500);
      }
    };

    const loop = setInterval(() => {
      const pipePosition = pipe.offsetLeft;
      const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace('px', '');

      if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 71) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = '/img/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '38px';
        gemeOver.classList.add('gameOverZoom');
        clearInterval(loop);
        document.removeEventListener('keydown', jump);
        setTimeout(() => {
          // pipe.style.left = `${pipePosition}px`;
          retornGame();
          // document.addEventListener('keydown', initialEvents);
          // nameInput.value = '';
          // pressEnterTxt.innerHTML =
          //   'Choose an option and press <span>"ENTER"</span>! ';
          // pressEnterTxt.style.display = 'flex';
          // playerLabel.style.display = 'flex';
          // startGame();
          // startAnimation();
        }, 3000);
      }
    }, 10);

    document.addEventListener('keydown', jump);
  }

  document.addEventListener('keydown', function () {
    const initialBtn = [
      ...document.querySelectorAll('.startGameChooseBox span'),
    ];

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
        console.log('Yes!');
      } else {
        nameInput.addEventListener('keydown', (event) => {
          const regex = /^.{3,15}$/;
          if (event.key === 'Enter') {
            if (!regex.test(nameInput.value)) {
              errorMsg.innerHTML =
                'The name must contain between 5 and 15 characters';
              return;
            } else {
              let newName = nameInput.value;
              const storedData =
                JSON.parse(localStorage.getItem('userData')) || [];

              const existingDataIndex = storedData.findIndex(
                (data) => data.name === newName
              );

              if (existingDataIndex !== -1) {
                storedData[existingDataIndex].score = 'New Score';
              } else {
                storedData.push({ name: newName, score: 'New Score' });
              }

              localStorage.setItem('userData', JSON.stringify(storedData));
              nameInput.value = '';

              pressEnterTxt.innerHTML =
                'Press <span>"ENTER"</span> to start the game! ';
              playerLabel.style.display = 'none';
              initiallyWindow.style.display = 'none';
              //   if (event.key === 'Enter') {
              //     //   initiallyWindow.style.display = 'none';
              //     //   setTimeout(() => {
              startGame();
              //     //     pipe.style.display = 'block';
              //     //     pipe.style.animation = 'pipe-animation 1.8s infinite linear';
              //     //     mario.style.bottom = '0';
              //     //     mario.src = '/img/mario-gif.gif';
              //     //   }, 50);
              //   }
            }
          }
        });
        nameInput.addEventListener('input', () => {
          errorMsg.innerHTML = '';
        });
      }
    }

    scoreClosedBox.addEventListener('click', () => {
      scoreBox.style.display = 'none';
      startGameOptionBox.style.display = 'flex';
    });
  });
  function retornGame() {
    initiallyWindow.style.display = 'flex';
    startGameOptionBox.style.display = 'flex';
  }
}
document.addEventListener('DOMContentLoaded', function () {
  initialEvents();
});
