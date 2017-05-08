import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import './index.scss';

import { Answers } from "./data";
import * as _ from "lodash";
import { Chart } from 'chart.js';

var roundNumber = function(number) {
  return parseFloat(number.toFixed(2));
}


var players    = ["tomas", "pablo","sebastian", "nicolas", "nacho", "diego", "ale", "luciano", "ivan", "marcelo", "maxy", "lucas"];
var responders = ["marcelo", "ivan", "pablo", "lucho", "nicolas", "nacho", "maxy", "tomas", "sebastian", "ale"];
var attributes = ["attack", "speed", "definition", "defense", "ability", "goalkeeper", "resistance"];
var translatedAttributes = ["Ataque", "Velocidad", "Definicion", "Defensa", "Habilidad", "Arco", "Resistencia"];
var fullNames  = {tomas: "Tomas Laganga", pablo: "Pablo Negrotto",sebastian: "Sebatian Laganga", nicolas: "Nicolas Derecho", nacho: "Ignacio del valle", diego: "Diego Krasijewicz", ale: "Alejandro YPF", luciano: "Luciano Derecho", ivan: "Ivan Krasijewicz", marcelo: "Marcelo Infante", maxy: "Maxy Derecho", lucas: "Lucas Sartirana"};

var averageAttributes = _.map(players, function(player){
  var playerResponses = _.filter(Answers, function(answer){ return answer.player === player });
  var total = playerResponses.length;
  var attributesSum = _.reduce(playerResponses, function(accumulator, response) {
                                return { 
                                  attack: parseFloat(accumulator.attack || 0) + parseFloat(response.attack),
                                  speed: parseFloat(accumulator.speed || 0) + parseFloat(response.speed),
                                  definition: parseFloat(accumulator.definition || 0) + parseFloat(response.definition),
                                  defense: parseFloat(accumulator.defense || 0) + parseFloat(response.defense),
                                  ability: parseFloat(accumulator.ability || 0) + parseFloat(response.ability),
                                  goalkeeper: parseFloat(accumulator.goalkeeper || 0) + parseFloat(response.goalkeeper),
                                  resistance: parseFloat(accumulator.resistance || 0) + parseFloat(response.resistance)
                                }
                              }, {});
  return {
    player: player,
    attack: roundNumber(attributesSum.attack / 10),
    speed: roundNumber(attributesSum.speed / 10),
    definition: roundNumber(attributesSum.definition / 10),
    defense: roundNumber(attributesSum.defense / 10),
    ability: roundNumber(attributesSum.ability / 10),
    goalkeeper: roundNumber(attributesSum.goalkeeper / 10),
    resistance: roundNumber(attributesSum.resistance / 10)
  }

});


document.querySelector(".js-spinner").className += ' hidden';

_.forEach(averageAttributes, function(attributes){

  var ctx = document.getElementById(attributes.player);
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: translatedAttributes,
          datasets: [{
              label: fullNames[attributes.player],
              data: [attributes.attack, attributes.speed, attributes.definition, attributes.defense, attributes.ability, attributes.goalkeeper, attributes.resistance],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      max: 5
                  }
              }]
          }
      }
  });

});