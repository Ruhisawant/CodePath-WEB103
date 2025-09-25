const foodsData = [
  {
    id: 1,
    name: "Beef & Liver Puree",
    spacecraft: "Vostok 1",
    when: "April 1961",
    description: "Soviet cosmonaut Yuri Gagarin squeezed beef and liver paste from a tube during his historic first orbit of Earth.",
    how: "The puree was packaged in aluminum tubes, similar to toothpaste tubes, and squeezed directly into the mouth.",
    image: "/images/home/puree.png",
    realPhoto: "/images/details/puree.jpeg"
  },
  {
    id: 2,
    name: "Tang Drink Mix",
    spacecraft: "Friendship 7",
    when: "February 1962",
    description: "Tang was the first time a powdered drink mix was taken on a long enough spaceflight for a manned eating experiment, creating a significant marketing boost for the product.",
    how: "NASA packed the powdered orange drink mix into special sealed pouches. The food scientist who invented Tang, William A. Mitchell, did not develop it specifically for the space program, but the pre-existing instant drink was well-suited for space travel.",
    image: "/images/home/tang.png",
    realPhoto: "/images/details/tang.jpg"
  },
  {
    id: 3,
    name: "Shrimp Cocktail",
    spacecraft: "Gemini 4",
    when: "1965",
    description: "Astronaut Edward White said the shrimp cocktail was his favorite meal during the mission. It became popular because its spicy flavor helped with a dulled sense of taste in microgravity.",
    how: "Shrimp Cocktail was a freeze-dried meal. Astronauts rehydrated the food with water before eating it.",
    image: "/images/home/shrimp_cocktail.png",
    realPhoto: "/images/details/shrimp_cocktail.webp"
  },
  {
    id: 4,
    name: "Tortillas",
    spacecraft: "Space Shuttle Atlantis",
    when: "1985",
    description: "Crumbs float in microgravity and can damage equipment or irritate astronauts’ eyes and noses. To solve this, bread is replaced with tortillas, which don’t make crumbs and are easy to store.",
    how: "Flexible sealed packaging; stored un-frozen. Tends to be eaten taco-style.",
    image: "/images/home/tortilla.png",
    realPhoto: "/images/details/tortilla.jpg"
  },
  {
    id: 5,
    name: "Ramen Noodles",
    spacecraft: "Space Shuttle Discovery",
    when: "2005",
    description: "Japanese astronaut Soichi Noguchi became the first person to eat instant noodles in a weightless environment. The special noodles, called \"Space Ram,\" were developed by Nissin Foods in collaboration with the Japan Aerospace Exploration Agency (JAXA) to suit space travel conditions.",
    how: "The development by Nissin and the JAXA focused on a thicker, bite-sized broth to prevent it from floating away, as well as creating noodles that could cook properly in the International Space Station's lower-temperature water.",
    image: "/images/home/ramen.png",
    realPhoto: "/images/details/ramen.jpg"
  },
  {
    id: 6,
    name: "Dried Seaweed (Tori)",
    spacecraft: "Crew Dragon",
    when: "November 2008",
    description: "Japanese astronaut Soichi Noguchi brought the special \"space nori\" as a bonus meal and ate it with space rice and soy sauce. The meal was later approved by the Japan Aerospace Exploration Agency (JAXA) and shared with multinational crews.",
    how: "Dried seaweed was first sent to space as part of a selection of Japanese delicacies for astronauts. It was prepared specifically to address the challenges of eating in a zero-gravity environment. The seaweed was engineered by food technologists at JAXA.",
    image: "/images/home/seaweed.png",
    realPhoto: "/images/details/seaweed.jpg"
  },
  {
    id: 7,
    name: "Pizza",
    spacecraft: "International Space Station (ISS)",
    when: "December 2001",
    description: "A 6-inch Pizza Hut pizza was custom-made for space, featuring a thin crust, tomato sauce, cheese, and salami. The salami was used instead of pepperoni because it was more stable for the lengthy delivery.",
    how: "Pizza Hut partnered with the Russian Space Agency (Roscosmos). They paid approximately $1 million for the stunt and to place a large Pizza Hut logo on a Russian proton rocket, which was used to transport the pizza to the ISS.",
    image: "/images/home/pizza.png",
    realPhoto: "/images/details/pizza.jpg"
  },
  {
    id: 8,
    name: "Sushi",
    spacecraft: "International Space Station (ISS)",
    when: "February 2010",
    description: "Japanese astronaut Soichi Noguchi introduced the cuisine to his crewmates during the Expedition 22 mission",
    how: "The sushi was not made with fresh fish due to strict rules about perishable items in space. Instead, Noguchi brought shelf-stable ingredients, including freeze-dried fish and high-quality rice.",
    image: "/images/home/sushi.png",
    realPhoto: "/images/details/sushi.jpg"
  },
  {
    id: 9,
    name: "Espresso",
    spacecraft: "International Space Station (ISS)",
    when: "May 2015",
    description: "The first espresso was brewed by Italian astronaut Samantha Cristoforetti using the specially designed ISSpresso machine.",
    how: "The first espresso was sent to space aboard a SpaceX cargo resupply mission to the ISS. It was made possible by the ISSpresso machine, developed by Italian companies Lavazza and Argotec in partnership with the Italian Space Agency (ASI).",
    image: "/images/home/espresso.png",
    realPhoto: "/images/details/espresso.jpeg"
  },
  {
    id: 10,
    name: "Steak",
    spacecraft: "International Space Station (ISS)",
    when: "March 2019",
    description: "At space stations, where teams often had to stay for weeks at a time, getting the right food for astronauts became even more important. When NASA’s Skylab was launched in 1973, fridges were included onboard, allowing astronauts to enjoy meals more similar to those they would have on Earth.",
    how: "Steak was sent to space as a tiny piece of meat that was grown on the ISS using a 3D bioprinter. The experiment, conducted by the Israeli company Aleph Farms, involved sending vials of cow cells to space, where cosmonauts fed the cells into a special printer to replicate them into muscle tissue.",
    image: "/images/home/steak.png",
    realPhoto: "/images/details/steak.jpg"
  },
  {
    id: 11,
    name: "Corned Beef Sandwich",
    spacecraft: "Gemini",
    when: "1965",
    description: "The no-crumbs rule didn’t stop US astronaut John Young from smuggling a contraband snack onboard. According to audio evidence, Young and his commander Virgil “Gus” Grissom had a brief conversation about the sandwich, deciding it was too crumbly and putting it away.",
    how: "Young slipped a corned beef sandwich, which had been bought from a Florida deli by his friend Wally Schirra, into his spacesuit and whipped it out during a quiet moment to take a bite.",
    image: "/images/home/sandwich.png",
    realPhoto: "/images/details/sandwich.webp"
  },
  {
    id: 12,
    name: "Chocolate Pudding",
    spacecraft: "Apollo 11",
    when: "1969",
    description: "Astronauts were able to enjoy hot meals in space for the first time. This was thanks to hot water dispensers on spacecraft, which allowed for freeze-dried items such as soup and even chocolate pudding to be heated up.",
    how: "Pudding was first sent to space during the Apollo 11 mission in 1969 as a freeze-dried food. By the time of Apollo 16 in 1972, pudding was packaged in cans for astronauts to eat in space.",
    image: "/images/home/pudding.png",
    realPhoto: "/images/details/pudding.jpg"
  },
  {
    id: 13,
    name: "Ice Cream",
    spacecraft: "Skylab space station",
    when: "1973",
    description: "Unlike the freeze-dried dessert sometimes associated with space travel, astronauts on Skylab were able to eat real ice cream, thanks to a refrigerator on board. ",
    how: "Ice cream was previously freeze-dried by freezing solid slices of ice cream and then placing them in a vacuum chamber to remove the water content, which sublimated directly into a gas.",
    image: "/images/home/ice_cream.png",
    realPhoto: "/images/details/ice_cream.jpg"
  },
  {
    id: 14,
    name: "Lettuce",
    spacecraft: "Artemis III",
    when: "August 2014",
    description: "Astronauts Kjell Lindgren, Scott Kelly, and Kimiya Yui consumed the lettuce, which was the first food grown and harvested entirely in space, as part of NASA's ongoing efforts to develop food for future deep space missions.",
    how: "The leafy vegetable was cultivated in special sealed units containing ceramic soil, while light came from LEDs and water was injected by astronauts. According to studies, some batches even contained higher quantities of certain nutrients than varieties grown on Earth.",
    image: "/images/home/lettuce.png",
    realPhoto: "/images/details/lettuce.jpg"
  },
  {
    id: 15,
    name: "Peanut Butter",
    spacecraft: "Apollo 11",
    when: "July 1969",
    description: "Peanut Butter was included as a contingency food, but it is unclear whether it was actually consumed by Neil Armstrong or Buzz Aldrin on the Moon.",
    how: "It was not sent in glass jars but rather in specially designed, low-crumb bread for easy consumption without creating floating particles in the microgravity environment.",
    image: "/images/home/peanut_butter.png",
    realPhoto: "/images/details/peanut_butter.jpeg"
  },
]

export default foodsData;