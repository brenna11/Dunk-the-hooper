import { Image } from 'react-native';
import Matter from 'matter-js';
import Images from '../images';

const Chick = (props) => {
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
        position: 'absolute',
      }}
      source={Images.chick}
    />
  );
};

export default (world, color, pos, size, extraOptions) => {
  const chick = Matter.Bodies.rectangle(
    pos.x,
    pos.y, 
    size.width, 
    size.height, 
    {
      label: 'chick',
      frictionAir: 0.06,
      angularVelocity: 0,
      restitution: 1,
      mass: 1,
      density: 1,
      friction: 0,
      frictionStatic: 0,
      isStatic: extraOptions.isStatic,
    });
  Matter.World.add(world, chick);
  return { body: chick, color, pos, size, extraOptions, renderer: <Chick /> };
};