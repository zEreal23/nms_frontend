import React from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";
import { Card } from "antd";

const ReportPage = () => {
  return (
    <Card style={{borderRadius:20}} hoverable>
      <HorizontalBar
        data={{
          type: "horizontalBar",
          labels: ["Porkset", "Vegetableset", "Seafoodset"],
          datasets: [
            {
              label: "# of popular",
              data: [12, 19, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={100}
        width={200}
      />
    </Card>
  );
};

export default ReportPage;
