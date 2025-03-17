import fs from 'fs'; // Import the 'fs' module for file operations

export const regions = [
  'North', 'North-East', 'North-West', 'West', 
  'South West', 'South', 'South-East', 'New Delhi',
  'Central', 'Shahdra', 'East', 
];

export const certificateTypes = [
  'Birth Certificate', 'Death Certificate', 'Marriage Certificate', 'Income Certificate',
  'SC Certificate', 'ST certificate', 'Ration Card', 'OBC certificate', 'Voter ID card',
  'EWS Certificate', 'Handicap Certificate', 'Insolvency Certificate', 'Domicile Certificate'
];

function getRandomDateBeforeNow(){
  const now = new Date();
  const currentYear = now.getFullYear();

  // Set the start date as January 1st of the current year
  const start = new Date(currentYear, 0, 1).getTime();

  // Get the current timestamp
  const end = now.getTime();

  // Generate a random timestamp between the start and now
  const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;

  // Convert the random timestamp back to a date object
  return new Date(randomTimestamp);
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDaysBetweenDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const diffInTime = date2.getTime() - date1.getTime(); // difference in milliseconds
  return Math.round(diffInTime / oneDay); // convert to days and round
}

function getRandomDatePair() {
  // Generate the first random date
  const firstDate = getRandomDateBeforeNow();

  // Calculate a random number of days between 14 and 50
  const randomDays = Math.floor(Math.random() * (50 - 14 + 1)) + 14;

  // Generate the second date by adding randomDays to the first date
  const secondDate = addDays(firstDate, randomDays);

  // Ensure the second date is before today
  const now = new Date();
  if (secondDate <= now) {
    // Calculate the difference in days between the two dates
    const daysBetween = getDaysBetweenDates(firstDate, secondDate);

    return { firstDate, secondDate, daysBetween };
  } else {
    // If the second date exceeds today's date, retry with a smaller range
    return getRandomDatePair();
  }
}






export const generateCertificate = () => {
  const l = certificateTypes.length;
  const idx = Math.floor(Math.random()*l);
  const date = getRandomDatePair();
  const st = ['approved','rejected','pending'];
  const sta = st[Math.floor(Math.random()*3)];

  const le = regions.length;
  const idx2 = Math.floor(Math.random()*le);

  const data = {
    type : certificateTypes[idx],
    status : sta,
    appliedDate : date.firstDate,
    completedDate : (sta === 'pending')?new Date(Date.now()):date.secondDate,
    timeTaken: date.daysBetween,
    region : regions[idx2]
  }

  return data;
}


const generateCertificatesData = (number) => {
  const dataArray = [];
  for (let i = 0; i < number; i++) {
    dataArray.push(generateCertificate());
  }
  return dataArray;
};

// Generate an array of 5000 certificates
const certificatesData = generateCertificatesData(6000);

// Convert the array to a JSON string
const jsonData = JSON.stringify(certificatesData, null, 2);

// Write the JSON string to a file
fs.writeFile('certificates.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('Data has been written to certificates.json');
  }
});





