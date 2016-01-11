for (i = 0; i < 6; i ++) {
    var build = $("#preview" + i);
    var starHold = $("#star" + i);
    var block = chowHalls[i];
    $("#path" + i).attr("href", "/restaurants/" + block.name)
    if (block.image.length > 0) {
        var picture = block.image;
    } else {
        var picture = "http://www.placehold.it/225x225";
    }
    build.append("<h4>" + block.name + "</h4>" )
    build.append("<h4 class='bottomInfo'>" + block.cuisine + " Cusine" +  "<br>" + block.location + ", " + block.state + "</h4>")
    build.css("background-image", "url(" + picture + ")")
    for(j = 0; j < block.rating; j ++) {
        starHold.append("<img class='starz' src='http://iconizer.net/files/Stunning_Christmas_icons/orig/christmas_star.png'/>")
    }

}
