window.onload = function() {
    // Function to generate a random delay between 1 to 3 seconds
    function getRandomDelay() {
        return Math.floor(Math.random() * 3) + 1; // Returns a number between 1 and 3
    }

    // Create 3 promises with random delays
    const promise1 = new Promise((resolve) => {
        const delay = getRandomDelay();
        setTimeout(() => {
            resolve({ promise: 'Promise 1', time: delay });
        }, delay * 1000);
    });

    const promise2 = new Promise((resolve) => {
        const delay = getRandomDelay();
        setTimeout(() => {
            resolve({ promise: 'Promise 2', time: delay });
        }, delay * 1000);
    });

    const promise3 = new Promise((resolve) => {
        const delay = getRandomDelay();
        setTimeout(() => {
            resolve({ promise: 'Promise 3', time: delay });
        }, delay * 1000);
    });

    // Wait for all promises to resolve using Promise.all
    Promise.all([promise1, promise2, promise3]).then(results => {
        // Remove the "Loading..." row
        document.getElementById('loading').style.display = 'none';

        // Get the table body
        const output = document.getElementById('output');

        let totalTime = 0;
        // Loop through the results of the promises and populate the table
        results.forEach(result => {
            const row = document.createElement('tr');
            const promiseCell = document.createElement('td');
            promiseCell.textContent = result.promise;
            const timeCell = document.createElement('td');
            timeCell.textContent = result.time.toFixed(3); // Display time with 3 decimal points
            row.appendChild(promiseCell);
            row.appendChild(timeCell);
            output.appendChild(row);

            totalTime = Math.max(totalTime, result.time); // Track the maximum time
        });

        // Add the total row
        const totalRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        totalCell.textContent = 'Total';
        const totalTimeCell = document.createElement('td');
        totalTimeCell.textContent = totalTime.toFixed(3); // Display total time with 3 decimal points
        totalRow.appendChild(totalCell);
        totalRow.appendChild(totalTimeCell);
        output.appendChild(totalRow);
    });
};
