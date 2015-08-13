<?php

class RiotAPI {
	
	private $data = null;

	//loads the above private variable
	public function load($data){
		$this->data = $data;
    }

    private function getSummoner( $region, $name ){
        $url = "https://{$region}.api.pvp.net/api/lol/{$region}/v1.4/summoner/by-name/" . rawurlencode($name) . "?api_key=" . apiKey;
        $data = file_get_contents($url);
        $data = json_decode($data);

        $index = preg_replace('/\s+/', '', $name);

        return $data->$index;
    }

    public function getHistory($id){
        $url = "https://" . $this->data->region . ".api.pvp.net/api/lol/" . $this->data->region . "/v2.2/matchhistory/{$id}?api_key=" . apiKey;
        $history = file_get_contents($url);
        $history = json_decode($history);

        return $history;
    }

    public function getLeague($id){
        $url = "https://" . $this->data->region . ".api.pvp.net/api/lol/" . $this->data->region . "/v2.5/league/by-summoner/{$id}/entry?api_key=" . apiKey;
        $league = file_get_contents($url);
        $league = json_decode($league);

        return $league;
    }

	//your api calls and stufff
	public function getData(){
        $summoner = $this->getSummoner($this->data->region, $this->data->name);
        $id = $summoner->id;

        $summoner->league = $this->getLeague($id);
        $summoner->history = $this->getHistory($id);

        return $summoner;
    }



}

?>