<?php

class RiotAPI {
	
	public $data = null;

	//loads the above private variable
	public function load($data){
		$this->data = $data;
	}

    private function getSummoner( $region, $name ){
        $url = "https://{$region}.api.pvp.net/api/lol/{$region}/v1.4/summoner/by-name/{$name}?api_key=" . apiKey;
        $data = file_get_contents($url);
        $data = json_decode($data);

        return $data->$name->id;
    }


	//your api calls and stufff
	public function getLeague(){
        $id = $this->getSummoner($this->data->region, $this->data->name);

        $url = "https://" . $this->data->region . ".api.pvp.net/api/lol/" . $this->data->region . "/v2.5/league/by-summoner/{$id}?api_key=" . apiKey;
        $data = file_get_contents($url);
        $data = json_decode($data);

        return $data;
    }


}

?>