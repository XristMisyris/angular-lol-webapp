<?php

class RiotAPI {
	
	private $data = null;
    public static $version = null;
    public static $id = null;

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

    private function getLatestVersion(){
        $url = "https://ddragon.leagueoflegends.com/api/versions.json";
        $versions = file_get_contents($url);
        $versions = json_decode($versions);

        return $versions[0];
    }

    public function getChampionList(){
        $url = "http://ddragon.leagueoflegends.com/cdn/" . self::$version . "/data/en_US/champion.json";
        $champs = file_get_contents($url);
        $champs = json_decode($champs);

        return $champs;
    }

    public function getSummonerSpells(){
        $url = "http://ddragon.leagueoflegends.com/cdn/" . self::$version . "/data/en_US/summoner.json";
        $champs = file_get_contents($url);
        $champs = json_decode($champs);

        return $champs;
    }

    public function getHistory(){
        $url = "https://" . $this->data->region . ".api.pvp.net/api/lol/" . $this->data->region . "/v2.2/matchhistory/". self::$id ."?api_key=" . apiKey;
        $history = file_get_contents($url);
        $history = json_decode($history);

        return $history;
    }

    public function getLeague(){
        $url = "https://" . $this->data->region . ".api.pvp.net/api/lol/" . $this->data->region . "/v2.5/league/by-summoner/". self::$id ."/entry?api_key=" . apiKey;
        $league = file_get_contents($url);
        $league = json_decode($league);

        return $league;
    }

    public function getInGameInfo(){
        $url = "https://" . $this->data->region . ".api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/". $this->data->id ."?api_key=" . apiKey;
        $ingame = file_get_contents($url);
        $ingame = json_decode($ingame);

        return $ingame;
    }

	//your api calls and stufff
	public function getData(){

        $summoner = $this->getSummoner($this->data->region, $this->data->name);

        self::$version = $summoner->latestVer = $this->getLatestVersion();
        self::$id = $summoner->id;

        $summoner->league = $this->getLeague();
        $summoner->history = $this->getHistory();
        $summoner->championList = $this->getChampionList();
        $summoner->summonerSpells = $this->getSummonerSpells();

        return $summoner;
    }



}

?>