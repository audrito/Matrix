var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#00FF52";//green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 25);


//Word Scrambling
class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  
    startAnimationLoop(texts) {
      let currentIndex = 0;
  
      const animateNextText = () => {
        const text = texts[currentIndex];
        const duration = 1000 + Math.random() * 1000; // Random duration between 4-6 seconds
        const pauseDuration = 2000 + Math.random() * 1000; // Random pause between 3-4 seconds
  
        this.setText(text).then(() => {
          setTimeout(() => {
            // After the text animation, pause for the specified duration
            this.el.innerHTML = text; // Display the unscrambled text during the pause
            setTimeout(() => {
              // After the pause, move to the next text
              currentIndex = (currentIndex + 1) % texts.length;
              animateNextText();
            }, pauseDuration);
          }, duration);
        });
      };
  
      // Start the animation loop with the first text
      animateNextText();
    }
  }
  
  // Get the HTML element where you want to display the text
  const el = document.querySelector('.text-scramble');
  
  // Create a TextScramble instance for the element
  const fx = new TextScramble(el);
  
  // Array of texts to cycle through
  const textsToDisplay = [
    "the matrix has you",
    "it's everywhere, all around us",
    "even now in this very room",
    "it is the world",
    "that has been",
    "pulled over your eyes",
    "to blind you from the truth.",
    "you are a slave, Neo",
    "like everyone else",
    "you were born into a prison",
    "that you cannot",
    "smell",
    "taste",
    "or touch",
    "a prison for your mind",
    "It's your last chance",
    "to break free from it.",
    "Decide.",
    "Decide.",
    "Decide.",
    // Add more texts as needed
  ];
  
  // Usage example: Start the animation loop with the array of texts
  fx.startAnimationLoop(textsToDisplay);

  class TextScramblemain {
    constructor(el) {
        this.el = el;
        this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
        this.update = this.update.bind(this);
    }
  
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
  
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
  
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  
    startAnimationLoop() {
      const targetText = this.el.innerText;
      const scrambleDuration = 2000 + Math.random() * 1000; // Random duration between 2-3 seconds
      const pauseDuration = 2000 + Math.random() * 1000; // Random pause duration between 2-3 seconds
  
      const animateText = () => {
          this.setText(targetText).then(() => {
              setTimeout(() => {
                  animateText(); // Continue the loop
              }, pauseDuration);
          });
      };
  
      animateText(); // Start the animation loop
      setInterval(() => {
          // After each cycle (scrambling + pause), start a new cycle
          animateText();
      }, scrambleDuration + pauseDuration);
  }
  }
  
  // Get all elements with the 'text-scramble' class
  const elements = document.querySelectorAll('.text-scramblemain');
  
  // Create a TextScramblemain instance for each element and start the animation
  elements.forEach((el) => {
    const fx = new TextScramblemain(el);
    fx.startAnimationLoop();
  });