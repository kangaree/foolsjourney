import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-with-gesture";
import "./styles.css";

const tarotDeck = [
  // Cards from https://en.wikipedia.org/wiki/Rider-Waite_tarot_deck
  // Authorship: Arthur Edward Waite, Pamela Coleman Smith was the artist and worked as an artist 'for hire.'
  // Waite was the copyright holder and he died in 1942. - These images scanned by Holly Voley
  "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
  "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/d2/RWS_Tarot_03_Empress.jpg",
  "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg",
  "https://upload.wikimedia.org/wikipedia/en/8/8d/RWS_Tarot_05_Hierophant.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
  "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/en/4/4d/RWS_Tarot_09_Hermit.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  "https://upload.wikimedia.org/wikipedia/en/e/e0/RWS_Tarot_11_Justice.jpg",
  "https://upload.wikimedia.org/wikipedia/en/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg",
  "https://upload.wikimedia.org/wikipedia/en/f/f8/RWS_Tarot_14_Temperance.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/55/RWS_Tarot_15_Devil.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg",
  "https://upload.wikimedia.org/wikipedia/en/7/7f/RWS_Tarot_18_Moon.jpg",
  "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/dd/RWS_Tarot_20_Judgement.jpg",
  "https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/1/11/Wands01.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/0/0f/Wands02.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/f/ff/Wands03.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/a/a4/Wands04.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/9/9d/Wands05.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/3/3b/Wands06.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/e/e4/Wands07.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/6/6b/Wands08.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/e/e7/Wands09.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/0/0b/Wands10.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/6/6a/Wands11.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/1/16/Wands12.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/0/0d/Wands13.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/c/ce/Wands14.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/f/fd/Pents01.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/9/9f/Pents02.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/4/42/Pents03.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/3/35/Pents04.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/9/96/Pents05.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/a/a6/Pents06.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/6/6a/Pents07.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/4/49/Pents08.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/f/f0/Pents09.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/4/42/Pents10.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/e/ec/Pents11.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/d5/Pents12.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/8/88/Pents13.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/1/1c/Pents14.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/3/36/Cups01.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/f/f8/Cups02.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/7/7a/Cups03.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/3/35/Cups04.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/d7/Cups05.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/1/17/Cups06.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/a/ae/Cups07.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/6/60/Cups08.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/2/24/Cups09.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/8/84/Cups10.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/a/ad/Cups11.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/f/fa/Cups12.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/6/62/Cups13.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/0/04/Cups14.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/1/1a/Swords01.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/9/9e/Swords02.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/0/02/Swords03.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/b/bf/Swords04.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/2/23/Swords05.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/2/29/Swords06.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/3/34/Swords07.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/a/a7/Swords08.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/2/2f/Swords09.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/d4/Swords10.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/4/4c/Swords11.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/b/b0/Swords12.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/d4/Swords13.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/3/33/Swords14.jpg"
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Updated for EC6/ECMA2015
 * source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  // const cards = shuffleArray(tarotDeck);
  const cards = tarotDeck.reverse();
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      {
        // This is the card itself, we're binding our gesture to it (and inject its index so we know which is which)
      }
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${cards[i]})`
        }}
      />
      <p style={{ marginLeft: 30 }}>{"hello"}</p>
    </animated.div>
  ));
}

export default App;
