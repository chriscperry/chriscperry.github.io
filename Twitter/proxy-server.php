<?php
// Require the core Temboo PHP SDK and required libraries
require_once('php_sdk/src/temboo.php');

// Instantiate the session and Choreo
$session = new Temboo_Session('chrispyaf', 'myFirstApp', 'A8Nz8mRAUrsq382Js1qmoVft7hcrxXR8');
$tweetsChoreo = new Twitter_Search_Tweets($session);

// Act as a proxy on behalf of the JavaScript SDK
$tembooProxy = new Temboo_Proxy();

// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsTweets', $tweetsChoreo);

// Set default input values
$tembooProxy->allowUserInputs('jsTweets', 'Query')->allowUserInputs('jsTweets', 'AccessToken')->allowUserInputs('jsTweets', 'ConsumerKey')->allowUserInputs('jsTweets', 'ConsumerSecret')->allowUserInputs('jsTweets', 'AccessTokenSecret');

// Execute the Choreo
echo $tembooProxy->execute($_POST['temboo_proxy']);
?>