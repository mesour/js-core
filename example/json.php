<?php

header('Content-type: application/json');

echo json_encode([
	'error' => true,
	'message' => 'Sample error',
]);