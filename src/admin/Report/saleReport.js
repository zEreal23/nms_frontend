import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Card } from "antd";

const saleReport = () => {
  return (
    <Card style={{borderRadius:20}} hoverable>
      <Line
        data={{
          labels: [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Monthly",
              data: [
                15000,
                20000,
                24000,
                36000,
                40000,
                22000,
                35000,
                40000,
                30000,
                25000,
                30000,
                26000,
              ],
              backgroundColor: ["rgba(255, 206, 86, 0.2)"],
              borderColor: ["rgba(255, 206, 86, 1)"],
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

export default saleReport;
