<?php
    class noticias{
        // Connection
        private $conn;
        // Table
        private $db_table = "Employee";
        // Columns
        public $id;
        public $titulo;
        public $descripcion;
        public $linkasset;
        public $autor;
        public $created;
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getnoticias(){
            $sqlQuery = "SELECT id, titulo, descripcion, linkasset, autor, created FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        // CREATE
        public function createnoticias(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        titulo = :titulo, 
                        descripcion = :descripcion, 
                        linkasset = :linkasset, 
                        autor = :autor,
                        created = :created;
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->titulo=htmlspecialchars(strip_tags($this->titulo));
            $this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
            $this->linkasset=htmlspecialchars(strip_tags($this->linkasset));
            $this->autor=htmlspecialchars(strip_tags($this->autor));
            $this->created=htmlspecialchars(strip_tags($this->created));
        
            // bind data
            $stmt->bindParam(":titulo", $this->titulo);
            $stmt->bindParam(":descripcion", $this->descripcion);
            $stmt->bindParam(":linkasset", $this->linkasset);
            $stmt->bindParam(":autor", $this->autor);
            $stmt->bindParam(":created", $this->created);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        // READ single
        public function getSinglenoticia(){
            $sqlQuery = "SELECT
                        id, 
                        titulo, 
                        descripcion, 
                        linkasset, 
                        autor, 
                        created
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       id = ?
                    LIMIT 0,1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->titulo = $dataRow['titulo'];
            $this->descripcion = $dataRow['descripcion'];
            $this->linkasset = $dataRow['linkasset'];
            $this->autor = $dataRow['autor'];
            $this->created = $dataRow['created'];
        }        
        // UPDATE
        public function updatenoticias(){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        titulo = :titulo, 
                        descripcion = :descripcion, 
                        linkasset = :linkasset, 
                        autor = :autor, 
                        created = :created
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->titulo=htmlspecialchars(strip_tags($this->titulo));
            $this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
            $this->linkasset=htmlspecialchars(strip_tags($this->linkasset));
            $this->autor=htmlspecialchars(strip_tags($this->autor));
            $this->created=htmlspecialchars(strip_tags($this->created));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":titulo", $this->titulo);
            $stmt->bindParam(":descripcion", $this->descripcion);
            $stmt->bindParam(":linkasset", $this->linkasset);
            $stmt->bindParam(":autor", $this->autor);
            $stmt->bindParam(":created", $this->created);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        // DELETE
        function deletenoticia(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }
?>