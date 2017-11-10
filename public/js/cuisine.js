//updated search button onClick for Autocomplete and some validation for the form
ingredientSearch = null;
 $('#searchButton').on('click', (e) => {
     // not using autocomplete result
     input = $('#ingredient').val().trim();
     if (input != '' && ingredientSearch == null) {
         var keyword = $('#ingredient').val().trim();
         var cuisine = $('#cuisine-name').val().trim();
         if ((cuisine == null)) {
         alert('Please enter a cuisine!!');
         return false;
         }else {
         getRecipes(keyword, cuisine);
         $('.ui-menu').hide(); // hide autocomplete ui
         ingredientSearch = null;}
         //when using autocomplete
     } else if (ingredientSearch != null) {
         e.preventDefault();
         var keyword = window.ingredientSearch;
         var cuisine = $('#cuisine-name').val();
         if ((cuisine == null)) {
         alert('Please enter a cuisine!!');
         return false;
         }else {
         getRecipes(keyword, cuisine);
         ingredientSearch = null;}

     } else {
         // console.log("do nothing");
     }
 });
 // loading page--- gets the image, name and recipe ID --
var getRecipes = function(keyword, cuisine) {
          axios.get("https://api.yummly.com/v1/api/recipes?_app_id=67b9fed7&_app_key=3694f49499f4bce2a7594b8b1ac27168&q=" + keyword + "&allowedCuisine[]=" + cuisine + "&requirePictures=true &maxResult=10&start=10")
              .then((result) => {
                  console.log(result);
                  let recipes = '';
                  $.each(result.data.matches, (i, matches) => {
                      recipes += `
                        <div class="col-md-3">
                          <div class="well text-center">
                            <img src="${matches.imageUrlsBySize[90]}">
                            <h5>${matches.recipeName}</h5>
                            <a onclick="recipeSelected('${matches.id}')" class="btn btn-warning"href="#">Recipe Details</a>
                          </div>
                        </div>
                `;
                  });
                  $('.recipes-detail').html(recipes);
              })
              .catch((err) => {
                  console.log(err);
              });
      } // ends here
      // pulls recipe ID from previous call and save it in session storage
  function recipeSelected(id) {
      sessionStorage.setItem('recipeId', id);
      window.location = '/details';
      return false;
  }
  // More info page  gives all the recipe details
  function getRecipe() {
      let recipeId = sessionStorage.getItem('recipeId');
      axios.get("https://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=67b9fed7&_app_key=3694f49499f4bce2a7594b8b1ac27168")
          .then((response) => {
              //console.log(response);
              let recipes = '';

              $.each(response, (i, result) => {
                  //console.log (result);
                  //console.log (result.yield);
                  //var arr = [];

                  var array = result.nutritionEstimates;

                  array.forEach(function(obj) {
                          if (obj.attribute === "ENERC_KCAL") {
                              window.totalKcal = obj.value;
                              //console.log(totalKcal);
                              // arr.push(totalKcal);
                              //console.log(arr);
                          }
                          //console.log (obj.attribute);
                          if (obj.attribute === "FAT_KCAL") {
                              window.fatKcal = obj.value;
                              //console.log(fatKcal);
                              // arr.push(fatKcal);
                              //console.log(arr);
                          }
                          if (obj.attribute === "PROCNT") {
                              window.protKcal = obj.value;
                              //console.log(protKcal);
                              // arr.push(protKcal);
                              // console.log(arr);
                          }
                          if (obj.attribute === "CHOLE") {
                              window.choleKcal = obj.value;
                              //console.log(window.choleKcal);
                              // arr.push(choleKcal);
                              // console.log(arr);
                          }
                          if (obj.attribute === "FIBTG") {
                              window.fiberKcal = obj.value;

                              // arr.push(fiberKcal);
                              //console.log(arr);
                          }
                          if (obj.attribute === "SUGAR") {
                              window.sugarKcal = obj.value;

                              // arr.push(sugarKcal);

                          }

                          // arr.push(attribute);
                          // console.log(arr);
                          //console.log(obj.attribute, obj.description, obj.value);// working on making a div on Nutrition Estimates---
                      })
                      //console.log (result.images[0].hostedLargeUrl);
                      // loop for displayinh ingredient lines... works in the console but in the display
                  var ingredientLines = result.ingredientLines;
                  for (var i = 0; i < result.ingredientLines.length; i++) {
                      window.displayIngredientLines = result.ingredientLines[i];
                      console.log(window.displayIngredientLines);
                  }
                  $.each(result, (i, matches) => {
                      // console.log (matches);
                      //var string = JSON.stringify(matches);
                      //console.log (matches);


                      recipes = `
                  <div class="row">
                    <div class="col-md-4">
                        <img src="${result.images[0].hostedLargeUrl}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                      <h2>${result.name}</h2>
                        <ul class="list-group">
                          <li class="list-group-item"><strong>Serving Size:</strong> ${result.numberOfServings}</li>
                          <li class="list-group-item"><strong>Cooking Time:</strong> ${result.totalTime}</li>
                          <li class="list-group-item"><strong>Rating:</strong> ${result.rating}/5</li>
                        </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <h2>Ingredients</h2>
                        <ul class="list-group">
                          <li class="list-group-item">${result.ingredientLines}</li>
                        </ul>
                    </div>
                    <div class="col-md-8">
                      <h2>Nutrition Facts </h2>
                        <ul class="list-group">
                          <li class="list-group-item"><strong>Total Calories:</strong> ${window.totalKcal} <strong> kcal</strong></li>
                          <li class="list-group-item"><strong>Calories from Fat:</strong> ${window.fatKcal} <strong> kcal</strong></li>
                          <li class="list-group-item"><strong>Protein:</strong> ${window.protKcal} <strong> grams</strong></li>
                          <li class="list-group-item"><strong>Cholestrol:</strong> ${window.choleKcal} <strong> grams</strong></li>
                          <li class="list-group-item"><strong>Dietary Fiber:</strong> ${window.fiberKcal} <strong> grams</strong></li>
                          <li class="list-group-item"><strong>Sugars:</strong> ${window.sugarKcal} <strong> grams</strong></li>
                        </ul>
                    </div>
                 </div>
                          <a href="https://www.yummly.com/recipe/${sessionStorage.getItem('recipeId')}" target="_blank" class="btn btn-warning">Cooking Info</a>
                          <a href="/cuisine" class="btn btn-default">Go Back To Search</a>
                   
                `;

                  });
                  $('#recipe-detail').html(recipes);
              })
          })
  }
  //auto complete function
  $("#ingredient").autocomplete({
      autoFocus: true,
      minLength: 2,
      source: function(request, response) {
          $.ajax({
              url: "https://api.yummly.com/v1/api/recipes?_app_id=67b9fed7&_app_key=3694f49499f4bce2a7594b8b1ac27168&q=" + request.term,
              data: {
                  term: request.term
              },
              dataType: "json",
              success: function(result) {
                  //console.log (JSON.stringify (result));
                  //console.log (result);
                  var src = result.matches;
                  for (var i = 0; i < result.matches.length; i++) {
                      //console.log (result.matches[i].ingredients);
                      window.src = result.matches[i].ingredients
                  }
                  // use map to format as JQuery autocomplete expects
                  response($.map(window.src, function(item) {
                      console.log(item);

                      return {
                          label: item,
                          value: item
                      };

                  }));
              }
          });
      },
      select: function(event, ui) {
          $("#ingredient").val(ui.item.value);
          window.ingredientSearch = ui.item.value;
          //console.log (ingredientSearch);
          // $("#searchButton").click(); // submit form on selection - mouse or enter key
          console.log(window.ingredientSearch);
      },
  });