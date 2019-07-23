# Flight picker
## Job interview assignment

[![Build Status](https://travis-ci.org/VojtechVidra/simple-flight-picker.svg?branch=master)](https://travis-ci.org/VojtechVidra/simple-flight-picker)

Based Nextjs, React, Typescript, Redux, Redux Thunk, normalizr, Styled components

## Task
### Select Boxes
Select dropdowns for departure aiport and arrival airport displaying correct format of data. Between these dropdowns is rotate icon which is visible only when both airports are selected.

### Month select
Calendar component that allows to choose year and month (only) of the departure. Label next to the calendar.

### Table of flights
Table showing flights from the API which are marked with status "AVAILIBLE".

### Background
Background downloaded from https://www.csa.cz website.

### Layout
Layout is optional, but it is required to be usable on mobile device.

### Application behavior
When opened, airports are loaded from API and displayed in the dropdown contents. The departure select should have default value Prague airport.

Rotate icon should rotate 180 degrees when hovered. Same as on the csa.cz website.

When requred parameters are selected, data from API should be loaded. During the loading, some loader should be displayed in place of the table.

### Optional
Application caches the data so same URL is not called more than once.

### Technology 
You can use React, Redux, Next.js and any other library.

## Solution
Everything should work as stated in the assignment. Caching of the data is achieved with Redux store and normalizing data with normalizr. Redux is storing array of allready loaded flights identified by departure aiport code, arrival aiport code, month and year of the departure. Before sending new request, redux store is cheched for the particular data.

The API doesnt have cors permitted for outside callers, when calling preflight request on the API, the response is 405 (Method Not Allowed). Only solution I came up with, was to disable security of my browser for the time of testing.