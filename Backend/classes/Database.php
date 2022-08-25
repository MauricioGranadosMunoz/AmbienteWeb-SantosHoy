<?php
class Database {
    
    // CREAMOS LA CONN CON LA BASE DE DATOS

    // private $db_host = '20.51.249.9';
    // private $db_name = 'santos-hoy';
    // private $db_username = 'santoshoy';
    // private $db_password = 'mauriciogrm123456Mg';

    private $db_host = 'sc-404-proyecto.mysql.database.azure.com';
    private $db_name = 'santos-hoy';
    private $db_username = 'azureuser@sc-404-proyecto';
    private $db_password = 'password123!@#';

    // private $db_host = 'santos-hoy.mysql.database.azure.com';
    // private $db_name = 'santos-hoy';
    // private $db_username = 'santoshoyuser@santos-hoy';
    // private $db_password = 'password123!@#';

    
    
    public function dbConnection(){
        
        try{
            $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_username,$this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }
        catch(PDOException $e){
            echo "Error de dbConnection".$e->getMessage(); 
            exit;
        }
          
    }
    public function endPointResponseMsg($success, $status, $message){
        return array_merge([
            'success' => $success,
            'status' => $status,
            'message' => $message
        ]);
    }
}