function getStartOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  
  function getEndOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  }
  
  function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  }
  
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  
  module.exports = {
    getStartOfMonth,
    getEndOfMonth,
    isWeekend,
    getDaysInMonth
  };