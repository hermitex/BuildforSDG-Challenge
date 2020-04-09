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

const covid19ImpactEstimator = (data) => {
  output.impact.currentlyInfected = data.reportedCases * 10;
  output.servereImpact.currentlyInfected = data.reportedCases * 50;
  output.impact.infectionsByRequestedTime =
    output.impact.currentlyInfected * 1024;
  output.servereImpact.infectionsByRequestedTime =
    output.servereImpact.currentlyInfected * 1024;
  // 15% This is the estimated number of severe positive cases
  output.impact.severeCasesByRequestedTime =
    output.impact.infectionsByRequestedTime * 0.15;
  output.servereImpact.severeCasesByRequestedTime =
    output.servereImpact.infectionsByRequestedTime * 0.15;

  // Number of beds available for severe covid-19 cases
  output.impact.hospitalBedsByRequestedTime =
    data.totalHospitalBeds - output.impact.severeCasesByRequestedTime;
  output.servereImpact.hospitalBedsByRequestedTime =
    data.totalHospitalBeds - output.servereImpact.severeCasesByRequestedTime;

  //  the estimated number of severe positive cases that will require ICU care.
  output.impact.casesForICUByRequestedTime =
    output.impact.infectionsByRequestedTime * 0.05;
  output.servereImpact.casesForICUByRequestedTime =
    output.servereImpact.infectionsByRequestedTime * 0.05;

  // the estimated number of severe positive cases that will require ventilators.
  output.impact.casesForVentilatorsByRequestedTime =
    output.impact.infectionsByRequestedTime * 0.05;
  output.servereImpact.casesForVentilatorsByRequestedTime =
    output.servereImpact.infectionsByRequestedTime * 0.05;

  // much money the economy is likely to lose over 30 days
  output.impact.dollarsInFlight =
    output.impact.infectionsByRequestedTime *
    0.65 *
    data.region.avgDailyIncomePopulation *
    data.timeToElapse;

  output.servereImpact.dollarsInFlight =
    output.servereImpact.infectionsByRequestedTime *
    0.65 *
    data.region.avgDailyIncomePopulation *
    data.timeToElapse;
  return output;
};

covid19ImpactEstimator(covidData);
// export default covid19ImpactEstimator;
