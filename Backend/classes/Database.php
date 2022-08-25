<?php
class Database {
    
    // CREAMOS LA CONN CON LA BASE DE DATOS

    // private $db_host = '20.51.249.9';
    // private $db_name = 'santos-hoy';
    // private $db_username = 'santoshoy';
    // private $db_password = 'mauriciogrm123456Mg';

    private $db_host = '20.65.208.179';
    private $db_name = 'santos-hoy';
    private $db_username = 'root';
    private $db_password = '*8g^e04A9cXg';
    
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