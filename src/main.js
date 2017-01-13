var game = new Phaser.Game(900,600,Phaser.AUTO,'',{preload : preload, create: create, update: update});



  function preload(){
    game.load.image('paddle1', 'assets/paddle1.png');
    game.load.image('paddle2', 'assets/paddle2.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('finish1', 'assets/finish1.png');
    game.load.image('finish2', 'assets/finish2.png');

    var paddleA;
    var paddleB;
    var wall;

  }
  function create(){
    game.world.height = 600;
    game.world.width = 900;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.points_p1 = 0
    this.points_p2 = 0
    game.stage.backgroundColor = "#fff";


    //walls code
    wall_up = game.add.sprite(0,0, 'wall');
    wall_down = game.add.sprite(0,585, 'wall');
    game.physics.arcade.enable(wall_up);
    game.physics.arcade.enable(wall_down);
    wall_up.body.immovable = true;
    wall_down.body.immovable = true;

    //finish lines
    finish_r = game.add.sprite(900,0, 'finish2');
    finish_l = game.add.sprite(0,0, 'finish1');
    game.physics.arcade.enable(finish_r);
    game.physics.arcade.enable(finish_l);
    finish_r.body.immoovable = true;
    finish_l.body.immoovable = true;
    finish_r.body.collideWorldBounds = true;
    finish_l.body.collideWorldBounds = true;



    score = game.add.text(game.world.centerX,game.world.centerY,'lmao', 32);




    var paddle1;
    var paddle2;


      //paddle creations
      paddleA = create_player1(0,game.world.centerY);
      paddleB = create_player2(game.world.width - 16,game.world.centerY);

      //ball code
      ball = game.add.sprite(game.world.centerX,game.world.centerY, 'ball');
      ball.anchor.setTo(0.5,0.5);
      game.physics.arcade.enable(ball);
      ball.body.velocity.x = 400;
      ball.body.velocity.y = 100;
      ball.body.CollideWorldBounds = true;
      ball.body.bounce.set(1);

  }
  function update(){
    control_paddle(paddleA,game.input.y);
    control_paddleB(paddleB,game.input.y);

    //paddles and ball collison
    game.physics.arcade.collide(ball, paddleA,bounce, null, this);
    game.physics.arcade.collide(ball, paddleB,bounce2, null, this);

    //ball and walls collison
    game.physics.arcade.collide(ball, wall_up, up_bounce, null, this);
    game.physics.arcade.collide(ball, wall_down, down_bounce, null, this);

    //ball and finish collison
    game.physics.arcade.collide(ball, finish_r, point1, null, this);
    game.physics.arcade.collide(ball, finish_l, point2, null, this);

    finish_l.body.position.y = 0;
    finish_r.body.position.x = 892;

    //score
    score.text = this.points_p1 + ' : ' + this.points_p2;


  }

  function create_player1(x,y){
    var paddle1 = game.add.sprite(x,y,'paddle1');
    paddle1.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle1);
    paddle1.body.collideWorldBounds = true;

    return paddle1;
  }

  function create_player2(x,y){
    var paddle2 = game.add.sprite(x,y,'paddle2');
    paddle2.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle2);
    paddle2.body.collideWorldBounds = true;

    return paddle2;
  }

  function control_paddle(paddle,y){
    paddle.y = y;
    paddle.x = 32;

    if(paddle.y < paddle.height / 2 ){
        paddle.y = paddle.height / 2;
      } else if (paddle.y > game.world.height - paddle.height / 2) {
        paddle.y - game.world.height - paddle.height / 2;
      }
  }

  function control_paddleB(paddle,y){
    paddle.y = y;
    paddle.x = game.world.width - 32;
  }

//Bouncing from paddles results:
  function bounce() {
    ball.body.velocity.x = 400;
    if (ball.body.velocity.y > 0) {
    ball.body.velocity.y = Math.random() * 750
    }
    else {
      ball.body.velocity.y = -Math.random() * 750
    }
  }

  function bounce2() {
    ball.body.velocity.x = -400;
    if (ball.body.velocity.y > 0) {
    ball.body.velocity.y = Math.random() * 500
    }
    else {
      ball.body.velocity.y = -Math.random() * 500
    }
  }

//Bouncing from walls results:
  function up_bounce() {
    ball.body.velocity.y = ball.body.velocity.y
  }

  function down_bounce() {
    ball.body.velocity.y = ball.body.velocity.y
  }

  //Making points
  function point1() {
    ball.body.position.x = game.world.centerX
    ball.body.position.y = game.world.centerY
    ball.body.velocity.x = -400;
    ball.body.velocity.y = 0;

    counter = 0;
    this.points_p1++;
  }
  function point2() {
    ball.body.position.x = game.world.centerX
    ball.body.position.y = game.world.centerY
    ball.body.velocity.x = 400;
    ball.body.velocity.y = 0;


    counter = 0;
    this.points_p2++;
  }
