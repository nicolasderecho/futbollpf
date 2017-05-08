require "csv"
#attributes = ["ataque", "velocidad", "definicion", "defensa", "habilidad", "arco", "resistencia"]
players    = ["tomas", "pablo","sebastian", "nicolas", "nacho", "diego", "ale", "luciano", "ivan", "marcelo", "maxy", "lucas"]
attributes = ["attack", "speed", "definition", "defense", "ability", "goalkeeper", "resistance"]
responders = ["marcelo", "ivan", "pablo", "lucho", "nicolas", "nacho", "maxy", "tomas", "sebastian", "ale"]

csv = CSV.read("data.csv")
csv.shift

data = csv.each_with_index.map do |row, index|
  row[2..-1].each_slice(7).to_a.each_with_index.map do |response, slice_index|
    {
      player: players[slice_index],
      responder: responders[index],
      attack: response[0],
      speed: response[1],
      definition: response[2],
      defense: response[3],
      ability: response[4],
      goalkeeper: response[5],
      resistance: response[6]
    }
  end
end

puts data