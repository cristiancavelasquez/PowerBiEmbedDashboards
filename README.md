This is a concise project where the intention was to investigate how Power BI reports can be embedded in a web application. Often, there is a need for a tool that allows a third party to visualize a report without requiring a Power BI license. This can be easily achieved, and the entire query is executed through the Microsoft Power BI API. However, in order to use these APIs, it is necessary to obtain tokens for authentication against Azure and to register the application. Since these tokens expire, it is necessary to implement functions that generate new tokens whenever needed.

This example is a brief demonstration using Next.js 13, but my future plan is to implement a web application where end users can access with personalized credentials and query the dashboards provided by an administrator. All of this can be accomplished using the Microsoft Power BI APIs, some of which allow us to list reports, workspaces, among many other functionalities.

🚀🚀🚀
