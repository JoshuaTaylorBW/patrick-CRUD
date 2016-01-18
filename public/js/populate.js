var shuffleRestaurant = function (array) {
    for (var r = array.length - 1; r > 0; r --) {
        var s = Math.floor(Math.random() * (r + 1));
        var temp = array[r];
        array[r] = array[s];
        array[s] = temp;
    }
    return array;
}

chowHalls = shuffleRestaurant(chowHalls);

for (i = 0; i < 6; i ++) {
    var build = $("#preview" + i);
    var starHold = $("#star" + i);
    var block = chowHalls[i];
    $("#path" + i).attr("href", "/restaurants/" + block.id)
    console.log(block);
    if (block.url.length > 0) {
        var picture = block.url;
    } else {
        var picture = "http://www.placehold.it/225x225";
    }
    build.append("<h4>" + block.name + "</h4>" )
    build.append("<h4 class='bottomInfo'>" + block.type + " Cusine" +  "<br>" + block.location+"</h4>")
    build.css("background-image", "url(" + picture + ")")
    for(j = 0; j < block.rating; j ++) {
        starHold.append("<img class='starz' src='http://iconizer.net/files/Stunning_Christmas_icons/orig/christmas_star.png'/>")
    }

}
