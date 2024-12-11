// Function to generate the calendar for the current month
function generateCalendar() {
    const calendarContainer = document.getElementById("calendar");
    const currentDate = new Date();
    
    // Get the current month and year
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
  
    // Get the first day of the month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    const numDays = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
  
    // Create the table for the calendar
    let calendarHTML = "<table>";
    calendarHTML += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>";
  
    // Add empty cells for the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarHTML += "<td></td>";
    }
  
    // Add the days of the current month
    for (let day = 1; day <= numDays; day++) {
      if ((firstDayOfWeek + day - 1) % 7 === 0 && day !== 1) {
        calendarHTML += "</tr><tr>";
      }
      calendarHTML += <td data-day="${day}" class="available">${day}</td>;
    }
  
    calendarHTML += "</tr></table>";
    calendarContainer.innerHTML = calendarHTML;
  
    // Add event listeners to each day for booking
    const allDays = document.querySelectorAll("td[data-day]");
    allDays.forEach(day => {
      day.addEventListener("click", handleDayClick);
    });
  }
  
  // Handle clicking on a day in the calendar
  function handleDayClick(event) {
    const selectedDay = event.target;
    const day = selectedDay.dataset.day;
    
    // Show booking info
    document.getElementById("booking-info").style.display = "block";
    document.getElementById("selected-date").innerText = Selected Date: ${day};
  
    // Store the selected date
    selectedDate = day;
    
    // Disable clicking on reserved days
    if (selectedDay.classList.contains("reserved")) {
      alert("This date is already reserved!");
    }
  }
  
  // Handle the booking of a resource
  document.getElementById("book-button").addEventListener("click", function() {
    const resource = document.getElementById("resource").value;
    
    // Mark the selected date as reserved
    const allDays = document.querySelectorAll("td[data-day]");
    allDays.forEach(day => {
      if (day.dataset.day == selectedDate) {
        day.classList.add("reserved");
        day.classList.remove("available");
      }
    });
    
    alert(Successfully reserved the ${resource} for the date ${selectedDate}!);
    document.getElementById("booking-info").style.display = "none"; // Hide booking info after reservation
  });
  
  // Call generateCalendar on page load
  window.onload = generateCalendar;