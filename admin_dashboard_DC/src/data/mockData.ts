import data from './certificates.json'


export const certificateTypes = [
  'Birth Certificate', 'Death Certificate', 'Marriage Certificate', 'Income Certificate',
  'SC Certificate', 'ST certificate', 'Ration Card', 'OBC certificate', 'Voter ID card',
  'EWS Certificate', 'Handicap Certificate', 'Insolvency Certificate', 'Domicile Certificate'
];

export const regions = [
  'North', 'North-East', 'North-West', 'West', 
  'South West', 'South', 'South-East', 'New Delhi',
  'Central', 'Shahdra', 'East', 
];

const regionEmployees = [
  28,16,18,23,25,19,22,26,12,20,29
]

function countCount(type : String,selectedRegion: String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].type === type && (selectedRegion === 'All' || data[i].region === selectedRegion)){
      ans++;
    }
  }
  return ans
}

function countPending(type : String,selectedRegion: String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].type === type && data[i].status === 'pending' && (selectedRegion === 'All' || data[i].region === selectedRegion)){
      ans++;
    }
  }
  return ans
}

function countApproved(type : String,selectedRegion: String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].type === type && data[i].status === 'approved' && (selectedRegion === 'All' || data[i].region === selectedRegion)){
      ans++;
    }
  }
  return ans
}

function countRejected(type : String,selectedRegion: String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].type === type && data[i].status === 'rejected' && (selectedRegion === 'All' || data[i].region === selectedRegion)){
      ans++;
    }
  }
  return ans
}

export const generateCertificateData = (selectedRegion: string) => {
  const d = certificateTypes.map(type => ({
    type,
    count: countCount(type,selectedRegion),
    pending: countPending(type,selectedRegion),
    approved: countApproved(type,selectedRegion),
    rejected: countRejected(type,selectedRegion)
  }));
  return d;
};

function countRegionCount(type : String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].region === type){
      ans++;
    }
  }
  return ans
}

function countRegionPending(type : String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].region === type && data[i].status === 'pending'){
      ans++;
    }
  }
  return ans
}

function countRegionApproved(type : String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].region === type && data[i].status === 'approved'){
      ans++;
    }
  }
  return ans
}

function countRegionRejected(type : String){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].region === type && data[i].status === 'rejected'){
      ans++;
    }
  }
  return ans
}

function countTimeTaken(region: string){
  let ans = 0;
  for(let i = 0; i<data.length; i++){
    if(data[i].region === region && data[i].status !== 'pending'){
      ans += data[i].timeTaken;
    }
  }
  return ans
}

// function calculateKPI(count:number,employees:number,completed:number,timeTaken:number){
//   let workPerformance = 5*(completed/count);
//   let timePerformance = 5*((timeTaken/completed)/employees)
// }


export const generateRegionalData = () => {
  return regions.map((region,index) => ({
    region,
    pending: countRegionPending(region),
    approved: countRegionApproved(region),
    rejected: countRegionRejected(region),
    load: Math.floor(countRegionCount(region)/regionEmployees[index]),
    timeTaken: countTimeTaken(region),
    employees: regionEmployees[index]
  }));
};
