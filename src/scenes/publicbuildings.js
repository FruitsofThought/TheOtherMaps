function publicbuildings_legend() {
  var legend = [
    publicbuildings = {
      filter: '[civic,clubhouse,sports_centre,temple,place_of_worship,palace,transportation,sportcentre,sportscenter,fire_station,station,medical,hospital,public,school,government,library,courthouse,university,museum,train_station,public_building,chapel,church,mosque,cathedral,community,city_hall,stadium]',
      title: 'home.scenes.publicbuildings.publicbuildings.title',
      description: 'home.scenes.publicbuildings.publicbuildings.description',
      css: "background-color: blue;",
      color: 'blue',
      icon: '',
      minzoom: 6,
      maxzoom: 20,
      samplelocation: [-52.6537, -4.8049, 18]
    },
    residential = {
      filter: '[residential,house,houseboat,boathouse,apartments]',
      title: 'home.scenes.publicbuildings.residential.title',
      description: 'home.scenes.publicbuildings.publicbuildings.description',
      css: "background-color: yellow;",
      color: 'yellow',
    },
    commercial = {
      filter: '[shop,retail,manufacture,bank,factory,store,henhouse,industrial,commercial,hotel,office,storage_tank]',
      title: 'home.scenes.publicbuildings.commercial.title',
      description: 'home.scenes.publicbuildings.publicbuildings.description',
      css: "background-color: black;",
      color: 'black',
    },
    infrastructure = {
      filter: '[water_tower,toilet,silo,barn,storage,boat,container,tunnel,guard_house,pontoon,datacenter,watch_house,gate,pump_house,viaduct,ramp,beehive,shelter,gatehouse]',
      title: 'home.scenes.publicbuildings.infrastructure.title',
      description: 'home.scenes.publicbuildings.infrastructure.description',
      css: "background-color: purple;",
      color: 'purple',
    },
    primaryroads = {
      filter: 'primary roads and highways',
      title: 'home.scenes.publicbuildings.primaryroads.title',
      description: 'home.scenes.publicbuildings.primaryroads.description',
      css: "background-color: red;",
      color: 'red',
    }
  ];
  return legend;
}
