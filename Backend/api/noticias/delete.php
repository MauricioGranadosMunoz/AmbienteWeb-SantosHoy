<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require '../../classes/Database.php';
    require '../../classes/Noticia.php';
    require '../../AuthMiddleware.php';
    $returnData = [];
    $allHeaders = getallheaders();
    $database = new Database();
    $db = $database->dbConnection();
    
    $item = new Noticia($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    
    $auth = new Auth($db, $allHeaders);

    if($auth->isTokenValid()){
        if($item->deletenoticia()){
            $returnData = $database->endPointResponseMsg(1, 201, 'Se elimino la noticia');
        }else{
            $returnData = $database->endPointResponseMsg(1, 201, 'No se pudo eliminar la noticia');
        }
    } else{
        $returnData = $database->endPointResponseMsg(1, 201, 'No se pudo eliminar la noticia por token invalido');
    }
    echo json_encode($returnData);

?>