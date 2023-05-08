import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import entities from './entities';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { GameEngine } from 'react-native-game-engine';
import Physics from './Physics';
import Images from './images';
import Constants from './Constants';
import { useFonts, Iceland_400Regular } from '@expo-google-fonts/iceland';

export default function App() {
  let [fontLoaded] = useFonts({ Iceland_400Regular });
  const [gameEngine, setGameEngine] = useState(null);
  const [welcome, setWelcome] = useState(true);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [showThumbsUp, setShowThumbsUp] = useState(false);

  useEffect(() => {
    setRunning(true);
  }, []);

  if (welcome && fontLoaded) {
    return (
      <View style={styles.container}>
        <Image
          source={Images.bg}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <Text style={styles.text}>Dunk the hooper</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setWelcome(false);
            setRunning(true);
          }}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {running && (
        <>
          <Image
            source={Images.wall}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
          <GameEngine
            ref={(ref) => {
              setGameEngine(ref);
            }}
            onEvent={(e) => {
              if (e.type === 'gameOver') {
                setRunning(false);
                gameEngine.stop();
              }
              if (e.type === 'updateScore') {
                setScore(score + 1);
                setShowThumbsUp(true);
                setTimeout(() => setShowThumbsUp(false), 1000);
              }
            }}
            systems={[Physics]}
            entities={entities()}
            style={styles.gameContainer}>
            {showThumbsUp && (
              <Image
                source={Images.thumbs}
                style={styles.thumbsUp}
                resizeMode="contain"
              />
            )}
            <StatusBar style="auto" hidden={true} />
          </GameEngine>
          <View style={styles.scoreView}>
            <Text style={styles.scoreText}> Score: {score} </Text>
          </View>
          <View>
            <Text style={styles.name}>Basketball Tournament</Text>
          </View>
        </>
      )}
      {!running && (
        <View style={styles.gameOver}>
          <Text style={styles.text}>Game Over</Text>
          <Text style={styles.yourScore}>Your Score : {score} </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRunning(true);
              setScore(0);
              setWelcome(true);
            }}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 40,
    fontFamily: 'Iceland_400Regular',
    color: '#FC4520',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#000',
    opacity: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'Iceland_400Regular',
    color: '#fff',
    textTransform: 'uppercase',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
  },
  scoreView: {
    position: 'absolute',
    left: 130,
    top: 30,
    padding: 10,
    backgroundColor: 'transparent',
  },
  scoreText: {
    color: '#FC4520',
    fontSize: 30,
    fontFamily: 'Iceland_400Regular',
    textTransform: 'uppercase',
  },
  name: {
    top: 0,
    fontSize: 20,
    fontFamily: 'Iceland_400Regular',
    color: '#fff',
    textTransform: 'uppercase',
  },
  gameOver: {
    flex: 1,
    width: Constants.SCREEN_WIDTH,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yourScore: {
    color: '#FC4520',
    fontSize: 25,
    fontFamily: 'Iceland_400Regular',
    textTransform: 'uppercase',
  },
  thumbsUp: {
  position: 'absolute',
  top: 100,
  left: 170,
  width: 60,
  height: 60,
}

});
