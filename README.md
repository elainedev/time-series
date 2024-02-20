# Time Series: Graph and Table

## Running the App

1. git clone the private repository using `git clone https://<PERSONAL_ACCESS_TOKEN>@github.com
/elainedev/time-series.git`
2. `cd` into the repository
3. run `npm install --legacy-peer-deps` (include the `--legacy-peer-deps` option).
4. run `npm start`. App should start on localhost:3000

## Notes & Instructions

- Select a date in the input field to see the time series on that day.
- Hover over points in the graph to see the tooltip with the timestamp and the value.
- The graph's tooltip and x-axis have been configured to display times in UTC.
- If the API failed to fetch the data, an error message will appear below the input field.
- The page is responsive to the width of the viewport.

## Libraries/Packages Used

- Datepicker: `React Datepicker`
- Line Graph: `ChartJS`
- Table: `Material UI`
- State Management: `Zustand`
- React@17.0.2 with TypeScript
