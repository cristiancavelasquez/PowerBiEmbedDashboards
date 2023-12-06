import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const tokenEndpoint = `https://login.microsoftonline.com/common/oauth2/token`;
    const groupId = "d734a836-b4ad-46e8-ae09-7153379d65e9";
    const reportId = "256e26dd-c343-4749-9e98-4a03e09b0c1e";

    const pw = process.env.AZ_PASSWORD;

    const params = new URLSearchParams();
    params.append("resource", process.env.RESOURCE as string);
    params.append("scope", process.env.SCOPE as string);
    params.append("username", "wvega@close-upinternational.com.co");
    params.append("password", pw as string);
    params.append("client_id", process.env.AZURE_CLIENT_ID as string);
    params.append("client_secret", process.env.AZURE_CLIENT_SECRET as string);
    params.append("grant_type", process.env.GRANT_TYPE as string);

    // Convert params to a JSON string
     const paramsJson = JSON.stringify(params); 

    // Use fetch instead of axios
    const fetchResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    // Parse the response as JSON
    const responseData = await fetchResponse.json(); 

    // Use fetch instead of axios
     const reportFetch = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${responseData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessLevel: "View",
        }),
      }
    ); 
    // Parse the response as JSON
     const dashboardData = await reportFetch.json();


     //sacar reporte
     const reporte = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${responseData.access_token}`,
        },
      }
    ); 
    // Parse the response as JSON
     const report = await reporte.json();

     const finalData = { 
      token: dashboardData.token,
      id_reporte: reportId,
      embeedUrl: report.embedUrl,
     };

    
      

    return NextResponse.json({ status: 200, body: { finalData } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, body: { error } });
  }
}
