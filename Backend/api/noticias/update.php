<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require '../../classes/Database.php';
    require '../../classes/Noticia.php';
    require '../../AuthMiddleware.php';
    $allHeaders = getallheaders();
    $database = new Database();
    $db = $database->dbConnection();
    
    $item = new Noticia($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    
    // employee values
    $item->titulo = $data->titulo;
    $item->descripcion = $data->descripcion;
    $item->linkasset = $data->linkasset;
    $item->autor = $data->autor;
    $item->created = date('Y-m-d H:i:s');
    $item->tipo = $data->tipo;
    $auth = new Auth($db, $allHeaders);
    
    function msg($success,$status,$message,$extra = []){
        return array_merge([
            'success' => $success,
            'status' => $status,
            'message' => $message
        ],$extra);
    }
    if($item->updatenoticias()){
        echo json_encode(
            
            msg(0,200,"Se actualizo correctamente")
        );
    } else{
        echo json_encode("No se pudo actualizar la noticia");
    }


?>