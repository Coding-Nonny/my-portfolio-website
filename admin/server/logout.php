<?php
session_start();
session_destroy();
foreach ($_SESSION as $key => $value) {
  unset($_SESSION[$key]);
  echo("logout");
}
