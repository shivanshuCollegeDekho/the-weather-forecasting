import { Grid } from "@mui/material";
import React from "react";
import AirConditions from "./AirConditions/AirConditions";
import DailyForecast from "./Forecast/DailyForecast";
import Details from "./Details/Details";

const TodayWeather = ({ data, forecastList, tolggletoC }) => {
  return (
    <Grid container sx={{ padding: "3rem 0rem 0rem" }}>
      <Details data={data} tolggletoC={tolggletoC} />
      <AirConditions data={data} />
      <DailyForecast
        data={data}
        forecastList={forecastList}
        tolggletoC={tolggletoC}
      />
    </Grid>
  );
};

export default TodayWeather;
