var score = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';
var heroImage = new Image();
heroImage.src = 'images/hero.png';
var hero = {
  x: 200,
  y: 200
};
var heroDirX = 0;
var heroDirY = 0;

var heroSpeed = 3;

var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monster = {
  x: 300,
  y: 300
};
var monsterSpeed = 5;
var monsterDirX = 1;
var monsterDirY = 0;
/*
var monsterStates = ['right', 'left', 'up', 'down', 'up-right', 'up-left', 'down-right', 'down-left'];
var monsterState = 'right';
*/

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    heroDirX = -1;
  } else if (key === 39) { // right
    heroDirX = 1;
  } else if (key === 38) { // up
    heroDirY = -1;
  } else if (key === 40) { // down
    heroDirY = 1;
  }

  handleWrapping(hero);
});

window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    heroDirX = 0;
  } else if (key === 39) { // right
    heroDirX = 0;
  } else if (key === 38) { // up
    heroDirY = 0;
  } else if (key === 40) { // down
    heroDirY = 0;
  }
});



function handleWrapping(object) {
  if (object.x > 512) {
    object.x = 0;
  }
  if (object.x < 0) {
    object.x = 512;
  }
  if (object.y > 480) {
    object.y = 0;
  }
  if (object.y < 0) {
    object.y = 480;
  }
}

function collision() {
  // detect collision
  if (hero.x + 32 < monster.x) {
    return false;
  } else if (monster.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < monster.y) {
    return false;
  } else if (monster.y + 32 < hero.y) {
    return false;
  }
  return true;
}

var counter = 0;
function main() {
  counter++;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);

  hero.x += heroDirX * heroSpeed;
  hero.y += heroDirY * heroSpeed;

  // change monster direction
  if (counter % 50 === 0) {
    monsterDirX = Math.floor(Math.random() * 3) - 1;
    monsterDirY = Math.floor(Math.random() * 3) - 1;
  }
  // update monster position
  monster.x += monsterDirX * monsterSpeed;
  monster.y += monsterDirY * monsterSpeed;
  handleWrapping(monster);

  if (collision()) {
    score++;
    console.log('Score: ' + score);
    monster.x = Math.random() * 512;
    monster.y = Math.random() * 480;
  }

  ctx.drawImage(monsterImage, monster.x, monster.y);
  ctx.font = "32px sans-serif";
  ctx.fillText('Score: ' + score, 35, 60);
  requestAnimationFrame(main);
}

main();
