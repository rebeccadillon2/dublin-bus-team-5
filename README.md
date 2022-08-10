# Dublin Bus Django & React App

This project is a web application that enables users to conveniently plan their trips throughout the city. The application includes Random Forest models that were trained on Dublin Bus data from 2018. All predictions come from these models except for routes that have subsequently been created, in this case the application defaults to using Google's estimations through their Directions API. The application contains a host of other features some of which are only available to user who create an account.

## Features

### Journey Planner

The Journey Planner enables users to pick a start and destination location as well as a time, from which our Random Forest Model in conjunction with Google's Direction API will produce a response. The explore feature also enables users to search from a range of services within a 5km radius of their destination location.

![Journey Planner](assets/j.gif)

### Stops Schedule

The Stops Schdule enables users to get the upcoming schedule for any stop. Users with an account can also favourite stops, enabling for fast access on future visits.

![Stops Schedule](assets/rt.gif)

### Routes Overview

The Routes Overview allows users to search for any route which when selected, adds all the stops as pins to the map as well as produces a list of all the stops in the sidebar, which if clicked show the schedule for that stop. Users with an account can also favourite routes as well.

![Routes Overview](assets/r.gif)

### Spotify Integration

Spotify was integrated into this application so that users would not have to leave the application to listen to a podcast. We included a range of top Irish podcasts for users to listen to.

![Spotify Integration](assets/s.gif)

### Account

The account page is only for users that have created an account and provides a range of additional functionality. Users can update their fare calculator and payment type which updates the cost displayed in the journey planner. Users can also update their email, profile image, logout and delete their account.

![Account](assets/a.gif)

### Dublin Street Wordle

Dublin Street Wordle is a twist on the popular web game. The aim of the game is to encourage users to get to know Dublin more, therefore,there is no limit to the number of times a user can play the game.

![Dublin Street Wordle](assets/w.gif)

### Events

The Events page enables users to explore from a range of events happenning in Dublin. The events are pulled from the ticketmaster API with each card linking to the map as well as a point of purchase page. Music related events are also connected to our Spotify integration which allow users to preview an artist.

![Events](assets/e.gif)

## Technologies User

- MySQL
- Python
- Django
- Jupyter Notebooks
- NGINX
- React
- Tailwind
- HTML, CSS, JavaScript

## Installation

1. Clone this repo or download the zip files to a local directory of your choice.

2. Update the database configuration located in `dublin_bus/settings.py`.

3. Ensure you have Anaconda or Miniconda installed. This is required to setup a virtual environment.

```bash
conda create --name <name_of_environment> python=3.8
```

3. Activate the enviroment

```bash
conda activate <name_of_environment>
```

4. Install the requirements.txt file located at the root level of the directory.

```bash
pip install -r requirements.txt
```

5. Download the npm packages required for running the react app.

```bash
cd dublin_bus
cd frontend
npm install
```

6. Open two terminals to run the app.

```bash
# Terminal 1
cd dublin_bus
python3 manage.py runserver

# Terminal 2
cd dublin_bus
cd frontend
npm run dev
```

7. Open `http://127.0.0.1:8000` in your browser to see the application.
