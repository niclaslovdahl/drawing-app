<script>
  import p5 from "p5";
  import io from "socket.io-client";

  import { onMount, onDestroy } from "svelte";

  import Toolbar from "./components/Toolbar.svelte";

  let myp5;
  let socket;

  let color;

  let sketch = function(p) {
    p.setup = function() {
      p.createCanvas(700, 410);
      p.background(myp5.random(255), myp5.random(255), myp5.random(255));
    };

    p.draw = function() {
      p.stroke(color);
      p.strokeWeight(30);
      if (p.mouseIsPressed) {
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        socket.emit("data", {
          mouseX: p.mouseX,
          mouseY: p.mouseY,
          pmouseX: p.pmouseX,
          pmouseY: p.pmouseY,
          color: color,
        });
      }
    };
  };

  onMount(async () => {
    socket = io.connect("http://localhost:3000");

    socket.on("data", data => {
      myp5.stroke(data.color);
      myp5.line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY);
    });

    myp5 = new p5(sketch, document.getElementById("sketch-holder"));

    color = "#FFFFFF";
  });

  onDestroy(async () => {
    socket.disconnect();
  });

  function add() {
    myp5.background(myp5.random(255), myp5.random(255), myp5.random(255));
    myp5.canvas;
  }
  function changeColor(x) {
    color = x.target.value;
  }
</script>

<style>
  main {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .drawing {
    display: flex;
    flex-direction: row;
  }
</style>

<main>
  <div class="drawing">
    <Toolbar {changeColor} />
    <div id="sketch-holder" />
  </div>
  <button on:click={add}>Change background</button>
</main>
