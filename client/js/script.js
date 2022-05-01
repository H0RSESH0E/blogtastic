var randomBG = {
    0: "https://c.pxhere.com/images/44/8e/6a598ea940cea51806267676787f-1438901.jpg!d",
    1: "https://c.pxhere.com/photos/0f/22/rainbow_background_roadway_beautiful_landscape_country_road_countryside_blue_sky_clouds_sky-657518.jpg!d",
    2: "https://c.pxhere.com/photos/38/c6/cloud_sky_dawn_dusk_sunrise-7672.jpg!d",
}

var theBGImage = document.querySelector("#background");

var loadRandomBG = function() {
    console.log('-------------- loadRandomBG function ------------');
    let x = Math.floor((Math.random() * 3));
    y = randomBG[x];
    theBGImage.setAttribute("style", `background-image:url("${y}");`)
}

loadRandomBG();


