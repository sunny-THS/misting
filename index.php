<?php
  $servername = "http://185.27.134.10/index.php";
  $database = "Misting";
  $username = "b10_22556117";
  $password = "tuhueson522001";
  // Create connection
  $conn = mysqli_connect($servername, $username, $password, $database);
  // Check connection
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }
  echo "Connected successfully";
  mysqli_close($conn);
?>
