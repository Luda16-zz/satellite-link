$(".button-collapse").sideNav();

// "Generic" function
$.conditionalize = function(sourceSelect, conditionalSelect){
    var options = conditionalSelect.children(".conditional").clone();
    
    sourceSelect.change(function(){
        var value = $(this).val();                  
        conditionalSelect.children(".conditional").remove();
        options.clone().filter("."+value).appendTo(conditionalSelect);
    }).trigger("change");
}

// Used like this:
$.conditionalize($("#firstSelect"), $("#secondSelect"));
