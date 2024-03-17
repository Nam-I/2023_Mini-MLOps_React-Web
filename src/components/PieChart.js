import { ResponsivePie } from "@nivo/pie";
import React, { useState, useEffect } from "react";
import { scaleOrdinal } from "d3-scale";

const PieChart = () => {
  const [pieData, setPieData] = useState([]);

  const getColorScale = scaleOrdinal()
    .domain(["Good", "Bad", "none"])
    .range(["hsl(200, 70%, 50%)", "hsl(0, 70%, 50%)", "hsl(0, 0%, 70%)"]);

  const getPieChartData = async () => {
    await fetch("/api/user-logs/ratio", {
      method: "get",
      headers: {
        Authorization: getLocalStorage("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPieData(data.data);
      })
      .catch((e) => console.log(e));
  };

  const getLocalStorage = (key) => {
    let item = localStorage.getItem(key);
    if (item === null) return null;

    item = JSON.parse(item);

    const now = new Date();
    if (now.getTime() > item.expireTime) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  };

  useEffect(() => {
    getPieChartData();
  }, [pieData]);

  return (
    <div style={{ height: 340 }}>
      <ResponsivePie
        data={[
          {
            id: "Good",
            label: "Good",
            value: pieData.good,
          },
          {
            id: "Bad",
            label: "Bad",
            value: pieData.bad,
          },
          {
            id: "none",
            label: "none",
            value: pieData.none,
          },
        ]}
        sortByValue={true}
        margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
        innerRadius={0.25}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={(datum) => getColorScale(datum.label)}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 24,
            translateY: 66,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
