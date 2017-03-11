angular.module("WeatherApp", [])
    .controller("WeatherAppController", ["$scope", "$http", "$sce",
        "GoogleGeolocationService", "DarkSkyWeatherService",
        function($scope, $http, $sce, GoogleGeolocationService, DarkSkyWeatherService){
            
            
            var wac = this;
            
            wac.selected_lat = 0;
            wac.selected_lon = 0;
            
            
            
            wac.cities = 
            [
                {
                    name: "Amarillo",
                    url_name: "Amarillo",
                    state: "TX",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Des Moines",
                    url_name: "IA",
                    state: "TX",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Kempton",
                    url_name: "Kempton",
                    state: "PA",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Kuwait City",
                    url_name: "Kuwait City",
                    state: "KW",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Misson Viejo",
                    url_name: "Misson Viejo",
                    state: "CA",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Rome",
                    url_name: "Rome",
                    state: "IT",
                    lat: 0,
                    lon: 0
                }
            ];
            wac.addCity = function(cityname, cityurl, statename, citylat, citylon){
                wac.cities.push({
                    name: wac.cityname,
                    url_name: wac.cityurl,
                    state: wac.statename,
                    lat: wac.citylat,
                    lon: wac.citylon
                    
                });
                wac.cityname = wac.cities;
                wac.cityurl = wac.cities.url_name;
                wac.statename = wac.cities.state;
                wac.citylat = wac.selected_lat;
                wac.citylon = wac.selected_lon;
                
            }
           
                
               
            
            
            
            wac.getLatLonForSelected = function(){
                GoogleGeolocationService.geoLocate(wac.selected_city)
                    .then(function(res){
                        wac.selected_lat = res.data.results[0].geometry.location.lat;
                        wac.selected_lon = res.data.results[0].geometry.location.lng;
                        
                        wac.selected_city.lat = wac.selected_lat;
                        wac.selected_city.lon = wac.selected_lon;
                        
                        
                        var google_static_maps_key = "AIzaSyBmCqSXvHUQID08G1gnORihNx5KNYebIQ0";
                        
                        wac.google_static_maps_url = "https://maps.googleapis.com/maps/api/staticmap?center=" +
                                                     wac.selected_lat + "," +
                                                     wac.selected_lon + 
                                                     "&zoom=10&size=600x300&key=" +
                                                     google_static_maps_key;
                                                     
                        console.log("Google Static Map API URL");
                        console.log(wac.google_static_maps_url); 
                        
                       
                        
                        
                        
                        
                        wac.getCurrentConditions();        
                        
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            };
            
             wac.selectTheCity = function()
                {
                    wac.getLatLonForSelected();
                };

             wac.getCurrentConditions = function(){
                DarkSkyWeatherService.getCurrentConditions(wac.selected_city)
                    .then(function(res){
                        console.log(res);
                        
                        
                        wac.observation_time = new Date(res.data.currently.time * 1000);
                        wac.temperature      = res.data.currently.temperature;
                        wac.dewpoint         = res.data.currently.dewPoint;
                        wac.windBearing      = res.data.currently.windBearing;
                        wac.windSpeed        = res.data.currently.windSpeed;
                        wac.summary          = res.data.currently.summary;
                        wac.darkIcon         = res.data.currently.icon;
                        
                       if (wac.darkIcon == "cloudy")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/131/131043.svg";
                           
                        };
                        if (wac.darkIcon == "clear-day")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/136/136723.svg";
                           
                        };
                        if (wac.darkIcon == "clear-night")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/348/348040.svg";
                           
                        };
                        if (wac.darkIcon == "rain")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/131/131041.svg";
                           
                        };
                        if (wac.darkIcon == "snow")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/152/152032.svg";
                           
                        };
                        if (wac.darkIcon == "sleet")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/1/1756.svg";
                           
                        };
                        if (wac.darkIcon == "wind")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/136/136570.svg";
                           
                        };
                        if (wac.darkIcon == "fog")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/182/182264.svg";
                           
                        };
                        if (wac.darkIcon == "partly-cloudy-day")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/131/131046.svg";
                           
                        };
                        if (wac.darkIcon == "partly-cloudy-night")
                        {
                            wac.Icon = "https://image.flaticon.com/icons/svg/18/18049.svg";
                           
                        };
                        /*
                        clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
                        */
                        wac.summaryIcon = $sce.trustAsResourceUrl(wac.Icon);

                        
                    })
                    
            };
            
            wac.selected_city = wac.cities[0];
            wac.getLatLonForSelected();
        }])
        .directive('myConditionsSpecial', ['$sce', function($sce){
        
        //a reminder on naming conventions for directives: 
        //https://medium.com/@cironunesdev/angularjs-how-to-name-directives-118ac44b81d4#.idz35zby4

        /* https://docs.angularjs.org/guide/directive
        The restrict option is typically set to:

        'A' - only matches attribute name
        'E' - only matches element name
        'C' - only matches class name
        'M' - only matches comment
        */
        
        return{
            restrict: 'A',
            scope: true,
            templateUrl: $sce.trustAsResourceUrl('index.html')
        };
    }])
    .factory('GoogleGeolocationService', ['$sce', '$http', 
        function($sce, $http){
            
            
            
            var geolocationService = {};
            
            //Google Maps Geocoding API key   
            var key = "AIzaSyBmCqSXvHUQID08G1gnORihNx5KNYebIQ0";
            
            geolocationService.geoLocate = function(location){

                var address = "+" + location.name + ",+" + location.state;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                          address + "&key=" + key;

                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.get(trustedurl);
            }
            
            return geolocationService;            
            
        }])
    .factory('DarkSkyWeatherService',['$sce', '$http', 
        function($sce, $http){
            
            
            var darkSkyWeatherService = {};
            
            //DarkSky API key
            var key = "3346f0aed1e8bc69a597064e7f3832bd";
            
            darkSkyWeatherService.getCurrentConditions = function(location){
                
                var url = "https://api.darksky.net/forecast/" +
                          key + "/" + location.lat + "," + location.lon;
                          
                
                          
                console.log("DarkSky API URL:");
                console.log(url);
                
                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});
                
              
                
            }
            
            return darkSkyWeatherService;
        }
    ]);