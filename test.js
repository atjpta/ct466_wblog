
function getEndDay(numDays) {
    const endDay = new Date()
    endDay.setDate(endDay.getDate() + numDays);
    return endDay;
}