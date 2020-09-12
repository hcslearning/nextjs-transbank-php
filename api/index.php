<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Transbank\Webpay\Configuration;
use Transbank\Webpay\Webpay;

$transaccion = (new Webpay(Configuration::forTestingWebpayPlusNormal()))->getNormalTransaction();

$amount = 48990;
$buyOrder = 10500;
$sessionId = 100;
$returnUrl = "http://localhost:3000/api/index";
$finalUrl = "https://localhost:3000/api/index?final=true";

$initResult = $transaccion->initTransaction( $amount, $buyOrder, $sessionId, $returnUrl, $finalUrl );

$formAction = $initResult->url;
$tokenWs = $initResult->token;

echo $formAction;
echo "<br />";
echo $tokenWs;
echo "<br />";

?>
<form action="<?=$formAction?>" method="POST">
    <input type="hidden" name="token_ws" value="<?=$tokenWs?>" />
    <button type="submit">Continuar</button>
</form>
