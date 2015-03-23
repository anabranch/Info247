require 'pp'
require 'json'
require 'date'

file = File.read('food_recalls_top_15.json')

data_hash = JSON.parse(file)

all_dates = data_hash['formatted_date'].values
all_years = all_dates.map{ | date | Date.parse(date).year }
all_reasons = data_hash['REASON'].values

unique_years = all_years.uniq.sort
pairs = all_years.zip(all_reasons)

# One empty array for each year
divided = Array.new(unique_years.length, Array.new())

# Dividing the reasons by year
unique_years.each_with_index do |obj, i|
	pairs.each do	|pair|
		if pair[0] == obj
			divided[i] << pair[1]
		end
	end
end

top_reasons = all_reasons.uniq

# Counting each reason by year
counts = []
divided.each_with_index do |year, i|
	count = year.each_with_object(Hash.new(0)) { |reason,counts| counts[reason] += 1 }
	counts << count
end

# Making objects
json = []
counts.each_with_index do |h, i|
	year = []
	h.keys.zip(h.values) do |pair|
		final = {}
		final[:x] = pair[0]
		final[:y] = pair[1]
		year << final
	end
	json << year
end

File.open("stacked_bar.json","w") do |f|
  f.write(json.to_json)
end
