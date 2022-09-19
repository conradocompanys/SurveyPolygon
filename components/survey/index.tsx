// components/survey/index.tsx
import React from "react"
import * as Survey from "survey-react-ui" // import surveyjs
import { questions } from "./content" // these are the survey questions
import "survey-react/survey.css";
import { StylesManager, Model } from "survey-core";
import { utils } from "ethers";

import useAddSurvey from "../../hooks/useAddSurvey";


import "survey-core/modern.css";
//import "survey-react/modern.min.css"
// Default theme


const SurveyComponent = () => {
  // Apply theme
  //Survey.StylesManager.applyTheme("defaultV2");
 // Survey.StylesManager.applyTheme("modern");

 const mutation = useAddSurvey();


// change colors
var defaultThemeColors = StylesManager.ThemeColors["default"];
defaultThemeColors["$main-color"] = "#7ff07f";
defaultThemeColors["$main-hover-color"] = "#6fe06f";
defaultThemeColors["$text-color"] = "#4a4a4a";
defaultThemeColors["$header-color"] = "#7ff07f";
defaultThemeColors["$header-background-color"] = "#4a4a4a";
defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

defaultThemeColors["$text-color"] = "#fffffff";
StylesManager.applyTheme();
 //StylesManager.applyTheme("modern");

// change color




 var surveyValueChanged = function (sender, options) {
  console.log(options.value);

};

  let  json = {
    pages: [
      {
        "elements": [
          {
            "type": "matrix",
            "name": "Quality",
            "title": "Please indicate if you agree or disagree with the following statements",
            "columns": [
              {
                "value": 1,
                "text": "Strongly Disagree"
              },
              {
                "value": 2,
                "text": "Disagree"
              },
              {
                "value": 3,
                "text": "Neutral"
              },
              {
                "value": 4,
                "text": "Agree"
              }, {
                "value": 5,
                "text": "Strongly Agree"
              }
            ],
            "rows": [
              {
                "value": "affordable",
                "text": "Product is affordable"
              }, {
                "value": "does what it claims",
                "text": "Product does what it claims"
              }, {
                "value": "better then others",
                "text": "Product is better than other products on the market"
              }, {
                "value": "easy to use",
                "text": "Product is easy to use"
              }
            ]
          }, {
            "type": "rating",
            "name": "satisfaction",
            "title": "How satisfied are you with the Product?",
            "mininumRateDescription": "Not Satisfied",
            "maximumRateDescription": "Completely satisfied"
          }, {
            "type": "rating",
            "name": "recommend friends",
            "visibleIf": "{satisfaction} > 3",
            "title": "How likely are you to recommend the Product to a friend or co-worker?",
            "mininumRateDescription": "Will not recommend",
            "maximumRateDescription": "I will recommend"
          }, {
            "type": "comment",
            "name": "suggestions",
            "title": "What would make you more satisfied with the Product?"
          }
        ]
      }, {
        "elements": [
          {
            "type": "radiogroup",
            "name": "price to competitors",
            "title": "Compared to our competitors, do you feel the Product is",
            "choices": ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
          }, {
            "type": "radiogroup",
            "name": "price",
            "title": "Do you feel our current price is merited by our product?",
            "choices": ["correct|Yes, the price is about right", "low|No, the price is too low for your product", "high|No, the price is too high for your product"]
          }, {
            "type": "multipletext",
            "name": "pricelimit",
            "title": "What is the... ",
            "items": [
              {
                "name": "mostamount",
                "title": "Most amount you would every pay for a product like ours"
              }, {
                "name": "leastamount",
                "title": "The least amount you would feel comfortable paying"
              }
            ]
          }
        ]
      }, {
        "elements": [
          {
            "type": "text",
            "name": "email",
            "title": "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
          }
        ]
      }
    ]
  };

 
  // Create a modal
  const survey = new Survey.SurveyModel(json)
  console.log(survey);

  survey.onComplete.add(function (sender) {
    console.log("mono------------------- JSON:", JSON.stringify(sender.data, null, 3));
    console.log("mono-------------------   ID:", utils.id(JSON.stringify(sender.data, null, 3)));
    //document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    const topic = "my-blog-post";
    const surveymessage = utils.id(JSON.stringify(sender.data, null, 3));
    console.log("mono3-------------------   ID:",surveymessage);
    mutation
    .mutateAsync({
      surveymessage,
      topic,
    }).then(() => console.log("hecho"));
    
  });

  // Render the survey
  return (
      
      <Survey.Survey model={survey} onValueChanged={surveyValueChanged}/>
   
  )
}




export default SurveyComponent