<?php
# Definitions file import
$myFile = "words.txt";
$words = file($myFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

# Choosing a random word
$chunked = array_chunk($words, 2);

shuffle($chunked);

echo "<dl>\n";

$i = 1;
while ($i <= 5) {
	$word = array_pop($chunked);
	echo "<dt>$i. $word[0] </dt>\n";
	echo "<dd>$word[1]</dd>\n";
	$i++;
}

echo "</dl>";

$roll = rand(1, 6);
echo "<p>You rolled a " . $roll . ".";

?>
