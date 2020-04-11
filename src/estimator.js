/* eslint-disable linebreak-style */
const covidData = {
  region: {
    avgAge: 19.7,
    avgDailyIncomeInUSD: 3,
    avgDailyIncomePopulation: 0.75,
    name: 'Africa'
  },
  periodType: 'days',
  population: 2894929,
  reportedCases: 536,
  timeToElapse: 66,
  totalHospitalBeds: 92474
};

const impact = (data, num) => data.reportedCases * num;
const severeCases = (data, num) => data.currentlyInfected * num;
const NumberOfBeds = (beds, data) => beds.totalHospitalBeds - data.severeCasesByRequestedTime;
const Calc = (cases, num) => cases.infectionsByRequestedTime * num;

const normalizePeriod = (periodType, timeToElapse) => {
  let time = periodType;
  time = periodType.toLowerCase();
  switch (time) {
    case 'days': return timeToElapse;
    case 'weeks': return timeToElapse * 7;
    case 'months': return timeToElapse * 30;
    default: return 'Invalid timespan';
  }
};

const covid19ImpactEstimator = (data) => {
  const output = {
    data,
    impact: {},
    severeImpact: {}
  };

  const pop = data.region.avgDailyIncomePopulation;
  const time = normalizePeriod(data.periodType, data.timeToElapse);
  const outPutSevereImpact = output.severeImpact;
  const outPutImpact = output.impact;
  const income = data.region.avgDailyIncomeInUSD;

  outPutImpact.currentlyInfected = impact(data, 10);
  output.severeImpact.currentlyInfected = impact(data, 50);
  outPutImpact.infectionsByRequestedTime = severeCases(outPutImpact, time);
  output.severeImpact.infectionsByRequestedTime = severeCases(outPutSevereImpact, time);
  // 15% This is the estimated number of severe positive cases
  outPutImpact.severeCasesByRequestedTime = Calc(outPutImpact, 0.15);
  outPutSevereImpact.severeCasesByRequestedTime = Calc(outPutSevereImpact, 0.15);
  // Number of beds available for severe covid-19 cases
  outPutImpact.hospitalBedsByRequestedTime = NumberOfBeds(data, outPutImpact);
  outPutSevereImpact.hospitalBedsByRequestedTime = NumberOfBeds(data, outPutSevereImpact);
  //  the estimated number of severe positive cases that will require ICU care.
  outPutImpact.casesForICUByRequestedTime = Calc(outPutImpact, 0.05);
  outPutSevereImpact.casesForICUByRequestedTime = Calc(outPutSevereImpact, 0.05);
  // the estimated number of severe positive cases that will require ventilators.
  outPutImpact.casesForVentilatorsByRequestedTime = Math.round(Calc(outPutImpact, 0.02));
  outPutSevereImpact.casesForVentilatorsByRequestedTime = Calc(outPutSevereImpact, 0.02);
  // much money the economy is likely to lose over 30 days
  outPutImpact.dollarsInFlight = Math.trunc((Calc(outPutImpact, pop) * income) / time);
  outPutSevereImpact.dollarsInFlight = Math.trunc((Calc(outPutSevereImpact, pop) * income) / time);
  // console.log(output);
  return output;
};
covid19ImpactEstimator(covidData);
export default covid19ImpactEstimator;
