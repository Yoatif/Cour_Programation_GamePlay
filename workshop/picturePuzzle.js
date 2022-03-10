
/* sépare l'image en plusieurs morceau*/
var img = document.createElement("img");
    img.src = "godsavethequeen.png";
    

    var div = document.getElementById("x");
    div.appendChild(img);
    //block.setAttribute("style", "text-align:center");

function setImage(images, gridSize) {
    console.log(gridSize);
    gridSize = gridSize || 4; 
    console.log(gridSize);
    var percentage = 100 / (gridSize - 1);
    var image = images[Math.floor(Math.random() * images.length)];
    $('#actualImage').attr('src', image.src);
    $('#sortable').empty();
    for (var i = 0; i < gridSize * gridSize; i++) {
        var xpos = (percentage * (i % gridSize)) + '%';
        var ypos = (percentage * Math.floor(i / gridSize)) + '%';
        var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
            'background-image': 'url(' + image.src + ')',
            'background-size': (gridSize * 100) + '%',
            'background-position': xpos + ' ' + ypos,
            'width': 400 / gridSize,
            'height': 400 / gridSize
        });
        $('#sortable').append(li);
    }
    $('#sortable').randomize();
    /* sépare de manière aléatoire les différents morceau du puzzle */
    $.fn.randomize = function (selector) {
        var $elems = selector ? $(this).find(selector) : $(this).children(),
            $parents = $elems.parent();

        $parents.each(function () {
            $(this).children(selector).sort(function () {
                return Math.round(Math.random()) - 0.5;
            }).remove().appendTo(this);
        });
        return this;
    }; 
}



/* met en place le drag n' drop */
function enableSwapping(elem) {
    $(elem).draggable({
        snap: '#droppable',
        snapMode: 'outer',
        revert: "invalid",
        helper: "clone"
    });
    $(elem).droppable({
        drop: function (event, ui) {
            var $dragElem = $(ui.draggable).clone().replaceAll(this);
            $(this).replaceAll(ui.draggable);

            currentList = $('#sortable > li').map(function (i, el) { 
                return $(el).attr('data-value'); });
            if (isSorted(currentList))
                $('#actualImageBox').empty().html($('#gameOver').html());

            imagePuzzle.enableSwapping(this);
            imagePuzzle.enableSwapping($dragElem);
        }
    });

setImage(image, gridSize);
enableSwapping(elem);
}  