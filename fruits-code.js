$(() => {
    
     let url = "https://raw.githubusercontent.com/sedc-codecademy/sedc7-04-ajs/master/g1/Lecture%2005/fruits.json?fbclid=IwAR23hPe8TrO3geknkLAbM6z7f_h4uYNmksmkHYLBZ5-TahWg3p364-OQgxU";
     fetch(url)
        .then(data => data.json())
        .then(json => {
            
            let fruits = json;
            displayFruits(fruits);

   
            $("#filter").keyup(function() {
                if($("#filter").val().length > 0){
                    // let rows = $("#fruits-container").find("tr");
                    // let rows = fruits.name;
                    // let data = this.value.split(" ");
                    
                    
                    // rows.hide();

                    // $.each(data, function(i, v){
                    //     rows.toLowerCase().filter(":contains('" + v + "')").show();
                        
                    // }); 
                    
                    
                    let text = $(this).val().toLowerCase();
                    $("#fruits-container tr").filter(function() {
                      $(this).toggle($(this).text().toLowerCase().indexOf(text) > -1)
                    });
                  
                

                }else{
                    
                    displayFruits(fruits);
                }
              
            });


            $(document).on("click","button",function(){
                
                let name = this.id;
                deleteObj(fruits,name);
                
                    
             });

            let counter = "0";

    
            $(".heading th").on("click", (event) => {
        
                 if(counter == "0") {   
                    const fieldName = $(event.currentTarget).data("field");

                    if (fieldName === "name") {
                        fruits.sort((f, s) => f.name.localeCompare(s.name));
                    } else {
                        fruits.sort(makeSorter(fieldName));
                    }

                    $(event.currentTarget).css("color","blue");

                    displayFruits(fruits);
                    counter = "1";
               
                }else if(counter == "1"){
                
                    const fieldName = $(event.currentTarget).data("field");

                    if (fieldName === "name") {
                        fruits.sort((f, s) => f.name.localeCompare(s.name));
                    } else {
                        fruits.sort(opositeSorter(fieldName));
                    }

                    $(event.currentTarget).css("color","red");

                    displayFruits(fruits);
                    counter = "0"

                }  


            }) 

        })
        .catch(error => console.log(error));
});

// let getFruitsData = async() => {
//     let url = "https://raw.githubusercontent.com/sedc-codecademy/sedc7-04-ajs/master/g1/Lecture%2005/fruits.json?fbclid=IwAR23hPe8TrO3geknkLAbM6z7f_h4uYNmksmkHYLBZ5-TahWg3p364-OQgxU";

//     let response = await fetch(url);
//     let fruits = await response.json();
//     return fruits;
// }


function opositeSorter(fieldName){
    return (f, s) => s[fieldName] - f[fieldName];
}

function makeSorter(fieldName) {
    return (f, s) => f[fieldName] - s[fieldName];
}


function displayFruits(fruits) {
    $("#fruits-container").empty();
    for (const fruit of fruits) {
        $("#fruits-container").append(`
            <tr>
                <td><button style = "color:red" id = ${fruit.name}>X</button> </td>
                <td>${fruit.name} </td>
                <td>${fruit.calories / 1000} kcal</td>
                <td>${fruit.totalFat} g</td>
                <td>${fruit.saturatedFat} g</td>
                <td>${fruit.salt * 1000} mg</td>
                <td>${fruit.totalCarbs} g</td>
                <td>${fruit.fiber} g</td>
                <td>${fruit.sugars} g</td>
                <td>${fruit.protein} g</td>
                <td>${fruit.calcium * 1000} mg</td>
                <td>${fruit.potasium * 1000} mg</td>
            </tr>
            
        `);
    }
} 





function deleteObj(fruits,name){
    let removeIndex = fruits.map(function(item) { return item.name; }).indexOf(String(name));
    fruits.splice(removeIndex, 1);
    return displayFruits(fruits);
   } 