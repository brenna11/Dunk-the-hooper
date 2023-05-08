import Matter from 'matter-js';
import Constants from './Constants';

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  let world = engine.world;
  let ball = entities.Ball.body;
  let net = entities.Net.body;
  engine.world.gravity.y = 1;


  // move the ball with touch event
  let move = touches.find((t) => t.type === 'move');
  if (move) {
    let ballPos = ball.position;
    let touchPos = { x: move.event.pageX, y: move.event.pageY };
    let diff = { x: touchPos.x - ballPos.x, y: touchPos.y - ballPos.y };
    let angle = Math.atan2(diff.y, diff.x);
    let magnitude = 0.7;
    let force = {
      x: magnitude * Math.cos(angle),
      y: magnitude * Math.sin(angle),
    };

    // apply force to the the ball's body
    Matter.Body.applyForce(ball, ball.position, force);

    // move ball to touch position
    Matter.Body.setPosition(ball, touchPos);
  }


  Matter.Events.on(engine, 'collisionStart', (event) => {
    var pairs = event.pairs;
    var banana, chick;
    for (var i = 0; i < pairs.length; i++) {
      var objALabel = pairs[i].bodyA.label;
      var objBLabel = pairs[i].bodyB.label;

      //Collision between banana and BoundaryBottom
      if (objALabel === 'banana' && objBLabel === 'BoundaryBottom'|| (objALabel === 'BoundaryBottom' && objBLabel === 'banana')) {
        // banana = pairs[i].bodyA;
        Matter.Body.setVelocity(entities.Banana.body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities.Banana.body, {
          x: randomBetween(25, Constants.WINDOW_WIDTH - 25),
          y: randomBetween(
            Constants.WINDOW_HEIGHT / 3,
            Constants.WINDOW_HEIGHT / 8
          ),
        });
      }
      //Collision between chick and BoundaryBottom
      if (objALabel === 'chick' && objBLabel === 'BoundaryBottom' || objALabel === 'BoundaryBottom' && objBLabel === 'chick') {
        chick = pairs[i].bodyA;
        Matter.Body.setVelocity(entities.Chick.body, { x: 0, y: 0 });
        Matter.Body.setPosition(entities.Chick.body, {
          x: randomBetween(25, Constants.WINDOW_WIDTH - 25),
          y: randomBetween(
            Constants.WINDOW_HEIGHT / 3,
            Constants.WINDOW_HEIGHT / 8
          ),
        });
      }


      //Collision between banana and net
      if (objALabel=== 'net' && objBLabel === 'banana' && pairs[i].bodyB.position.y < pairs[i].bodyA.position.y) {
        banana = pairs[i].bodyB;
          Matter.Body.setPosition(banana, {
            x: banana.position.x,
            y: 287,
          });
          Matter.Body.setVelocity(banana, { x: 0, y: 0 });

      }

      //Collision between chick and net
      if (objALabel === 'net' && objBLabel === 'chick' && pairs[i].bodyB.position.y < pairs[i].bodyA.position.y) {
        chick = pairs[i].bodyB;
          // Reset ball position and velocity
          Matter.Body.setPosition(chick, {
            x: chick.position.x,
            y: 287,
          });
          Matter.Body.setVelocity(chick, { x: 0, y: 0 });
      }

    }
    // gameover
    if (objALabel === 'ball' && objBLabel === 'chick') {
      dispatch({ type: 'gameOver' });
    }

    if (objALabel === 'ball' && objBLabel === 'banana') {
      dispatch({ type: 'gameOver' });
    }
  });

  Matter.Events.on(engine, 'collisionEnd', (event) => {
    var pairs = event.pairs;

    for (var i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let objALabel = pair.bodyA.label;
      let objBLabel = pair.bodyB.label;

      if (objALabel === 'net' && objBLabel === 'ball') {
        // Check if the ball has passed through the net
        if (ball.position.y < net.position.y) {
          // Reset ball position and velocity
          Matter.Body.setPosition(ball, {
            x: Constants.WINDOW_WIDTH / 2,
            y: 280,
          });
          Matter.Body.setVelocity(ball, { x: 0, y: 0 });
          dispatch({ type: 'updateScore' });
        }
      }
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
