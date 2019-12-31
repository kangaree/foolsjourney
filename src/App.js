import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-with-gesture";
import "./styles.css";

const tarotDeck = [
  // Cards from https://en.wikipedia.org/wiki/Rider-Waite_tarot_deck
  // Authorship: Arthur Edward Waite, Pamela Coleman Smith was the artist and worked as an artist 'for hire.'
  // Waite was the copyright holder and he died in 1942. - These images scanned by Holly Voley
  "/maj00.png",
  "/maj01.png",
  "/maj02.png",
  "/maj03.png",
  "/maj04.png",
  "/maj05.png",
  "/maj06.png",
  "/maj07.png",
  "/maj08.png",
  "/maj09.png",
  "/maj10.png",
  "/maj11.png",
  "/maj12.png",
  "/maj13.png",
  "/maj14.png",
  "/maj15.png",
  "/maj16.png",
  "/maj17.png",
  "/maj18.png",
  "/maj19.png",
  "/maj20.png",
  "/maj21.png",
];

const titles = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
];

const words = [
  "BEGINNING\nSPONTANEITY\nFAITH\nAPPARENT FOLLY",
  "ACTION\nCONSCIOUS AWARENESS\nCONCENTRATION\nPOWER",
  "NONACTION\nUNCONSCIOUS AWARENESS\nPOTENTIAL\nMYSTERY",
  "MOTHERING\nABUNDANCE\nSENSES\nNATURE",
  "FATHERING\nSTRUCTURE\nAUTHORITY\nREGULATION",
  "EDUCATION\nBELIEF SYSTEMS\nCONFORMITY\nGROUP IDENTIFICATION",
  "RELATIONSHIP\nSEXUALITY\nPERSONAL BELIEFS\nVALUES",
  "VICTORY\nWILL\nSELF-ASSERTION\nHARD CONTROL",
  "STRENGTH\nPATIENCE\nCOMPASSION\nSOFT CONTROL",
  "INTROSPECTION\nSEARCHING\nGUIDANCE\nSOLITUDE",
  "DESTINY\nTURNING POINT\nMOVEMENT\nPERSONAL VISION",
  "JUSTICE\nRESPONSIBILITY\nDECISION\nCAUSE AND EFFECT",
  "LETTING GO\nREVERSAL\nSUSPENSION\nSACRIFICE",
  "ENDING\nTRANSITION\nELIMINATION\nINEXORABLE FORCES",
  "TEMPERANCE\nBALANCE\nHEALTH\nCOMBINATION",
  "BONDAGE\nMATERIALISM\nIGNORANCE\nHOPELESSNESS",
  "SUDDEN CHANGE\nRELEASE\nDOWNFALL\nREVELATION",
  "HOPE\nINSPIRATION\nGENEROSITY\nSERENITY",
  "FEAR\nILLUSION\nIMAGINATION\nBEWILDERMENT",
  "ENLIGHTENMENT\nGREATNESS\nVITALITY\nASSURANCE",
  "JUDGMENT\nREBIRTH\nINNER CALLING\nABSOLUTION",
  "INTEGRATION\nACCOMPLISHMENT\nINVOLVEMENT\nFULFILLMENT",
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
  const keywords = words.reverse();
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
      {keywords[i].split("\n").map(((sentence, idx) => <p key={sentence} style={{ position: 'absolute', backgroundColor: 'white', bottom: 20 * idx }}>{sentence}</p>))}
    </animated.div>
  ));
}

export default App;
