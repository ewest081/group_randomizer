
//BONUS: Kenzie's team is named "_'LAZER"

//Array of names - one permanent, one a copy that we pull elements from
var permanentArray = ["Mark", "Amber", "Chris", "Brooks", "Altamir", "Eric", "Liz", "Jeremy", "Joe", "Kenzie", "Matthew", "Nathan", "Natalie", "Charlie", "Paul", "Robby", "Anony", "Sam", "Scott", "Zach"];
var people = permanentArray.slice(0);
var refreshSymbol = '\u27f3';
var currentGroupNum = 0;
var arrayCounter = 0;

//Max number for FOR loop
var MIN_NUM_GROUPS = 2;
var MAX_NUM_GROUPS = 11;

//General listener
$(document).ready(function(){
	init();
	enable();
});

//Assembles button layout
function init(){
	buildButtons();
}

//event listeners for group and refresh buttons
function enable(){
	$('.button-holder').on('click', '.group-maker', groupClick);
	$('.refresh-holder').on('click', '.refresh', makeGroups);
}

//appends group and refresh buttons to the DOM
function buildButtons(){
	for (var i = MIN_NUM_GROUPS; i <= MAX_NUM_GROUPS; i++){
		$('.button-holder').append('<button class="group-maker" id="' + i + '">' + i + '</button>');
		$('.button-holder').children().last().data("num-groups", i);
	}
	$('.refresh-holder').append('<button class="refresh">' + refreshSymbol + '</button>');
}

//assigns a group number for use by the refresh button, based upon which group button was clicked
function groupClick(){
	currentGroupNum = $(this).attr("id");
	$('.group-maker').removeClass('active');
	$(this).addClass('active');
}

/* Recreates a temporary array of people as a copy of permanentArray.  Iterates through each group-container, adding random
 * people to it and removing them from the temporary array until said array is empty.  Builds <p> elements listing each person's
 * name, within each group.  Handles hide() and slideDown() animations.  For the group containing Kenzie, overrides group title
 * through call to lazer().
*/
function makeGroups(){
	if (currentGroupNum > 0){
		arrayCounter = 0;
		people = permanentArray.slice(0);
		clearGroups();
		var groupCount = currentGroupNum;
		groupDivs($('#' + groupCount));
		var i;
		while (true) {
			for (i = 1; i <= groupCount; i++) {
				if (people.length <= 0) {
					return;
				}
				var index = randomNumber(0, people.length - 1);
				var personArray = people.splice(index, 1);
				var person = personArray[0];
				
				var $el = $('.group-container').find('[data-groupnumber="' + i + '"]');
				if (person == "Kenzie") lazer(i);
				$el.append("<p>" + person + "</p>");
				$el.children().last().hide();
				var delay = parseInt(arrayCounter*2 + "00");
				$el.children().last().delay(delay).slideDown(400);
				arrayCounter++;
			}
		}
	}
}

//Used to adjust Kenzie's group name to "_'LAZER"
function lazer(groupNum){
	var $el = $('.group-container').find('[data-groupnumber="' + groupNum + '"]');
	$el.children().first().text("_'LAZER");
	$el.toggleClass('lazer');
}

//Method imported from fruitStand program.  Generates a random integer between min and max values specified.
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

//Creates as many group numbers specified by the calling button's "num-groups" data.  Appends <div>'s to the DOM,
//numbered accordingly.  Adds initial group titles within these <div>'s.
function groupDivs(button){
	for (var i = 1; i <= button.data("num-groups"); i++){
		$('.group-container').append('<div class="group"><h4>Group ' + i + '</h4></div>');
		$('.group-container').children().last().attr("data-groupnumber", i);
	}
}

//Removes all group titles and member lists from the DOM.
function clearGroups(){
	$('.group-container').children().remove();
}


