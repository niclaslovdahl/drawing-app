<script>
  import p5 from "p5";

  import { onMount } from "svelte";

  let myp5;

  let sketch = function(p) {
    let x = 100;
    let y = 100;

    p.setup = function() {
      p.createCanvas(700, 410);
      p.background(myp5.random(255), myp5.random(255), myp5.random(255));
    };

    p.draw = function() {};
  };

  onMount(function() {
    myp5 = new p5(sketch, document.getElementById("sketch-holder"));
  });

  function add() {
    myp5.background(myp5.random(255), myp5.random(255), myp5.random(255));
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
</style>

<main>
  <div id="sketch-holder" />
  <button on:click={add}>Change background</button>
</main>
