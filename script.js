// Function to simulate a promise that resolves after a random time (1 to 3 seconds)
function createRandomPromise(promiseName) {
  const delay = Math.random() * 2 + 1;  // Random delay between 1 and 3 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${promiseName} resolved after ${delay.toFixed(3)} seconds`);
      resolve({ name: promiseName, time: delay.toFixed(3) });
    }, delay * 1000); // Convert seconds to milliseconds
  });
}

// Function to populate the table with the resolved promise data
function populateTable(promises) {
  const output = document.getElementById('output');
  
  // Remove the "Loading..." row
  const loadingRow = document.getElementById('loading');
  loadingRow && loadingRow.remove();  // Ensure the row is removed

  // Add rows for each promise result
  promises.forEach((promise, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${promise.name}</td>
      <td>${promise.time}</td>
    `;
    output.appendChild(row);
    console.log(`Added ${promise.name} row with time: ${promise.time}`);
  });

  // Calculate the total time, which is the maximum time of all promises
  const totalTime = Math.max(...promises.map(p => parseFloat(p.time))).toFixed(3);
  console.log(`Total time calculated: ${totalTime}`);

  // Add the total row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;
  output.appendChild(totalRow);
}

// Create the promises and handle them with Promise.all()
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3')
];

// Show the loading message while waiting for promises to resolve
Promise.all(promises)
  .then(results => {
    console.log('All promises resolved:', results);
    populateTable(results);
  });
