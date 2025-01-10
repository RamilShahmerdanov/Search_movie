const  api_key="38a9f9d"
const searchbtn=document.querySelector("#searchbtn")
const parentContent=document.querySelector("#parentContent")
const inputtext=document.querySelector("#inputtext")
const favoritesite=document.querySelector("#favoritesite")
const favoritebtn=document.querySelector("#favoritebtn")
const page1=document.querySelector("#page1")
const favheader=document.querySelector("#favheader")
const backbtn=document.querySelector("#backbtn")

async function searchMovie(){
const inputtextval=inputtext.value
console.log("inputtextval",inputtextval);
const url=`http://www.omdbapi.com/?apikey=${api_key}&s=${inputtextval}`

try{
    const responce= await fetch(url)
    const data = await responce.json()
    console.log("data",data);
  favheader.style.display="none"

    if (data.Response === "True") {

        
        parentContent.innerHTML = data.Search.map((movie) => {
          const poster =
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/100x150?text=No+Image";
          return `
            <div class="movie-item">
              <img src="${poster}" alt="${movie.Title}">
              <div class="movie-details">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                
                <button  class="btnfavori" onclick='addToFavorites(${JSON.stringify(movie)},this)'>Add to Favorites</button>
              
              </div>
              
            </div>
          `;
        }).join(""); 
      }
    else {
        parentContent.innerHTML = `<p>Film tapilmadi. Zəhmət olmasa başqa bir ad daxil edin.</p>`;
    }
    
}catch(error){
    console.log("error",error);   
}
}
searchbtn.addEventListener("click",function(){
    searchMovie()
})

//add to favori site

function addToFavorites(favmovie,btnfavori){
  
  console.log(favmovie);
  favoritesite.innerHTML+=
  `
  <div class="movie-item">
   <img src="${favmovie.Poster}" alt="${favmovie.Title}">
              <div class="movie-details">
                <h3>${favmovie.Title}</h3>
                <p>Year: ${favmovie.Year}</p>
                </div>
                </div>

      
              `
  favoritesite.style.display="none"
            
  btnfavori.style.backgroundColor = "green";
  btnfavori.innerText = "Added!";
  btnfavori.disabled = true;
}


// show favorite site
favoritebtn.addEventListener("click",()=>{
  

  parentContent.style.display="none"
  favoritesite.style.display="block"
  favheader.style.display="block"
  page1.style.display="none"
  backbtn.style.display="block"

})
//back to home site
backbtn.addEventListener("click", () => {
  favoritesite.style.display = "none";
  page1.style.display = "flex";
  parentContent.style.display = "flex";
  backbtn.style.display="none"
  favheader.style.display="none"
});

