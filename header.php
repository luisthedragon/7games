<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
  <?php
    $parts=parse_url($_SERVER['REQUEST_URI']);
    $path_parts=explode('/', $parts['path']);
    // echo $path_parts[count($path_parts)-2];
  ?>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <?php if (strcmp($path_parts[count($path_parts)-2],"7games")!=0): ?>
          <a class="nav-link" href="../">Home <span class="sr-only">(current)</span></a>
          <?php else: ?>
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          <?php endif; ?>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" style="z-index:1 ;" aria-labelledby="navbarDropdown">

            <?php if (strcmp($path_parts[count($path_parts)-2],"7games")!=0): ?>
            <a class="dropdown-item" href="../memory/index.php" target="contenedor">Memory</a>
            <a class="dropdown-item" href="../wack-a-mole/index.php">Wack-a-mole</a>
            <a class="dropdown-item" href="../connect-4/index.php">Connect-4</a>
            <a class="dropdown-item" href="../snake/index.php">Snake</a>
            <a class="dropdown-item" href="../space-invaders/index.php">Space Invaders</a>
            <a class="dropdown-item" href="../frogger/index.php">Frogger</a>
            <a class="dropdown-item" href="../tetris/index.php">Tetris</a>
            <?php else: ?>
            <a class="dropdown-item" href="memory/index.php" target="contenedor">Memory</a>
            <a class="dropdown-item" href="wack-a-mole/index.php">Wack-a-mole</a>
            <a class="dropdown-item" href="connect-4/index.php">Connect-4</a>
            <a class="dropdown-item" href="snake/index.php">Snake</a>
            <a class="dropdown-item" href="space-invaders/index.php">Space Invaders</a>
            <a class="dropdown-item" href="frogger/index.php">Frogger</a>
            <a class="dropdown-item" href="tetris/index.php">Tetris</a>
            <?php endif; ?>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>

</html>