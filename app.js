console.log("Let's get this party started!");
const $gifArea = $("#gif-area");
const $inputText = $("#search-gif");

function addGiphy(giphys, input) {
  const matchGifs = giphys.filter(function (gif) {
    return gif.title.indexOf(input) !== -1;
  });
  if (matchGifs.length > 0) {
    const indx = Math.floor(Math.random() * matchGifs.length);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: matchGifs[indx].images.original.url,
      class: "w-100",
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

$("#giphy-form").on("submit", async function (e) {
  e.preventDefault();
  let q = $inputText.val();
  if (q) {
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: { q, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" },
    });
    //console.log(res);
    addGiphy(res.data.data, q);
    $inputText.val("");
  }
});
$("button").on("click", function (e) {
  $("img").remove();
});
