
## Run dev
First RUN
```
docker compose up --build
```
Next RUN
```
docker compose up
```

## API Docs

### # Get Location
Get list of address in the world.
#### [GET] `/locations`

#### Query Params
 - **search** <br/> 
   Search by location name
### Response
```
{
    "data": [
        {
            "name": "les Escaldes, Andorra",
            "city": "les Escaldes",
            "country_code": "AD",
            "latitude": "42.50729",
            "longitude": "1.53414"
        }
    ],
	"meta": {
		"status": "ok",
		"message": "OK"
	}
}
```
### # Get Method
Get of prayer times calculation method.

#### [GET] `/methods`

### Response
```
{
    "data": [
        {
			"id": 1,
			"name": "University of Islamic Sciences, Karachi"
		},
        {
			"id": 20,
			"name": "Kementerian Agama Republik Indonesia"
		}
    ],
	"meta": {
		"status": "ok",
		"message": "OK"
	}
}
```

### # Get Prayer Time
Get of prayer times.

#### [GET] `/prayer-times`

#### Query Params
 - **date** <br/> 
   Specific gregorian date in DD-MM-YYYY format.
 - **lat** <br/> 
   Latitude coordinates of users location.
 - **lng** <br/> 
   Longitude coordinates of users location.
 - **method** <br/> 
   A prayer times calculation method.

### Response
```
{
	"data": {
		"fajr": "04:22",
		"sunrise": "06:14",
		"dhuhr": "12:09",
		"asr": "15:18",
		"sunset": "18:05",
		"maghrib": "18:05",
		"isha": "19:51",
		"imsak": "04:12",
		"midnight": "00:10",
		"firstthird": "22:08",
		"lastthird": "02:11",
		"hijri": {
			"readable": "15 Ramaḍān 1446",
			"day": "15",
			"weekday": {
				"en": "Al Sabt"
			},
			"month": {
				"date": "9",
				"en": "Ramaḍān"
			},
			"year": "1446",
			"method": "HJCoSA"
		},
		"gregorian": {
			"readable": "15 March 2025",
			"day": "15",
			"weekday": {
				"en": "Saturday"
			},
			"month": {
				"date": "3",
				"en": "March"
			},
			"year": "2025"
		},
		"meta": {
			"Method": {
				"id": "3",
				"name": "Muslim World League"
			}
		}
	},
	"meta": {
		"status": "ok",
		"message": "OK"
	}
}
```

### # Get Weather
Get weather.
#### [GET] `/weathers` or `/weathers-accu`

#### Query Params
 - **lat** <br/> 
   Latitude
 - **lng** <br/> 
   Longtude
### Response
```
{
    "data": {
		"temp": {
			"c": 29.9,
			"f": 29.9
		},
		"is_day" : true,
		"text" : "Light rain shower"
	},
	"meta": {
		"status": "ok",
		"message": "OK"
	}
}
```