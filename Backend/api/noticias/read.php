<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../../classes/Database.php';
    include_once '../../classes/Noticia.php';
    $database = new Database();
    $db = $database->dbConnection();
    $items = new Noticia($db);
    $stmt = $items->getnoticias();
    $itemCount = $stmt->rowCount();
    if($itemCount > 0){
        
        $noticiasArr = array();
        $noticiasArr["noticias"] = array();
        $noticiasArr["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "titulo" => $titulo,
                "descripcion" => $descripcion,
                "linkasset" => $linkasset,
                "autor" => $autor,
                "created" => $created,
                "tipo" => $tipo
            );
            array_push($noticiasArr["noticias"], $e);
        }
        echo json_encode($noticiasArr);
    }
    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No se encontro la noticia")
        );
    }
?>

