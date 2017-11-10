$(document).ready(function() {
    // declare array of ingredients
    var ingredients = [];
    // declare variable to hold limit of responses
    // var limit = 10;
    // declare an incomplete url that will be identical for every query
    var url = "https://trackapi.nutritionix.com/v2/natural/nutrients?query=";
    var x_api_id = "7f95c43d";
    var x_api_key = "c3160abdccd8d3b9ae741629d18098ba";
    // declare ingredientCount
    var ingredientsCount = 0;
    var ingredientIndex = 0;
    // declare function that gets api data from nutritionix
    function runQuery(recipeIngredient) {
        $.ajax({
            url: url,
            method: "GET"
        }).done(function(NutritionixData) {
            // Loop through ingredient responses
            // for (var i = 0; i < limit; i++) {
            // Create ingredient element with five attributes and append to bootstrap 3.3.2's panel element
            // Create label beneath each ingredient element that displays its rating
            $("#nutrients-panel").append(
                $("<div>").attr("class", "form-group").html("Is this recording?"),
                $("<ul"),
                $("<li>").attr({
                    src: NutritionixData.foods[0].food_name
                }).html("Ingredient: " + name) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].serving_qty
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].serving_unit
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_calories
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_total_fat
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_saturated_fat
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_cholesterol
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_sodium
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_total_carbohydrate
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_dietary_fiber
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_sugars
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_protein
                }) +
                $("<li>").attr({
                    src: NutritionixData.foods[0].nf_potassium
                })
            );
        });
    }
    // when Add title button is clicked
    $("#add-title").on("click", function(event) {
        // submit property allows us to hit enter on the keyboard and it registers the search
        event.preventDefault();
        // clear recipe title currently displayed (if any)
        $("#display-title").empty();
        // create variable to hold recipe title
        var recipeTitle = $("#recipe-title").val().trim();
        // validate that user has entered at least one character
        if (recipeTitle !== "") {
            // create html
            $("#display-title").html(recipeTitle).append(
                $("<button>").attr({
                    id: "delete-title",
                    class: "btn btn-sm btn-danger",
                    style: "float:right"
                }).append($("<span>").html("Delete")));
        } else $("#title-error").html("* Please enter at least one character");
    });
    // when Add ingredient button is clicked
    $("#add-ingredient").on("click", function(event) {
        event.preventDefault();
        // create variable to hold recipe ingredient
        var recipeIngredient = $("#recipe-ingredient").val().trim();
        // push recipe ingredient to ingredients array
        ingredients.push(recipeIngredient);
        // updates ingredientsCount
        ingrientsCount = ingredients.length;
        ingredientIndex++;
        if (recipeIngredient !== "") {
            // create html
            $("#display-ingredient").append(
                $("<li>").attr({
                    id: "delete-ingredient",
                    class: "form-group"
                }).html(recipeIngredient).append(
                    $("<button>").attr({
                        id: "delete-ingredient",
                        class: "btn btn-sm btn-danger",
                        style: "float:right"
                    }).append($("<span>").html("Delete"))));
        } else $("#ingredient-error").html("* Please enter at least one character");
    });
    // when Add preparation instructions button is clicked
    $("#add-preparation").on("click", function(event) {
        event.preventDefault();
        // clear preparation instructions currently displayed (if any)
        $("#display-preparation").empty();
        // create variable to hold recipe preparation instructions
        var recipePreparation = $("#recipe-preparation").val().trim();
        // validate that user has entered at least one character
        if (recipePreparation !== "") {
            // create html
            $("#display-preparation").html(recipePreparation).append(
                $("<button>").attr({
                    id: "delete-preparation",
                    class: "btn btn-sm btn-danger",
                    style: "float:right"
                }).append($("<span>").html("Delete")));
        } else $("#preparation-error").html("* Please enter at least one character");
    });
    // when Delete title button is clicked
    $(document).on("click", "#delete-title", function() {
        event.preventDefault();
        // clear content currently displayed
        $("#display-title").empty();
    });
    // when Delete ingredient button is clicked
    $(document).on("click", "#delete-ingredient", function() {
        event.preventDefault();
        // clear content currently displayed
        $("#display-ingredient").empty();
    });
    // when Delete preparation button is clicked
    $(document).on("click", "#delete-preparation", function() {
        // event.preventDefault();
        // clear content currently displayed
        $("#display-preparation").empty();
    });
    // when Save recipe button is clicked, do the following
    $(document).on("click", "#save-recipe", function() {
        //event.preventDefault();
        // clear recipes currently displayed (if any)
        // $("#recipe-panel").empty();
        if (($("#display-title").html() !== "") && ($("#display-ingredient").html() !== "") && ($("#display-preparation").html() !== "")) {
            $("#save-div").remove();
            $(".btn-danger").remove();
            $("#success-div").append("h1").attr({
                style: "color:green; bolded",
                class: "text-center"
            }).html("Your recipe has been saved!");
        } else $("#save-error").html("* All fields must be completed before saving");
        // direct to another page that features saved recipe and nutrients facts
        // $(location).attr("href", "http://stackoverflow.com");
        // concatenate components of url
        url = url + ingredients[i] + "?x-api-id=" + x_api_id + "&x-api-key=" + x_api_key;
        // passes final url to the runQuery function
        runQuery(url);
    });
});