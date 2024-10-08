"use client";
// STEP 1 - Include Dependencies
// Include react
import React, { useContext, useEffect } from "react";
import { useSales } from "@/common/context/sales-context";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const TopSellingChart = () => {
    const { topSelling, getTopSelling } = useSales();

    // STEP 3 - Creating the JSON object to store the chart configurations
    const chartConfigs = {
        type: "column2d", // The chart type
        width: "100%", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                caption: "Top selling products",
                xAxisName: "Products",
                yAxisName: "Number sold",
                theme: "fusion",
            },
            // Chart Data
            data:
                topSelling &&
                topSelling.map((item) => {
                    return { label: item.product_name, value: item.total };
                }),
        },
    };

    useEffect(() => {
        getTopSelling();
        // eslint-disable-next-line
    }, []);
    return <ReactFC {...chartConfigs} />;
};

export default TopSellingChart;
