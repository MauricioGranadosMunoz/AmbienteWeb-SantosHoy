<?php

require __DIR__.'/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtHandler
{
    protected $jwt_secrect;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    public function __construct()
    {
        date_default_timezone_set('America/Costa_Rica');
        $this->issuedAt = time();

        // TIEMPO DE VIDA DEL TOKEN (3600 second = 1hr)
        $this->expire = $this->issuedAt + 3600;

        $this->jwt_secrect = "ProyectoSecretSemilla";
    }

    public function jwtEncodeData($iss, $data)
    {

        $this->token = array(
            "iss" => $iss,
            "aud" => $iss,
            "iat" => $this->issuedAt,
            "exp" => $this->expire,
            // Payload
            "data" => $data
        );

        $this->jwt = JWT::encode($this->token, $this->jwt_secrect, 'HS256');
        return $this->jwt;
    }

    public function jwtDecodeData($jwt_token)
    {
        try {
            $decode = JWT::decode($jwt_token, new Key($this->jwt_secrect, 'HS256'));

            return [
                "data" => $decode->data
            ];
        } catch (Exception $e) {
            return [
                "message" => $e->getMessage()
            ];
        }
    }
}