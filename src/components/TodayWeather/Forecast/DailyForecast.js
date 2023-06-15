import React from "react";
import { Grid, Typography } from "@mui/material";
import DailyForecastItem from "./DailyForecastItem";
import ErrorBox from "../../Reusable/ErrorBox";
import Layout from "../../Reusable/Layout";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const DailyForecast = ({ data, forecastList }) => {
  const chartData = [
    { name: "Page A", uv: 400 },
    { name: "Page b", uv: 600 },
    { name: "Page c", uv: 100 },
  ];
  let abc = forecastList.map((item) => ({
    name: item.time,
    temperature: Number(item.temperature.replace(/°C/g, "")),
  }));
  const noDataProvided =
    !data ||
    !forecastList ||
    Object.keys(data).length === 0 ||
    data.cod === "404" ||
    forecastList.cod === "404";
  let subHeader;

  if (!noDataProvided && forecastList.length > 0)
    subHeader = (
      <Typography
        variant="h5"
        component="h5"
        sx={{
          fontSize: { xs: "10px", sm: "12px" },
          textAlign: "center",
          lineHeight: 1,
          color: "#04C4E0",
          fontFamily: "Roboto Condensed",
          marginBottom: "1rem",
        }}
      >
        {forecastList.length === 1
          ? "1 available forecast"
          : `${forecastList.length} available forecasts`}
      </Typography>
    );

  console.log(forecastList, "---");
  let content;

  if (noDataProvided) content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided && forecastList.length > 0)
    content = (
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
        }}
        spacing="4px"
      >
        {forecastList.map((item, idx) => (
          <Grid
            key={idx}
            item
            xs={4}
            sm={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              marginBottom: { xs: "1rem", sm: "0" },
            }}
          >
            <DailyForecastItem item={item} data={data} />
          </Grid>
        ))}
      </Grid>
    );

  if (!noDataProvided && forecastList && forecastList.length === 0)
    subHeader = (
      <ErrorBox
        flex="1"
        type="info"
        margin="2rem auto"
        errorMessage="No available forecasts for tonight."
      />
    );

  return (
    <>
      <Layout
        title="TODAY'S FORECAST"
        content={content}
        sectionSubHeader={subHeader}
        sx={{ marginTop: "2.9rem" }}
        mb="0.3rem"
      />
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
        }}
        spacing="4px"
        style={{ marginTop: "20px" }}
      >
        <Grid
          item
          xs={4}
          sm={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            marginBottom: { xs: "1rem", sm: "0" },
          }}
        >
          <LineChart
            width={400}
            height={300}
            data={abc}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Grid>
      </Grid>
    </>
  );
};

export default DailyForecast;
