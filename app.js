/* **********************************************************************  BUDGET  CONTROLLER MODULE  ********************************************************************** */

var budgetController = (function () {

    //some code

})();




/* **********************************************************************  UI  CONTROLLER MODULE  ********************************************************************** */
var UIController = (function () {

    //Some Code
    //We want to acces thos outside uicontrol so
    return {
        getInput: function () {

        }

    };

})();




/* **********************************************************************   CONTROLLER MODULE  ********************************************************************** */
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {


        //1. Get the filled input data

        //2. Add item to the budget controller

        //3.Add the new item to the UI

        //4. Calculate the budget

        //5. Display the budget
        console.log(1)

    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    })


})(budgetController, UIController);


































