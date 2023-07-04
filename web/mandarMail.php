<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


	$fecha = date("d/m/Y");
	$ip= $_SERVER['REMOTE_ADDR'];
	$destinatario = 'saiegh@gmail.com, gabrielfreidkes@gmail.com, braiangreno@gmail.com';
	$nombre = $_REQUEST['nombre'];
	
	
	$tema = $_REQUEST['tema'];
	$mensaje = $_REQUEST['mensaje'];
	
	
	$email = $_REQUEST['email'];


	$headers = "From:". $email . "\r\n" .	"Reply-To: ".$email . "\r\n" .	"X-Mailer: PHP/" . phpversion();
	$asunto = "Consulta desde WillianTheGame.com - $tema";
	$mensaje = "nombre: $nombre \n IP: $ip \n email: $email \n Fecha del mensaje: $fecha  \n\n Consulta: \n $consulta";

	$mando = mail($destinatario,$asunto,$mensaje,$headers);
	
	$file=fopen("mails.txt","a") or die("Problemas");
	fwrite($file, $email.', ');
	fclose($file);
	
	echo $mando;
?>