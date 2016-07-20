
var score = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';
var heroImage = new Image();
heroImage.src = 'images/hero.png';
var hero = {
  x: 200,
  y: 200,
  dirX: 0,
  dirY: 0,
  speed: 8
};

var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monster = {
  x: 300,
  y: 300
};
var monsterSpeed = 5;
var monsterDirX = 1;
var monsterDirY = 0;

var goblinImage = new Image();
goblinImage.src = 'images/goblin.png';
var goblin1 = {
  x: 300,
  y: 300
};
var goblin2 = {
  x: 100,
  y: 300
};
var goblin1Speed = 3;
var goblin1DirX = 1;
var goblin1DirY = 0;
var goblin2Speed = 3;
var goblin2DirX = 1;
var goblin2DirY = 0;

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.dirX = -1;
  } else if (key === 39) { // right
    hero.dirX = 1;
  } else if (key === 38) { // up
    hero.dirY = -1;
  } else if (key === 40) { // down
    hero.dirY = 1;
  }

  handleWrapping(hero);
});

window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.dirX = 0;
  } else if (key === 39) { // right
    hero.dirX = 0;
  } else if (key === 38) { // up
    hero.dirY = 0;
  } else if (key === 40) { // down
    hero.dirY = 0;
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

function collision(enemy) {
  // detect collision
  if (hero.x + 32 < enemy.x) {
    return false;
  } else if (enemy.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < enemy.y) {
    return false;
  } else if (enemy.y + 32 < hero.y) {
    return false;
  }
  return true;
}

var counter = 0;
function main() {
  counter++;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);

  hero.x += hero.dirX * hero.speed;
  hero.y += hero.dirY * hero.speed;


  if (counter % 50 === 0) {
    monsterDirX = Math.floor(Math.random() * 3) - 1;
    monsterDirY = Math.floor(Math.random() * 3) - 1;
  }

  monster.x += monsterDirX * monsterSpeed;
  monster.y += monsterDirY * monsterSpeed;
  handleWrapping(monster);

  // change goblin direction
  if (counter % 50 === 0) {
    goblin1DirX = Math.floor(Math.random() * 3) - 1;
    goblin1DirY = Math.floor(Math.random() * 3) - 1;
  }
  // update monster position
  goblin1.x += goblin1DirX * goblin1Speed;
  goblin1.y += goblin1DirY * goblin1Speed;
  handleWrapping(goblin1);

  // change goblin direction
  if (counter % 50 === 0) {
    goblin2DirX = Math.floor(Math.random() * 3) - 1;
    goblin2DirY = Math.floor(Math.random() * 3) - 1;
  }
  // update monster position
  goblin2.x += goblin2DirX * goblin2Speed;
  goblin2.y += goblin2DirY * goblin2Speed;
  handleWrapping(goblin2);

  if (collision(monster)) {
    score++;
    console.log('Score: ' + score);
    monster.x = Math.random() * 512;
    monster.y = Math.random() * 480;
  }
  if (collision(goblin1 || goblin2)) {
     score -= score;
     //radomly move the hero away from the goblins
     hero.x = Math.floor(Math.random() * 400);
     hero.y = Math.floor(Math.random() * 400);
   }

  ctx.drawImage(monsterImage, monster.x, monster.y);

  ctx.drawImage(goblinImage, goblin1.x, goblin1.y);
  ctx.drawImage(goblinImage, goblin2.x, goblin2.y);


  ctx.font = "32px sans-serif";
  ctx.fillText('Score: ' + score, 35, 60);
  requestAnimationFrame(main);
}

main();
