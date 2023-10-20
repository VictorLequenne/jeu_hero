
// Const global var : 
const meterMargin = 5;
const marginOfError = (meterMargin / 40075000) * 360;
console.log("Margin of error is:", marginOfError);
const screenHeight  = window.innerHeight;
const screenWidth   = window.innerWidth;
const backgroundColors = ["#D98880", "#D2B4DE", "#AED6F1", "#F9E79F", "#ABEBC6"]
const options = {
    enableHighAccuracy: true,
    timeout: 5000000,
    maximumAge: 1000,
};
  

// Main function that is called when entering the page
function main(){
    var player = "00";
    newEvent(player);
}


function newEvent(player) {
    console.log(player);
    const container = document.getElementById("container");
    if (data[player].end === "Death") displayDeathScreen(container,player);
    else if (data[player].end === "Yes") displayWinScreen(container,player);
    else{
        // Call isInPosition with a callback function to handle displaying choices
        isInPosition(player, function (isClose) {
            if (isClose) {
                const nchoices = data[player].choices.length;
                const sectionHeight = screenHeight / (nchoices + 1);
                emptyContainer();
                const textSection = add_text(player,sectionHeight);
                container.appendChild(textSection);
                for (let i = 0; i < nchoices; i++) {
                    const newSection = add_choice(player, i, sectionHeight);
                    container.appendChild(newSection);
                }
            }else{
                const newSection = displayGoToScreen(player);
                container.appendChild(newSection);
                newEvent(player);
            }
        });
    }
}

function displayGoToScreen(player){
    const section = document.createElement("div");
    section.className = "section";
    section.style.height = screenHeight + "px";
    section.style.backgroundColor = backgroundColors[0];
    section.textContent = "Allez a " + data[player].position[2];
    return section;
}

function displayDeathScreen(container,player){
    emptyContainer();
    const section = document.createElement("div");
    section.className = "section";
    section.style.height = screenHeight + "px";
    section.style.backgroundColor = backgroundColors[0];
    section.textContent = "Vous êtes mort, triste";
    container.appendChild(section);
    section.addEventListener("click", function(){
        player = data[player].choices[0].slice(0,2);
        emptyContainer();
        newEvent(player);
    });
    
}
function displayWinScreen(container,player){
    const section = document.createElement("div");
    section.className = "section";
    section.style.height = screenHeight + "px";
    section.style.backgroundColor = backgroundColors[0];
    section.textContent = "Wouhouhou vous avez démoli mickey";
    container.appendChild(section);
}

function isInPosition(player, callback) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const current_position = position.coords;
            const aim_position = data[player].position;
            const dist_squared = dist2(
                current_position.latitude,
                current_position.longitude,
                aim_position[0],
                aim_position[1]
            );
            console.log("debug");
            console.log(current_position);
            console.log(aim_position);
            console.log(dist_squared);
            
            // Call the callback with a boolean value indicating if the player is close
            callback(dist_squared <= marginOfError);
        },
        error,
        options
    );
}


// Return the squared distance of 2 points
function dist2(x0,y0,x1,y1) {return (x0 - x1)**2 + (y0 - y1)**2;}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  console.log("AIEEE");
}

function add_text(player, sectionHeight){
    const section = document.createElement("div");
    section.className = "section";
    section.style.height = sectionHeight + "px";
    section.style.backgroundColor = backgroundColors[0];
    section.textContent = data[player].text;
    return section
}
function add_choice(player,index,sectionHeight,sectionWidth){
    const section = document.createElement("div");
    section.className = "section";
    section.style.height = sectionHeight + "px";
    section.style.backgroundColor = backgroundColors[(1+index)%backgroundColors.length];
    section.textContent = data[player].choices[index];

    section.addEventListener("click", function(){
        console.log(data[player].choices,index,data[player].choices[index]);
        player = data[player].choices[index].slice(0,2);
        emptyContainer();
        newEvent(player);
    });
    return section
}


function emptyContainer() {
    const container = document.getElementById("container");
  
    // Remove all child elements from the container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
}