$(function(){
  $('.saveBtn').on('click', function(){
    // Get values to save to localStorage
    var time = $(this).parent().attr('id');
    var desc = $(this).siblings('.description').val();  

    localStorage.setItem(time, desc);

    $('#myModal').modal('show');
  });

  function hourCompare(){
    // Create a dayjs object containing the current hour (0-23)
    var hourNow = dayjs().hour();

    // Return all of the time blocks from html to loop over them
    $('.time-block').each(function(){
      // Takes the ID of each time block, splits it into an array of two parts, then returns the latter half containing the number value 
      var hourId = parseInt($(this).attr('id').split('-')[1]);

      if(hourId < hourNow){  //if the current block is LESS than the current hour
        $(this).addClass('past');
      }else if(hourId === hourNow){  //if the current block is EQUAL TO the current hour
        $(this).removeClass('past');  //cleanup other classes to avoid conflicts
        $(this).addClass('present');
      }else{  //if the other 2 conditions arent met, so future
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  }
  //Call function right away, and then every minute
  hourCompare();
  setInterval(hourCompare, 60000);

  // Loop over each time block
  $('.time-block').each(function(){
    var hourId = $(this).attr('id');
    var storedText = localStorage.getItem(hourId);

    // Select the decription textarea of each time block and load any saved data
    $(this).children('.description').val(storedText);
  });

  // Display the current date in the header of the page. (with advancedFormat dayjs plugin)
  $('#currentDay').text(dayjs().format('dddd, MMMM Do, YYYY'));
});