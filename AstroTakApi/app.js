const elasticsearch = require('elasticsearch');
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const { Banner, HoroScope, Astrologer, Report, Question, Testimony } = require('./model');
const { jRes } = require('./util')
const astrodata  = require("./astrodata");

const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200'],
  });
  
  client.ping(
      {
        requestTimeout: 30000,
      },
      function (error) {
        // At this point, Elasticsearch is down, please check your Elasticsearch service.
        if (error) {
          console.error('Elasticsearch cluster is down!');
        } else {
          console.log('Everything is okay.');
        }
      }
);

const giveBody = (query, queryOn) => {
    let body = {
        size: 200,
        from: 0,
        query: {
          wildcard : {
            [queryOn] : query,
          },
        },
    };
    return body;
}


app.use(express.urlencoded({
    extended : true
}));
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/AstroTakData");

app.get("/", (req, res) => {
    res.send("Welcome!!");
})

app.get("/banner-data", (req, res) => {
    setTimeout(() => {
        Banner.find({}, (err, banners) => {
            if(err){
                jRes(res, 400, err)
            }
            else
            {
                jRes(res, 200, banners);
            }
        })
    }, 2000)
})

app.get("/horoscope-data", (req, res) => {
    setTimeout(() => {
        HoroScope.find({}, (err, horoscopes) => {
            if(err){
                jRes(res, 400, err)
            }
            else
            {
                jRes(res, 200, horoscopes);
            }
        })
    }, 2000);
})

app.get("/astrologer-data", (req, res) => {
    setTimeout(() => {
        Astrologer.find({}, (err, astrologers) => {
            if(err){
                jRes(res, 400, err)
            }
            else
            {
                jRes(res, 200, astrologers);
            }
        })
    }, 2000)
})

app.get("/report-data", (req, res) => {
    setTimeout(() => {
        Report.find({}, (err, reports) => {
            if(err){
                jRes(res, 400, err)
            }
            else
            {
                jRes(res, 200, reports);
            }
        })
    }, 2000)
})

app.get("/question-data", (req, res) => {
    setTimeout(() => {
        Question.find({}, (err, questions) => {
            if(err){
                jRes(res, 400, err)
            }
            else
            {
                jRes(res, 200, questions);
            }
        })
    }, 2000)
})

app.get("/testimonial-data", (req, res) => {
    setTimeout(() => {
        Testimony.find({}, (err, testimonies) => {
            if(err){
                jRes(res, 400, err)
            }
            else
            {
                jRes(res, 200, testimonies);
            }
        })
    }, 2000)
})

app.post("/banner-data", (req, res) => {
    console.log(req.body);
    let newData = [];
    req.body.forEach(data => {
        const { img, redirectUrl } = data;
        const temp = new Banner({
            img, redirectUrl
        });
        newData.push(temp);
    });
    console.log(newData);
    Banner.insertMany(newData, (err, docs) => {
        if(err){
            jRes(res, 400, err);
        }
        else {
            jRes(res, 200, docs)
        }
    })
})

app.post("/horoscope-data", (req, res) => {
    console.log(req.body);
    let newData = [];
    req.body.forEach(data => {
        const { name, date, img } = data;
        const temp = new HoroScope({
            name, date, img
        });
        newData.push(temp);
    });
    console.log(newData);
    HoroScope.insertMany(newData, (err, docs) => {
        if(err){
            jRes(res, 400, err);
        }
        else {
            jRes(res, 200, docs)
        }
    })
})

app.post("/astrologer-data", (req, res) => {
    console.log(req.body);
    let newData = [];
    req.body.forEach(data => {
        const { namePrefix, firstName, lastName, aboutMe, profilePicUrl, experience, languages, minimumCallDuration, minimumCallDurationCharge, additionalPerMinuteCharge, isAvailable, rating, skills, isOnCall, availability } = data;
        const temp = new Astrologer({
            namePrefix, firstName, lastName, aboutMe, profilePicUrl, experience, languages, minimumCallDuration, minimumCallDurationCharge, additionalPerMinuteCharge, isAvailable, rating, skills, isOnCall, availability 
        });
        newData.push(temp);
    });
    console.log(newData);
    Astrologer.insertMany(newData, (err, docs) => {
        if(err){
            jRes(res, 400, err);
        }
        else {
            jRes(res, 200, docs)
        }
    })
})

app.post("/report-data", (req, res) => {
    console.log(req.body);
    let newData = [];
    req.body.forEach(data => {
        const { img, price } = data;
        const temp = new Report({
            img, price
        });
        newData.push(temp);
    });
    console.log(newData);
    Report.insertMany(newData, (err, docs) => {
        if(err){
            jRes(res, 400, err);
        }
        else {
            jRes(res, 200, docs)
        }
    })
})

app.post("/question-data", (req, res) => {
    console.log(req.body);
    let newData = [];
    req.body.forEach(data => {
        const { label, description, price, suggestions } = data;
        const temp = new Question({
            label, description, price, suggestions, value : label
        });
        newData.push(temp);
    });
    console.log(newData);
    Question.insertMany(newData, (err, docs) => {
        if(err){
            jRes(res, 400, err);
        }
        else {
            jRes(res, 200, docs)
        }
    })
})

app.post("/testimonial-data", (req, res) => {
    console.log(req.body);
    let newData = [];
    req.body.forEach(data => {
        const { testimony, userName, userAddress } = data;
        const temp = new Testimony({
            testimony, userName, userAddress
        });
        newData.push(temp);
    });
    console.log(newData);
    Testimony.insertMany(newData, (err, docs) => {
        if(err){
            jRes(res, 400, err);
        }
        else {
            jRes(res, 200, docs)
        }
    })
})



app.get("/search", async (req, res) => {
    console.log(`*${req.query['q'].toLowerCase()}*`);
    let query = `*${req.query['q'].toLowerCase()}*`;

    let resp1 = await client.search({index : 'astrodata', type : "astrodata", body : giveBody(query, "firstName")})
    let resp2 = await client.search({index : 'astrodata', type : "astrodata", body : giveBody(query, "lastName")})
    let resp3 = await client.search({index : 'astrodata', type : "astrodata", body : giveBody(query, "languages")})
    let resp4 = await client.search({index : 'astrodata', type : "astrodata", body : giveBody(query, "skills")})

    let tempMap = new Map();
    let firstNameFilter = resp1.hits.hits;
    let lastNameFilter = resp2.hits.hits;
    let languageFilter = resp3.hits.hits;
    let skillFilter = resp4.hits.hits;
    console.log(firstNameFilter);
    console.log(lastNameFilter);
    console.log(languageFilter);
    console.log(skillFilter)
    firstNameFilter.forEach(d => {
        tempMap[d._source.uid] = d._source;
    })
    lastNameFilter.forEach(d => {
        tempMap[d._source.uid] = d._source;
    })
    languageFilter.forEach(d => {
        tempMap[d._source.uid] = d._source;
    })
    skillFilter.forEach(d => {
        tempMap[d._source.uid] = d._source;
    })
    console.log(Object.values(tempMap));
    jRes(res, 200, Object.values(tempMap));

})

app.listen(5000, () => {
    console.log("listening")
})
