const frames = [
    "frame 1",
    "frame 2",
    "frame 3"
];

let currentFrame = 0;

const interval = setInterval(() => {
    console.clear();
    console.log(frames[currentFrame]);
    currentFrame = (currentFrame + 1) % frames.length;
}, 800); 


