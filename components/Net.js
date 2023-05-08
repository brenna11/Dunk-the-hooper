import { View, Image } from "react-native";
import Matter from "matter-js";

const NetImage = (props) => {
  const width = props.size.width;
  const height = props.size.height;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
     <View
      style={{
        position: "absolute",
        left: xPos ,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: props.color,
        borderRadius: 3,
      }}
    />
  );
};

export default (world, color, pos, size) => {
  const NetBody = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: "net", 
    isStatic: true}
  );
  Matter.World.add(world, NetBody);
  return { body: NetBody, color, pos, size, renderer: <NetImage size={size} body={NetBody} color={color} /> };
};
