import { Dimensions } from "react-native";
import BoundaryBottom from "../components/BoundaryBottom";
import BoundaryTop from "../components/BoundaryTop";
import BoundaryLeft from "../components/BoundaryLeft";
import BoundaryRight from "../components/BoundaryRight";
import Matter from "matter-js";
import BallImage from "../components/Ball";
import NetImage from "../components/Net";
import Banana from '../components/Banana';
import Chick from '../components/Chick'
import Constants from '../Constants';
import Images from "../images";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  //engine.gravity.y = 0.3;

  return {
    physics: { engine, world },
  
    BottomBoundary: BoundaryBottom(
      world,
      "#1A5F7A",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 30, width: Constants.WINDOW_WIDTH }
    ),

    TopBoundary: BoundaryTop(
      world,
      "#1A5F7A",
      { x: Constants.WINDOW_WIDTH / 2 , y: 0 },
      { height: 30, width: Constants.WINDOW_WIDTH }
    ),

    LeftBoundary: BoundaryLeft(
      world,
      "#1A5F7A",
      { x: 0 , y: Constants. WINDOW_HEIGHT/2},
      { height: Constants.WINDOW_HEIGHT, width: 30 }
    ),

    RightBoundary: BoundaryRight(
      world,
      "#1A5F7A",
      { x: Constants.WINDOW_WIDTH , y: Constants.WINDOW_HEIGHT/2},
      { height: Constants.WINDOW_HEIGHT, width: 30 }
    ),

    Net: NetImage(
      world, 
      "#FC4520", 
      { x: 200, y:  280 }, 
      { width: 100, height: 6 }, 
      { isStatic: false, label: "net" }
    ),

    Ball: BallImage(
      world, "blue", 
      { x: 200, y: 750 }, 
      { width: 80, height: 80 }, 
      { isStatic: false ,image: Images.ball  , label: "ball" }
    ),
    
     Banana: Banana(
      world,
      '',
      { x: Constants.WINDOW_WIDTH / 1.2, y: Constants.WINDOW_HEIGHT / 7 },
      { width: 20, height: 20 },
      { isStatic: false, image: Images.banana, label: 'banana' }
    ),

     Chick: Chick(
      world,
      '',
      { x: Constants.WINDOW_WIDTH / 1.4, y: Constants.WINDOW_HEIGHT / 8 },
      { width: 20, height: 20 },
      { isStatic: false, image: Images.chick, label: 'chick' }
    ),
  };
};
