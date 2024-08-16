const mongoose = require('mongoose');
const config = require('../config/config');
const Employee = require('../models/Employee');
const { generateMonthlySummary } = require('../services/monthlySummaryService');

mongoose.connect(config.mongo.uri, config.mongo.options);

async function generateAllMonthlySummaries(year, month) {
  const employees = await Employee.find();

  for (const employee of employees) {
    await generateMonthlySummary(employee._id, year, month);
    console.log(`Generated summary for employee ${employee.name} for ${year}-${month+1}`);
  }

  console.log('All monthly summaries generated successfully');
  mongoose.disconnect();
}

const currentDate = new Date();
generateAllMonthlySummaries(currentDate.getFullYear(), currentDate.getMonth());