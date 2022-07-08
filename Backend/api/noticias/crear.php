    <?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Acess-Control-Allow-Methods, Authorization, X-Requested-With");
    //Se definen los headers del API
    require '../../classes/Database.php';
    require '../../classes/Noticia.php';
    require '../../AuthMiddleware.php';
    //Se solicita que requierea estos archvivos
    $returnData = [];
    $allHeaders = getallheaders();
    $database = new Database();
    $db = $database->dbConnection();
    $item = new Noticia($db);
    $data = json_decode(file_get_contents("php://input"),true);
    $linkasset  =  $_FILES['sendimage']['name'];
    $tempPath  =  $_FILES['sendimage']['tmp_name'];
    $fileSize  =  $_FILES['sendimage']['size'];
    if(empty($linkasset)){
	$errorMSG = json_encode(array("message" => "Favor seleccione una imagen", "status" => false));	
	echo $errorMSG;
    }else{
        $upload_path = 'upload/';
        $fileExt = strtolower(pathinfo($linkasset,PATHINFO_EXTENSION));
        $valid_extensions = array('jpeg', 'jpg', 'png', 'gif'); 
        if(in_array($fileExt, $valid_extensions)){			
            if(!file_exists($upload_path . $linkasset)){
                if($fileSize < 5000000){
                    move_uploaded_file($tempPath, $upload_path . $linkasset); 
                }else{		
                    $errorMSG = json_encode(array("message" => "E archivo supera los 5MB y no se puede subir", "status" => false));	
                    echo $errorMSG;
                }
            }else{		
                $errorMSG = json_encode(array("message" => "Ya existe esa imagen en el destino", "status" => false));	
                echo $errorMSG;
            }
        }else{		
            $errorMSG = json_encode(array("message" => "Lo sineto la imagen no tiene un formato permitido", "status" => false));	
            echo $errorMSG;		
        }
    }
    $item->titulo = $data->titulo;
    $item->descripcion = $data->descripcion;
    $item->linkasset = $data->linkasset;
    $item->autor = $data->autor;
    $item->created = date('Y-m-d H:i:s');
    $item->tipo = $data->tipo;
    $auth = new Auth($db, $allHeaders);
    if($auth->isTokenValid()){
        if($item->crearNoticia()){
            $returnData = $database->endPointResponseMsg(1, 201, 'Noticia Creada Exitosamente');
        }
    } else{
        $returnData = $database->endPointResponseMsg(1, 201, 'Error creando noticia');
    }
    echo json_encode($returnData);
?>	