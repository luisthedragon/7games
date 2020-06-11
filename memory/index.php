<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Memory</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <!-- <object data="../header.html" height="60px" width="100%" name="contenedor">
  </object> -->
  <?php require_once '../header.php' ?>
  <h1>My awesome Memory Game</h1>
  <div class="card-container">
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
  </div>
  <div>
    <p>Press on a tile to reveal it!</p>
    <p id='match-info'></p>
  </div>
  <div id="final-message">
    <b>CONGRATULATIONS YOU WON!!!</b>
  </div>
  <script src='script.js'></script>
</body>

</html>