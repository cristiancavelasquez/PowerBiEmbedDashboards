"use client";

import React, { useState, useEffect } from "react";
import { models, Report, Embed, service, Page } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import { json } from "stream/consumers";

type Props = {};

interface ResponseData {
  token: string;
  id_reporte: string;
  embeedUrl: string;
}

const Dashboard = (props: Props) => {
  const [responseConfig, setResponseConfig] = useState({} as ResponseData);
  useEffect(() => {
    fetch("http://localhost:3000/api/obtenerReportes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setResponseConfig(data.body.finalData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {
        <PowerBIEmbed
          cssClassName="report-style"
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: responseConfig.id_reporte,
            embedUrl: responseConfig.embeedUrl,
            accessToken: responseConfig.token,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
                pageNavigation: {
                  visible: false,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event?.detail);
                },
              ],
            ])
          }
        />
      }
    </div>
  );
};

export default Dashboard;
