var peta = L.map('mapku').setView([-6.193651205018319, 106.83258839991079],13);
var osm  = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXVobHVsdSIsImEiOiJjbGF0MzgxeXMwZTF1M3dxbDVjaTdxaTJ1In0.f6hSmdDAADvVpXH8E8HY7w', {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', maxZoom: 18, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, accessToken: 'pk.eyJ1IjoibXVobHVsdSIsImEiOiJjbGF0MzgxeXMwZTF1M3dxbDVjaTdxaTJ1In0.f6hSmdDAADvVpXH8E8HY7w'});
var ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
function ambilIcon(d) {
    return  d == 'Rendah' ? greenIcon :
            d == 'Menengah' ? yellowIcon :
            d == 'Tinggi' ? redIcon :
            null; // Mengembalikan null jika tidak ada status yang sesuai
};

function mystyle(Feature) {
    return {
        fillColor: 'transparent', // Set warna fill menjadi transparan
        weight: 2,
        opacity: 0,
        dashArray: '3',
        fillOpacity: 0.5,
        icon: ambilIcon(Feature.properties.Status) // Set ikon berdasarkan status
    };
};
var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
var yellowIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-yellow.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
function popUpData(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br/>"));
    }
};
function pointToLayer(Feature, latlng) {
    return L.marker(latlng, {
        icon: ambilIcon(Feature.properties.Status)
    });
}
var baseMapsData = {
    "OSM" : osm,
    "EWI" : ewi
};
var layerControlBaseMaps = L.control.layers(baseMapsData).addTo(peta);
var geojsonBencana = new L.GeoJSON.AJAX("titikGenanganFix.geojson", {
    pointToLayer: pointToLayer,
    onEachFeature: popUpData
});
osm.addTo(peta);
geojsonBencana.addTo(peta);
