import { View, Image } from "react-native";
import Matter from "matter-js";
import Images from "../images";
const BallImage = (props) => {
  const width = props.size.width;
  const height = props.size.height;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <Image
      style={{
        width: props.size.width,
        height: props.size.height,
        left: xPos,
        top: yPos,
        position: "absolute",
      }}
      source={Images.ball}
    />
  );
};

export default (world, color, pos, size, extraOptions) => {
  const ballBody = Matter.Bodies.circle(
    pos.x,
    pos.y,
    size.width / 2,
    {
      // density: 0.0005,
      frictionAir: 0.05,
      restitution: 0.9,
      friction: 0.05,
      label: "ball",
      ...extraOptions
    }
  );
  Matter.World.add(world, ballBody);
  return { body: ballBody, color, pos, size, extraOptions, renderer: <BallImage /> };
};
