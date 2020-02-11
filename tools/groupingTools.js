module.exports = {
    // function that will group the meals by the date they were entered
    // used to find the total calories for specific dates
    groupByDate : (mealArray) => {
        return mealArray.reduce((map, mealItem) => {
            console.log(mealItem.date);
            console.log(map);
            console.log("above is map");
            console.log(mealItem);
            console.log(tools.convertDateForCharts(mealItem.date));
            const chartDate = tools.convertDateForCharts(mealItem.date);
            if(chartDate in map) {
                console.log("Key is in the map");
                map[chartDate].calories += Number(mealItem.calories);
            } else {
                console.log("key is not in the map");
                map[chartDate] = {};
                map[chartDate].calories = Number(mealItem.calories);
            }
            return map;
        }, {});
    }
}
