<?php
class Database {
    
    // CREAMOS LA CONN CON LA BASE DE DATOS
    private $db_host = 'localhost';
    private $db_name = 'santos-hoy';
    private $db_username = 'root';
    private $db_password = '';
    
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
}