<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Wack-a-mole</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php require_once '../header.php' ?>
    <!-- <nav id='back-button'><a href="../index.html">Back</a></nav> -->
    <h1>My awesome wack-a-mole-game</h1>
    <p>Time left: <span id="timeLeft">30</span></p>
    <p>Score: <span id="score">0</span></p>
    <div class="card-container">
        <div id="c0" class="card"></div>
        <div id="c1" class="card"></div>
        <div id="c2" class="card"></div>
        <div id="c3" class="card"></div>
        <div id="c4" class="card"></div>
        <div id="c5" class="card"></div>
        <div id="c6" class="card"></div>
        <div id="c7" class="card"></div>
        <div id="c8" class="card"></div>
    </div>
    <div>
        <p>Press on a mole to whack him!</p>
        <p id='match-info'></p>
    </div>
    <div id="final-message">
        <b>CONGRATULATIONS!!! FINAL SCORE: <span id='final-score'>0</span></b>
    </div>
    <script src='script.js'></script>
</body>

</html>