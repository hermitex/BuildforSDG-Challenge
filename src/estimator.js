/* eslint-disable linebreak-style */
const covidData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,

    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const output = {
  data: {},
  impact: {},
  servereImpact: {}
};

const impact = (data, num) => data.reportedCases * num;
const severeVereCases = (data, num) => data.currentlyInfected * num;

// Number of beds available for severe covid-19 cases
const NumberOfBeds = (beds, data) => beds.totalHospitalBeds - data.severeCasesByRequestedTime;

//  the estimated number of severe positive cases that will require ICU care.
const utilCalc = (cases, num) => cases.infectionsByRequestedTime * num;
// const calculatePop = ()


const covid19ImpactEstimator = (data) => {
  const pop = data.region.avgDailyIncomePopulation;
  const time = data.timeToElapse;


  output.impact.currentlyInfected = impact(data, 10);
  output.servereImpact.currentlyInfected = impact(data, 50);
  output.impact.infectionsByRequestedTime = severeVereCases(output.impact, 1024);
  output.servereImpact.infectionsByRequestedTime = severeVereCases(output.servereImpact, 1024);
  // 15% This is the estimated number of severe positive cases
  output.impact.severeCasesByRequestedTime = utilCalc(output.impact, 0.15);
  output.servereImpact.severeCasesByRequestedTime = utilCalc(output.servereImpact, 0.15);

  // Number of beds available for severe covid-19 cases
  output.impact.hospitalBedsByRequestedTime = NumberOfBeds(data, output.impact);
  output.servereImpact.hospitalBedsByRequestedTime = NumberOfBeds(data, output.servereImpact);


  //  the estimated number of severe positive cases that will require ICU care.
  output.impact.casesForICUByRequestedTime = utilCalc(output.impact, 0.05);
  output.servereImpact.casesForICUByRequestedTime = utilCalc(output.servereImpact, 0.05);

  // the estimated number of severe positive cases that will require ventilators.
  output.impact.casesForVentilatorsByRequestedTime = utilCalc(output.impact, 0.02);
  output.servereImpact.casesForVentilatorsByRequestedTime = utilCalc(output.servereImpact, 0.02);

  // much money the economy is likely to lose over 30 days
  output.impact.dollarsInFlight = utilCalc(output.impact, 0.65) * pop * time;

  output.servereImpact.dollarsInFlight = utilCalc(output.servereImpact, 0.65) * pop * time;
  return output;
};
covid19ImpactEstimator(covidData);
// export default covid19ImpactEstimator;
