/**
 * Created by Revathy Sindhu on 12/4/13.
 */
var seriesData;
var dataAvailable=false;

function getTimeSeriesData(timeSeriesContext, name, data) {
    var value = 0,
        values = [],
        i = 0,
        j= 0,
        dataIndex= 0,
        last;
        //console.log(data.length);

        //console.log();
        var maxValue=d3.max(data, function(datum){return datum.transactionAmount});
        var minValue=d3.min(data, function(datum){return datum.transactionAmount});

        var yscale=d3.scale.linear().
            domain([0, maxValue]). // your data minimum and maximum
            range([0, 70]);

   return timeSeriesContext.metric(function (start, stop, step, callback) {
        start = +start, stop = +stop;
        if (isNaN(last)) last = start;
        while (last < stop) {
            last += step;
            //value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += .2)));
            //value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += .2)));
            value=yscale(data[dataIndex].transactionAmount);
            values.push(value);
            dataIndex = (dataIndex+1) % (data.length);
        }
        callback(null, values = values.slice((start - stop) / step));
    }, name);
}

function stock(name) {
    return timeSeriesContext.metric(function (start, stop, step, callback) {
        d3.json("/data" + name + ".json", function (rows) {
            var compare = rows[0][1], value = rows[0][1], values = [value];

            // Creates an array of the price differences throughout the day
            rows.forEach(function (d) {
                values.push(value = (d[1] - compare) / compare);
            });
            callback(null, values);
        });
    }, name);
}

function timeSeriesDataLoaded(error, data)
{
    if(!data)
    {
        console.log("Ooops! Stinky diaper - " + error);
        dataAvailable=false;
        return;
    }

    seriesData=data;
    dataAvailable=true;

    console.log("Time series data loaded!");

    var timeSeriesContext = cubism.context()
            .serverDelay(0)
            .clientDelay(0)
            .step(1e3)
            .size(500)
        ;

    var arrayOfSeriesData={};
    var arrayOfSeries=[];
    var keys=[];

    var currentKey;
    var currentData;

    for(var i=0;i < data.length; i++)
    {
        if(data[i] && data[i].transactionType)
        {
            var found=false;
            currentKey=data[i].transactionType;
            currentData=data[i];
           for(var j=0;j < keys.length; j++)
           {
               if(data[i].transactionType == keys[j])
               {
                   found=true;
                   break;
               }
           }
            if(found == false)
            {
                keys.push(currentKey);
                arrayOfSeriesData[currentKey]=[];
            }
            arrayOfSeriesData[currentKey].push(currentData);
        }
    }

/*    for(var j=0;j < keys.length; j++)
    {
        arrayOfSeries.push();
    }*/

        /*var foo = getTimeSeriesData(timeSeriesContext,"foo", seriesData),
            bar = getTimeSeriesData(timeSeriesContext,"bar", seriesData);*/

    for(var k=0;k<keys.length; k++)
    {
    var newDiv= d3.select("#planb_simple_box").append("div")
        .attr("class", "planb_viz_body")
        .attr("id","planb_simple_viz" + k);

        newDiv.call(function (div) {
        div.datum(getTimeSeriesData(timeSeriesContext,keys[k], arrayOfSeriesData[keys[k]]));

        div.append("div")
            .attr("class", "horizon")
            .call(timeSeriesContext.horizon()
                .height(120)
                .mode("mirror")
                .colors(["#bdd7e7", "#bae4b3"])
                //.title("Area (120px)")
                .extent([-10, 10]));

       /* div.append("div")
            .attr("class", "horizon")
            .call(timeSeriesContext.horizon()
                .height(30)
                .mode("mirror")
                .colors(["#bdd7e7", "#bae4b3"])
                //.title("Area (30px)")
                .extent([-10, 10]));*/
    });
    }

    // On mousemove, reposition the chart values to match the rule.
    timeSeriesContext.on("focus", function (i) {
        d3.selectAll(".value").style("right", i == null ? null : timeSeriesContext.size() - i + "px");
    });
}

function initializeTimeSeries(size) {

    d3.json("aggregate.json", timeSeriesDataLoaded);



    /*d3.select("#example2b").call(function (div) {
        div.datum(foo);

        div.append("div")
            .attr("class", "horizon")
            .call(timeSeriesContext.horizon()
                .height(120)
                .colors(["#bdd7e7", "#bae4b3"])
                .title("Horizon, 1-band (120px)")
                .extent([-10, 10]));

        div.append("div")
            .attr("class", "horizon")
            .call(timeSeriesContext.horizon()
                .height(60)
                .colors(["#6baed6", "#bdd7e7", "#bae4b3", "#74c476"])
                .title("Horizon, 2-band (60px)")
                .extent([-10, 10]));

        div.append("div")
            .attr("class", "horizon")
            .call(timeSeriesContext.horizon()
                .height(40)
                .colors(["#3182bd", "#6baed6", "#bdd7e7", "#bae4b3", "#74c476", "#31a354"])
                .title("Horizon, 3-band (40px)")
                .extent([-10, 10]));

        div.append("div")
            .attr("class", "horizon")
            .call(timeSeriesContext.horizon()
                .height(30)
                .colors(["#08519c", "#3182bd", "#6baed6", "#bdd7e7", "#bae4b3", "#74c476", "#31a354", "#006d2c"])
                .title("Horizon, 4-band (30px)")
                .extent([-10, 10]));

    });*/


}

initializeTimeSeries(500);