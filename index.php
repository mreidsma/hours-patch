<?php
header('Access-Control-Allow-Origin: *');  
error_reporting(E_ALL);
/* 
###########################
   Library Hours Parser
   to Patch the homepage hours module
   by Matthew Reidsma
   reidsmam@gvsu.edu

   for GVSU Libraries
   September 2015
############################
*/

date_default_timezone_set('America/New_York');

require ('../libs/simple_html_dom.php');

$html = file_get_html('http://gvsu.edu/library/hours.htm');

foreach($html->find('.row', 0)->find('dl') as $list) {
	foreach($list->find('dt') as $day) {
		$maryi_day[] = trim($day->plaintext);
	}
	foreach($list->find('dd') as $hours) {
		$maryi_hours[] = trim($hours->plaintext);
	}
}

$i = 0;

while($i < 7) {

	$schedule[$maryi_day[$i]] = $maryi_hours[$i];

	$i++;
}

$json = json_encode($schedule);
echo $json;

?>
