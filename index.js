document.addEventListener('DOMContentLoaded', () =>{

// Fetch from json
fetch(`http://localhost:3001/jobs`)
  .then(response => response.json())
  .then(data => {
    const jobList = document.getElementById('job-list');

    data.forEach((job, index) => {
      const jobDiv = document.createElement('div');
      jobDiv.classList.add('job');

      // Add job details
      jobDiv.innerHTML = `
        <h2>${job.title}</h2>
        <button class="details-btn" data-index="${index}">View Details</button>
        <div class="job-details" style="display: none;"></div>
      `;
      jobList.appendChild(jobDiv);
    });
    window.jobsData = data;

    document.querySelectorAll('.details-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        viewDetails(index);
      });
    });
  })
  .catch(error => console.error('Error fetching jobs:', error));

// VIEWDETAILS BUTTON
function viewDetails(index) {
  const job = window.jobsData[index];
  const jobDiv = document.querySelectorAll('.job')[index];
  const detailsDiv = jobDiv.querySelector('.job-details');
  if (detailsDiv.style.display === 'none') {
    detailsDiv.innerHTML = `
     <p>Company: ${job.company}</p>  
    <p>Description: ${job.description}</p>
      <p>Salary: ${job.salary}</p>
      <p>Location: ${job.location}</p>
       <p>posted Date: ${job.postedDate}</p>
      <p>Requirements: ${job.requirements}</p>
    `;
    detailsDiv.style.display = 'block';
  } else {
    detailsDiv.style.display = 'none';
  };
}


//SUBMIT AND RESPONSE
document.getElementById('submit-btn').addEventListener('click', showMessage);
function showMessage() {
  const messageElement = document.getElementById('message');
  messageElement.textContent = '🎉 CONGRATULATION JOB SUCCESSFULLY APPLIED!!';
event.preventDefault();
  setTimeout(() => {
    messageElement.textContent = ''; // Clear the message
  }, 5000);

}
})

function submitForm(event) {
  event.preventDefault();
  const form = document.getElementById("application-list");
  const formData = new FormData(form);

  const data = {
    name: formData.get('Name'),
    email: formData.get('email'),
    message: formData.get('Message'),
    agreedToTerms: document.getElementById("Checkbox").checked
  };

  // POST 
  fetch(`http://localhost:3001/applicants`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("message").textContent = 'Application submitted successfully!';
    form.reset();
  })
  .catch(error => {
    console.error('Error submitting application:', error);
    document.getElementById('message').textContent = 'Error submitting application. Please try again.';
  });
}

function addApplicationToList(applicants) {
  const applicationList = document.getElementById("application-items");
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <strong>Name:</strong> ${application.name} <br>
    <strong>Email:</strong> ${application.email} <br>
    <strong>Message:</strong> ${application.message}
  `;
  applicationList.appendChild(listItem);
}






