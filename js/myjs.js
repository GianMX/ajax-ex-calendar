// Handlebars
$(document).ready(function(){
  var source = $("#list-day-template").html();
  var template = Handlebars.compile(source);
  var thisMonth = moment("2018-01-01");
  $(".current-month").text(thisMonth.format("MMMMM YYYY"));
  showMonth(thisMonth);
  holiDays(thisMonth);

// Holiday ajax fuction
function holiDays(mese) {
  $.ajax(
  {
    'url' : 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
    'method' : 'GET',
    'data' : {
      year : 2018,
      month : mese.month()
      },
    'success': function(data, stato) {
      var holidays = data.response;
      if (holidays.length >= 1) {
      for (var i = 0; i < holidays.length; i++) {
        var holiday = holidays[i];
        var items = $('.day-list[full-data="' + holiday.date + '"]' );
        items.addClass('holiday');
        items.text(items.text() + ' - ' +  holiday.name);
        }
      }
    },
    'error' : function(request, state, errors) {
    alert('Whoops! Something wrong...');
    }
  }
);}

// Change month function on click ---> Go to the next month
$('.after').click(function () {
  var questoMese = $('h2').attr('data-this-month');
  var meseProssimo = moment(questoMese).add(1, 'months');
    if (meseProssimo.year() == 2018){
    showMonth(meseProssimo);
    holiDays(meseProssimo);
    }else {
    alert('Spiacente, il mondo non esisterà più')
  }
});

// Change month function on click ---> Go to the previously month
$('.before').click(function () {
  var questoMese = $('h2').attr('data-this-month');
  var mesePrecedente = moment(questoMese).subtract(1, 'months');
  if (mesePrecedente.year() == 2018){
  showMonth(mesePrecedente);
  holiDays(mesePrecedente);}
  else {
    alert('Spiacente, il mondo non esisteva ancora...')
  }
});

// Function for put months and holidays on HTML
function showMonth(thisMonth) {
  $("h2").text(thisMonth.format("MMMM YYYY"));
  $("h2").attr('data-this-month',thisMonth.format("YYYY MM"));
  $(".days-list").html("");
  var daysInMonth = thisMonth.daysInMonth();
  for (var i = 0; i < daysInMonth; i++) {
    var dayObject = {
      'year' : thisMonth.year(),
      'day' : i+1,
      'month' : thisMonth.month(),
    }
    var thisDate = moment(dayObject);
    var context = {
      'giorno' : thisDate.format("D MMMM"),
      'date-complete' : thisDate.format("YYYY-MM-DD"),
    }
    var html = template(context);
    $(".days-list").append(html);
    }
  }
});
