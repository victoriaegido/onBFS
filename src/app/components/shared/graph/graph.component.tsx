import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Breadcrumbs from "../breadcrumbs/breadcrumb.component";
import { useTranslation } from "react-i18next";

interface GraphProps {
  title: string;
  categories: string[];
  seriesData: any[];
  chartType: string;
}

const Graph: React.FC<GraphProps> = ({ title, categories, seriesData, chartType }) => {

  const { t } = useTranslation();

  const options = {
    chart: {
      type: chartType, 
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: categories, 
    },
    yAxis: {
      title: {
        text: t("APP.GRAPH.AMOUNT"),
      },
    },
    series: seriesData,
    tooltip: {
      shared: true,
      valueSuffix: t("APP.GRAPH.UNIT"),
    },
  };

  return (
  <><Breadcrumbs /><HighchartsReact highcharts={Highcharts} options={options} /></>);
};

export default Graph;
