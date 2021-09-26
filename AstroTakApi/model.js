const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    img : String,
    redirectUrl : String
})

const horoScopeSchema = new mongoose.Schema({
    name : String,
    date : String,
    img : String,
    images : Object,
    urlSlug : String,
})

const astrologerSchema = new mongoose.Schema({
    urlSlug : String,
    namePrefix : String,
    firstName : String,
    lastName : String,
    aboutMe : String,
    profilePicUrl : String,
    experience : String,
    languages : [String],
    minimumCallDuration : String,
    minimumCallDurationCharge : String,
    additionalPerMinuteCharge : String,
    isAvailable : Boolean,
    rating : String,
    skills : String,
    isOnCall : Boolean,
    images : Object,
    availability : Object
})

const reportSchema = new mongoose.Schema({
    img : String,
    price : String
})

const questionSchema = new mongoose.Schema({
    label : String,
    value : String,
    description : String,
    price : String,
    suggestions : [String]
})

const testimonySchema = new mongoose.Schema({
    testimony : String,
    userName : String,
    userAddress : String
})

const Banner = mongoose.model("banners", bannerSchema);
const HoroScope = mongoose.model("horoscopes", horoScopeSchema);
const Astrologer = mongoose.model("astrologers", astrologerSchema);
const Report = mongoose.model("reports", reportSchema);
const Question = mongoose.model("questions", questionSchema);
const Testimony = mongoose.model("testimonies", testimonySchema);
module.exports = {
    Banner, HoroScope, Astrologer, Report, Question, Testimony
}
























