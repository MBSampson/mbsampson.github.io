let hideCoverExp = false;
let currentExpTile;

function showExperience(expNum) {
  let cover = document.getElementById("experience-cover");
  let exp1 = document.getElementById("experience-1");
  let exp2 = document.getElementById("experience-2");
  let exp3 = document.getElementById("experience-3");
  let exp4 = document.getElementById("experience-4");
  let exp5 = document.getElementById("experience-5");
  let expList = [exp1, exp2, exp3, exp4, exp5];

  // Check to see if the user is trying to enable an already displaying tile
  if(currentExpTile !== expNum) {
    currentExpTile = expNum;
    // Remove the 'hidden' class from the selected tile and add it to all others
    for( let i = 0; i < expList.length; i++ ) {
      if(i === expNum) { 
        expList[i].classList.toggle("hidden");
      } else {
        expList[i].classList.add("hidden");
      }
    }
    
    // Hides the cover after a user interacts with an experience tile
    if(hideCoverExp === false) {
      cover.classList.toggle("hidden");
      hideCoverExp = true;
    }
  } 
} 