<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Snake</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <?php require_once '../header.php' ?>
  <!-- <nav id='back-button'><a href="../index.html">Back</a></nav> -->
  <h1 class="text-center">My awesome Snake game</h1>
  <div class='main-container text-center'>
    <div class='controls'>
      <h3>Controls</h3>
      <p>Arrow Key Up: Up</p>
      <p>Arrow Key Right: Right</p>
      <p>Arrow Key Down: Down</p>
      <p>Arrow Key Left: Left</p>
      <p>Ctrl: Pause</p>
      <p>Numpad +: Increase speed (x1.11)</p>
      <p>Numpad -: Decrease speed (&div;1.11)</p>
    </div>
    <div class='game-container'>
      <p><button class='start'>Start/Restart</button></p>
      <p class='score'>Score:<span>0</span></p>
      <p class='speed'>Current speed:<span>0</span>fps</p>
      <div class='tile-container'>
        <script language="javascript" type="text/javascript">
        for (var a = 0; a < 20; a++) {
          for (var b = 0; b < 20; b++) {
            document.write("<div class='tile'></div>");
          }
        }
        </script>
      </div>
    </div>
    <div id="final-message">
      <b>YOU WON: <span id='winner'></span></b>
    </div>
    <script src='script.js'></script>
</body>

</html>