
// Const global var : 
const marginOfError = 0.00015;
const screenHeight  = window.innerHeight;
const backgroundColors = ["#D98880", "#D2B4DE", "#AED6F1", "#F9E79F", "#ABEBC6"]

function main(){
    var player = "00";
    newEvent(player);
}

function newEvent(player){
    console.log(player);
    const container     = document.getElementById("container");
    if(data[player].end == "Death") looser();
    if(data[player].end == "Yes")   winner();

    nchoices = data[player].choices.length;
    sectionHeight = screenHeight/nchoices;
    for(i = 0; i < nchoices; i ++){
        (function (index){
            const section = document.createElement("div");
            section.className = "section";
            section.style.height = sectionHeight + "px";
            section.style.backgroundColor = backgroundColors[index%backgroundColors.length];
            section.textContent = data[player].choices[index];

            section.addEventListener("click", function(){
                console.log(data[player].choices,index,data[player].choices[index]);
                player = data[player].choices[index].slice(0,2);
                emptyContainer();
                newEvent(player);
            });
            container.appendChild(section);
        })(i);
    }
}

function looser(){
    emptyContainer();
}
function winner(){
    emptyContainer();
}
function emptyContainer() {
    const container = document.getElementById("container");
  
    // Remove all child elements from the container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
}