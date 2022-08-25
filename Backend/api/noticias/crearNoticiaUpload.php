<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require '../../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$returnData = [];
function msg($success, $status, $message, $extra = []) {
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}
$data = json_decode(file_get_contents('php://input'), true);
$linkasset  =  $_FILES['sendimage']['name'];
$tempPath  =  $_FILES['sendimage']['tmp_name'];
$fileSize  =  $_FILES['sendimage']['size'];
$fileType  =  '.' . str_replace("image/", "",$_FILES['sendimage']['type']);
if(empty($linkasset)) {
    $errorMSG = json_encode(array("message" => "Favor seleccione una imagen", "status" => false));  
    echo $errorMSG;
} else {
    $upload_path = '../../../assets/apiUploads/' . date('Y-m-d') . '/';
    if (!file_exists($upload_path)) {
        mkdir($upload_path);
    }
    $fileExt = strtolower(pathinfo($linkasset,PATHINFO_EXTENSION));
    $valid_extensions = array('jpeg', 'jpg', 'png', 'gif'); 
    if(in_array($fileExt, $valid_extensions)) {
        if(!file_exists($upload_path . $linkasset)) {
            if($fileSize < 5000000){
                move_uploaded_file($tempPath, $upload_path . 'imagen-' . date('Y-m-d-H-i-s') . $fileType);
                $images = ['images' => ['/ambienteweb-santoshoy/assets/apiUploads/' . date('Y-m-d') . '/' . 'imagen-' . date('Y-m-d-H-i-s') . $fileType]];
                $returnData = msg('OK', 200, 'Imagen subida correctamente', $images);
                // echo json_encode();
            } else {
                $returnData = msg(false, 500, 'EL archivo supera los 5MB y no se puede subir');
            }
        } else {
             $returnData = msg(false, 500, 'Ya existe esa imagen en el destino');
        }
    } else { 
        $returnData = msg(false, 500, 'Lo sineto la imagen no tiene un formato permitido'); 
    }
}
echo json_encode($returnData);
?>